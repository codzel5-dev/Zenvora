'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Palette, ArrowRight, Upload, Search, Layers, Sparkles,
  Shapes, Box, Image, Type, Layout, Frame, Grid3x3,
  Monitor, Smartphone, PenTool, FileImage, LayoutGrid,
  Film, Globe, Zap, ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdBanner } from '@/components/ads/ad-banner';

// ─── Category Definitions ────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Assets', icon: LayoutGrid },
  { id: 'Icons', label: 'Icon Packs', icon: Shapes },
  { id: 'Illustrations', label: 'Illustrations', icon: PenTool },
  { id: 'Gradients', label: 'Gradients & Backgrounds', icon: Frame },
  { id: 'Textures', label: 'Textures & Patterns', icon: Grid3x3 },
  { id: 'UI Kits', label: 'UI Kits & Components', icon: Layout },
  { id: 'Templates', label: 'Templates', icon: FileImage },
  { id: 'Mockups', label: 'Mockups', icon: Monitor },
  { id: 'Fonts', label: 'Fonts & Typography', icon: Type },
  { id: '3D', label: '3D Assets', icon: Box },
  { id: 'Photos', label: 'Photos & Stock', icon: Image },
  { id: 'Social', label: 'Social Media', icon: Smartphone },
  { id: 'Motion', label: 'Motion & Animation', icon: Film },
];

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Icons: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Illustrations: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    Gradients: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    Textures: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    'UI Kits': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
    Templates: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    Mockups: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
    Fonts: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
    '3D': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    Photos: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
    Social: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
    Motion: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
  };
  return map[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400';
}

function getCategoryIcon(cat: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Icons: Shapes,
    Illustrations: PenTool,
    Gradients: Frame,
    Textures: Grid3x3,
    'UI Kits': Layout,
    Templates: FileImage,
    Mockups: Monitor,
    Fonts: Type,
    '3D': Box,
    Photos: Image,
    Social: Smartphone,
    Motion: Film,
  };
  return map[cat] || Palette;
}

function getCoverGradient(cat: string, index: number) {
  const gradients: Record<string, string[]> = {
    Icons: [
      'from-emerald-500 via-teal-400 to-cyan-500',
      'from-teal-500 via-emerald-400 to-green-500',
      'from-green-500 via-emerald-400 to-teal-500',
    ],
    Illustrations: [
      'from-orange-500 via-amber-400 to-yellow-400',
      'from-amber-500 via-orange-400 to-red-400',
      'from-yellow-400 via-orange-400 to-amber-500',
    ],
    Gradients: [
      'from-purple-500 via-fuchsia-400 to-pink-500',
      'from-fuchsia-500 via-purple-400 to-violet-500',
      'from-pink-500 via-fuchsia-400 to-purple-500',
    ],
    Textures: [
      'from-amber-600 via-yellow-500 to-orange-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-yellow-500 via-amber-500 to-orange-600',
    ],
    'UI Kits': [
      'from-sky-500 via-blue-400 to-indigo-500',
      'from-blue-500 via-sky-400 to-cyan-500',
      'from-indigo-500 via-blue-400 to-sky-500',
    ],
    Templates: [
      'from-pink-500 via-rose-400 to-red-400',
      'from-rose-500 via-pink-400 to-fuchsia-500',
      'from-red-400 via-rose-400 to-pink-500',
    ],
    Mockups: [
      'from-slate-600 via-gray-500 to-zinc-600',
      'from-gray-600 via-slate-500 to-gray-700',
      'from-zinc-600 via-slate-500 to-gray-600',
    ],
    Fonts: [
      'from-indigo-500 via-violet-400 to-purple-500',
      'from-violet-500 via-indigo-400 to-blue-500',
      'from-purple-500 via-violet-400 to-indigo-500',
    ],
    '3D': [
      'from-violet-500 via-purple-400 to-fuchsia-500',
      'from-purple-500 via-violet-400 to-indigo-500',
      'from-fuchsia-500 via-violet-400 to-purple-500',
    ],
    Photos: [
      'from-cyan-500 via-teal-400 to-emerald-500',
      'from-teal-500 via-cyan-400 to-sky-500',
      'from-emerald-500 via-teal-400 to-cyan-500',
    ],
    Social: [
      'from-rose-500 via-pink-400 to-fuchsia-500',
      'from-pink-500 via-rose-400 to-red-400',
      'from-fuchsia-500 via-pink-400 to-rose-500',
    ],
    Motion: [
      'from-teal-500 via-cyan-400 to-sky-500',
      'from-cyan-500 via-teal-400 to-emerald-500',
      'from-sky-500 via-cyan-400 to-teal-500',
    ],
  };
  const set = gradients[cat] || gradients['Gradients'];
  return set[index % set.length];
}

