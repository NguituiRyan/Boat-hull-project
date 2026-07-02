// All site content lives here — edit this file to update the website.
// Entries marked PLACEHOLDER should be replaced with Nguitui's real details.

export const profile = {
  name: 'Nguitui Kamau',
  role: 'Product Design Consultant',
  tagline:
    'Led by curiosity, designing for people everywhere — and endlessly fascinated by how everyday things are made, work, and feel.',
  about: [
    'I solve problems with branding and design. My work blends the cultures, markets, and rhythms of home with modern visual storytelling, so products feel familiar to the people they serve.',
    'Whatever the use case, I aim for efficiency and meaningful impact: fewer screens, clearer decisions, and outcomes you can measure.',
  ],
  hoursLine: '20,000+ hours on my craft.',
  email: 'nguitui.kamau@gmail.com',
  // PLACEHOLDER links — point these at real profiles / resume.
  links: {
    resume: '#',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://x.com/',
    dribbble: 'https://dribbble.com/',
  },
};

export const skills = [
  'UX/UI Design',
  'Interaction Design',
  'Branding',
  'Art Direction',
  'Graphic & Motion Design',
  'No-Code Frontend',
  'Writing',
  'Photo & Videography',
];

// PLACEHOLDER experience — swap in real companies and dates.
export const experience = [
  { company: 'Savanna Bank', role: 'Senior Product Designer', period: '2023 — Present' },
  { company: 'Mzizi Labs', role: 'Product Designer', period: '2022 — 2023' },
  { company: 'EastBridge Markets', role: 'Product Designer (Contract)', period: '2021 — 2022' },
  { company: 'PesaSat', role: 'Brand & Product Designer', period: '2020 — 2021' },
  { company: 'Nyota Health', role: 'Design Consultant', period: '2019 — 2020' },
  { company: 'GDG DevFest Nairobi', role: 'Design Volunteer', period: '2023' },
];

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  blurb: string;
  featured?: boolean;
  meta: { client: string; role: string; year: string; deliverables: string };
  body: { overview: string; problem: string; solution: string; process: string };
};

