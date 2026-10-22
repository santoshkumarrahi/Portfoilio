import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { PortfolioDatabase, ProfileData, SkillItem, ServiceItem, WebProject, GraphicDesignItem, TimelineEntry, ContactMessage, SiteSettings } from '../src/types/portfolio.ts';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Initial seed data reflecting Santosh Kumar Bheel's authentic profile
const defaultSalt = crypto.randomBytes(16).toString('hex');
const defaultPasswordHash = hashPassword('santosh2026', defaultSalt);

const defaultProfile: ProfileData = {
  name: 'Santosh Kumar Bheel',
  titles: [
    'Full-Stack Developer',
    'Web Developer',
    'Front-End & Back-End Engineer',
    'Graphic & Brand Identity Designer'
  ],
  headline: 'Full-Stack Developer | Web Developer | Graphic Designer',
  bioParagraphs: [
    'I am a passionate Full-Stack Developer and Graphic Designer based in Pakistan, dedicated to engineering robust, performant web applications and crafting compelling visual brand identities.',
    'With a strong command of modern front-end architectures like React and Next.js, combined with resilient Node.js back-ends, database engineering, and creative mastery in Photoshop, Illustrator, and CorelDRAW, I bridge the crucial gap between complex software logic and elegant, human-centered aesthetics.',
    'Every project I build is guided by precision, clean code architecture, intuitive user experience, and an eye for distinctive visual typography and design.'
  ],
  avatarUrl: '/assets/aistudio/Santosh_Profile_Image_814470b2.png',
  phone: '03313101886',
  whatsapp: '+923313101886',
  email: 'rahisantoshkumar843@gmail.com',
  location: 'Sindh, Pakistan',
  cvUrl: '/api/download-cv',
  yearsExperience: '4+',
  projectsCompleted: '35+',
  designDeliveries: '80+',
  satisfactionRate: '100%',
  socials: {
    github: 'https://github.com/santoshkumarbheel',
    linkedin: 'https://linkedin.com/in/santoshkumarbheel',
    behance: 'https://behance.net/santoshkumarbheel',
    facebook: 'https://facebook.com/santoshkumarbheel',
    instagram: 'https://instagram.com/santoshkumarbheel'
  }
};

const defaultSkills: SkillItem[] = [
  // Web Development
  { id: 's-1', name: 'HTML5', category: 'web-dev', level: 98, isFeatured: true, order: 1 },
  { id: 's-2', name: 'CSS3', category: 'web-dev', level: 95, isFeatured: true, order: 2 },
  { id: 's-3', name: 'JavaScript (ES6+)', category: 'web-dev', level: 92, isFeatured: true, order: 3 },
  { id: 's-4', name: 'React', category: 'web-dev', level: 90, isFeatured: true, order: 4 },
  { id: 's-5', name: 'Next.js', category: 'web-dev', level: 86, isFeatured: true, order: 5 },
  { id: 's-6', name: 'Tailwind CSS', category: 'web-dev', level: 96, isFeatured: true, order: 6 },
  { id: 's-7', name: 'Node.js', category: 'web-dev', level: 88, isFeatured: true, order: 7 },
  { id: 's-8', name: 'Express.js', category: 'web-dev', level: 88, isFeatured: true, order: 8 },
  { id: 's-9', name: 'Python', category: 'web-dev', level: 82, isFeatured: true, order: 9 },
  { id: 's-10', name: 'SQL & Databases', category: 'web-dev', level: 85, isFeatured: true, order: 10 },
  { id: 's-11', name: 'REST APIs', category: 'web-dev', level: 92, isFeatured: true, order: 11 },
  { id: 's-12', name: 'Git & GitHub', category: 'web-dev', level: 90, isFeatured: true, order: 12 },
  { id: 's-13', name: 'Responsive Web Design', category: 'web-dev', level: 98, isFeatured: true, order: 13 },

  // Graphic Design
  { id: 's-14', name: 'Logo Design', category: 'graphic-design', level: 95, isFeatured: true, order: 14 },
  { id: 's-15', name: 'Brand Identity', category: 'graphic-design', level: 92, isFeatured: true, order: 15 },
  { id: 's-16', name: 'Poster & Flyer Design', category: 'graphic-design', level: 94, isFeatured: true, order: 16 },
  { id: 's-17', name: 'YouTube Thumbnail Design', category: 'graphic-design', level: 96, isFeatured: true, order: 17 },
  { id: 's-18', name: 'Social Media Graphics', category: 'graphic-design', level: 94, isFeatured: true, order: 18 },
  { id: 's-19', name: 'Typography & Layout', category: 'graphic-design', level: 90, isFeatured: true, order: 19 },
  { id: 's-20', name: 'CorelDRAW', category: 'graphic-design', level: 92, isFeatured: true, order: 20 },
  { id: 's-21', name: 'Adobe Photoshop', category: 'graphic-design', level: 95, isFeatured: true, order: 21 },
  { id: 's-22', name: 'Adobe Illustrator', category: 'graphic-design', level: 90, isFeatured: true, order: 22 },
  { id: 's-23', name: 'PixelLab', category: 'graphic-design', level: 94, isFeatured: true, order: 23 },
];

