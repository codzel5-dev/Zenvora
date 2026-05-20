'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BookOpen, ArrowRight, Upload, Search, Brain, Code, Megaphone,
  Briefcase, Shield, Cloud, BarChart3, Lightbulb, DollarSign,
  Palette, GraduationCap, Heart, FileText, LayoutGrid, Cpu,
  Globe, LineChart, Users, Lock, Smartphone, Database, Layers
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdBanner } from '@/components/ads/ad-banner';

// ─── Category Definitions ────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All E-Books', icon: LayoutGrid },
  { id: 'AI', label: 'AI & Machine Learning', icon: Brain },
  { id: 'Programming', label: 'Programming & Development', icon: Code },
  { id: 'Marketing', label: 'Digital Marketing', icon: Megaphone },
  { id: 'Business', label: 'Business & Entrepreneurship', icon: Briefcase },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'Cloud', label: 'Cloud Computing', icon: Cloud },
  { id: 'Data', label: 'Data Science & Analytics', icon: BarChart3 },
  { id: 'Productivity', label: 'Productivity & Remote Work', icon: Lightbulb },
  { id: 'Finance', label: 'Finance & Investing', icon: DollarSign },
  { id: 'Design', label: 'Design & UX', icon: Palette },
  { id: 'Career', label: 'Career Development', icon: GraduationCap },
  { id: 'Health', label: 'Health & Wellness', icon: Heart },
];

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    AI: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    Programming: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    Marketing: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
    Business: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
    Cybersecurity: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    Cloud: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
    Data: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Productivity: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    Finance: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    Design: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    Career: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
    Health: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
  };
  return map[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400';
}

function getCategoryIcon(cat: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    AI: Brain,
    Programming: Code,
    Marketing: Megaphone,
    Business: Briefcase,
    Cybersecurity: Shield,
    Cloud: Cloud,
    Data: BarChart3,
    Productivity: Lightbulb,
    Finance: DollarSign,
    Design: Palette,
    Career: GraduationCap,
    Health: Heart,
  };
  return map[cat] || BookOpen;
}

function getLevelColor(level: string) {
  if (level === 'Beginner') return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';
  if (level === 'Intermediate') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
}

function getCoverGradient(cat: string, index: number) {
  const gradients: Record<string, string[]> = {
    AI: [
      'from-violet-600 via-purple-500 to-indigo-600',
      'from-purple-600 via-violet-500 to-fuchsia-600',
      'from-indigo-600 via-violet-500 to-purple-600',
      'from-fuchsia-600 via-purple-500 to-violet-600',
      'from-violet-500 via-indigo-500 to-blue-600',
    ],
    Programming: [
      'from-sky-600 via-blue-500 to-cyan-600',
      'from-blue-600 via-sky-500 to-indigo-500',
      'from-cyan-600 via-teal-500 to-sky-600',
      'from-indigo-500 via-blue-500 to-sky-600',
      'from-blue-500 via-cyan-500 to-teal-600',
    ],
    Marketing: [
      'from-rose-600 via-pink-500 to-red-600',
      'from-red-600 via-rose-500 to-orange-500',
      'from-pink-600 via-rose-500 to-red-500',
      'from-orange-500 via-red-500 to-rose-600',
      'from-rose-500 via-fuchsia-500 to-pink-600',
    ],
    Business: [
      'from-indigo-600 via-blue-600 to-slate-600',
      'from-slate-600 via-indigo-500 to-blue-600',
      'from-blue-700 via-indigo-600 to-violet-600',
      'from-indigo-500 via-violet-500 to-slate-600',
      'from-slate-700 via-blue-600 to-indigo-500',
    ],
    Cybersecurity: [
      'from-red-700 via-rose-600 to-slate-700',
      'from-slate-700 via-red-600 to-rose-700',
      'from-red-600 via-slate-600 to-gray-700',
      'from-gray-700 via-red-600 to-slate-700',
      'from-rose-700 via-slate-600 to-red-700',
    ],
    Cloud: [
      'from-cyan-600 via-sky-500 to-blue-500',
      'from-sky-600 via-cyan-500 to-teal-500',
      'from-blue-500 via-cyan-500 to-sky-600',
      'from-teal-500 via-cyan-500 to-sky-600',
      'from-cyan-500 via-blue-500 to-indigo-500',
    ],
    Data: [
      'from-emerald-600 via-green-500 to-teal-600',
      'from-teal-600 via-emerald-500 to-green-600',
      'from-green-600 via-teal-500 to-cyan-600',
      'from-emerald-500 via-cyan-500 to-teal-600',
      'from-teal-500 via-green-500 to-emerald-600',
    ],
    Productivity: [
      'from-yellow-500 via-amber-500 to-orange-500',
      'from-amber-500 via-yellow-500 to-orange-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-yellow-600 via-orange-400 to-amber-500',
      'from-amber-600 via-yellow-400 to-orange-500',
    ],
    Finance: [
      'from-green-700 via-emerald-600 to-teal-600',
      'from-emerald-600 via-green-500 to-teal-500',
      'from-teal-600 via-green-600 to-emerald-500',
      'from-green-600 via-teal-500 to-emerald-600',
      'from-emerald-500 via-teal-600 to-green-700',
    ],
    Design: [
      'from-purple-600 via-fuchsia-500 to-pink-500',
      'from-fuchsia-600 via-purple-500 to-violet-500',
      'from-pink-500 via-fuchsia-500 to-purple-600',
      'from-violet-500 via-purple-500 to-fuchsia-600',
      'from-purple-500 via-pink-500 to-fuchsia-500',
    ],
    Career: [
      'from-teal-600 via-cyan-500 to-sky-500',
      'from-cyan-600 via-teal-500 to-emerald-500',
      'from-sky-500 via-teal-500 to-cyan-600',
      'from-teal-500 via-sky-500 to-cyan-500',
      'from-cyan-500 via-sky-500 to-teal-600',
    ],
    Health: [
      'from-pink-500 via-rose-400 to-red-400',
      'from-rose-500 via-pink-400 to-fuchsia-500',
      'from-red-400 via-pink-500 to-rose-500',
      'from-fuchsia-500 via-pink-500 to-rose-400',
      'from-pink-600 via-rose-500 to-red-500',
    ],
  };
  const set = gradients[cat] || gradients['Business'];
  return set[index % set.length];
}