// PLACEHOLDER projects — fictional case studies in the shape of a real
// portfolio. Replace with Nguitui's actual work.
export const projects: Project[] = [
  {
    slug: 'duka-insights',
    title: 'Duka Insights',
    tags: ['UX Design', 'Brand Design'],
    blurb: 'A business-intelligence dashboard that turns field-agent data into supply-chain decisions.',
    featured: true,
    meta: { client: 'Duka', role: 'Lead Designer', year: '2025', deliverables: 'Branding, Wireframes, UX Prototypes, Design System' },
    body: {
      overview:
        'Duka Insights visualises data collected by field agents across informal retail networks, giving suppliers a live picture of what is selling where.',
      problem:
        'Suppliers, retailers, and manufacturers were making stocking decisions on instinct because the data that existed never reached them in a usable form.',
      solution:
        'Regional heatmaps, performance charts grouped by territory, and a product hierarchy that lets a user drill from category to SKU in two clicks.',
      process:
        'Low-fidelity wireframing sessions with stakeholders, annotated to tie every screen to a business objective, then a design system so the dashboard stays consistent with the rest of the Duka suite.',
    },
  },
  {
    slug: 'sokoni',
    title: 'Sokoni',
    tags: ['UX Design', 'Brand Design'],
    blurb: 'Social commerce for sellers who already live in their group chats.',
    featured: true,
    meta: { client: 'Sokoni', role: 'Product Designer', year: '2024', deliverables: 'Brand Identity, Mobile UX, Prototypes' },
    body: {
      overview: 'Sokoni brings storefronts, payments, and delivery into the social channels where informal sellers already trade.',
      problem: 'Sellers juggled orders across chat apps, notebooks, and mobile money with no single record of their business.',
      solution: 'A lightweight storefront that imports chat orders, reconciles payments automatically, and produces a shareable catalogue link.',
      process: 'Field interviews with market sellers, journey mapping, and weekly prototype tests with a pilot group of thirty vendors.',
    },
  },
  {
    slug: 'duka-mobile',
    title: 'Duka Mobile',
    tags: ['Mobile UX Design'],
    blurb: 'The business-intelligence dashboard, rebuilt for a phone in a warehouse.',
    featured: true,
    meta: { client: 'Duka', role: 'Product Designer', year: '2024', deliverables: 'Mobile UX, Interaction Design' },
    body: {
      overview: 'A companion app that puts the most-used Duka Insights views into a one-handed mobile experience.',
      problem: 'Managers checked stock positions from warehouses and delivery routes, where the desktop dashboard was unusable.',
      solution: 'Three glanceable screens — today, territory, and alerts — with progressive detail instead of the full dashboard.',
      process: 'Analytics on the ten most-used desktop views, then card sorting with field managers to decide what earned a place on mobile.',
    },
  },
  {
    slug: 'elimu-ai',
    title: 'Elimu AI',
    tags: ['Web & Mobile UX', 'Brand Design'],
    blurb: 'AI-powered learning that adapts to each student.',
    featured: true,
    meta: { client: 'Elimu', role: 'Lead Designer', year: '2024', deliverables: 'Brand Identity, Web & Mobile UX, Design System' },
    body: {
      overview: 'Elimu AI tutors students through national-curriculum subjects, adjusting difficulty and pace from every answer.',
      problem: 'One teacher to sixty students means feedback arrives weeks late, if at all.',
      solution: 'A conversational tutor with per-topic mastery tracking, plus a teacher view that flags exactly where a class is stuck.',
      process: 'Co-design sessions with teachers, accessibility review for low-end devices, and a component library shared across web and mobile.',
    },
  },
  {
    slug: 'chainscale',
    title: 'ChainScale',
    tags: ['Web UX Design', 'Web3'],
    blurb: 'Making blockchain payment scaling legible to developers.',
    featured: true,
    meta: { client: 'ChainScale', role: 'Product Designer', year: '2023', deliverables: 'Web UX, Developer Docs Design' },
    body: {
      overview: 'A scaling network for blockchain payments needed a site and console that developers could trust at first glance.',
      problem: 'The protocol was sound but the story was impenetrable — visitors could not tell what it did or how to start.',
      solution: 'A homepage that explains the network in one scroll, and a console where the first successful transaction takes under five minutes.',
      process: 'Message testing with developers, information architecture for the docs, and a design language that stays calm in a hype-heavy category.',
    },
  },
  {
    slug: 'pamoja',
    title: 'Pamoja',
    tags: ['UX Design', 'Brand Design', 'Web3'],
    blurb: 'A decentralized peer-to-peer exchange built on trust signals.',
    featured: true,
    meta: { client: 'Pamoja', role: 'Lead Designer', year: '2023', deliverables: 'Brand Identity, Product UX, Prototypes' },
    body: {
      overview: 'Pamoja lets people trade digital assets directly with each other, with escrow and reputation doing the work a middleman used to.',
      problem: 'P2P trading lives or dies on trust, and existing tools buried the signals — trade history, response time, dispute record — that create it.',
      solution: 'Profiles built around a single trust score, escrow states that read like a package tracker, and disputes handled in-flow.',
      process: 'Interviews with high-volume traders, a fraud-scenario audit with the engineering team, and iterative prototype testing.',
    },
  },
  {
    slug: 'eastbridge',
    title: 'EastBridge Markets',
    tags: ['Web UX Design'],
    blurb: 'Financial-market infrastructure with a public face.',
    meta: { client: 'EastBridge Markets', role: 'Product Designer (Contract)', year: '2022', deliverables: 'Web UX, Data Visualisation' },
    body: {
      overview: 'A securities exchange needed its market data, listings, and regulatory publications reorganised for the web.',
      problem: 'Traders, issuers, and regulators all used one site, and none of them could find what they came for.',
      solution: 'Audience-first navigation, a redesigned market-data hub, and document search that understands filing types.',
      process: 'Stakeholder workshops across the three audiences, a content audit of 4,000 pages, and tree testing before any visual design.',
    },
  },
  {
    slug: 'tuma',
    title: 'Tuma by Savanna',
    tags: ['Web UX Design'],
    blurb: 'Cross-border banking for people who move.',
    meta: { client: 'Savanna Bank', role: 'Senior Product Designer', year: '2023', deliverables: 'Web UX, Onboarding Flows' },
    body: {
      overview: 'Tuma lets diaspora customers open and run an account from abroad, and move money home at bank rates.',
      problem: 'Opening an account required a branch visit in person — impossible for the customers the product was for.',
      solution: 'Remote KYC with document capture and liveness checks, plus a transfer flow that shows the full cost before commitment.',
      process: 'Regulatory constraints mapped with the compliance team first, then onboarding prototypes tested with diaspora communities in three countries.',
    },
  },
  {
    slug: 'pesasat',
    title: 'PesaSat',
    tags: ['Mobile & Web UX', 'Branding', 'DeFi'],
    blurb: 'Everyday utility for cryptocurrency — airtime, bills, and savings.',
    meta: { client: 'PesaSat', role: 'Brand & Product Designer', year: '2021', deliverables: 'Brand Identity, Mobile & Web UX' },
    body: {
      overview: 'PesaSat turns cryptocurrency into things people actually need: airtime, bill payments, and interest-bearing savings.',
      problem: 'Crypto apps spoke to traders; nobody was designing for someone who just wants to pay a bill with sats.',
      solution: 'A wallet organised around actions rather than assets, with plain-language pricing and no charts on the home screen.',
      process: 'Brand work first to set a friendly, non-speculative tone, then task-based usability tests for the top five actions.',
    },
  },
  {
    slug: 'kifaru',
    title: 'Kifaru Wallet',
    tags: ['Mobile & Web UX', 'DeFi'],
    blurb: 'A crypto wallet designed for first-time holders.',
    meta: { client: 'Kifaru', role: 'Product Designer', year: '2021', deliverables: 'Mobile & Web UX, Prototypes' },
    body: {
      overview: 'Kifaru is a custodial wallet for people holding digital assets for the first time.',
      problem: 'Seed phrases, gas fees, and irreversible sends make first-time users one mistake away from losing everything.',
      solution: 'Guarded flows for every irreversible action, recovery built on familiar identity checks, and fees explained before they are incurred.',
      process: 'A catalogue of the ways new users lose funds, ranked by frequency, and a design pass that put a guardrail in front of each one.',
    },
  },
  {
    slug: 'devfest-nairobi',
    title: 'DevFest Nairobi',
    tags: ['Web UX Design', 'Volunteer'],
    blurb: 'The event site for a Google Developer Groups conference.',
    meta: { client: 'GDG Nairobi', role: 'Design Volunteer', year: '2023', deliverables: 'Event Website UX' },
    body: {
      overview: 'The annual DevFest conference needed a site to carry schedules, speakers, and registration for thousands of attendees.',
      problem: 'Attendees mostly arrive on mid-range phones over mobile data, and the previous site made them wait.',
      solution: 'A fast, mostly-static site with an offline-friendly schedule and speaker pages designed to be shared.',
      process: 'Volunteer sprint with the organising committee, working within Google brand guidelines for community events.',
    },
  },
  {
    slug: 'afya-bora',
    title: 'Afya Bora Health',
    tags: ['Photography', 'Creative Direction', 'Web UX', 'Copywriting'],
    blurb: 'Healthcare infrastructure, photographed and told honestly.',
    meta: { client: 'Afya Bora', role: 'Creative Director', year: '2020', deliverables: 'Photography, Web UX, Copywriting' },
    body: {
      overview: 'A healthcare infrastructure provider needed its story told to hospitals, funders, and ministries of health.',
      problem: 'Stock photography and abstract copy made a real, working service look like vapourware.',
      solution: 'An original photo library shot on-site at partner facilities, and copy that leads with delivered projects instead of promises.',
      process: 'Two weeks of location photography, interviews with facility staff for the case-study copy, then a site built around that material.',
    },
  },
];
