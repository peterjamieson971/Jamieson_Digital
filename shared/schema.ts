import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  bio: text("bio").notNull(),
  humanistExpertise: text("humanist_expertise").notNull(),
  visionaryExpertise: text("visionary_expertise").notNull(),
  galvanizerExpertise: text("galvanizer_expertise").notNull(),
  currentRole: text("current_role").notNull(),
  previousRole1: text("previous_role_1").notNull(),
  previousRole2: text("previous_role_2").notNull(),
  microsoftRole: text("microsoft_role").notNull(),
  ibmRole: text("ibm_role").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin").notNull(),
  location: text("location").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    name: z.string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .trim(),
    email: z.string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters")
      .trim()
      .toLowerCase(),
    message: z.string()
      .min(1, "Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message must be less than 2000 characters")
      .trim(),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
