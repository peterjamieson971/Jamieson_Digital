import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertContactSchema } from "@shared/schema";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { z } from "zod";

// Simple in-memory cache for profile data
let profileCache: { data: any; timestamp: number } | null = null;
const PROFILE_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function registerRoutes(app: Express): Promise<Server> {
  // Get profile data
  app.get("/api/profile", async (req, res) => {
    try {
      // Check cache first
      const now = Date.now();
      if (profileCache && (now - profileCache.timestamp) < PROFILE_CACHE_DURATION) {
        // Set cache headers for browser caching
        res.set({
          'Cache-Control': 'public, max-age=300', // 5 minutes
          'ETag': `"profile-${profileCache.timestamp}"`,
          'Last-Modified': new Date(profileCache.timestamp).toUTCString()
        });
        return res.json(profileCache.data);
      }

      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Update cache
      profileCache = { data: profile, timestamp: now };
      
      // Set cache headers
      res.set({
        'Cache-Control': 'public, max-age=300', // 5 minutes
        'ETag': `"profile-${now}"`,
        'Last-Modified': new Date(now).toUTCString()
      });
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Update profile data
  app.put("/api/profile", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.updateProfile(validatedData);
      
      // Invalidate profile cache
      profileCache = null;
      
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      
      // Send email notifications
      const emailDomain = process.env.EMAIL_FROM_DOMAIN || 'jamieson.digital';
      const emailData = {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        submittedAt: contact.createdAt
      };
      
      try {
        // Send notification to Peter
        await sendContactNotification(emailData, emailDomain);
        
        // Send confirmation to submitter (non-blocking)
        sendContactConfirmation(emailData, emailDomain).catch(error => {
          console.error('Failed to send confirmation email:', error);
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the entire request if email fails
      }
      
      res.json({ message: "Message sent successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Get contact submissions (for future admin panel)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