const defaultServices: ServiceItem[] = [
  // Web Development Services
  {
    id: 'srv-1',
    title: 'Front-End Development',
    category: 'web-dev',
    description: 'Pixel-perfect, high-performance user interfaces crafted with React, Next.js, Tailwind CSS, and interactive state management.',
    features: ['Modern React & Next.js SPAs', 'Smooth CSS & Motion Animations', 'Fluid Mobile-Responsive Layouts', 'WCAG AA Accessibility Standards'],
    icon: 'Layout',
    isPopular: true,
    order: 1
  },
  {
    id: 'srv-2',
    title: 'Back-End Development',
    category: 'web-dev',
    description: 'Secure, scalable server architectures, robust business logic, and high-throughput data processing engines.',
    features: ['Node.js & Express Architecture', 'Python Microservices', 'Authentication & JWT Sessions', 'Secure Data Validation & Error Handling'],
    icon: 'Server',
    isPopular: false,
    order: 2
  },
  {
    id: 'srv-3',
    title: 'Full-Stack Web Development',
    category: 'web-dev',
    description: 'End-to-end web applications seamlessly unifying interactive client experiences with dependable databases and backend APIs.',
    features: ['Full Lifecycle Development', 'Stateful CRUD Applications', 'Integrated Admin Portals', 'Cloud Deployment & DevOps'],
    icon: 'Layers',
    isPopular: true,
    order: 3
  },
  {
    id: 'srv-4',
    title: 'Responsive Website Development',
    category: 'web-dev',
    description: 'Websites engineered to look stunning and perform smoothly across all screens: desktop, tablet, and mobile browsers.',
    features: ['Mobile-First Architecture', 'Cross-Browser Compatibility', 'Speed Optimization & Fast LCP', 'SEO-Friendly Markup Structure'],
    icon: 'Smartphone',
    isPopular: false,
    order: 4
  },
  {
    id: 'srv-5',
    title: 'Portfolio & Business Websites',
    category: 'web-dev',
    description: 'High-conversion business showcases, digital landing pages, and creative portfolios designed to elevate your personal brand.',
    features: ['Bespoke Brand Aesthetic', 'Interactive Project Galleries', 'Lead Capture & Contact Forms', 'Lightning-Fast Page Speeds'],
    icon: 'Globe',
    isPopular: false,
    order: 5
  },
  {
    id: 'srv-6',
    title: 'Website Maintenance & Bug Fixing',
    category: 'web-dev',
    description: 'Prompt debugging, performance tuning, code refactoring, package updates, and long-term security maintenance.',
    features: ['Critical Bug Resolutions', 'Performance & Speed Audits', 'Dependency Upgrades', 'Broken Layout & Script Fixes'],
    icon: 'Wrench',
    isPopular: false,
    order: 6
  },
  {
    id: 'srv-7',
    title: 'API & Database Integration',
    category: 'web-dev',
    description: 'Designing RESTful endpoints and integrating relational SQL or NoSQL databases with resilient query caching.',
    features: ['REST API Architecture', 'PostgreSQL / MySQL Schema Design', 'Third-Party Webhook Handlers', 'Secure CRUD Endpoints'],
    icon: 'Database',
    isPopular: false,
    order: 7
  },

  // Graphic Design Services
  {
    id: 'srv-8',
    title: 'Logo Design',
    category: 'graphic-design',
    description: 'Memorable, conceptually meaningful vector logos that capture the essence of your identity with timeless simplicity.',
    features: ['Vector Master Files (AI, EPS, SVG)', 'Light & Dark Variations', 'Monogram & Wordmark Styles', 'Full Commercial Rights'],
    icon: 'PenTool',
    isPopular: true,
    order: 8
  },
  {
    id: 'srv-9',
    title: 'Brand Identity Design',
    category: 'graphic-design',
    description: 'Comprehensive visual branding systems including typography hierarchies, color schemes, stationery, and brand guidelines.',
    features: ['Brand Style Guide & Rules', 'Color Palette & Typography System', 'Business Cards & Letterheads', 'Cohesive Brand Personality'],
    icon: 'Sparkles',
    isPopular: true,
    order: 9
  },
  {
    id: 'srv-10',
    title: 'Poster & Flyer Design',
    category: 'graphic-design',
    description: 'Striking marketing posters and promotional flyers engineered for high readability and maximum event or sales impact.',
    features: ['Print-Ready 300 DPI CMYK', 'Digital High-Res RGB', 'Event & Corporate Promotions', 'Custom Grid & Typography'],
    icon: 'FileText',
    isPopular: false,
    order: 10
  },
  {
    id: 'srv-11',
    title: 'YouTube Thumbnail Design',
    category: 'graphic-design',
    description: 'High-CTR YouTube thumbnails designed with bold focal points, clean typography, and optimized visual contrast.',
    features: ['CTR-Driven Compositions', 'Vibrant Contrast & Polish', 'Mobile Screen Optimization', '1920x1080 Standard HD'],
    icon: 'Video',
    isPopular: true,
    order: 11
  },
  {
    id: 'srv-12',
    title: 'Social Media Post Design',
    category: 'graphic-design',
    description: 'Eye-catching graphic posts, carousel sets, and story templates for Instagram, LinkedIn, Facebook, and Twitter.',
    features: ['Multi-Platform Formatting', 'Consistent Brand Themes', 'High-Engagement Layouts', 'Source Files Included'],
    icon: 'Share2',
    isPopular: false,
    order: 12
  },
  {
    id: 'srv-13',
    title: 'Promotional Banners',
    category: 'graphic-design',
    description: 'Digital display ads, web hero banners, and roll-up marketing displays that convert casual visitors into clients.',
    features: ['Web Display Ad Sizes', 'Roll-up Standee Formats', 'High-Impact Typography', 'Visual Hierarchy Focus'],
    icon: 'Image',
    isPopular: false,
    order: 13
  },
  {
    id: 'srv-14',
    title: 'Marketing Materials',
    category: 'graphic-design',
    description: 'Brochures, catalog covers, vouchers, and merchandise graphics prepared with exacting print-ready standards.',
    features: ['Brochures & Catalogs', 'Presentation Decks', 'Custom Merch & Packaging', 'Print Bleed Verification'],
    icon: 'Package',
    isPopular: false,
    order: 14
  }
];

