import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Palette, Download, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

export const metadata: Metadata = {
  title: 'Free Design Assets — Images, Icons & Graphics',
  description: 'Download free design assets including icon packs, gradients, textures, illustrations, and social media templates. High-quality visual resources on Zenvoora.',
  openGraph: {
    title: 'Free Design Assets | Zenvoora',
    description: 'Download free design assets including icons, gradients, textures, and more.',
  },
};

const assets = [
  {
    title: 'Essential UI Icon Pack — 200+ Icons',
    description: 'A comprehensive collection of 200+ minimal, consistent UI icons in SVG and PNG formats. Covers navigation, social media, commerce, media, and utility categories. Perfect for web and mobile apps.',
    image: '/resources/design/icon-pack.png',
    tags: ['Icons', 'UI', 'SVG', 'Mobile'],
    format: 'SVG + PNG',
    items: '200+',
    downloads: '45.2K',
    color: 'emerald',
  },
  {
    title: 'Premium Gradient Collection — 50 Backgrounds',
    description: 'Fifty handcrafted gradient backgrounds in various color combinations from warm sunsets to cool ocean tones. Available in high resolution (4K) with CSS code included for web use.',
    image: '/resources/design/gradient-pack.png',
    tags: ['Gradients', 'Backgrounds', 'CSS', '4K'],
    format: 'PNG + CSS',
    items: '50',
    downloads: '32.8K',
    color: 'purple',
  },
  {
    title: 'Social Media Templates — 30 Posts',
    description: 'Professionally designed Instagram and social media post templates with photo placeholders, modern typography, and on-brand color schemes. Fully editable in Figma and Canva.',
    image: '/resources/design/social-templates.png',
    tags: ['Social Media', 'Instagram', 'Figma', 'Templates'],
    format: 'FIG + PNG',
    items: '30',
    downloads: '28.5K',
    color: 'pink',
  },
  {
    title: 'Geometric Pattern Pack — 40 Patterns',
    description: 'Clean geometric patterns including waves, hexagons, chevrons, dots, and line art in both monochrome and color variations. Scalable vector format with transparent backgrounds.',
    image: '/resources/design/pattern-pack.png',
    tags: ['Patterns', 'Geometric', 'Vector', 'Abstract'],
    format: 'SVG + PNG',
    items: '40',
    downloads: '19.3K',
    color: 'blue',
  },
  {
    title: 'Flat Illustration Pack — 25 Scenes',
    description: 'Charming flat-style illustrations depicting people at work, office scenes, technology, and collaboration. Perfect for landing pages, presentations, and marketing materials.',
    image: '/resources/design/illustration-pack.png',
    tags: ['Illustrations', 'Flat Design', 'People', 'Vector'],
    format: 'SVG + PNG',
    items: '25',
    downloads: '37.1K',
    color: 'orange',
  },
  {
    title: 'Natural Texture Pack — 30 Textures',
    description: 'High-resolution natural textures including marble, wood grain, paper, concrete, fabric, and watercolor. Ideal for overlays, backgrounds, and adding depth to design projects.',
    image: '/resources/design/texture-pack.png',
    tags: ['Textures', 'Natural', 'Overlay', 'Hi-Res'],
    format: 'PNG (4K)',
    items: '30',
    downloads: '22.6K',
    color: 'amber',
  },
];

const categories = [
  { name: 'All Assets', active: true },
  { name: 'Icons', active: false },
  { name: 'Gradients', active: false },
  { name: 'Illustrations', active: false },
  { name: 'Textures', active: false },
  { name: 'Templates', active: false },
];

function getColorClasses(color: string) {
  const map: Record<string, { border: string; bg: string; button: string }> = {
    emerald: { border: 'hover:border-emerald-300 dark:hover:border-emerald-700', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800', button: 'bg-purple-600 hover:bg-purple-700' },
    purple: { border: 'hover:border-purple-300 dark:hover:border-purple-700', bg: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800', button: 'bg-purple-600 hover:bg-purple-700' },
    pink: { border: 'hover:border-pink-300 dark:hover:border-pink-700', bg: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800', button: 'bg-purple-600 hover:bg-purple-700' },
    blue: { border: 'hover:border-blue-300 dark:hover:border-blue-700', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800', button: 'bg-purple-600 hover:bg-purple-700' },
    orange: { border: 'hover:border-orange-300 dark:hover:border-orange-700', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800', button: 'bg-purple-600 hover:bg-purple-700' },
    amber: { border: 'hover:border-amber-300 dark:hover:border-amber-700', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800', button: 'bg-purple-600 hover:bg-purple-700' },
  };
  return map[color] || map.purple;
}

export default function DesignPage() {
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
            Discover curated design assets for your creative projects. Browse icons, gradients, illustrations, textures, and social media templates — all free to download and use in personal and commercial projects.
          </p>
          <div className="flex items-center gap-4 mt-6">
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

      {/* Category Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                cat.active
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-background border-border hover:border-purple-300 dark:hover:border-purple-700 text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Design Assets Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => {
            const colors = getColorClasses(asset.color);
            return (
              <Card key={asset.title} className={`group overflow-hidden hover:shadow-xl ${colors.border} transition-all duration-300`}>
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={asset.image}
                    alt={asset.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Format Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-foreground border-0 text-xs font-medium">
                      {asset.format}
                    </Badge>
                  </div>
                  {/* Items + Downloads */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      <Layers className="h-3 w-3" />
                      {asset.items} items
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      <Download className="h-3 w-3" />
                      {asset.downloads}
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="text-base font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                    {asset.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {asset.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {asset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className={`w-full ${colors.button} text-white gap-2`} size="sm">
                    <Download className="h-4 w-4" />
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

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
