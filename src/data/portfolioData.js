export const PORTFOLIO_DATA = {
  personal: {
    name: "Aadrika Rakheja",
    title: "Full Stack Engineer & Computer Science Student",
    bio: "B.Tech CSE student at Bennett University with a passion for architecting resilient web platforms, AI-driven applications, and high-performance cloud backends.",
    email: "aadrikarakheja20@gmail.com",
    github: "https://github.com/aadrika-rakheja",
    linkedin: "https://www.linkedin.com/in/aadrika-rakheja-660345316/",
    leetcode: "https://leetcode.com/u/aadrika20/",
    leetcodeSolved: "300+ Problems Solved",
    status: "Available for Projects & Internships"
  },

  projects: [
    {
      id: "fingenie",
      title: "FinGenie",
      category: "Flagship Project",
      tagline: "Personal Finance Management Platform",
      description: "Comprehensive personal finance management system featuring JWT & Google OAuth authentication, granular expense tracking, dynamic budgeting, and AI-powered budget suggestions using Gemini AI.",
      longDescription: "FinGenie is currently under active development. Designed to simplify financial planning with transaction categorization, budget alerts, financial goals tracking, and automated statement analysis.",
      techStack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini AI"
      ],
      features: [
        "JWT-based Authentication & Google OAuth",
        "Granular Expense & Transaction Management",
        "Dynamic Budgets & Savings Goals Tracking",
        "Statement Analysis",
        "AI-Powered Budget Suggestions (Gemini AI)",
        "Financial Insights & Visual Reporting"
      ],
      status: "In Active Development",
      github: "https://github.com/aadrika-rakheja/FinGenie",
      live: null, // Coming soon
      liveStatusText: "Live Demo — Coming Soon",
      featured: true,
      color: "#ec0504"
    },
    {
      id: "cognix",
      title: "Cognix",
      category: "Full Stack AI Platform",
      tagline: "AI Adaptive Learning Platform",
      description: "Adaptive e-learning ecosystem featuring a topic dashboard, integrated Gemini AI assistant for personalized tutoring, and video-based student progress tracking across subjects.",
      longDescription: "Developed as part of a collaborative 3-member engineering team. Cognix integrates end-to-end learning modules, real-time query assistance, and multi-topic milestone tracking.",
      techStack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Express.js",
        "MongoDB",
        "Gemini AI"
      ],
      features: [
        "Subject & Topic Learning Dashboard",
        "Integrated Gemini AI Tutor Assistant",
        "Video-Based Progress Tracking",
        "End-to-End Module Integration",
        "Multi-Topic Milestones & Analytics"
      ],
      status: "Production Deployed",
      teamNote: "Developed as part of a 3-member team",
      github: "https://github.com/aadrika-rakheja/CogniX",
      live: "https://cognix-beige.vercel.app/",
      liveStatusText: "Visit Live Platform",
      featured: true,
      color: "#e70b07"
    },
    // Architectural placeholder for future project — kept hidden for now
    {
      id: "ecommerce-recommendation",
      title: "E-Commerce Recommendation System",
      category: "Machine Learning",
      tagline: "Intelligent Product Recommendation Engine",
      description: "Machine learning recommendation system.",
      techStack: ["Python", "Machine Learning", "Scikit-learn"],
      features: [],
      status: "In Development",
      github: null,
      live: null,
      visible: false // Hidden until ready
    }
  ],

  miniBuilds: [
    {
      id: "feather-quill",
      title: "Feather & Quill",
      category: "Web Application",
      tagline: "Blogging & Content Publishing Platform",
      description: "A responsive blogging platform with full CRUD functionality for creating, reading, updating, and deleting blog posts. Features clean typography, markdown-style content rendering, and a mobile-first responsive layout.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/aadrika-rakheja/feather-quill",
      live: "https://featherandquill.netlify.app/",
      liveStatusText: "Visit Live App"
    },
    {
      id: "sportivo",
      title: "Sportivo",
      category: "Sports Platform",
      tagline: "Sports Event Booking & Management App",
      description: "A dynamic sports event browsing and booking interface built with React. Features categorized sport listings, dynamic filtering, responsive card-based layouts, and a modular component architecture.",
      techStack: ["React", "JavaScript", "CSS"],
      github: "https://github.com/aadrika-rakheja/sportivo",
      live: null,
      liveStatusText: "Not Deployed"
    }
  ],

  skills: {
    languages: ["C++", "Java", "Python", "JavaScript", "SQL"],
    frontend: ["React", "Vite", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Flask"],
    databases: ["MongoDB", "MySQL", "SQLite"],
    ai_ml: ["Gemini AI", "Machine Learning", "Scikit-learn"],
    tools: ["Git", "GitHub", "Docker", "Redis", "Figma"],
    learning: ["TypeScript", "Next.js", "Jira"]
  },

  experience: [
    {
      id: "stepcode",
      role: "Backend Developer Intern",
      company: "StepCode",
      period: "Internship",
      type: "Professional Internship Experience",
      description: "Engineered scalable backend modules, automated calendar workflows, and secured platform services.",
      highlights: [
        "Implemented secure Google OAuth Authentication flows",
        "Integrated Google Calendar & Google Meet automation for seamless scheduling",
        "Architected Club Management Module backend services",
        "Built and maintained performant Flask REST API endpoints",
        "Collaborated on React frontend integration",
        "Leveraged SQLite, Redis caching, MailHog for testing, and Docker containerization"
      ],
      techStack: [
        "Flask",
        "Python",
        "React",
        "SQLite",
        "Redis",
        "Docker",
        "MailHog",
        "Google APIs"
      ]
    }
  ],

  education: [
    {
      institution: "Bennett University",
      degree: "B.Tech in Computer Science Engineering",
      period: "Expected 2028",
      score: "CGPA: 9.79",
      highlights: "Core focus on Data Structures, Algorithms, Distributed Systems, and Modern Full-Stack Web Development."
    },
    {
      institution: "Hartmann College",
      degree: "High School & Intermediate",
      period: "Secondary & Senior Secondary",
      score: "Class 10: 97% • Class 12: 96%",
      highlights: "Excellence in Mathematics, Computer Science, and Science fundamentals."
    }
  ]
};