const defaultWebProjects: WebProject[] = [
  {
    id: 'wp-1',
    title: 'Modern Full-Stack E-Commerce Platform',
    tagline: 'High-performance digital storefront with real-time cart, checkout, and inventory dashboard.',
    description: 'A comprehensive full-stack e-commerce web application featuring dynamic product filtering, persistent shopping cart, customer reviews, order tracking, and an intuitive administrative backend for managing stock and sales analytics.',
    fullDetails: 'Engineered using React, Node.js, Express, and database models. Implements secure JWT authentication, responsive cart drawer, and webhook-ready transaction processing.',
    category: 'Full-Stack',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'SQL', 'REST API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/santoshkumarbheel',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-10',
    order: 1
  },
  {
    id: 'wp-2',
    title: 'Enterprise Task & Resource Management Suite',
    tagline: 'Collaborative workflow system with dynamic kanban boards and project timelines.',
    description: 'A robust productivity platform designed for engineering teams to track sprint milestones, assign tickets, monitor real-time project states, and generate completion reports.',
    fullDetails: 'Features drag-and-drop workflow status columns, granular role-based access controls, and RESTful query endpoints with responsive desktop and mobile dashboards.',
    category: 'Full-Stack',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/santoshkumarbheel',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-18',
    order: 2
  },
  {
    id: 'wp-3',
    title: 'Creative Agency Portfolio & CMS',
    tagline: 'Ultra-fast interactive portfolio with custom content management and smooth transitions.',
    description: 'A dynamic portfolio website featuring smooth motion animations, responsive gallery layouts, and an integrated admin control panel allowing clients to update works and receive inquiries.',
    fullDetails: 'Built with React 19, Motion, and Express. Optimized for sub-second Lighthouse scores and seamless responsive viewing across smartphone screens and ultra-wide monitors.',
    category: 'Front-End',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Tailwind CSS', 'Motion', 'JavaScript', 'HTML5'],
    liveUrl: '#',
    githubUrl: 'https://github.com/santoshkumarbheel',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-25',
    order: 3
  },
  {
    id: 'wp-4',
    title: 'Secure Healthcare Patient Portal & Appointment API',
    tagline: 'HIPAA-conscious booking engine and patient records query dashboard.',
    description: 'A secure backend service and patient-facing interface for scheduling clinical consultations, managing medical history, and sending automated SMS/Email reminders.',
    fullDetails: 'Features encrypted patient data tables, role-based practitioner portals, audit logging, and RESTful schedule booking endpoints.',
    category: 'Back-End',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Node.js', 'Express.js', 'SQL', 'REST APIs', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/santoshkumarbheel',
    isFeatured: false,
    isPublished: true,
    createdAt: '2025-11-14',
    order: 4
  },
  {
    id: 'wp-5',
    title: 'Real-Time Financial Analytics Dashboard',
    tagline: 'Financial metrics visualization with interactive charts and exportable reports.',
    description: 'A data-dense dashboard delivering instant insights on revenue trajectories, expense categorization, and multi-currency exchange rates with tabular numeral precision.',
    fullDetails: 'Utilizes responsive SVG data visualizations, dark-mode optical compensation, and cached REST API aggregation.',
    category: 'Front-End',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['JavaScript', 'React', 'CSS3', 'Tailwind CSS', 'REST APIs'],
    liveUrl: '#',
    githubUrl: 'https://github.com/santoshkumarbheel',
    isFeatured: false,
    isPublished: true,
    createdAt: '2025-10-05',
    order: 5
  }
];