// ─── 60+ E-Books ─────────────────────────────────────────────────────────────
const ebooks = [
  // ── AI & Machine Learning (1-8) ──────────────────────────────────────────────
  {
    title: 'ChatGPT Mastery: From Beginner to Power User',
    description: 'A comprehensive guide to mastering ChatGPT for productivity, content creation, coding assistance, and business applications. Covers prompt engineering, custom GPTs, API integration, and advanced techniques for getting the most out of AI chatbots in your daily workflow.',
    tags: ['ChatGPT', 'AI', 'Prompt Engineering', 'Productivity'],
    pages: 274,
    level: 'Beginner',
    category: 'AI',
  },
  {
    title: 'Machine Learning with Python: A Hands-On Guide',
    description: 'Learn machine learning from scratch using Python, scikit-learn, and TensorFlow. This practical guide walks you through real-world projects including image classification, sentiment analysis, recommendation systems, and predictive modeling with step-by-step code examples.',
    tags: ['Machine Learning', 'Python', 'TensorFlow', 'Data Science'],
    pages: 412,
    level: 'Intermediate',
    category: 'AI',
  },
  {
    title: 'Generative AI for Business: Strategies & Implementation',
    description: 'Discover how generative AI is transforming industries from marketing to healthcare. This book provides frameworks for evaluating AI tools, building implementation roadmaps, managing risks, and measuring ROI for AI initiatives in enterprise environments.',
    tags: ['Generative AI', 'Business', 'Strategy', 'Enterprise'],
    pages: 298,
    level: 'Intermediate',
    category: 'AI',
  },
  {
    title: 'Deep Learning Fundamentals: Neural Networks Explained',
    description: 'Understand the mathematics and intuition behind neural networks, CNNs, RNNs, transformers, and GANs. Includes hands-on exercises using PyTorch, real-world case studies from computer vision and NLP, and guidance on training and deploying production models.',
    tags: ['Deep Learning', 'Neural Networks', 'PyTorch', 'AI'],
    pages: 386,
    level: 'Advanced',
    category: 'AI',
  },
  {
    title: 'Natural Language Processing: Building Intelligent Text Systems',
    description: 'Master NLP techniques from tokenization to transformer models. Build chatbots, sentiment analyzers, text summarizers, and question-answering systems using spaCy, Hugging Face, and OpenAI APIs. Includes multilingual and real-time processing strategies.',
    tags: ['NLP', 'Transformers', 'Chatbots', 'Text Analysis'],
    pages: 342,
    level: 'Intermediate',
    category: 'AI',
  },
  {
    title: 'AI Ethics & Responsible AI Development',
    description: 'Navigate the ethical challenges of AI development including bias detection and mitigation, fairness metrics, explainability, privacy-preserving techniques, and governance frameworks. Essential reading for developers and policymakers building trustworthy AI systems.',
    tags: ['AI Ethics', 'Bias', 'Fairness', 'Governance'],
    pages: 218,
    level: 'Beginner',
    category: 'AI',
  },
  {
    title: 'Computer Vision with OpenCV & Python',
    description: 'Build real-world computer vision applications using OpenCV and Python. Covers image processing, object detection, face recognition, OCR, video analysis, and deploying models on edge devices. Includes 15 complete projects with downloadable code.',
    tags: ['Computer Vision', 'OpenCV', 'Python', 'Image Processing'],
    pages: 328,
    level: 'Intermediate',
    category: 'AI',
  },
  {
    title: 'Building AI-Powered Products: From Idea to Launch',
    description: 'A product manager and developer guide to building AI-powered features that users love. Covers user research for AI products, data strategy, model selection, UX design for AI interactions, A/B testing ML models, and monitoring production AI systems.',
    tags: ['AI Products', 'Product Management', 'UX', 'Startups'],
    pages: 256,
    level: 'Intermediate',
    category: 'AI',
  },

  // ── Programming & Development (9-18) ────────────────────────────────────────
  {
    title: 'React & Next.js: The Complete Developer Guide',
    description: 'Master modern React development with Next.js 14, Server Components, App Router, and TypeScript. Build full-stack applications with authentication, databases, API routes, and deployment strategies. Includes 10 real-world projects from e-commerce to SaaS dashboards.',
    tags: ['React', 'Next.js', 'TypeScript', 'Full-Stack'],
    pages: 486,
    level: 'Intermediate',
    category: 'Programming',
  },
  {
    title: 'Python for Automation: Scripts That Save You Hours',
    description: 'Automate repetitive tasks with Python including web scraping, file management, email automation, spreadsheet processing, API interactions, and scheduled jobs. Each chapter includes practical scripts you can customize and use immediately in your work.',
    tags: ['Python', 'Automation', 'Scripts', 'Productivity'],
    pages: 298,
    level: 'Beginner',
    category: 'Programming',
  },
  {
    title: 'Node.js & Express: Building Scalable APIs',
    description: 'Design and build production-ready REST APIs and GraphQL services with Node.js and Express. Covers authentication, rate limiting, caching, database integration, testing, Docker deployment, and performance optimization for high-traffic applications.',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    pages: 356,
    level: 'Intermediate',
    category: 'Programming',
  },
  {
    title: 'TypeScript in Practice: From Zero to Advanced',
    description: 'Go beyond basic TypeScript with advanced type patterns, generics, conditional types, mapped types, and utility types. Learn real-world patterns for React, Node.js, and library development with practical examples and best practices from production codebases.',
    tags: ['TypeScript', 'JavaScript', 'Advanced', 'Best Practices'],
    pages: 324,
    level: 'Advanced',
    category: 'Programming',
  },
  {
    title: 'Flutter & Dart: Cross-Platform Mobile Development',
    description: 'Build beautiful, native mobile apps for iOS and Android with Flutter. Covers widget system, state management with Riverpod, HTTP networking, local storage, Firebase integration, animations, and app store deployment. Includes 5 complete app projects.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Cross-Platform'],
    pages: 398,
    level: 'Beginner',
    category: 'Programming',
  },
  {
    title: 'Clean Code Principles: Writing Maintainable Software',
    description: 'Learn the art of writing clean, readable, and maintainable code. Covers SOLID principles, design patterns, naming conventions, function design, error handling, testing strategies, and refactoring techniques with examples in JavaScript, Python, and Java.',
    tags: ['Clean Code', 'SOLID', 'Design Patterns', 'Quality'],
    pages: 268,
    level: 'Beginner',
    category: 'Programming',
  },
  {
    title: 'Rust Programming: Safe, Fast, and Concurrent',
    description: 'Master Rust programming from ownership and borrowing to async programming and WebAssembly. Build CLI tools, web servers, and systems programs with memory safety guarantees. Includes real-world projects and performance benchmarking against C++ and Go.',
    tags: ['Rust', 'Systems Programming', 'Performance', 'Safety'],
    pages: 442,
    level: 'Advanced',
    category: 'Programming',
  },
  {
    title: 'Git & GitHub Mastery: Collaboration for Developers',
    description: 'Master Git version control and GitHub collaboration from basic commands to advanced workflows. Covers branching strategies, merge conflict resolution, pull request best practices, GitHub Actions CI/CD, code review workflows, and open source contribution guidelines.',
    tags: ['Git', 'GitHub', 'Collaboration', 'Version Control'],
    pages: 214,
    level: 'Beginner',
    category: 'Programming',
  },
  {
    title: 'Microservices Architecture: Design & Implementation',
    description: 'Design, build, and deploy microservices with Node.js, Docker, and Kubernetes. Covers service communication patterns, API gateways, event-driven architecture, distributed transactions, observability, and migration strategies from monolithic applications.',
    tags: ['Microservices', 'Docker', 'Kubernetes', 'Architecture'],
    pages: 376,
    level: 'Advanced',
    category: 'Programming',
  },
  {
    title: 'Web Security Handbook: Protecting Web Applications',
    description: 'Secure your web applications against OWASP Top 10 vulnerabilities. Covers XSS, CSRF, SQL injection, authentication attacks, security headers, Content Security Policy, penetration testing basics, and building a security-first development culture in your team.',
    tags: ['Web Security', 'OWASP', 'Hacking', 'Defense'],
    pages: 298,
    level: 'Intermediate',
    category: 'Programming',
  },

  // ── Digital Marketing (19-26) ───────────────────────────────────────────────
  {
    title: 'SEO 2026: The Complete Search Optimization Guide',
    description: 'Stay ahead with the latest SEO strategies including AI-driven search, E-E-A-T optimization, Core Web Vitals, schema markup, link building, and local SEO. Includes technical SEO audits, content optimization checklists, and tools for tracking rankings and performance.',
    tags: ['SEO', 'Google', 'Rankings', 'Content'],
    pages: 342,
    level: 'Intermediate',
    category: 'Marketing',
  },
  {
    title: 'Social Media Marketing: Strategies That Actually Work',
    description: 'Build engaged audiences and drive real business results on Instagram, TikTok, LinkedIn, YouTube, and X. Covers content strategy, viral mechanics, community building, paid advertising, influencer partnerships, and analytics frameworks for measuring social ROI.',
    tags: ['Social Media', 'Instagram', 'TikTok', 'Content Strategy'],
    pages: 286,
    level: 'Beginner',
    category: 'Marketing',
  },
  {
    title: 'Email Marketing Mastery: Campaigns That Convert',
    description: 'Design email marketing campaigns that subscribers love and that drive revenue. Covers list building, segmentation, automation sequences, subject line optimization, A/B testing, deliverability, GDPR compliance, and advanced personalization strategies for e-commerce and SaaS.',
    tags: ['Email', 'Marketing', 'Automation', 'Conversion'],
    pages: 248,
    level: 'Beginner',
    category: 'Marketing',
  },
  {
    title: 'Content Marketing Strategy: From Blog to Brand Authority',
    description: 'Build a content engine that drives organic traffic and establishes thought leadership. Covers content pillars, editorial calendars, SEO-driven content planning, repurposing strategies, guest posting, content audits, and measuring content ROI with analytics dashboards.',
    tags: ['Content Marketing', 'Blogging', 'SEO', 'Branding'],
    pages: 274,
    level: 'Intermediate',
    category: 'Marketing',
  },
  {
    title: 'Google Ads & PPC: Maximizing Your Ad Spend',
    description: 'Master Google Ads, Microsoft Ads, and paid social campaigns with data-driven strategies. Covers keyword research, ad copywriting, bid strategies, Quality Score optimization, conversion tracking, remarketing, and budget allocation for maximum return on ad spend.',
    tags: ['Google Ads', 'PPC', 'Advertising', 'ROI'],
    pages: 312,
    level: 'Intermediate',
    category: 'Marketing',
  },
  {
    title: 'Copywriting Secrets: Words That Sell',
    description: 'Learn the psychology behind persuasive writing and apply it to landing pages, emails, ads, and social media. Covers AIDA, PAS, and BAB frameworks, headline formulas, emotional triggers, storytelling techniques, and A/B testing copy for continuous improvement.',
    tags: ['Copywriting', 'Sales', 'Psychology', 'Writing'],
    pages: 196,
    level: 'Beginner',
    category: 'Marketing',
  },
  {
    title: 'Marketing Analytics: Data-Driven Decision Making',
    description: 'Turn marketing data into actionable insights with Google Analytics 4, Looker Studio, and attribution modeling. Covers dashboard design, funnel analysis, cohort analysis, customer lifetime value calculation, and building automated reporting systems for marketing teams.',
    tags: ['Analytics', 'Google Analytics', 'Data', 'Reporting'],
    pages: 268,
    level: 'Intermediate',
    category: 'Marketing',
  },
  {
    title: 'Growth Hacking: Scaling from Zero to Millions',
    description: 'Learn the growth strategies used by the fastest-growing startups. Covers viral loops, referral programs, product-led growth, acquisition channels, retention tactics, and the BUILD-MEASURE-LEARN framework with real case studies from companies like Dropbox, Airbnb, and Slack.',
    tags: ['Growth Hacking', 'Startups', 'Scaling', 'Product-Led'],
    pages: 234,
    level: 'Intermediate',
    category: 'Marketing',
  },

  // ── Business & Entrepreneurship (27-35) ─────────────────────────────────────
  {
    title: 'Startup Playbook: From Idea to Product-Market Fit',
    description: 'Navigate the early stages of building a startup from validating your idea to finding product-market fit. Covers customer discovery interviews, MVP development, lean methodology, pivot strategies, building founding teams, and raising your first round of funding.',
    tags: ['Startup', 'MVP', 'Lean Startup', 'Validation'],
    pages: 286,
    level: 'Beginner',
    category: 'Business',
  },
  {
    title: 'Business Model Innovation: Creating Sustainable Value',
    description: 'Explore and design innovative business models that create and capture value. Covers the Business Model Canvas, platform businesses, subscription models, freemium strategies, marketplace dynamics, and case studies from companies that disrupted their industries.',
    tags: ['Business Model', 'Innovation', 'Strategy', 'Value'],
    pages: 312,
    level: 'Intermediate',
    category: 'Business',
  },
  {
    title: 'Project Management Essentials: Delivering on Time',
    description: 'Master project management with practical frameworks for Agile, Scrum, and Kanban. Covers project planning, estimation, risk management, stakeholder communication, team leadership, and tools like Jira and Notion for keeping projects on track and on budget.',
    tags: ['Project Management', 'Agile', 'Scrum', 'Planning'],
    pages: 248,
    level: 'Beginner',
    category: 'Business',
  },
  {
    title: 'Freelancing Blueprint: Build a Thriving Solo Business',
    description: 'Launch and scale a successful freelance career from finding clients to managing finances. Covers pricing strategies, proposal writing, client management, contract templates, tax basics, building a personal brand, and transitioning from side hustle to full-time freelancing.',
    tags: ['Freelancing', 'Solo Business', 'Clients', 'Pricing'],
    pages: 224,
    level: 'Beginner',
    category: 'Business',
  },
  {
    title: 'SaaS Metrics That Matter: Measuring Subscription Growth',
    description: 'Understand and optimize the key metrics that drive SaaS business success. Covers MRR, ARR, churn, LTV, CAC, expansion revenue, cohort analysis, and unit economics. Includes dashboard templates and benchmarks for early-stage and growth-stage companies.',
    tags: ['SaaS', 'Metrics', 'Subscription', 'Growth'],
    pages: 198,
    level: 'Intermediate',
    category: 'Business',
  },
  {
    title: 'Negotiation Mastery: Getting to Yes in Business',
    description: 'Master the art and science of negotiation for business deals, salary discussions, and partnerships. Covers preparation frameworks, BATNA analysis, anchoring strategies, handling difficult negotiators, cross-cultural considerations, and maintaining long-term relationships.',
    tags: ['Negotiation', 'Communication', 'Deal-Making', 'Strategy'],
    pages: 218,
    level: 'Beginner',
    category: 'Business',
  },
  {
    title: 'Remote Team Management: Leading Distributed Teams',
    description: 'Effectively lead and manage teams across time zones and cultures. Covers async communication, virtual team building, performance management, hiring remote talent, documentation culture, tool selection, and creating inclusive team environments in distributed organizations.',
    tags: ['Remote Work', 'Leadership', 'Teams', 'Management'],
    pages: 234,
    level: 'Intermediate',
    category: 'Business',
  },
  {
    title: 'E-Commerce Business: Building an Online Store That Sells',
    description: 'Launch and grow a profitable e-commerce business from product selection to scaling operations. Covers Shopify setup, dropshipping vs. inventory models, payment processing, shipping logistics, customer service, and marketing strategies for online retail success.',
    tags: ['E-Commerce', 'Shopify', 'Online Store', 'Retail'],
    pages: 298,
    level: 'Beginner',
    category: 'Business',
  },
  {
    title: 'Business Strategy: Competitive Advantage in the Digital Age',
    description: 'Develop winning business strategies using Porter\'s Five Forces, Blue Ocean Strategy, and digital-first frameworks. Covers competitive moats, platform strategy, network effects, digital transformation, and case studies from Amazon, Tesla, and other market leaders.',
    tags: ['Strategy', 'Competition', 'Digital', 'Leadership'],
    pages: 326,
    level: 'Advanced',
    category: 'Business',
  },

  // ── Cybersecurity (36-41) ───────────────────────────────────────────────────
  {
    title: 'Ethical Hacking: A Practical Introduction',
    description: 'Learn ethical hacking and penetration testing from reconnaissance to reporting. Covers network scanning, vulnerability assessment, exploitation techniques, web app testing, and writing professional pentest reports. Includes lab setups and practice environments.',
    tags: ['Ethical Hacking', 'Penetration Testing', 'Security', 'Kali Linux'],
    pages: 386,
    level: 'Intermediate',
    category: 'Cybersecurity',
  },
  {
    title: 'Zero Trust Security: Implementing Modern Access Control',
    description: 'Implement Zero Trust architecture in your organization with practical guidance on identity verification, micro-segmentation, least privilege access, continuous authentication, and tool selection. Includes migration roadmaps from traditional perimeter-based security.',
    tags: ['Zero Trust', 'Access Control', 'Identity', 'Architecture'],
    pages: 248,
    level: 'Advanced',
    category: 'Cybersecurity',
  },
  {
    title: 'Cybersecurity for Small Businesses: Practical Defense',
    description: 'Protect your small business from cyber threats without a big budget. Covers risk assessment, employee training, password policies, multi-factor authentication, backup strategies, incident response planning, and choosing the right security tools for small teams.',
    tags: ['Small Business', 'Security', 'Defense', 'Practical'],
    pages: 178,
    level: 'Beginner',
    category: 'Cybersecurity',
  },
  {
    title: 'Cloud Security Best Practices: AWS, Azure & GCP',
    description: 'Secure your cloud infrastructure across major providers with defense-in-depth strategies. Covers IAM policies, encryption, network security, compliance frameworks, security monitoring, and automated remediation with Infrastructure as Code security scanning.',
    tags: ['Cloud Security', 'AWS', 'Azure', 'Compliance'],
    pages: 312,
    level: 'Intermediate',
    category: 'Cybersecurity',
  },
  {
    title: 'Incident Response: When Breaches Happen',
    description: 'Prepare for and respond to cybersecurity incidents with confidence. Covers incident response planning, detection and triage, containment strategies, forensic investigation, communication protocols, legal requirements, and post-incident review processes.',
    tags: ['Incident Response', 'Forensics', 'Breach', 'Recovery'],
    pages: 226,
    level: 'Intermediate',
    category: 'Cybersecurity',
  },
  {
    title: 'Privacy & Data Protection: GDPR & Beyond',
    description: 'Navigate global privacy regulations including GDPR, CCPA, and emerging frameworks. Covers data classification, consent management, Data Protection Impact Assessments, privacy-by-design principles, and building compliance programs that scale across jurisdictions.',
    tags: ['GDPR', 'Privacy', 'Compliance', 'Data Protection'],
    pages: 214,
    level: 'Intermediate',
    category: 'Cybersecurity',
  },

  // ── Cloud Computing (42-47) ─────────────────────────────────────────────────
  {
    title: 'AWS Certified Solutions Architect: Study Guide',
    description: 'Prepare for the AWS Solutions Architect certification with comprehensive coverage of all exam domains. Includes hands-on labs, practice questions, architecture patterns, cost optimization strategies, and real-world scenarios for building scalable AWS solutions.',
    tags: ['AWS', 'Certification', 'Architecture', 'Cloud'],
    pages: 456,
    level: 'Intermediate',
    category: 'Cloud',
  },
  {
    title: 'Kubernetes in Action: Container Orchestration Mastery',
    description: 'Master Kubernetes from pod management to production deployments. Covers cluster setup, deployments, services, ingress, storage, secrets management, Helm charts, monitoring with Prometheus, and GitOps workflows for reliable container orchestration at scale.',
    tags: ['Kubernetes', 'Docker', 'Containers', 'DevOps'],
    pages: 398,
    level: 'Advanced',
    category: 'Cloud',
  },
  {
    title: 'Serverless Architecture: Building Without Servers',
    description: 'Design and deploy serverless applications on AWS Lambda, Google Cloud Functions, and Azure Functions. Covers event-driven architecture, API Gateway, DynamoDB, Step Functions, cost optimization, cold start mitigation, and when serverless is the right choice.',
    tags: ['Serverless', 'Lambda', 'Event-Driven', 'Architecture'],
    pages: 268,
    level: 'Intermediate',
    category: 'Cloud',
  },
  {
    title: 'Infrastructure as Code: Terraform & Pulumi',
    description: 'Manage cloud infrastructure declaratively with Terraform and Pulumi. Covers HCL syntax, state management, modules, workspaces, CI/CD integration, multi-cloud deployments, and best practices for version-controlled, auditable infrastructure provisioning.',
    tags: ['IaC', 'Terraform', 'Pulumi', 'Automation'],
    pages: 298,
    level: 'Intermediate',
    category: 'Cloud',
  },
  {
    title: 'Cloud Cost Optimization: Cutting Your AWS Bill',
    description: 'Reduce your cloud spending by 30-60% with proven cost optimization strategies. Covers Reserved Instances, Spot Instances, right-sizing, storage tiering, network cost optimization, cost allocation tags, budget alerts, and building a FinOps culture in your organization.',
    tags: ['Cost Optimization', 'AWS', 'FinOps', 'Savings'],
    pages: 198,
    level: 'Beginner',
    category: 'Cloud',
  },
  {
    title: 'Multi-Cloud Strategy: Avoiding Vendor Lock-In',
    description: 'Design architectures that work across AWS, Azure, and GCP for resilience and flexibility. Covers multi-cloud networking, data portability, identity federation, disaster recovery strategies, and the organizational changes needed for successful multi-cloud operations.',
    tags: ['Multi-Cloud', 'AWS', 'Azure', 'GCP'],
    pages: 246,
    level: 'Advanced',
    category: 'Cloud',
  },

  // ── Data Science & Analytics (48-54) ─────────────────────────────────────────
  {
    title: 'Data Science Handbook: Analysis to Insights',
    description: 'Master the data science workflow from data collection and cleaning to analysis and visualization. Covers Python, Pandas, Matplotlib, and statistical methods with real-world case studies from retail, healthcare, and finance. No advanced math prerequisites required.',
    tags: ['Data Science', 'Python', 'Pandas', 'Statistics'],
    pages: 386,
    level: 'Beginner',
    category: 'Data',
  },
  {
    title: 'SQL for Data Analysis: Query Like a Pro',
    description: 'Write powerful SQL queries for data analysis from basic SELECT to advanced window functions, CTEs, and recursive queries. Covers PostgreSQL, BigQuery, and Snowflake with practical exercises on real datasets and performance tips for large-scale data analysis.',
    tags: ['SQL', 'Data Analysis', 'PostgreSQL', 'BigQuery'],
    pages: 268,
    level: 'Beginner',
    category: 'Data',
  },
  {
    title: 'Data Visualization: Telling Stories with Charts',
    description: 'Create compelling data visualizations that communicate insights effectively. Covers chart selection, color theory, interactive dashboards with Plotly and D3.js, storytelling with data principles, and common visualization mistakes to avoid in business presentations.',
    tags: ['Visualization', 'Charts', 'Storytelling', 'Dashboard'],
    pages: 224,
    level: 'Beginner',
    category: 'Data',
  },
  {
    title: 'Power BI: Business Intelligence for Everyone',
    description: 'Build professional business intelligence dashboards with Power BI from data modeling to DAX formulas. Covers data sources, transformations, relationships, calculated columns, row-level security, sharing and collaboration, and embedding reports in applications.',
    tags: ['Power BI', 'Dashboard', 'DAX', 'Business Intelligence'],
    pages: 298,
    level: 'Beginner',
    category: 'Data',
  },
  {
    title: 'Advanced Analytics: Predictive Modeling & Forecasting',
    description: 'Go beyond descriptive analytics with predictive modeling techniques. Covers regression, time series forecasting, classification, clustering, and ensemble methods with Python. Includes model evaluation, feature engineering, and deploying models as APIs for real-time predictions.',
    tags: ['Predictive Analytics', 'Forecasting', 'Python', 'Modeling'],
    pages: 342,
    level: 'Advanced',
    category: 'Data',
  },
  {
    title: 'Big Data Engineering: Processing at Scale',
    description: 'Design and build big data pipelines with Apache Spark, Kafka, and Airflow. Covers batch and stream processing, data lake architecture, ETL best practices, data quality frameworks, and managing petabyte-scale data infrastructure in cloud environments.',
    tags: ['Big Data', 'Spark', 'Kafka', 'Data Engineering'],
    pages: 376,
    level: 'Advanced',
    category: 'Data',
  },
  {
    title: 'A/B Testing & Experimentation: The Complete Guide',
    description: 'Design, run, and analyze A/B tests that produce reliable results. Covers hypothesis formulation, sample size calculation, statistical significance, Bayesian vs. frequentist approaches, multi-variate testing, and building an experimentation culture in your organization.',
    tags: ['A/B Testing', 'Experimentation', 'Statistics', 'Growth'],
    pages: 218,
    level: 'Intermediate',
    category: 'Data',
  },

  // ── Productivity & Remote Work (55-60) ──────────────────────────────────────
  {
    title: 'Notion Mastery: Organize Your Life & Work',
    description: 'Master Notion for personal productivity and team collaboration. Covers databases, templates, automations, API integrations, and building custom systems for project management, CRM, knowledge bases, and goal tracking. Includes 50+ ready-to-use templates.',
    tags: ['Notion', 'Productivity', 'Organization', 'Templates'],
    pages: 198,
    level: 'Beginner',
    category: 'Productivity',
  },
  {
    title: 'Time Management for Professionals: The Science of Focus',
    description: 'Apply evidence-based time management techniques to reclaim your day. Covers the Pomodoro Technique, time blocking, deep work strategies, energy management, meeting optimization, and digital tools for tracking and improving how you spend your working hours.',
    tags: ['Time Management', 'Focus', 'Deep Work', 'Efficiency'],
    pages: 176,
    level: 'Beginner',
    category: 'Productivity',
  },
  {
    title: 'Second Brain: Building a Personal Knowledge System',
    description: 'Build a digital second brain using the PARA method and tools like Obsidian, Notion, or Roam Research. Covers capturing ideas, organizing knowledge, progressive summarization, and creating a system that helps you recall and connect information when you need it most.',
    tags: ['PKM', 'Second Brain', 'Obsidian', 'Knowledge'],
    pages: 214,
    level: 'Beginner',
    category: 'Productivity',
  },
  {
    title: 'Remote Work Toolkit: Thriving from Anywhere',
    description: 'Equip yourself with the tools, habits, and strategies for successful remote work. Covers home office setup, async communication, collaboration tools, timezone management, virtual meeting etiquette, and maintaining social connections in distributed teams.',
    tags: ['Remote Work', 'Tools', 'Communication', 'Work-Life'],
    pages: 186,
    level: 'Beginner',
    category: 'Productivity',
  },
  {
    title: 'Automation with Zapier & Make: No-Code Workflows',
    description: 'Automate repetitive tasks without writing code using Zapier, Make (Integromat), and IFTTT. Covers trigger-action workflows, multi-step automations, error handling, webhook integrations, and building complex business processes that connect your entire tool stack.',
    tags: ['Automation', 'Zapier', 'No-Code', 'Workflows'],
    pages: 224,
    level: 'Beginner',
    category: 'Productivity',
  },
  {
    title: 'Deep Work: Mastering Concentration in a Distracted World',
    description: 'Develop the ability to focus without distraction on cognitively demanding tasks. Covers attention management, digital minimalism, environment design, habit stacking for focus, and strategies for producing high-quality work in an age of constant notifications.',
    tags: ['Deep Work', 'Focus', 'Concentration', 'Habits'],
    pages: 168,
    level: 'Beginner',
    category: 'Productivity',
  },

  // ── Finance & Investing (61-67) ─────────────────────────────────────────────
  {
    title: 'Personal Finance 101: Building Financial Freedom',
    description: 'Take control of your finances with practical strategies for budgeting, saving, debt management, and wealth building. Covers emergency funds, insurance, tax optimization, and the psychology of money with actionable steps for every income level.',
    tags: ['Personal Finance', 'Budgeting', 'Savings', 'Wealth'],
    pages: 224,
    level: 'Beginner',
    category: 'Finance',
  },
  {
    title: 'Stock Market Investing: A Beginner\'s Roadmap',
    description: 'Start investing in stocks with confidence using fundamental and technical analysis. Covers market mechanics, stock screening, portfolio diversification, dividend investing, ETFs, and risk management strategies for building long-term wealth through equity markets.',
    tags: ['Stocks', 'Investing', 'Portfolio', 'Analysis'],
    pages: 286,
    level: 'Beginner',
    category: 'Finance',
  },
  {
    title: 'Cryptocurrency & DeFi: Understanding Digital Assets',
    description: 'Navigate the world of cryptocurrency and decentralized finance safely. Covers blockchain fundamentals, Bitcoin, Ethereum, DeFi protocols, wallets, security best practices, regulatory considerations, and strategies for responsible participation in digital asset markets.',
    tags: ['Crypto', 'DeFi', 'Blockchain', 'Digital Assets'],
    pages: 268,
    level: 'Beginner',
    category: 'Finance',
  },
  {
    title: 'Financial Modeling for Startups: Excel & Sheets',
    description: 'Build financial models for startup fundraising and business planning. Covers revenue forecasting, expense modeling, cash flow projections, unit economics, scenario analysis, and investor-ready pitch deck financials with downloadable Excel and Google Sheets templates.',
    tags: ['Financial Modeling', 'Startup', 'Excel', 'Forecasting'],
    pages: 248,
    level: 'Intermediate',
    category: 'Finance',
  },
  {
    title: 'Real Estate Investing: From Rental Properties to REITs',
    description: 'Explore real estate investment strategies from direct property ownership to passive REIT investing. Covers market analysis, financing options, property management, tax advantages, 1031 exchanges, and building a diversified real estate portfolio for passive income.',
    tags: ['Real Estate', 'Investment', 'Rental', 'REIT'],
    pages: 298,
    level: 'Intermediate',
    category: 'Finance',
  },
  {
    title: 'Accounting Basics for Entrepreneurs',
    description: 'Understand essential accounting principles for running a business. Covers bookkeeping, financial statements, cash vs. accrual accounting, tax deductions, payroll basics, and working with accountants. Includes QuickBooks and Xero setup guides for small businesses.',
    tags: ['Accounting', 'Bookkeeping', 'Tax', 'Business'],
    pages: 214,
    level: 'Beginner',
    category: 'Finance',
  },
  {
    title: 'Venture Capital: How Funding Really Works',
    description: 'Understand the venture capital ecosystem from both founder and investor perspectives. Covers term sheets, valuation methods, cap tables, dilution, board governance, due diligence, and the fundraising timeline from pre-seed to Series A and beyond.',
    tags: ['VC', 'Fundraising', 'Startups', 'Term Sheets'],
    pages: 276,
    level: 'Advanced',
    category: 'Finance',
  },

  // ── Design & UX (68-74) ─────────────────────────────────────────────────────
  {
    title: 'UI Design Fundamentals: Creating Beautiful Interfaces',
    description: 'Learn the principles of beautiful, usable interface design from layout and typography to color theory and spacing. Covers design systems, component libraries, responsive design patterns, and practical exercises in Figma with real-world examples from top products.',
    tags: ['UI Design', 'Figma', 'Typography', 'Layout'],
    pages: 268,
    level: 'Beginner',
    category: 'Design',
  },
  {
    title: 'UX Research Methods: Understanding Your Users',
    description: 'Conduct effective user research that drives product decisions. Covers user interviews, surveys, usability testing, card sorting, journey mapping, persona development, and synthesizing research findings into actionable design recommendations for cross-functional teams.',
    tags: ['UX Research', 'User Testing', 'Personas', 'Insights'],
    pages: 234,
    level: 'Intermediate',
    category: 'Design',
  },
  {
    title: 'Design Systems: Building Consistent UI at Scale',
    description: 'Create and maintain design systems that ensure consistency across products and teams. Covers component architecture, design tokens, documentation, versioning, adoption strategies, and tools like Figma, Storybook, and Tailwind CSS for scalable design operations.',
    tags: ['Design System', 'Components', 'Figma', 'Consistency'],
    pages: 286,
    level: 'Advanced',
    category: 'Design',
  },
  {
    title: 'Figma for Teams: Collaborative Design Workflow',
    description: 'Master Figma for professional design workflows with teams. Covers auto layout, variants, component properties, design tokens, prototyping, developer handoff, branching, and best practices for organizing large design projects with multiple contributors.',
    tags: ['Figma', 'Collaboration', 'Prototyping', 'Handoff'],
    pages: 198,
    level: 'Beginner',
    category: 'Design',
  },
  {
    title: 'Color Theory for Digital Designers',
    description: 'Master color theory for digital interfaces including color psychology, accessible color combinations, creating cohesive palettes, gradient design, dark mode strategies, and color systems that scale across products and brands with consistent visual identity.',
    tags: ['Color', 'Design', 'Accessibility', 'Palette'],
    pages: 156,
    level: 'Beginner',
    category: 'Design',
  },
  {
    title: 'Motion Design for Web & Mobile Interfaces',
    description: 'Add meaningful motion to your interfaces with animation principles, micro-interactions, page transitions, and loading states. Covers CSS animations, Framer Motion, Lottie, and performance best practices for smooth 60fps animations that enhance user experience.',
    tags: ['Animation', 'Motion', 'CSS', 'Framer Motion'],
    pages: 214,
    level: 'Intermediate',
    category: 'Design',
  },
  {
    title: 'Accessibility in Design: Inclusive Digital Experiences',
    description: 'Design digital products that everyone can use regardless of ability. Covers WCAG guidelines, screen reader optimization, keyboard navigation, color contrast, ARIA labels, inclusive research methods, and accessibility auditing tools for web and mobile applications.',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design', 'A11y'],
    pages: 198,
    level: 'Beginner',
    category: 'Design',
  },

  // ── Career Development (75-81) ──────────────────────────────────────────────
  {
    title: 'Tech Interview Prep: Coding & System Design',
    description: 'Prepare for technical interviews at top tech companies with structured practice. Covers data structures, algorithms, LeetCode patterns, system design frameworks, behavioral interview strategies, and mock interview techniques with 100+ practice problems.',
    tags: ['Interview', 'Coding', 'System Design', 'FAANG'],
    pages: 412,
    level: 'Intermediate',
    category: 'Career',
  },
  {
    title: 'Resume & LinkedIn Optimization: Land More Interviews',
    description: 'Craft a compelling resume and LinkedIn profile that gets past ATS systems and impresses recruiters. Covers keyword optimization, achievement-driven bullet points, profile formatting, networking strategies, and using LinkedIn for proactive job searching.',
    tags: ['Resume', 'LinkedIn', 'Job Search', 'ATS'],
    pages: 168,
    level: 'Beginner',
    category: 'Career',
  },
  {
    title: 'Career Pivot: Successfully Changing Industries',
    description: 'Navigate career transitions with confidence using proven strategies. Covers transferable skills identification, upskilling roadmaps, networking for career changers, rebranding your professional story, and landing your first role in a new industry without starting over.',
    tags: ['Career Change', 'Transition', 'Skills', 'Strategy'],
    pages: 196,
    level: 'Beginner',
    category: 'Career',
  },
  {
    title: 'Leadership for First-Time Managers',
    description: 'Transition from individual contributor to effective team leader with practical management skills. Covers one-on-one meetings, performance feedback, delegation, conflict resolution, team culture building, and avoiding common mistakes that new managers make.',
    tags: ['Leadership', 'Management', 'Team', 'Growth'],
    pages: 224,
    level: 'Beginner',
    category: 'Career',
  },
  {
    title: 'Building a Personal Brand: Stand Out in Your Field',
    description: 'Build a recognizable personal brand that opens doors to opportunities. Covers brand positioning, content creation strategy, social media presence, speaking engagements, networking tactics, and monetizing your expertise through consulting, courses, or writing.',
    tags: ['Personal Brand', 'Marketing', 'Networking', 'Visibility'],
    pages: 198,
    level: 'Beginner',
    category: 'Career',
  },
  {
    title: 'Salary Negotiation: Get Paid What You\'re Worth',
    description: 'Negotiate higher salaries and better compensation packages with research-backed strategies. Covers market rate research, negotiation scripts, total compensation evaluation, equity negotiation, and handling lowball offers while maintaining positive employer relationships.',
    tags: ['Salary', 'Negotiation', 'Compensation', 'Career'],
    pages: 154,
    level: 'Beginner',
    category: 'Career',
  },
  {
    title: 'Developer Portfolio: Showcasing Your Best Work',
    description: 'Build a developer portfolio that impresses hiring managers and lands you interviews. Covers project selection, case study writing, portfolio website design with Next.js, GitHub profile optimization, and strategies for getting your work noticed by the right people.',
    tags: ['Portfolio', 'Developer', 'Showcase', 'Next.js'],
    pages: 176,
    level: 'Beginner',
    category: 'Career',
  },

  // ── Health & Wellness (82-87) ───────────────────────────────────────────────
  {
    title: 'Burnout Prevention: Sustainable Work Habits',
    description: 'Recognize, prevent, and recover from burnout with evidence-based strategies. Covers stress management, boundary setting, energy mapping, recovery protocols, and building sustainable work practices that protect your mental health while maintaining high performance.',
    tags: ['Burnout', 'Mental Health', 'Stress', 'Wellness'],
    pages: 186,
    level: 'Beginner',
    category: 'Health',
  },
  {
    title: 'Ergonomic Home Office: Work Without Pain',
    description: 'Set up a home office that protects your body from repetitive strain and chronic pain. Covers desk and chair selection, monitor positioning, keyboard and mouse ergonomics, standing desk strategies, stretching routines, and exercises for desk workers.',
    tags: ['Ergonomics', 'Home Office', 'Health', 'Posture'],
    pages: 142,
    level: 'Beginner',
    category: 'Health',
  },
  {
    title: 'Sleep Optimization: Rest Better, Perform Better',
    description: 'Improve your sleep quality and quantity with science-backed strategies. Covers sleep hygiene, circadian rhythm management, environment optimization, nutrition for sleep, managing screen time, and how better sleep directly improves cognitive performance and productivity.',
    tags: ['Sleep', 'Performance', 'Health', 'Recovery'],
    pages: 168,
    level: 'Beginner',
    category: 'Health',
  },
  {
    title: 'Mindfulness for Professionals: Focus & Clarity',
    description: 'Integrate mindfulness practices into your busy workday for improved focus, decision-making, and emotional regulation. Covers meditation techniques, breathing exercises, mindful communication, and building a sustainable mindfulness habit in just 10 minutes a day.',
    tags: ['Mindfulness', 'Meditation', 'Focus', 'Mental Clarity'],
    pages: 154,
    level: 'Beginner',
    category: 'Health',
  },
  {
    title: 'Nutrition for Peak Performance: Fuel Your Brain',
    description: 'Optimize your diet for sustained energy and cognitive performance throughout the workday. Covers brain-boosting foods, meal timing, hydration, supplements, and simple meal prep strategies for busy professionals who need to stay sharp and energized.',
    tags: ['Nutrition', 'Brain Food', 'Energy', 'Performance'],
    pages: 196,
    level: 'Beginner',
    category: 'Health',
  },
  {
    title: 'Exercise for Desk Workers: Stay Fit Without the Gym',
    description: 'Stay healthy and fit even with a sedentary job. Covers desk exercises, micro-workouts, walking meetings, stretching routines, and simple fitness plans that can be done in 15-20 minutes at home without equipment or gym membership.',
    tags: ['Exercise', 'Fitness', 'Desk Work', 'Health'],
    pages: 148,
    level: 'Beginner',
    category: 'Health',
  },
];

