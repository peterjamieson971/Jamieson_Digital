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
      tagline: "Technologist | Digital Transformation Leader | AI Advocate",
      bio: "I'm a technology leader with over 15 years of experience building resilient digital foundations that fuel business transformation and sustainable growth. With a proven track record across retail, real estate, government, and construction sectors, I specialize in guiding high-performing teams through complex modernization journeys—transforming legacy systems into agile, cloud-native platforms that drive operational excellence.\n\nMy leadership philosophy centers on transparency, collaboration, and staying connected to the frontlines of technology. I maintain a hands-on approach to coding and development—not just as a technical skill, but as a leadership tool that keeps me attuned to emerging possibilities and the challenges my teams face daily. This direct engagement enables me to translate complex technical concepts into clear business outcomes while building authentic relationships across all levels of the organization.\n\nI'm passionate about democratizing AI knowledge, actively sharing insights on enterprise AI adoption and helping leadership teams understand its strategic potential beyond the technical complexity. My focus is on making AI accessible and actionable—developing governance frameworks and fostering the cultural shifts needed for organizations to harness AI's power responsibly and effectively.\n\nThroughout my career, from building new cities powered by AI at NEOM to leading digital transformation across luxury retail at Seddiqi Holding, I've consistently delivered results by putting people and purpose at the center of every technology decision. My mission is to create environments where innovation thrives, teams are empowered to solve complex problems, and every digital investment creates lasting value for customers and stakeholders.\n\nThis commitment to purposeful technology leadership has been recognized through CIO50 Middle East (IDC, 2021) and my Fellowship of BCS (2022). These achievements fuel my mission to create environments where innovation thrives, teams are empowered to solve complex problems, and every digital investment creates lasting value for customers and stakeholders.",
      humanistExpertise: "Technology Leadership: Digital Strategy | Enterprise Architecture | IT Governance | Budget Oversight | Change Management. Experienced in leading lean, high-performing teams through complex change initiatives while maintaining focus on transparency, collaboration, and agility across diverse organizational cultures.",
      visionaryExpertise: "Transformation Execution: Cloud (Azure, OCI) | Oracle & SAP | AI/ML | CRM & ERP | CI/CD | Agile Delivery | Smart Infrastructure. Proven success in transforming legacy applications into modern, scalable platforms spanning ERP, CRM, HR, and data ecosystems with embedded governance and service excellence.",
      galvanizerExpertise: "Business Impact: Cost Optimization | Digital Innovation | Stakeholder Engagement | Vendor Negotiation | Global Team Leadership. Known for working closely with boards and C-suite stakeholders to enable innovation and growth, delivering over $15M in cost optimizations and managing multi-million dollar technology portfolios.",
      currentRole: "Senior Director Group Technology at Seddiqi Holding - Developed and executed the 'Unity' enterprise tech strategy across luxury retail, real estate, and investment divisions. Managing a $10M+ tech portfolio spanning 60+ stores and three group companies. Deployed Salesforce Service Cloud, Marketing Cloud, and Commerce Cloud to support the launch of a new global sports brand. Directed transformation programs including SAP S/4HANA and Oracle cloud implementations. Launched AI-driven customer analytics and demand forecasting pilots. Built new enterprise architecture, GRC, and cybersecurity functions, including 24/7 SOC deployment. Delivered a group-wide service desk and managed support model to enable global scalability.",
      microsoftRole: "Public Sector Chief Technology Officer at Microsoft Scotland - Led Microsoft's engagement with Scottish public sector clients, including health, local government, and education. Developed digital transformation strategies leveraging Azure, Power Platform, and Microsoft 365 ecosystems. Supported adoption of cloud operating models and citizen-centric digital services across multiple agencies. Delivered executive roundtables, strategy offsites, and board briefings on cloud risk, security, and governance. Partnered with global teams to pilot AI, cognitive services, and digital identity programs for government use. Helped shape national strategies for data interoperability, open data standards, and accessibility frameworks.",
      ibmRole: "Chief Architect at IBM UK - Served as architecture lead for major UK public sector and financial services clients. Directed technology strategy and architecture governance across transformation programs valued at £100M+. Delivered secure hybrid cloud architectures and enterprise integration frameworks across legacy and modern platforms. Led multi-disciplinary teams across EMEA in application modernization, DevOps, and data platform delivery. Drove IBM's innovation agenda in blockchain, AI, and API-based digital ecosystems within regulated environments. Co-authored architecture playbooks adopted as EMEA best practice for IBM's services division.",
      previousRole1: "Director of Information Technology at NEOM - Directed digital infrastructure and IT operations for NEOM, the $500B smart city flagship of Vision 2030. Delivered smart infrastructure foundations including cloud-native ERP, WAN, and data center architecture. Managed $15M+ tech budget, overseeing multi-cloud strategy, vendor engagement, and SLA governance. Acted as cross-sector advisor integrating digital twins and IoT within core construction and city planning streams.",
      previousRole2: "Chief Technology Officer at Department of Culture & Tourism (DCT) Abu Dhabi - Spearheaded digital government strategy implementation for 2,000+ employees. Delivered Abu Dhabi's first full Azure and M365 migration, with integrated E5 telephony. Implemented SAP SuccessFactors and Microsoft Dynamics 365 across HR and CRM functions. Led digital product innovation for visitor engagement, data analytics, and smart tourism. Introduced CI/CD pipelines, agile squads, and experience-led design across all initiatives.",
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