const defaultGraphicDesigns: GraphicDesignItem[] = [
  {
    id: 'gd-1',
    title: 'Emerald Crest — Modern Geometric Monogram',
    description: 'A luxury geometric monogram combining an eight-pointed star motif with modern typography, tailored for a high-end corporate identity.',
    category: 'Logo Design',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Illustrator', 'CorelDRAW'],
    dimensions: '3000 x 3000 (Vector SVG)',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-03-01',
    order: 1
  },
  {
    id: 'gd-2',
    title: 'Indus Valley Heritage — Brand Identity Suite',
    description: 'Complete brand guidelines, stationery system, and packaging graphics inspired by Sindhi cultural geometry with a clean contemporary aesthetic.',
    category: 'Brand Identity',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop', 'CorelDRAW'],
    dimensions: 'A4 Master Brand Guide',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-15',
    order: 2
  },
  {
    id: 'gd-3',
    title: 'Tech Summit 2026 — Keynote Event Poster',
    description: 'High-contrast typography poster crafted for an international developer conference, emphasizing hierarchy, legible schedules, and futuristic line-work.',
    category: 'Posters',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Photoshop', 'CorelDRAW'],
    dimensions: 'A2 Print (300 DPI CMYK)',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-01-30',
    order: 3
  },
  {
    id: 'gd-4',
    title: 'Next-Gen Full-Stack Dev Roadmap — YouTube Thumbnail',
    description: 'High-CTR YouTube thumbnail featuring high dynamic range lighting, crisp typography, and visual hierarchy optimized for small mobile preview cards.',
    category: 'YouTube Thumbnails',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Photoshop', 'PixelLab'],
    dimensions: '1920 x 1080 (HD)',
    isFeatured: true,
    isPublished: true,
    createdAt: '2026-02-28',
    order: 4
  },
  {
    id: 'gd-5',
    title: 'Corporate Solutions & Services — Marketing Flyer',
    description: 'Double-sided tri-fold promotional flyer highlighting B2B software solutions with clean tabular service lists and bold call-to-action blocks.',
    category: 'Flyers',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['CorelDRAW', 'Adobe Illustrator'],
    dimensions: 'US Letter Print-Ready',
    isFeatured: false,
    isPublished: true,
    createdAt: '2026-01-10',
    order: 5
  },
  {
    id: 'gd-6',
    title: 'Digital Agency Social Carousel Pack',
    description: 'A 10-slide cohesive social media post sequence designed to educate audience on front-end performance, featuring bespoke icons and clean layout math.',
    category: 'Social Media Designs',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Photoshop', 'PixelLab'],
    dimensions: '1080 x 1080 (Square 1:1)',
    isFeatured: true,
    isPublished: true,
    createdAt: '2025-12-20',
    order: 6
  },
  {
    id: 'gd-7',
    title: 'Seasonal Tech Grand Sale — Promotional Web Banner',
    description: 'Wide format hero banner advertising special software discounts, featuring rich emerald gradients, gold geometric accents, and bold typographic styling.',
    category: 'Promotional Banners',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
    dimensions: '1920 x 600 (Web Banner)',
    isFeatured: false,
    isPublished: true,
    createdAt: '2025-11-28',
    order: 7
  },
  {
    id: 'gd-8',
    title: 'Pakistani Cultural Typography & Art Print',
    description: 'Custom Arabic/Urdu and Latin typographic composition paying homage to traditional calligraphy merged with modern minimalist framing.',
    category: 'Other Creative Designs',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    toolsUsed: ['Adobe Illustrator', 'CorelDRAW'],
    dimensions: '18 x 24 in Gallery Canvas',
    isFeatured: false,
    isPublished: true,
    createdAt: '2025-11-05',
    order: 8
  }
];

