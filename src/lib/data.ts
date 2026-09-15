// ─────────────────────────────────────────────────────────────
// PORTFOLIO DATA — real projects & tech from github.com/amirxnofal
// Only factual info derived from Amir's actual GitHub profile.
// ─────────────────────────────────────────────────────────────

export const GITHUB_URL = "https://github.com/amirxnofal";
export const LINKEDIN_URL = "https://linkedin.com/in/amirxnofal404";
export const GITHUB_USERNAME = "amirxnofal";

export const PROFILE = {
    name: "Amir",
    fullName: "Amir Nofal",
    role: "Backend Developer",
    title: "Backend Developer",
    bio: "⚙️ Backend Developer building secure & scalable APIs with Node.js",
    location: "Working from home",
    focusedOn:
        "I design data models, tune queries, and ship REST APIs that stay fast, secure, and observable as they scale.",
    github: {
        followers: 1,
        publicRepos: 7,
    },
};

export const TIMEZONE = "UTC+3";

// Tech shipped in the real repositories
export const CORE_TECH = [
    "Node.js",
    "TypeScript",
    "Express.js",
    "MongoDB",
    "Redis",
    "JWT",
    "Joi",
    "Cloudinary",
    "Nodemailer",
    "Helmet",
    "rate-limit",
    "node-cron",
];

// Grouped capability grid — each card maps to a real layer of the codebase
export interface TechGroup {
    code: string;
    label: string;
    description: string;
    items: string[];
}

export const TECH_GROUPS: TechGroup[] = [
    {
        code: "runtime.ts",
        label: "Runtime & Language",
        description: "The foundation everything else compiles down to.",
        items: ["Node.js", "TypeScript", "ES Modules"],
    },
    {
        code: "api/route",
        label: "API Layer",
        description: "Routers, validators, and the request lifecycle.",
        items: ["Express 5", "REST API", "Joi validation"],
    },
    {
        code: "data/model",
        label: "Data & Cache",
        description: "Schema design, atomic operations, and hot-path caching.",
        items: ["MongoDB / Mongoose", "Redis", "Aggregation"],
    },
    {
        code: "auth/middleware",
        label: "Auth & Security",
        description: "Identity, tokens, and defense in depth.",
        items: ["JWT + refresh tokens", "Google OAuth", "bcrypt", "Helmet"],
    },
    {
        code: "ops/storage",
        label: "Storage & Email",
        description: "Files, media, and transactional email delivery.",
        items: ["Cloudinary", "Multer", "Nodemailer (Gmail)"],
    },
    {
        code: "cron/jobs",
        label: "Automation",
        description: "Scheduled maintenance that keeps the system clean.",
        items: ["node-cron", "Soft-delete cleanup", "Stock reservation"],
    },
];

// The system architecture shown in the Backend Engineering section
export const PIPELINE = [
    {
        step: "01",
        node: "Route",
        detail: "URL → handler mapping",
        color: "#a3a3a3",
    },
    {
        step: "02",
        node: "Middleware",
        detail: "Auth, rate-limit, validation gate",
        color: "#ef2b2b",
    },
    {
        step: "03",
        node: "Controller",
        detail: "Parse, orchestrate, respond",
        color: "#a3a3a3",
    },
    {
        step: "04",
        node: "Service",
        detail: "Business logic & transactions",
        color: "#a3a3a3",
    },
    {
        step: "05",
        node: "Model",
        detail: "MongoDB / Mongoose persistence",
        color: "#ef2b2b",
    },
] as const;

// ── REAL REPOSITORIES (from github.com/amirxnofal) ──────────
export interface Project {
    name: string;
    description: string;
    tags: string[];
    language: string;
    url: string;
    featured?: boolean;
    details?: string[];
}

export const PROJECTS: Project[] = [
    {
        name: "E-Commerce",
        description:
            "Full-featured e-commerce platform built solo with Node.js, MongoDB & Express.",
        tags: ["Express", "MongoDB", "Redis", "JWT", "Joi", "Cloudinary"],
        language: "JavaScript",
        url: `${GITHUB_URL}/E-Commerce`,
        featured: true,
        details: [
            "47 endpoints across 8 API modules",
            "Route → Middleware → Controller → Service → Model architecture",
            "JWT auth with refresh-token rotation & Redis revocation",
            "Atomic order flow: stock reservation + cancellation with restoration",
            "3-layer rate limiting: 100/min global, 30/min writes, 5/15min auth",
            "Soft-delete with 30-day automated cleanup via node-cron",
            "Cloudinary image uploads with rollback support",
        ],
    },

    {
        name: "Sara7a-App",
        description:
            "Anonymous confession messaging app built with Node.js & Express.",
        tags: ["Node.js", "Express", "MongoDB"],
        language: "JavaScript",
        url: `${GITHUB_URL}/Sara7a-App`,
    },
    {
        name: "social-media-app-ts",
        description:
            "TypeScript rewrite of the social media API — typed models, services & route handlers.",
        tags: ["TypeScript", "Express", "MongoDB"],
        language: "TypeScript",
        url: `${GITHUB_URL}/social-media-app-ts`,
    },
    {
        name: "Sara7a-App",
        description:
            "Anonymous confession messaging app built with Node.js & Express.",
        tags: ["Node.js", "Express", "MongoDB"],
        language: "JavaScript",
        url: `${GITHUB_URL}/Sara7a-App`,
    },
    {
        name: "social-media-app-ts",
        description:
            "TypeScript rewrite of the social media API — typed models, services & route handlers.",
        tags: ["TypeScript", "Express", "MongoDB"],
        language: "TypeScript",
        url: `${GITHUB_URL}/social-media-app-ts`,
    },
];

// ── ADD YOUR NEXT PROJECT HERE ──────────────────────────────
// Copy the block below into the PROJECTS array above and fill it in.
// The `featured` project (set true) renders big with its `details`
// list; everything else renders as a card in the grid automatically.
/*
{
  name: "your-repo-name",            // shows as the card title
  description:
    "One sentence about what it does.",
  tags: ["Express", "Redis", "JWT"], // chips on the card (max 3 show)
  language: "JavaScript",            // dot color: TypeScript → blue
  url: `${GITHUB_URL}/your-repo-name`,
  // featured: true,
  // details: [
  //   "One bullet per standout fact…",
  // ],
},
*/

// Orbit nodes around the hero portrait
export const ORBIT_TECH = [
    { label: "NODE.JS", desc: "Runtime" },
    { label: "EXPRESS", desc: "HTTP layer" },
    { label: "MONGODB", desc: "Document store" },
    { label: "REDIS", desc: "Cache & queue" },
    { label: "JWT", desc: "Auth tokens" },
    { label: "REST", desc: "API contract" },
    { label: "TYPESCRIPT", desc: "Typed systems" },
];

export const NAV_LINKS = [
    { href: "#about", label: "About", index: "01" },
    { href: "#capabilities", label: "Capabilities", index: "02" },
    { href: "#engineering", label: "Engineering", index: "03" },
    { href: "#projects", label: "Projects", index: "04" },
    { href: "#contact", label: "Contact", index: "05" },
];

export const EMAIL = "amirxnofal.work@gmail.com";