// ─── 35+ Design Assets ───────────────────────────────────────────────────────
const assets = [
  // ── Icon Packs (1-5) ────────────────────────────────────────────────────────
  {
    title: 'Essential UI Icon Pack — 200+ Icons',
    description: 'A comprehensive collection of 200+ minimal, consistent UI icons covering navigation, social media, commerce, media, and utility categories. Available in SVG and PNG with filled and outlined variants for web and mobile applications.',
    tags: ['Icons', 'UI', 'SVG', 'Minimal'],
    format: 'SVG + PNG',
    items: '200+',
    category: 'Icons',
  },
  {
    title: 'E-Commerce Icon Set — 150 Icons',
    description: 'Dedicated e-commerce icon collection featuring shopping carts, payment methods, delivery, returns, wishlists, ratings, and checkout flow icons. Includes line and solid styles optimized for product pages and checkout interfaces.',
    tags: ['Icons', 'E-Commerce', 'Shopping', 'Payment'],
    format: 'SVG + Figma',
    items: '150',
    category: 'Icons',
  },
  {
    title: 'Social Media Brand Icons — 80+ Logos',
    description: 'Complete set of official social media brand logos and icons including Facebook, Instagram, Twitter/X, TikTok, LinkedIn, YouTube, and 70+ more platforms. Always up-to-date with the latest brand guidelines and color codes.',
    tags: ['Icons', 'Social Media', 'Brands', 'Logos'],
    format: 'SVG + PNG',
    items: '80+',
    category: 'Icons',
  },
  {
    title: 'Weather & Nature Icon Pack — 100 Icons',
    description: 'Beautiful weather and nature icons featuring sun, clouds, rain, snow, wind, seasons, trees, and landscape elements. Hand-crafted with smooth curves and consistent stroke width for weather apps and outdoor platforms.',
    tags: ['Icons', 'Weather', 'Nature', 'Outdoors'],
    format: 'SVG + PNG',
    items: '100',
    category: 'Icons',
  },
  {
    title: 'Crypto & Finance Icons — 120 Icons',
    description: 'Cryptocurrency and finance icon set with Bitcoin, Ethereum, and 60+ coin logos plus financial icons for charts, wallets, exchanges, and DeFi concepts. Includes colored and monochrome variants for fintech dashboards.',
    tags: ['Icons', 'Crypto', 'Finance', 'Fintech'],
    format: 'SVG + PNG',
    items: '120',
    category: 'Icons',
  },

  // ── Illustrations (6-10) ────────────────────────────────────────────────────
  {
    title: 'Flat Illustration Pack — 25 Scenes',
    description: 'Charming flat-style illustrations depicting people at work, office scenes, technology, and collaboration. Perfect for landing pages, presentations, and marketing materials. Fully vector and easily customizable.',
    tags: ['Illustrations', 'Flat Design', 'People', 'Vector'],
    format: 'SVG + PNG',
    items: '25',
    category: 'Illustrations',
  },
  {
    title: 'Isometric Tech Illustrations — 20 Scenes',
    description: 'Detailed isometric illustrations of servers, cloud infrastructure, mobile devices, data centers, and smart cities. Ideal for SaaS landing pages, tech blogs, and IT service websites with a modern 3D perspective.',
    tags: ['Illustrations', 'Isometric', 'Tech', 'SaaS'],
    format: 'SVG + AI',
    items: '20',
    category: 'Illustrations',
  },
  {
    title: 'Diverse Character Illustrations — 30 Avatars',
    description: 'Inclusive character illustrations representing diverse ethnicities, professions, ages, and abilities. Covers business, education, healthcare, and casual settings for inclusive design in apps, websites, and presentations.',
    tags: ['Illustrations', 'Characters', 'Diversity', 'Avatars'],
    format: 'SVG + PNG',
    items: '30',
    category: 'Illustrations',
  },
  {
    title: 'Hand-Drawn Sketch Pack — 40 Elements',
    description: 'Authentic hand-drawn sketch elements including arrows, borders, frames, decorations, speech bubbles, and doodles. Adds a personal, creative touch to presentations, blog posts, and social media content.',
    tags: ['Illustrations', 'Sketch', 'Hand-Drawn', 'Creative'],
    format: 'SVG + PNG',
    items: '40',
    category: 'Illustrations',
  },
  {
    title: 'Space & Sci-Fi Illustrations — 15 Scenes',
    description: 'Futuristic space and science fiction illustrations featuring astronauts, rockets, planets, robots, and alien landscapes. Perfect for gaming, tech startups, and creative projects with a cosmic theme.',
    tags: ['Illustrations', 'Space', 'Sci-Fi', 'Futuristic'],
    format: 'SVG + PNG',
    items: '15',
    category: 'Illustrations',
  },

  // ── Gradients & Backgrounds (11-14) ────────────────────────────────────────
  {
    title: 'Premium Gradient Collection — 50 Backgrounds',
    description: 'Fifty handcrafted gradient backgrounds in various color combinations from warm sunsets to cool ocean tones. Available in 4K resolution with CSS code included for web use. Covers mesh, radial, linear, and angular gradient styles.',
    tags: ['Gradients', 'Backgrounds', 'CSS', '4K'],
    format: 'PNG + CSS',
    items: '50',
    category: 'Gradients',
  },
  {
    title: 'Mesh Gradient Pack — 30 Backgrounds',
    description: 'Trendy mesh gradient backgrounds with organic, fluid color transitions. Modern aesthetic perfect for hero sections, app backgrounds, and brand materials. Includes Figma source files for easy color customization.',
    tags: ['Gradients', 'Mesh', 'Modern', 'Fluid'],
    format: 'PNG + Figma',
    items: '30',
    category: 'Gradients',
  },
  {
    title: 'Abstract Background Collection — 40 Images',
    description: 'Abstract artistic backgrounds featuring paint splatters, smoke effects, liquid metal, and organic shapes. High-resolution files ideal for album covers, event posters, and creative branding projects.',
    tags: ['Abstract', 'Backgrounds', 'Artistic', 'Hi-Res'],
    format: 'JPG (4K)',
    items: '40',
    category: 'Gradients',
  },
  {
    title: 'Dark Mode Backgrounds — 25 Gradients',
    description: 'Carefully crafted dark gradient backgrounds optimized for dark mode interfaces. Subtle color shifts from deep blues to rich purples with enough contrast for white text readability. CSS and image formats included.',
    tags: ['Gradients', 'Dark Mode', 'UI', 'Night'],
    format: 'PNG + CSS',
    items: '25',
    category: 'Gradients',
  },

  // ── Textures & Patterns (15-18) ─────────────────────────────────────────────
  {
    title: 'Natural Texture Pack — 30 Textures',
    description: 'High-resolution natural textures including marble, wood grain, paper, concrete, fabric, and watercolor. Ideal for overlays, backgrounds, and adding depth to design projects. Seamless tileable options included.',
    tags: ['Textures', 'Natural', 'Overlay', 'Hi-Res'],
    format: 'PNG (4K)',
    items: '30',
    category: 'Textures',
  },
  {
    title: 'Geometric Pattern Pack — 40 Patterns',
    description: 'Clean geometric patterns including waves, hexagons, chevrons, dots, and line art in monochrome and color variations. Scalable vector format with transparent backgrounds for seamless web and print use.',
    tags: ['Patterns', 'Geometric', 'Vector', 'Seamless'],
    format: 'SVG + PNG',
    items: '40',
    category: 'Textures',
  },
  {
    title: 'Paper & Cardboard Textures — 20 Textures',
    description: 'Authentic paper and cardboard textures including kraft, recycled, watercolor, vintage, and torn paper effects. Perfect for scrapbooking, product mockups, and adding a tactile quality to digital designs.',
    tags: ['Textures', 'Paper', 'Vintage', 'Craft'],
    format: 'PNG (4K)',
    items: '20',
    category: 'Textures',
  },
  {
    title: 'Seamless Pattern Library — 50 Patterns',
    description: 'Extensive library of seamless tileable patterns covering florals, geometrics, damask, tribal, and minimalist styles. Every pattern is perfectly seamless for use on web backgrounds, fabric design, and print at any scale.',
    tags: ['Patterns', 'Seamless', 'Tileable', 'Print'],
    format: 'SVG + PNG',
    items: '50',
    category: 'Textures',
  },

  // ── UI Kits & Components (19-23) ────────────────────────────────────────────
  {
    title: 'Dashboard UI Kit — 60+ Components',
    description: 'Complete admin dashboard UI kit with charts, data tables, sidebars, cards, forms, and navigation components. Built with Figma auto-layout and design tokens for easy customization. Dark and light mode included.',
    tags: ['UI Kit', 'Dashboard', 'Admin', 'Figma'],
    format: 'Figma + Sketch',
    items: '60+',
    category: 'UI Kits',
  },
  {
    title: 'E-Commerce UI Kit — 50 Components',
    description: 'Full e-commerce interface kit with product cards, category pages, shopping cart, checkout flow, user profiles, and order management. Responsive design with mobile-first approach and accessibility best practices.',
    tags: ['UI Kit', 'E-Commerce', 'Shop', 'Responsive'],
    format: 'Figma + Adobe XD',
    items: '50',
    category: 'UI Kits',
  },
  {
    title: 'Mobile App UI Kit — 80 Screens',
    description: 'Comprehensive mobile app design system with 80+ screens covering onboarding, authentication, feeds, profiles, messaging, settings, and more. Designed for iOS and Android with platform-specific patterns and conventions.',
    tags: ['UI Kit', 'Mobile', 'App', 'iOS'],
    format: 'Figma',
    items: '80',
    category: 'UI Kits',
  },
  {
    title: 'Design System Starter Kit — 100+ Tokens',
    description: 'Production-ready design system foundation with color tokens, typography scales, spacing system, shadow tokens, and base components. Includes Figma variables, CSS custom properties, and Tailwind CSS configuration files.',
    tags: ['Design System', 'Tokens', 'Tailwind', 'Components'],
    format: 'Figma + CSS',
    items: '100+',
    category: 'UI Kits',
  },
  {
    title: 'Landing Page Components — 35 Sections',
    description: 'Modular landing page section components including hero variants, feature grids, pricing tables, testimonials, FAQ, CTAs, and footers. Mix and match sections to build complete landing pages in minutes.',
    tags: ['UI Kit', 'Landing Page', 'Sections', 'Modular'],
    format: 'Figma + HTML',
    items: '35',
    category: 'UI Kits',
  },

  // ── Templates (24-27) ───────────────────────────────────────────────────────
  {
    title: 'Social Media Templates — 30 Posts',
    description: 'Professionally designed Instagram and social media post templates with photo placeholders, modern typography, and on-brand color schemes. Fully editable in Figma and Canva for quick content creation.',
    tags: ['Templates', 'Social Media', 'Instagram', 'Canva'],
    format: 'FIG + Canva',
    items: '30',
    category: 'Templates',
  },
  {
    title: 'Presentation Templates — 15 Decks',
    description: 'Elegant presentation templates for business pitches, startup decks, project reports, and conference talks. Includes master slides, data visualization layouts, and icon libraries. PowerPoint and Google Slides compatible.',
    tags: ['Templates', 'Presentation', 'Pitch Deck', 'Slides'],
    format: 'PPTX + Google Slides',
    items: '15',
    category: 'Templates',
  },
  {
    title: 'Resume & CV Templates — 20 Designs',
    description: 'Modern, ATS-friendly resume and CV templates designed by professional recruiters. Covers corporate, creative, tech, and academic styles with matching cover letters. Available in Word, Google Docs, and InDesign formats.',
    tags: ['Templates', 'Resume', 'CV', 'Career'],
    format: 'DOCX + Google Docs',
    items: '20',
    category: 'Templates',
  },
  {
    title: 'Email Signature Templates — 25 Designs',
    description: 'Professional email signature templates with photo, social links, and branding options. Covers corporate, creative, minimal, and banner styles. HTML files included for direct use in Gmail, Outlook, and Apple Mail.',
    tags: ['Templates', 'Email', 'Signature', 'Professional'],
    format: 'HTML',
    items: '25',
    category: 'Templates',
  },

  // ── Mockups (28-31) ─────────────────────────────────────────────────────────
  {
    title: 'Device Mockup Pack — 20 Mockups',
    description: 'High-quality device mockups featuring MacBook, iMac, iPhone, iPad, Android, and Apple Watch in various angles and environments. Smart object layers for easy screen replacement. Perfect for app showcases and portfolios.',
    tags: ['Mockups', 'Devices', 'iPhone', 'MacBook'],
    format: 'PSD + Figma',
    items: '20',
    category: 'Mockups',
  },
  {
    title: 'T-Shirt & Apparel Mockups — 15 Mockups',
    description: 'Realistic t-shirt, hoodie, and cap mockups for clothing brand presentations. Features multiple views (front, back, folded) on diverse models with smart objects for quick design placement and color changes.',
    tags: ['Mockups', 'Apparel', 'T-Shirt', 'Fashion'],
    format: 'PSD',
    items: '15',
    category: 'Mockups',
  },
  {
    title: 'Packaging Mockup Collection — 20 Mockups',
    description: 'Product packaging mockups including boxes, bottles, cans, bags, and labels in photorealistic settings. Perfect for brand presentations, product launches, and e-commerce listings with customizable lighting and backgrounds.',
    tags: ['Mockups', 'Packaging', 'Branding', 'Product'],
    format: 'PSD + Figma',
    items: '20',
    category: 'Mockups',
  },
  {
    title: 'Stationery & Brand Mockups — 15 Mockups',
    description: 'Complete brand identity mockup sets featuring business cards, letterheads, envelopes, folders, and office supplies. Showcases your branding in realistic environments with customizable shadows and background colors.',
    tags: ['Mockups', 'Stationery', 'Business Card', 'Brand'],
    format: 'PSD',
    items: '15',
    category: 'Mockups',
  },

  // ── Fonts & Typography (32-34) ──────────────────────────────────────────────
  {
    title: 'Modern Sans-Serif Font Bundle — 10 Fonts',
    description: 'Curated collection of modern sans-serif fonts perfect for UI design, branding, and web typography. Includes variable weights from thin to black with extensive language support, ligatures, and OpenType features.',
    tags: ['Fonts', 'Sans-Serif', 'Typography', 'Variable'],
    format: 'OTF + WOFF2',
    items: '10',
    category: 'Fonts',
  },
  {
    title: 'Display & Heading Font Pack — 8 Fonts',
    description: 'Eye-catching display fonts for headlines, posters, logos, and branding. Bold, expressive typefaces that command attention while maintaining readability. Includes stylistic alternates and special characters.',
    tags: ['Fonts', 'Display', 'Headings', 'Branding'],
    format: 'OTF + WOFF2',
    items: '8',
    category: 'Fonts',
  },
  {
    title: 'Monospace & Coding Font Collection — 6 Fonts',
    description: 'Developer-focused monospace fonts optimized for code editors and terminals. Features ligatures for programming, clear character distinction, and comfortable reading at small sizes. Supports Fira Code, JetBrains Mono style features.',
    tags: ['Fonts', 'Monospace', 'Coding', 'Developer'],
    format: 'OTF + WOFF2',
    items: '6',
    category: 'Fonts',
  },

  // ── 3D Assets (35-37) ───────────────────────────────────────────────────────
  {
    title: '3D Icon Collection — 50 Icons',
    description: 'Stunning 3D rendered icons for web and app interfaces featuring common UI elements, tech objects, and business concepts. High-resolution PNG exports with transparent backgrounds and original Blender source files for customization.',
    tags: ['3D', 'Icons', 'Render', 'Blender'],
    format: 'PNG + Blender',
    items: '50',
    category: '3D',
  },
  {
    title: '3D Character Pack — 15 Avatars',
    description: 'Customizable 3D character avatars in various poses, outfits, and expressions. Perfect for app onboarding, user profiles, and marketing. Includes ready-to-use renders and original 3D source files for pose and color customization.',
    tags: ['3D', 'Characters', 'Avatars', 'Customizable'],
    format: 'PNG + Blender',
    items: '15',
    category: '3D',
  },
  {
    title: '3D Abstract Shapes — 30 Objects',
    description: 'Elegant 3D abstract shapes including spheres, torus knots, crystals, and organic forms in pastel and metallic finishes. Ideal for hero sections, feature highlights, and modern web design with a premium aesthetic.',
    tags: ['3D', 'Abstract', 'Shapes', 'Modern'],
    format: 'PNG + Blender',
    items: '30',
    category: '3D',
  },

  // ── Photos & Stock (38-40) ──────────────────────────────────────────────────
  {
    title: 'Workspace & Tech Stock Photos — 40 Images',
    description: 'Professional workspace and technology stock photos featuring modern offices, laptops, meetings, remote work setups, and gadgets. All images shot with professional lighting and composition for commercial use.',
    tags: ['Photos', 'Workspace', 'Tech', 'Stock'],
    format: 'JPG (4K)',
    items: '40',
    category: 'Photos',
  },
  {
    title: 'Nature & Landscape Photo Pack — 35 Images',
    description: 'Stunning nature and landscape photographs covering mountains, oceans, forests, sunsets, and seasons. High-resolution images perfect for website backgrounds, blog headers, and environmental design projects.',
    tags: ['Photos', 'Nature', 'Landscape', 'Backgrounds'],
    format: 'JPG (4K)',
    items: '35',
    category: 'Photos',
  },
  {
    title: 'People & Lifestyle Stock Photos — 45 Images',
    description: 'Authentic lifestyle and people photography featuring diverse groups, teamwork, celebrations, and everyday moments. Natural, candid style that avoids stock photo clichés for genuine brand storytelling.',
    tags: ['Photos', 'People', 'Lifestyle', 'Diversity'],
    format: 'JPG (4K)',
    items: '45',
    category: 'Photos',
  },

  // ── Social Media (41-43) ────────────────────────────────────────────────────
  {
    title: 'Instagram Story Templates — 40 Stories',
    description: 'Animated and static Instagram Story templates for promotions, quotes, Q&A, polls, and announcements. Eye-catching designs with swipe-up placeholders and branded color schemes for consistent visual identity.',
    tags: ['Social Media', 'Instagram Stories', 'Animated', 'Templates'],
    format: 'Figma + MP4',
    items: '40',
    category: 'Social',
  },
  {
    title: 'YouTube Thumbnail Pack — 25 Thumbnails',
    description: 'Click-worthy YouTube thumbnail templates optimized for maximum click-through rate. Features bold text layouts, emotion-driven designs, and attention-grabbing compositions for gaming, tech, vlogs, and educational content.',
    tags: ['YouTube', 'Thumbnails', 'Video', 'CTR'],
    format: 'PSD + Figma',
    items: '25',
    category: 'Social',
  },
  {
    title: 'LinkedIn Banner & Post Templates — 20 Designs',
    description: 'Professional LinkedIn content templates including profile banners, carousel posts, and text-based thought leadership designs. Corporate-ready aesthetics that position you as an industry expert and drive engagement.',
    tags: ['LinkedIn', 'Banners', 'Professional', 'Branding'],
    format: 'Figma + Canva',
    items: '20',
    category: 'Social',
  },

  // ── Motion & Animation (44-46) ──────────────────────────────────────────────
  {
    title: 'Lottie Animation Pack — 30 Animations',
    description: 'Ready-to-use Lottie animations for loading states, success messages, empty states, onboarding, and micro-interactions. Lightweight JSON files that scale perfectly on any device. After Effects source files included for customization.',
    tags: ['Animation', 'Lottie', 'Micro-Interactions', 'UI'],
    format: 'JSON + AE',
    items: '30',
    category: 'Motion',
  },
  {
    title: 'Loading Spinner Collection — 20 Animations',
    description: 'Elegant loading spinner and progress animations in CSS, SVG, and Lottie formats. Covers dots, bars, circles, and creative spinners for web and mobile apps. All animations are lightweight and performant with reduced-motion alternatives.',
    tags: ['Animation', 'Loading', 'CSS', 'Spinners'],
    format: 'CSS + SVG + JSON',
    items: '20',
    category: 'Motion',
  },
  {
    title: 'Transition & Hover Effects Pack — 25 Effects',
    description: 'CSS and Framer Motion transition effects for page changes, element reveals, hover states, and scroll animations. Copy-paste ready code with configurable duration, easing, and direction for React and vanilla projects.',
    tags: ['Animation', 'Transitions', 'CSS', 'React'],
    format: 'CSS + React',
    items: '25',
    category: 'Motion',
  },
];

