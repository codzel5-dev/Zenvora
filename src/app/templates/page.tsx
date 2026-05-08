import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutTemplate, Download, ArrowRight, Star, FileText, Table2, Presentation, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ads/ad-banner';

export const metadata: Metadata = {
  title: 'Free Templates — Download Professional Templates',
  description: 'Download free professional templates for resumes, invoices, business plans, presentations, and more. Ready-to-use templates for every need on Zenvoora.',
  openGraph: {
    title: 'Free Templates | Zenvoora',
    description: 'Download free professional templates for resumes, invoices, business plans, and more.',
  },
};

const templates = [
  {
    title: 'Professional Resume Template',
    description: 'A clean, modern resume layout with sections for experience, skills, education, and a professional summary. ATS-friendly format that works with applicant tracking systems.',
    image: '/resources/templates/resume-template.png',
    tags: ['Resume', 'CV', 'Career', 'ATS-friendly'],
    type: 'Document',
    icon: FileText,
    format: 'DOCX / PDF',
    downloads: '12.4K',
  },
  {
    title: 'Business Invoice Template',
    description: 'Professional invoice template with company details, itemized billing, tax calculations, and payment terms. Perfect for freelancers and small businesses.',
    image: '/resources/templates/invoice-template.png',
    tags: ['Invoice', 'Billing', 'Finance', 'Freelance'],
    type: 'Spreadsheet',
    icon: Table2,
    format: 'XLSX / PDF',
    downloads: '8.7K',
  },
  {
    title: 'Business Plan Presentation',
    description: 'Comprehensive business plan slide deck with market analysis, financial projections, competitive landscape, and executive summary layouts.',
    image: '/resources/templates/business-plan.png',
    tags: ['Business Plan', 'Startup', 'Investment', 'Pitch'],
    type: 'Presentation',
    icon: Presentation,
    format: 'PPTX / PDF',
    downloads: '15.2K',
  },
  {
    title: 'Project Proposal Template',
    description: 'Elegant project proposal document with scope definition, timeline, budget breakdown, deliverables, and team structure sections.',
    image: '/resources/templates/proposal-template.png',
    tags: ['Proposal', 'Project', 'Client', 'Consulting'],
    type: 'Document',
    icon: FileText,
    format: 'DOCX / PDF',
    downloads: '6.3K',
  },
  {
    title: 'Marketing Report Template',
    description: 'Data-driven marketing report with KPI dashboards, campaign analytics, ROI tracking, and channel performance sections with chart placeholders.',
    image: '/resources/templates/marketing-report.png',
    tags: ['Marketing', 'Analytics', 'Report', 'KPI'],
    type: 'Document',
    icon: FileSpreadsheet,
    format: 'XLSX / PDF',
    downloads: '9.1K',
  },
  {
    title: 'Meeting Notes Template',
    description: 'Structured meeting notes layout with agenda items, action items with assignees, decision log, and follow-up tasks. Keep every meeting productive and documented.',
    image: '/resources/templates/meeting-notes.png',
    tags: ['Meeting', 'Notes', 'Productivity', 'Team'],
    type: 'Document',
    icon: FileText,
    format: 'DOCX / PDF',
    downloads: '5.8K',
  },
];

const categories = [
  { name: 'All Templates', active: true },
  { name: 'Documents', active: false },
  { name: 'Spreadsheets', active: false },
  { name: 'Presentations', active: false },
  { name: 'Resumes', active: false },
  { name: 'Finance', active: false },
];

export default function TemplatesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-transparent to-emerald-50/50 dark:from-emerald-950/30 dark:via-transparent dark:to-emerald-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <LayoutTemplate className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Free Templates</h1>
              <p className="text-muted-foreground mt-1">Professional templates ready to download and use</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Browse our curated collection of professionally designed templates. From business documents and spreadsheets to presentations and resumes — all free to download, customize, and use for any purpose.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">{templates.length} Templates</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">100% Free</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">No Sign-up</Badge>
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
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-background border-border hover:border-emerald-300 dark:hover:border-emerald-700 text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.title} className="group overflow-hidden hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Format Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-foreground border-0 text-xs font-medium">
                    {template.format}
                  </Badge>
                </div>
                {/* Downloads Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  <Download className="h-3 w-3" />
                  {template.downloads}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <template.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-medium text-muted-foreground">{template.type}</span>
                </div>
                <h3 className="text-base font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2" size="sm">
                  <Download className="h-4 w-4" />
                  Download Free
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-8">
          <h3 className="text-xl font-bold mb-2">Need a custom template?</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload your own templates to share with the Zenvoora community</p>
          <Link href="/">
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              Upload a Template
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
