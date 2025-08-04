import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactNotificationData {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export async function sendContactNotification(data: ContactNotificationData, fromDomain: string) {
  if (!resend) {
    console.warn('Resend API key not configured - skipping email notification');
    return null;
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: ['peter@jamieson.digital'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007AFF; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString()}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007AFF; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', emailData?.id);
    return emailData;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

export async function sendContactConfirmation(data: ContactNotificationData, fromDomain: string) {
  if (!resend) {
    console.warn('Resend API key not configured - skipping confirmation email');
    return null;
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `Peter Jamieson <onboarding@resend.dev>`,
      to: [data.email],
      subject: 'Thank you for reaching out - Peter Jamieson',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">
            Thank you for your message, ${data.name}!
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            I've received your message and will get back to you within 24-48 hours. I appreciate you taking the time to reach out.
          </p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007AFF; margin-top: 0;">Your Message (for reference)</h3>
            <p style="line-height: 1.6; white-space: pre-wrap; color: #666;">${data.message}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            Best regards,<br>
            <strong>Peter Jamieson</strong><br>
            Chief Information Officer | Digital Transformation Leader
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              Connect with me: 
              <a href="https://linkedin.com/in/pjamieson" style="color: #007AFF;">LinkedIn</a> | 
              <a href="https://twitter.com/digitaljamieson" style="color: #007AFF;">Twitter</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Confirmation email error:', error);
      // Don't throw error for confirmation emails - we still want the main notification to succeed
      return null;
    }

    console.log('Confirmation email sent successfully:', emailData?.id);
    return emailData;
  } catch (error) {
    console.error('Confirmation email service error:', error);
    // Don't throw error for confirmation emails
    return null;
  }
}