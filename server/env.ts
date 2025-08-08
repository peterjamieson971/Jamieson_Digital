import { z } from "zod";

// Define the schema for required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1).max(65535)).default("5000"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required for email functionality"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters for security"),
  
  // Optional environment variables
  EMAIL_FROM_DOMAIN: z.string().optional().default("jamieson.digital"),
  VITE_GA_MEASUREMENT_ID: z.string().optional(),
});

export type Environment = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables at application startup
 * Throws an error if required variables are missing or invalid
 */
export function validateEnvironment(): Environment {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      throw new Error(
        `Invalid environment configuration:\n${missingVars}\n\n` +
        `Please check your .env.local file and ensure all required environment variables are set.`
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 * This should only be called after validateEnvironment() has been called successfully
 */
export function getEnvironment(): Environment {
  return envSchema.parse(process.env);
}