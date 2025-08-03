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
      name: "Peter Jamieson",
      tagline: "Chief Information Officer | Digital Transformation Leader | Technology Strategist",
      bio: "Experienced CIO with a track record of delivering strong technology foundations that support business growth, resilience, and operational excellence. Skilled in leading lean, high-performing teams through complex change initiatives, enterprise application modernisation, and large-scale infrastructure transformations across diverse sectors including retail, real estate, government, and construction.\n\nBrings deep expertise in enterprise architecture, cloud strategy, and platform integration—paired with a leadership style grounded in transparency, collaboration, and agility. Proven success in transforming legacy applications into modern, scalable platforms—spanning ERP, CRM, HR, and data ecosystems—while embedding governance, service excellence, and commercial alignment.\n\nRecognized as CIO50 Middle East (IDC, 2021) among the Top 50 CIOs in the region for enterprise transformation impact. Fellow of BCS (2022) awarded for distinguished contribution to the IT industry. Known for working closely with boards and C-suite stakeholders to enable innovation and growth through strategic technology leadership.",
      humanistExpertise: "Technology Leadership: Digital Strategy | Enterprise Architecture | IT Governance | Budget Oversight | Change Management. Experienced in leading lean, high-performing teams through complex change initiatives while maintaining focus on transparency, collaboration, and agility across diverse organizational cultures.",
      visionaryExpertise: "Transformation Execution: Cloud (Azure, OCI) | Oracle & SAP | AI/ML | CRM & ERP | CI/CD | Agile Delivery | Smart Infrastructure. Proven success in transforming legacy applications into modern, scalable platforms spanning ERP, CRM, HR, and data ecosystems with embedded governance and service excellence.",
      galvanizerExpertise: "Business Impact: Cost Optimization | Digital Innovation | Stakeholder Engagement | Vendor Negotiation | Global Team Leadership. Known for working closely with boards and C-suite stakeholders to enable innovation and growth, delivering over $15M in cost optimizations and managing multi-million dollar technology portfolios.",
      currentRole: "Senior Director Group Technology at Seddiqi Holding (Jun. 2023 – Present) - Developed and executed the 'Unity' enterprise tech strategy across luxury retail, real estate, and investment divisions. Managing a $10M+ tech portfolio spanning 60+ stores and three group companies. Deployed Salesforce Service Cloud, Marketing Cloud, and Commerce Cloud to support the launch of a new global sports brand.",
      previousRole1: "Director of Information Technology at NEOM (Sep. 2022 – Jun. 2023) - Directed digital infrastructure and IT operations for NEOM, the $500B smart city flagship of Vision 2030. Delivered smart infrastructure foundations including cloud-native ERP, WAN, and data center architecture. Managed $15M+ tech budget, overseeing multi-cloud strategy, vendor engagement, and SLA governance.",
      previousRole2: "Executive Partner at Gartner (Apr. 2022 – Sep. 2022) - Advised CIOs across the GCC on IT strategy, digital transformation, and operating model modernization. Delivered tailored research and insights on AI readiness, cybersecurity frameworks, and enterprise agility. Negotiated cost optimization roadmaps resulting in over $15M total savings across client portfolios.",
      email: "peter@apj.me",
      linkedin: "linkedin.com/in/pjamieson",
      location: "Dubai, UAE • Available for Global Collaboration"
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
