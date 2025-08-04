import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  const server = await registerRoutes(app);

  // Custom error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Determine if this is an API request or a page request
    const isApiRequest = req.path.startsWith('/api');
    const acceptsJson = req.get('Accept')?.includes('application/json');
    
    // For API requests or AJAX calls, return JSON
    if (isApiRequest || acceptsJson) {
      res.status(status).json({ message });
      return;
    }
    
    // For page requests, serve HTML error pages
    const errorPagePath = path.resolve(
      import.meta.dirname,
      'error-pages',
      `${status}.html`
    );
    
    // Check if we have a custom error page for this status code
    if (fs.existsSync(errorPagePath)) {
      const errorHtml = fs.readFileSync(errorPagePath, 'utf-8');
      res.status(status).set({ 'Content-Type': 'text/html' }).send(errorHtml);
    } else {
      // Fallback to generic 500 error page
      const fallbackPath = path.resolve(
        import.meta.dirname,
        'error-pages',
        '500.html'
      );
      
      if (fs.existsSync(fallbackPath)) {
        const errorHtml = fs.readFileSync(fallbackPath, 'utf-8');
        res.status(status).set({ 'Content-Type': 'text/html' }).send(errorHtml);
      } else {
        // Ultimate fallback
        res.status(status).send(`<h1>Error ${status}</h1><p>${message}</p>`);
      }
    }
    
    // Log the error but don't throw (prevents crash)
    console.error(`Server error ${status}:`, err);
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
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "localhost",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