const defaultTimeline: TimelineEntry[] = [
  {
    id: 'tl-1',
    type: 'experience',
    title: 'Senior Full-Stack Web Developer & Designer',
    organization: 'Independent Practice / Freelance Solutions',
    location: 'Pakistan (Global Remote)',
    period: '2022 — Present',
    description: 'Leading client web development projects and crafting corporate visual identities. Specializing in modern React/Next.js architectures, secure Node.js APIs, responsive layouts, and branding packages.',
    highlights: [
      'Delivered 35+ full-stack and front-end web applications with 100% on-time milestone delivery.',
      'Created bespoke brand identities, logos, and marketing materials for tech startups and businesses.',
      'Architected resilient REST APIs and SQL database models with strict authentication and role policies.'
    ],
    order: 1
  },
  {
    id: 'tl-2',
    type: 'experience',
    title: 'Front-End Web Developer & UI Designer',
    organization: 'Digital Creative Studio',
    location: 'Pakistan',
    period: '2020 — 2022',
    description: 'Engineered responsive interfaces and client web portals utilizing HTML5, CSS3, JavaScript, React, and Tailwind CSS. Collaborated with back-end engineers to implement REST endpoints.',
    highlights: [
      'Translated complex Figma and CorelDRAW mockups into high-performance, accessible code.',
      'Accelerated web vitals and mobile responsiveness across client web platforms.',
      'Engineered reusable component libraries and interactive design systems.'
    ],
    order: 2
  },
  {
    id: 'tl-3',
    type: 'education',
    title: 'Bachelor of Science in Computer Science (BSCS)',
    organization: 'Recognized University in Sindh',
    location: 'Sindh, Pakistan',
    period: '2019 — 2023',
    description: 'Comprehensive curriculum focused on Software Engineering, Data Structures & Algorithms, Database Management Systems, Web Technologies, and Human-Computer Interaction.',
    highlights: [
      'Graduated with honors in Web Technologies and Database Engineering.',
      'Led the Departmental Web Development & Design Student Society.'
    ],
    order: 3
  },
  {
    id: 'tl-4',
    type: 'education',
    title: 'Higher Secondary Certificate (HSC) — Pre-Engineering',
    organization: 'Board of Intermediate Education',
    location: 'Sindh, Pakistan',
    period: '2017 — 2019',
    description: 'Focused studies in Advanced Mathematics, Physics, and Analytical Problem Solving.',
    highlights: ['First Division grade with distinction in Mathematics.'],
    order: 4
  },
  {
    id: 'tl-5',
    type: 'certification',
    title: 'Full-Stack Web Development & Modern JavaScript Mastery',
    organization: 'Professional Tech Academy',
    location: 'Online / Accredited',
    period: '2022',
    description: 'Rigorous certification covering advanced React, Next.js, Node.js, Express, REST APIs, and database design.',
    highlights: ['Hands-on Capstone: Full-Stack E-Commerce & Management System.'],
    order: 5
  },
  {
    id: 'tl-6',
    type: 'certification',
    title: 'Professional Graphic Design & Digital Illustration',
    organization: 'Creative Design Institute',
    location: 'Accredited Program',
    period: '2021',
    description: 'In-depth mastery of Adobe Photoshop, Adobe Illustrator, CorelDRAW, typography science, vector geometry, and print prepress standards.',
    highlights: ['Excellence Award in Brand Identity and Vector Packaging.'],
    order: 6
  }
];

