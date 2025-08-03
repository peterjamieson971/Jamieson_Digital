import { type User, type InsertUser, type Profile, type InsertProfile, type ContactSubmission, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private profile: Profile | undefined;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    
    // Initialize with default profile data
    this.profile = {
      id: randomUUID(),
      name: "Your Full Name",
      tagline: "Applied Futurist and Innovation Leader – Bridging Technology and Human Potential",
      bio: "I am a trailblazing thought leader redefining what's possible in the age of AI and digital transformation. As a business executive and innovation strategist, I have shaped the future of organizations, cities, and individuals by reimagining what they can become.\n\nKnown as a captivating storyteller and visionary thinker, I inspire audiences to embrace innovation, unlock hidden potential, and take bold leaps into the future. My work focuses on the intersection of technology and human potential, creating meaningful impact in an increasingly digital world.\n\nThrough my experience across multiple industries and geographies, I've developed a unique perspective on how emerging technologies can enhance rather than replace human capabilities, fostering growth and transformation at both individual and organizational levels.",
      humanistExpertise: "Creates a culture that sees the individual, hears their voice, respects their values and knowledge, and puts human interest and welfare at the heart of everything. Uses digital technology to unlock the hidden potential of the human spirit, not replace it.",
      visionaryExpertise: "Sees how the next generation of technology and innovation will positively impact the lives of people and then gives that vision a voice and makes it believable through compelling narratives and strategic implementation.",
      galvanizerExpertise: "Builds an inclusive and aligned ecosystem across employees, customers, and shareholders that shifts our mindset from vision and ideas to reality and action plans; from rethinking to creating and executing the art of the possible.",
      currentRole: "Chief Executive Officer at Current Organization - Leading the vision and delivery of cutting-edge technology ecosystems, building foundations for next-generation digital transformation and innovation initiatives.",
      previousRole1: "Previous Executive Role at Previous Organization (2018-2023) - Drove strategic initiatives and digital transformation across multiple business units, delivering measurable impact and sustainable growth.",
      previousRole2: "Senior Leadership Role at Technology Company (2015-2018) - Led cross-functional teams in developing innovative solutions that bridged technology and business objectives, consistently exceeding performance targets.",
      email: "your.email@domain.com",
      linkedin: "linkedin.com/in/yourprofile",
      location: "Global • Available for Remote Collaboration"
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    if (!this.profile) {
      const id = randomUUID();
      this.profile = { ...profileData, id };
    } else {
      this.profile = { ...this.profile, ...profileData };
    }
    return this.profile;
  }

  async createContactSubmission(contactData: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const contact: ContactSubmission = { ...contactData, id, createdAt };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
