export interface ProfileData {
  name: string;
  titles: string[];
  headline: string;
  bioParagraphs: string[];
  avatarUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  cvUrl: string;
  yearsExperience: string;
  projectsCompleted: string;
  designDeliveries: string;
  satisfactionRate: string;
  socials: {
    github?: string;
    linkedin?: string;
    behance?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'web-dev' | 'graphic-design';
  level: number; // 0 - 100
  iconName?: string;
  toolVersion?: string;
  isFeatured: boolean;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'web-dev' | 'graphic-design';
  description: string;
  features: string[];
  icon: string;
  isPopular?: boolean;
  order: number;
}

export interface WebProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDetails?: string;
  category: 'Full-Stack' | 'Front-End' | 'Back-End' | 'UI/UX' | 'E-Commerce' | 'All';
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  order: number;
}

export interface GraphicDesignItem {
  id: string;
  title: string;
  description: string;
  category: 
    | 'Logo Design'
    | 'Brand Identity'
    | 'Posters'
    | 'Flyers'
    | 'YouTube Thumbnails'
    | 'Social Media Designs'
    | 'Promotional Banners'
    | 'Other Creative Designs';
  imageUrl: string;
  toolsUsed: string[]; // e.g. Photoshop, Illustrator, CorelDRAW, PixelLab
  dimensions?: string; // e.g. "1920x1080", "1080x1080 (Square)", "A4 Print"
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  order: number;
}

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education' | 'certification';
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  availableForHire: boolean;
  footerQuote: string;
  ajrakAccentLevel: 'subtle' | 'moderate' | 'minimal';
}

export interface PortfolioDatabase {
  profile: ProfileData;
  skills: SkillItem[];
  services: ServiceItem[];
  webProjects: WebProject[];
  graphicDesigns: GraphicDesignItem[];
  timeline: TimelineEntry[];
  messages: ContactMessage[];
  settings: SiteSettings;
  adminPasswordHash: string;
  adminSalt: string;
}