const defaultSettings: SiteSettings = {
  siteTitle: 'Santosh Kumar Bheel — Full-Stack Developer & Graphic Designer',
  siteDescription: 'Official portfolio of Santosh Kumar Bheel, Pakistani Full-Stack Developer and Graphic Designer featuring web development projects, creative design showcase, and services.',
  heroHeadline: 'Santosh Kumar Bheel',
  heroSubheadline: 'Combining technology and creativity to build modern websites, powerful digital experiences, and visually compelling designs.',
  availableForHire: true,
  footerQuote: 'Crafted with precision, code, and creative passion. Based in Pakistan.',
  ajrakAccentLevel: 'moderate'
};

class DatabaseManager {
  private data: PortfolioDatabase;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): PortfolioDatabase {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all required fields exist
        return {
          profile: parsed.profile || defaultProfile,
          skills: parsed.skills || defaultSkills,
          services: parsed.services || defaultServices,
          webProjects: parsed.webProjects || defaultWebProjects,
          graphicDesigns: parsed.graphicDesigns || defaultGraphicDesigns,
          timeline: parsed.timeline || defaultTimeline,
          messages: parsed.messages || [],
          settings: parsed.settings || defaultSettings,
          adminPasswordHash: parsed.adminPasswordHash || defaultPasswordHash,
          adminSalt: parsed.adminSalt || defaultSalt
        };
      }
    } catch (err) {
      console.error('Failed to parse database file, bootstrapping default data:', err);
    }

    const initialData: PortfolioDatabase = {
      profile: defaultProfile,
      skills: defaultSkills,
      services: defaultServices,
      webProjects: defaultWebProjects,
      graphicDesigns: defaultGraphicDesigns,
      timeline: defaultTimeline,
      messages: [
        {
          id: 'msg-sample-1',
          name: 'Ahmed Raza',
          email: 'ahmed.raza@example.com',
          phone: '+92 300 1234567',
          subject: 'Inquiry: Full-Stack E-Commerce Web Portal',
          message: 'Hello Santosh, I saw your portfolio and would like to discuss building a custom web portal for our business. Are you available for a project this month?',
          date: '2026-03-12T14:30:00Z',
          isRead: false,
          isStarred: true
        }
      ],
      settings: defaultSettings,
      adminPasswordHash: defaultPasswordHash,
      adminSalt: defaultSalt
    };

    this.saveDataDirect(initialData);
    return initialData;
  }

  private saveDataDirect(dataToSave: PortfolioDatabase) {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(dataToSave, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  }

  public save() {
    this.saveDataDirect(this.data);
  }

  public getPublicData() {
    return {
      profile: this.data.profile,
      skills: this.data.skills.sort((a, b) => a.order - b.order),
      services: this.data.services.sort((a, b) => a.order - b.order),
      webProjects: this.data.webProjects.filter(p => p.isPublished).sort((a, b) => a.order - b.order),
      graphicDesigns: this.data.graphicDesigns.filter(d => d.isPublished).sort((a, b) => a.order - b.order),
      timeline: this.data.timeline.sort((a, b) => a.order - b.order),
      settings: this.data.settings
    };
  }

  public getAdminData() {
    return {
      profile: this.data.profile,
      skills: this.data.skills.sort((a, b) => a.order - b.order),
      services: this.data.services.sort((a, b) => a.order - b.order),
      webProjects: this.data.webProjects.sort((a, b) => a.order - b.order),
      graphicDesigns: this.data.graphicDesigns.sort((a, b) => a.order - b.order),
      timeline: this.data.timeline.sort((a, b) => a.order - b.order),
      messages: this.data.messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      settings: this.data.settings
    };
  }

  public verifyAdminPassword(password: string): boolean {
    const computed = hashPassword(password, this.data.adminSalt);
    return computed === this.data.adminPasswordHash;
  }

  public updateAdminPassword(newPassword: string): boolean {
    const newSalt = crypto.randomBytes(16).toString('hex');
    this.data.adminSalt = newSalt;
    this.data.adminPasswordHash = hashPassword(newPassword, newSalt);
    this.save();
    return true;
  }

  public updateProfile(profile: ProfileData) {
    this.data.profile = { ...this.data.profile, ...profile };
    this.save();
    return this.data.profile;
  }

  public updateSettings(settings: SiteSettings) {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
    return this.data.settings;
  }

  // Skills
  public setSkills(skills: SkillItem[]) {
    this.data.skills = skills;
    this.save();
    return this.data.skills;
  }

  public upsertSkill(skill: SkillItem) {
    const idx = this.data.skills.findIndex(s => s.id === skill.id);
    if (idx >= 0) {
      this.data.skills[idx] = skill;
    } else {
      if (!skill.id) skill.id = `s-${Date.now()}`;
      this.data.skills.push(skill);
    }
    this.save();
    return this.data.skills;
  }

  public deleteSkill(id: string) {
    this.data.skills = this.data.skills.filter(s => s.id !== id);
    this.save();
    return this.data.skills;
  }

  // Services
  public setServices(services: ServiceItem[]) {
    this.data.services = services;
    this.save();
    return this.data.services;
  }

  public upsertService(service: ServiceItem) {
    const idx = this.data.services.findIndex(s => s.id === service.id);
    if (idx >= 0) {
      this.data.services[idx] = service;
    } else {
      if (!service.id) service.id = `srv-${Date.now()}`;
      this.data.services.push(service);
    }
    this.save();
    return this.data.services;
  }

  public deleteService(id: string) {
    this.data.services = this.data.services.filter(s => s.id !== id);
    this.save();
    return this.data.services;
  }

  // Web Projects
  public setWebProjects(projects: WebProject[]) {
    this.data.webProjects = projects;
    this.save();
    return this.data.webProjects;
  }

  public upsertWebProject(project: WebProject) {
    const idx = this.data.webProjects.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      this.data.webProjects[idx] = project;
    } else {
      if (!project.id) project.id = `wp-${Date.now()}`;
      if (!project.createdAt) project.createdAt = new Date().toISOString().split('T')[0];
      this.data.webProjects.push(project);
    }
    this.save();
    return this.data.webProjects;
  }

  public deleteWebProject(id: string) {
    this.data.webProjects = this.data.webProjects.filter(p => p.id !== id);
    this.save();
    return this.data.webProjects;
  }

  // Graphic Designs
  public setGraphicDesigns(designs: GraphicDesignItem[]) {
    this.data.graphicDesigns = designs;
    this.save();
    return this.data.graphicDesigns;
  }

  public upsertGraphicDesign(design: GraphicDesignItem) {
    const idx = this.data.graphicDesigns.findIndex(d => d.id === design.id);
    if (idx >= 0) {
      this.data.graphicDesigns[idx] = design;
    } else {
      if (!design.id) design.id = `gd-${Date.now()}`;
      if (!design.createdAt) design.createdAt = new Date().toISOString().split('T')[0];
      this.data.graphicDesigns.push(design);
    }
    this.save();
    return this.data.graphicDesigns;
  }

  public deleteGraphicDesign(id: string) {
    this.data.graphicDesigns = this.data.graphicDesigns.filter(d => d.id !== id);
    this.save();
    return this.data.graphicDesigns;
  }

  // Timeline
  public setTimeline(entries: TimelineEntry[]) {
    this.data.timeline = entries;
    this.save();
    return this.data.timeline;
  }

  public upsertTimeline(entry: TimelineEntry) {
    const idx = this.data.timeline.findIndex(t => t.id === entry.id);
    if (idx >= 0) {
      this.data.timeline[idx] = entry;
    } else {
      if (!entry.id) entry.id = `tl-${Date.now()}`;
      this.data.timeline.push(entry);
    }
    this.save();
    return this.data.timeline;
  }

  public deleteTimeline(id: string) {
    this.data.timeline = this.data.timeline.filter(t => t.id !== id);
    this.save();
    return this.data.timeline;
  }

  // Messages
  public addMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'isRead' | 'isStarred'>): ContactMessage {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Portfolio Inquiry',
      message: msg.message,
      phone: msg.phone || '',
      date: new Date().toISOString(),
      isRead: false,
      isStarred: false
    };
    this.data.messages.unshift(newMsg);
    this.save();
    return newMsg;
  }

  public updateMessageStatus(id: string, updates: { isRead?: boolean; isStarred?: boolean }) {
    const msg = this.data.messages.find(m => m.id === id);
    if (msg) {
      if (updates.isRead !== undefined) msg.isRead = updates.isRead;
      if (updates.isStarred !== undefined) msg.isStarred = updates.isStarred;
      this.save();
    }
    return this.data.messages;
  }

  public deleteMessage(id: string) {
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    this.save();
    return this.data.messages;
  }

  // Save uploaded file buffer or base64 to disk
  public saveUploadedFile(base64Data: string, originalName: string, prefix = 'upload'): string {
    // Determine extension
    let extension = '.jpg';
    if (originalName && originalName.includes('.')) {
      extension = path.extname(originalName).toLowerCase();
    } else if (base64Data.startsWith('data:image/png')) {
      extension = '.png';
    } else if (base64Data.startsWith('data:image/webp')) {
      extension = '.webp';
    } else if (base64Data.startsWith('data:image/svg+xml')) {
      extension = '.svg';
    } else if (base64Data.startsWith('data:application/pdf')) {
      extension = '.pdf';
    }

    const cleanBase64 = base64Data.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${extension}`;
    const destination = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(destination, buffer);
    return `/uploads/${filename}`;
  }
}

export const db = new DatabaseManager();