export default function EbooksListContent() {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    return ebooks.filter((ebook) => {
      const matchCat = activeCategory === 'all' || ebook.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        ebook.title.toLowerCase().includes(q) ||
        ebook.description.toLowerCase().includes(q) ||
        ebook.tags.some((t) => t.toLowerCase().includes(q)) ||
        ebook.category.toLowerCase().includes(q) ||
        ebook.level.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: ebooks.length };
    ebooks.forEach((ebook) => {
      counts[ebook.category] = (counts[ebook.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-transparent to-orange-50/50 dark:from-red-950/30 dark:via-transparent dark:to-orange-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Free E-Books</h1>
              <p className="text-muted-foreground mt-1">Expand your knowledge with our digital library</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Explore our curated collection of free e-books and digital publications. From AI and programming to marketing, business, and cybersecurity — browse, read, and share knowledge instantly.
          </p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1">{ebooks.length} E-Books</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Free to Access</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">PDF Format</Badge>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* Search & Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search e-books by title, topic, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Badge variant="outline" className="text-sm shrink-0">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700'
                    : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
                <span className={`ml-0.5 text-xs ${isActive ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* E-Books Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No e-books found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((ebook, i) => {
              const CatIcon = getCategoryIcon(ebook.category);
              const gradient = getCoverGradient(ebook.category, i);
              return (
                <Card key={ebook.title} className="group overflow-hidden hover:shadow-xl hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                  {/* Book Cover - CSS Gradient */}
                  <div className={`relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center`}>
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full" />
                      <div className="absolute bottom-8 right-6 w-24 h-24 border-2 border-white/20 rounded-lg rotate-12" />
                      <div className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-white/25 rounded-full" />
                    </div>
                    {/* Category icon */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CatIcon className="h-8 w-8 text-white" />
                    </div>
                    {/* Title on cover */}
                    <h3 className="relative z-10 text-white font-bold text-sm leading-tight line-clamp-3 mb-2 drop-shadow-md">
                      {ebook.title}
                    </h3>
                    {/* Level Badge */}
                    <div className="relative z-10">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ebook.level === 'Beginner' ? 'bg-green-400/30 text-green-100' : ebook.level === 'Intermediate' ? 'bg-amber-400/30 text-amber-100' : 'bg-red-400/30 text-red-100'}`}>
                        {ebook.level}
                      </span>
                    </div>
                    {/* Page count */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs z-10">
                      <FileText className="h-3 w-3" />
                      {ebook.pages} pages
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1.5 line-clamp-2 min-h-[2.5rem]">
                      {ebook.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {ebook.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ebook.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {ebook.tags.length > 3 && (
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                          +{ebook.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-[10px] font-medium border-0 ${getCategoryColor(ebook.category)}`}>
                        {ebook.category}
                      </Badge>
                      <Badge className={`text-[10px] font-medium border-0 ${getLevelColor(ebook.level)}`}>
                        {ebook.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-8">
          <h3 className="text-xl font-bold mb-2">Have an e-book to share?</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload your publications and share knowledge with the Zenvoora community</p>
          <Link href="/">
            <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white">
              <Upload className="h-4 w-4" />
              Upload an E-Book
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
