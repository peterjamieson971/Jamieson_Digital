// Load environment variables first
import { config } from 'dotenv';
config({ path: '.env.local' });

import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { validateEnvironment } from "./env";
import path from "path";
import fs from "fs";

// Validate environment variables at startup
const env = validateEnvironment();
log("✅ Environment variables validated successfully");

const app = express();

// Security headers (environment-specific configuration)
const isProduction = env.NODE_ENV === "production";
const isDevelopment = env.NODE_ENV === "development";

app.use(helmet({
  // Disable CSP in development to prevent Safari HTTPS issues
  contentSecurityPolicy: isDevelopment ? false : {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: [
        "'self'", 
        "https://www.googletagmanager.com"
      ],
      connectSrc: [
        "'self'", 
        "https://www.google-analytics.com", 
        "https://analytics.google.com"
      ],
    }
  },
  crossOriginEmbedderPolicy: false,
  // Disable HSTS in development to prevent Safari HTTPS enforcement
  hsts: false,
  // Additional security headers for production
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
}));

// Rate limiting (environment-specific)
const contactRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: env.NODE_ENV === "production" ? 5 : 10, // Stricter in production
  message: { 
    error: 'Too many contact form submissions. Please wait 5 minutes before trying again.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute  
  max: env.NODE_ENV === "production" ? 100 : 1000, // Much stricter in production
  message: { 
    error: 'Too many API requests. Please slow down.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});


app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

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

  // Custom error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Log the error but don't throw (prevents crash)
    console.error(`Server error ${status}:`, err);
    
    // Determine if this is an API request or a page request
    const isApiRequest = req.path.startsWith('/api');
    const acceptsJson = req.get('Accept')?.includes('application/json');
    
    // For API requests or AJAX calls, return JSON
    if (isApiRequest || acceptsJson) {
      res.status(status).json({ message });
      return;
    }
    
    // For page requests, serve simple HTML error
    res.status(status).set({ 'Content-Type': 'text/html' }).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error ${status}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; }
            h1 { color: #e53e3e; }
          </style>
        </head>
        <body>
          <h1>Error ${status}</h1>
          <p>${message}</p>
        </body>
      </html>
    `);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = env.PORT;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
