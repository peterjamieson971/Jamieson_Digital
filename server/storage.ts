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
      bio: "I've spent the last 15 years designing the resilient digital frameworks that empower businesses to reinvent themselves and grow sustainably. My experience spans retail, real estate, government, and construction, and I've consistently steered agile teams through the intricate choreography of modernization—from unwieldy legacy systems to nimble, cloud-first infrastructures that deliver operational excellence.\n\nI lead with a philosophy of openness, teamwork, and a constant pulse on operational reality. I still code—not as a relic of the past, but as a strategic practice that keeps me in close contact with both the latest opportunities and the daily challenges my teams encounter. This hands-on involvement allows me to bridge the gap between intricate technical detail and clear business impact, forging genuine connections across the entire organization.\n\nI care deeply about widening access to AI knowledge. I speak and write on enterprise AI adoption to help executives see its strategic advantage, stripped of jargon and complexity. My goal is to make AI both understandable and actionable, designing governance structures and cultivating the cultural shifts that enable organizations to wield AI's capability responsibly and to full effect.\n\nAcross my career—first, creating future cities powered by AI at NEOM, later driving digital transformation for luxury retail at Seddiqi Holding—I have delivered lasting results by anchoring every technology decision in people and in purpose. My mission is to cultivate ecosystems where innovation flourishes, teams tackle complexity with confidence, and every digital dollar generates enduring value for customers and for stakeholders.\n\nThis focus on technology infused with purpose has been honored by the CIO50 Middle East (IDC, 2021) and awarded with BCS Fellowship (2022). Each recognition strengthens my resolve to foster settings where creative solutions multiply, talent flourishes, and digital investments resonate with lasting impact.",
      humanistExpertise: "Technology Leadership: Digital Strategy | Enterprise Architecture | IT Governance | Budget Oversight | Change Management. Experienced in leading lean, high-performing teams through complex change initiatives while maintaining focus on transparency, collaboration, and agility across diverse organizational cultures.",
      visionaryExpertise: "Transformation Execution: Cloud (Azure, OCI) | Oracle & SAP | AI/ML | CRM & ERP | CI/CD | Agile Delivery | Smart Infrastructure. Proven success in transforming legacy applications into modern, scalable platforms spanning ERP, CRM, HR, and data ecosystems with embedded governance and service excellence.",
      galvanizerExpertise: "Business Impact: Cost Optimization | Digital Innovation | Stakeholder Engagement | Vendor Negotiation | Global Team Leadership. Known for working closely with boards and C-suite stakeholders to enable innovation and growth, delivering over $15M in cost optimizations and managing multi-million dollar technology portfolios.",
      currentRole: "Senior Director Group Technology at Seddiqi Holding - Developed and executed the 'Unity' enterprise tech strategy across luxury retail, real estate, and investment divisions. Managing a technology portfolio spanning 60+ stores and four group companies. Deployed Salesforce Service Cloud, Marketing Cloud, and Commerce Cloud to support the launch of a new global sports brand. Directed transformation programs including SAP S/4HANA and Oracle cloud implementations. Launched AI-driven customer analytics and demand forecasting pilots. Built new enterprise architecture, GRC, and cybersecurity functions, including 24/7 SOC deployment. Delivered a group-wide service desk and managed support model to enable global scalability.",
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
