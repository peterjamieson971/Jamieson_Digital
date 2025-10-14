import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { insertContactSchema } from '../shared/schema.js';
import { sendContactNotification, sendContactConfirmation } from '../server/email.js';
import { z } from 'zod';

// Simple in-memory rate limiting for serverless
const submissionTracker = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const tracker = submissionTracker.get(ip);

  if (!tracker || now > tracker.resetAt) {
    submissionTracker.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (tracker.count >= MAX_SUBMISSIONS) {
    return false;
  }

  tracker.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const ip = req.headers['x-forwarded-for']?.toString() || req.headers['x-real-ip']?.toString() || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Too many contact form submissions. Please wait 15 minutes before trying again.'
      });
    }

    // Validate request body
    const validatedData = insertContactSchema.parse(req.body);

    // Create contact submission
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

    return res.status(200).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid contact data', errors: error.errors });
    }
    console.error('Failed to send message:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
}
