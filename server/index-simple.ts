import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Trust proxy for AWS App Runner (required for rate limiting behind load balancer)
app.set('trust proxy', true);

// Enable compression for better performance
app.use(compression({
  level: 9, // Maximum compression for production
  threshold: 512, // Compress files larger than 512 bytes
  filter: (req: express.Request, res: express.Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Only compress compressible content types
    if (res.getHeader('content-type')?.toString().includes('text/') ||
        res.getHeader('content-type')?.toString().includes('application/json') ||
        res.getHeader('content-type')?.toString().includes('application/javascript') ||
        res.getHeader('content-type')?.toString().includes('text/css')) {
      return true;
    }
    return compression.filter(req, res);
  }
}));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: [
        "'self'",
        "https://www.googletagmanager.com",
        "'unsafe-inline'"
      ], // unsafe-inline needed for GA
      frameSrc: [
        "'self'",
        "https://www.youtube.com",
        "https://www.youtube-nocookie.com"
      ], // Allow YouTube embeds
      connectSrc: [
        "'self'",
        "https://www.google-analytics.com",
        "https://region1.google-analytics.com",
        "https://*.google-analytics.com",
        "https://analytics.google.com",
        "https://*.analytics.google.com",
        "https://www.googletagmanager.com",
        "https://stats.g.doubleclick.net"
      ]
    }
  },
  crossOriginEmbedderPolicy: false // Allow external resources
}));

// Health check endpoint for AWS App Runner
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rate limiting for contact form
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact submissions per windowMs
  message: { 
    error: 'Too many contact form submissions. Please wait 15 minutes before trying again.' 
  },
  trustProxy: true, // Trust AWS App Runner proxy
  standardHeaders: true,
  legacyHeaders: false,
} as any);

// General API rate limiting
const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: { 
    error: 'Too many API requests. Please slow down.' 
  },
  trustProxy: true, // Trust AWS App Runner proxy
  standardHeaders: true,
  legacyHeaders: false,
} as any);

app.use(express.json({ limit: '1mb' })); // Limit payload size
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Simple logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Apply rate limiting before routes
  app.use('/api', apiRateLimit);
  app.use('/api/contact', contactRateLimit);
  
  const server = await registerRoutes(app);

  // Simple error handling - no file system operations
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    console.error(`Server error ${status}:`, err);
    
    // Always return JSON for simplicity
    res.status(status).json({ error: message });
  });

  // Setup Vite in development, serve static in production
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});