export default function DesignListContent() {
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    return assets.filter((asset) => {
      const matchCat = activeCategory === 'all' || asset.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        asset.title.toLowerCase().includes(q) ||
        asset.description.toLowerCase().includes(q) ||
        asset.tags.some((t) => t.toLowerCase().includes(q)) ||
        asset.category.toLowerCase().includes(q) ||
        asset.format.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: assets.length };
    assets.forEach((asset) => {
      counts[asset.category] = (counts[asset.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-transparent to-indigo-50/50 dark:from-purple-950/30 dark:via-transparent dark:to-indigo-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
              <Palette className="h-7 w-7 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Design Assets</h1>
              <p className="text-muted-foreground mt-1">Free visual resources for your creative projects</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Discover curated design assets for your creative projects. Browse icons, illustrations, gradients, textures, UI kits, mockups, templates, and more — all free to download and use in personal and commercial projects.
          </p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="text-sm px-3 py-1">{assets.length} Collections</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Free Commercial Use</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Vector + Raster</Badge>
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
              placeholder="Search design assets by title, format, or tag..."
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
                    ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-700'
                    : 'bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
                <span className={`ml-0.5 text-xs ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Design Assets Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No design assets found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((asset, i) => {
              const CatIcon = getCategoryIcon(asset.category);
              const gradient = getCoverGradient(asset.category, i);
              return (
                <Card key={asset.title} className="group overflow-hidden hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
                  {/* Cover - CSS Gradient */}
                  <div className={`relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-5 text-center`}>
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-3 right-4 w-12 h-12 border-2 border-white/30 rounded-lg rotate-12" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full" />
                      <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-white/25 rounded-md -rotate-6" />
                    </div>
                    {/* Category icon */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CatIcon className="h-7 w-7 text-white" />
                    </div>
                    {/* Format Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 text-foreground">
                        {asset.format}
                      </span>
                    </div>
                    {/* Items count */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs z-10 bg-black/40 px-2 py-0.5 rounded-md">
                      <Layers className="h-3 w-3" />
                      {asset.items} items
                    </div>
                    {/* Category badge */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getCategoryColor(asset.category)}`}>
                        {asset.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1.5 line-clamp-2 min-h-[2.5rem]">
                      {asset.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {asset.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {asset.tags.length > 3 && (
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                          +{asset.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {asset.format}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{asset.items} items</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-8">
          <h3 className="text-xl font-bold mb-2">Created something amazing?</h3>
          <p className="text-sm text-muted-foreground mb-4">Share your design assets with creators around the world on Zenvoora</p>
          <Link href="/">
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <Sparkles className="h-4 w-4" />
              Share Your Assets
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
