'use client';

import * as React from 'react';
import Link from 'next/link';
import { LayoutTemplate, Upload, ArrowRight, Search, FileText, Table2, Presentation, FileSpreadsheet, Briefcase, ClipboardList, BarChart3, Users, Megaphone, Heart, GraduationCap, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdBanner } from '@/components/ads/ad-banner';

// ─── Category Definitions ────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Templates', icon: LayoutTemplate },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Finance', label: 'Finance & Accounting', icon: BarChart3 },
  { id: 'Marketing', label: 'Marketing', icon: Megaphone },
  { id: 'HR', label: 'HR & People', icon: Users },
  { id: 'Project', label: 'Project Management', icon: ClipboardList },
  { id: 'Career', label: 'Career & Resume', icon: FileText },
  { id: 'Education', label: 'Education', icon: GraduationCap },
  { id: 'Legal', label: 'Legal', icon: Shield },
  { id: 'Personal', label: 'Personal', icon: Heart },
  { id: 'Productivity', label: 'Productivity', icon: Lightbulb },
];

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Business: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Finance: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Marketing: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
    HR: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    Project: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
    Career: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    Education: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
    Legal: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
    Personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    Productivity: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  };
  return map[cat] || 'bg-gray-100 text-gray-700';
}

function getTypeIcon(type: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Document: FileText,
    Spreadsheet: Table2,
    Presentation: Presentation,
    Worksheet: FileSpreadsheet,
  };
  return map[type] || FileText;
}

// ─── 55+ Templates ───────────────────────────────────────────────────────────
const templates = [
  // ── Business (1-10) ──────────────────────────────────────────────────────
  { title: 'Professional Resume Template', description: 'A clean, modern resume layout with sections for experience, skills, education, and a professional summary. ATS-friendly format that passes applicant tracking systems used by major companies.', tags: ['Resume', 'CV', 'Career', 'ATS'], type: 'Document', format: 'DOCX / PDF', category: 'Career' },
  { title: 'Business Plan Template', description: 'Comprehensive business plan document with executive summary, market analysis, competitive landscape, financial projections, and implementation roadmap. Designed for investors and lenders.', tags: ['Business Plan', 'Startup', 'Investment', 'Strategy'], type: 'Document', format: 'DOCX / PDF', category: 'Business' },
  { title: 'Business Invoice Template', description: 'Professional invoice template with company details, itemized billing, tax calculations, payment terms, and bank details. Perfect for freelancers, agencies, and small businesses.', tags: ['Invoice', 'Billing', 'Finance', 'Freelance'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Finance' },
  { title: 'Project Proposal Template', description: 'Elegant project proposal document with scope definition, timeline, budget breakdown, deliverables, team structure, and risk assessment sections. Win more client projects.', tags: ['Proposal', 'Project', 'Client', 'Consulting'], type: 'Document', format: 'DOCX / PDF', category: 'Business' },
  { title: 'Meeting Agenda & Notes Template', description: 'Structured meeting template with agenda items, time allocations, discussion notes, action items with assignees and deadlines, decision log, and follow-up tasks.', tags: ['Meeting', 'Notes', 'Productivity', 'Team'], type: 'Document', format: 'DOCX / PDF', category: 'Productivity' },
  { title: 'SWOT Analysis Template', description: 'Professional SWOT analysis framework with sections for Strengths, Weaknesses, Opportunities, and Threats. Includes action planning matrix and strategic recommendations sections.', tags: ['SWOT', 'Strategy', 'Analysis', 'Planning'], type: 'Document', format: 'DOCX / PDF', category: 'Business' },
  { title: 'Business Model Canvas', description: 'One-page business model canvas covering key partners, activities, resources, value propositions, customer relationships, channels, customer segments, cost structure, and revenue streams.', tags: ['Business Model', 'Canvas', 'Startup', 'Strategy'], type: 'Document', format: 'PDF', category: 'Business' },
  { title: 'Executive Summary Template', description: 'Concise executive summary format for reports and proposals. Includes problem statement, solution overview, key findings, financial highlights, and recommendations sections.', tags: ['Executive Summary', 'Report', 'Leadership', 'Business'], type: 'Document', format: 'DOCX / PDF', category: 'Business' },
  { title: 'Company Profile Template', description: 'Professional company profile with history, mission, team, services, achievements, client testimonials, and contact information. Perfect for B2B presentations and proposals.', tags: ['Company Profile', 'About', 'Corporate', 'B2B'], type: 'Presentation', format: 'PPTX / PDF', category: 'Business' },
  { title: 'Partnership Agreement Template', description: 'Formal partnership agreement covering roles, responsibilities, profit sharing, decision-making, dispute resolution, and exit clauses. Consult a lawyer before use.', tags: ['Partnership', 'Agreement', 'Legal', 'Business'], type: 'Document', format: 'DOCX / PDF', category: 'Legal' },

  // ── Finance & Accounting (11-18) ─────────────────────────────────────────
  { title: 'Monthly Budget Tracker', description: 'Detailed monthly budget spreadsheet with income tracking, expense categories, savings goals, and automatic calculations for net income and budget variance analysis.', tags: ['Budget', 'Finance', 'Tracking', 'Personal'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Finance' },
  { title: 'Financial Projection Model', description: '3-year financial projection spreadsheet with revenue forecasts, expense modeling, cash flow analysis, break-even calculations, and sensitivity analysis tabs.', tags: ['Financial Model', 'Projection', 'Startup', 'Investor'], type: 'Spreadsheet', format: 'XLSX', category: 'Finance' },
  { title: 'Expense Report Template', description: 'Employee expense report with date, category, description, amount fields, receipt attachment log, mileage tracking, and automatic totals with tax calculations.', tags: ['Expense Report', 'Reimbursement', 'Corporate', 'Travel'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Finance' },
  { title: 'Cash Flow Statement Template', description: 'Professional cash flow statement following standard accounting format. Operating, investing, and financing activities sections with beginning and ending cash balances.', tags: ['Cash Flow', 'Accounting', 'Financial', 'Statement'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Finance' },
  { title: 'Profit & Loss Statement', description: 'Income statement template with revenue, cost of goods sold, gross profit, operating expenses, net income, and margin calculations. Monthly and annual views included.', tags: ['P&L', 'Income Statement', 'Accounting', 'Business'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Finance' },
  { title: 'Invoice Tracker Spreadsheet', description: 'Track all invoices in one place with client name, invoice number, date, amount, due date, payment status, and overdue alerts. Dashboard with receivables summary.', tags: ['Invoice', 'Tracker', 'Accounts', 'Freelance'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Finance' },
  { title: 'Tax Preparation Checklist', description: 'Comprehensive tax preparation checklist covering income documents, deductions, credits, business expenses, and filing requirements. Organized by category with deadline tracking.', tags: ['Tax', 'Checklist', 'Finance', 'Annual'], type: 'Document', format: 'PDF', category: 'Finance' },
  { title: 'Payroll Calculator Template', description: 'Employee payroll calculator with hourly/salary inputs, overtime, tax withholdings, benefits deductions, and net pay calculations. Supports multiple employees.', tags: ['Payroll', 'Calculator', 'HR', 'Wages'], type: 'Spreadsheet', format: 'XLSX', category: 'Finance' },

  // ── Marketing (19-27) ────────────────────────────────────────────────────
  { title: 'Marketing Plan Template', description: 'Complete marketing plan with situation analysis, target audience, positioning strategy, marketing mix (4Ps), budget allocation, campaign calendar, and KPI tracking framework.', tags: ['Marketing Plan', 'Strategy', 'Campaign', 'Growth'], type: 'Document', format: 'DOCX / PDF', category: 'Marketing' },
  { title: 'Content Calendar Template', description: 'Monthly and weekly content calendar with post titles, content types, channels, publishing times, status tracking, and performance metrics. Supports blog, social media, and email.', tags: ['Content Calendar', 'Social Media', 'Planning', 'Editorial'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Marketing' },
  { title: 'Social Media Strategy Template', description: 'Social media strategy document with platform selection, content pillars, posting frequency, audience personas, hashtag strategy, engagement tactics, and measurement framework.', tags: ['Social Media', 'Strategy', 'Digital', 'Content'], type: 'Document', format: 'DOCX / PDF', category: 'Marketing' },
  { title: 'Email Marketing Campaign Template', description: 'Email campaign planning template with sequence mapping, subject line A/B test tracking, open/click rates, segmentation rules, and automation workflow documentation.', tags: ['Email Marketing', 'Campaign', 'Automation', 'CRM'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Marketing' },
  { title: 'Brand Guidelines Template', description: 'Comprehensive brand guidelines document covering logo usage, color palette with hex codes, typography system, imagery style, tone of voice, and do/don\'t examples.', tags: ['Brand', 'Guidelines', 'Design', 'Identity'], type: 'Document', format: 'PDF', category: 'Marketing' },
  { title: 'SEO Audit Template', description: 'Technical SEO audit checklist with on-page factors, site speed metrics, backlink analysis, keyword tracking, content gaps, and prioritized action items with effort estimates.', tags: ['SEO', 'Audit', 'Technical', 'Website'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Marketing' },
  { title: 'Competitor Analysis Template', description: 'Detailed competitor analysis framework covering product features, pricing, marketing channels, social media presence, customer reviews, positioning map, and opportunity gaps.', tags: ['Competitor', 'Analysis', 'Market', 'Research'], type: 'Document', format: 'DOCX / PDF', category: 'Marketing' },
  { title: 'Campaign Performance Report', description: 'Marketing campaign performance report template with spend tracking, impressions, clicks, conversions, ROAS, CPA, and channel-by-channel breakdown with visual chart placeholders.', tags: ['Campaign', 'Report', 'ROI', 'Analytics'], type: 'Presentation', format: 'PPTX / PDF', category: 'Marketing' },
  { title: 'Influencer Collaboration Brief', description: 'Influencer marketing brief with campaign overview, deliverables, content guidelines, hashtag requirements, timeline, compensation, and approval workflow.', tags: ['Influencer', 'Brief', 'Collaboration', 'Social'], type: 'Document', format: 'DOCX / PDF', category: 'Marketing' },

  // ── HR & People (28-35) ──────────────────────────────────────────────────
  { title: 'Job Description Template', description: 'Professional job description format with company overview, role summary, responsibilities, requirements, benefits, and equal opportunity statement. Optimized for job boards.', tags: ['Job Description', 'Hiring', 'HR', 'Recruitment'], type: 'Document', format: 'DOCX / PDF', category: 'HR' },
  { title: 'Interview Scorecard Template', description: 'Structured interview evaluation form with competency ratings, behavioral question notes, strengths/weaknesses assessment, and overall recommendation with hiring decision matrix.', tags: ['Interview', 'Scorecard', 'Hiring', 'Evaluation'], type: 'Document', format: 'PDF', category: 'HR' },
  { title: 'Employee Onboarding Checklist', description: '90-day onboarding checklist with pre-start preparations, day-one schedule, week-one priorities, 30/60/90-day milestones, buddy assignment, and manager check-in schedule.', tags: ['Onboarding', 'New Hire', 'Checklist', 'HR'], type: 'Document', format: 'DOCX / PDF', category: 'HR' },
  { title: 'Performance Review Template', description: 'Employee performance review form with self-assessment, manager evaluation, goal review, competency ratings, development plan, and career discussion sections.', tags: ['Performance Review', 'Feedback', 'Evaluation', 'HR'], type: 'Document', format: 'DOCX / PDF', category: 'HR' },
  { title: 'Employee Engagement Survey', description: 'Comprehensive engagement survey with Likert-scale questions covering job satisfaction, manager effectiveness, growth opportunities, company culture, and well-being.', tags: ['Engagement', 'Survey', 'Culture', 'Feedback'], type: 'Document', format: 'PDF', category: 'HR' },
  { title: 'Training Plan Template', description: 'Employee training and development plan with skill gap analysis, learning objectives, training methods, timeline, budget, and progress tracking sections.', tags: ['Training', 'Development', 'Learning', 'Skills'], type: 'Document', format: 'DOCX / PDF', category: 'HR' },
  { title: 'Time Off Request Form', description: 'Employee time-off request template with date range, reason, coverage plan, manager approval section, and balance tracking for vacation, sick, and personal days.', tags: ['Time Off', 'Leave', 'Request', 'HR'], type: 'Document', format: 'PDF', category: 'HR' },
  { title: 'Remote Work Policy Template', description: 'Remote work policy covering eligibility, equipment requirements, communication expectations, availability guidelines, data security, and performance measurement.', tags: ['Remote Work', 'Policy', 'WFH', 'Guidelines'], type: 'Document', format: 'DOCX / PDF', category: 'HR' },

  // ── Project Management (36-44) ───────────────────────────────────────────
  { title: 'Project Charter Template', description: 'Formal project charter with project purpose, objectives, scope, stakeholders, milestones, budget, risks, and approval sign-off. Get project authorization right the first time.', tags: ['Project Charter', 'Initiation', 'Authorization', 'PM'], type: 'Document', format: 'DOCX / PDF', category: 'Project' },
  { title: 'Gantt Chart Template', description: 'Visual Gantt chart spreadsheet with task names, start/end dates, dependencies, progress tracking, milestones, and critical path highlighting. Color-coded by project phase.', tags: ['Gantt Chart', 'Timeline', 'Schedule', 'Planning'], type: 'Spreadsheet', format: 'XLSX', category: 'Project' },
  { title: 'Sprint Planning Template', description: 'Agile sprint planning board with sprint goal, user stories, story points, task assignments, sprint backlog, and retrospective action items. Supports Scrum methodology.', tags: ['Sprint', 'Agile', 'Scrum', 'Planning'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Project' },
  { title: 'Risk Register Template', description: 'Project risk register with risk description, category, likelihood, impact, risk score, mitigation strategy, owner, status, and review date. Prioritized by risk level.', tags: ['Risk Register', 'Risk Management', 'Assessment', 'PM'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Project' },
  { title: 'Status Report Template', description: 'Weekly project status report with summary, completed tasks, upcoming work, blockers, budget status, timeline variance, and key decisions needed from stakeholders.', tags: ['Status Report', 'Weekly', 'Update', 'Communication'], type: 'Document', format: 'DOCX / PDF', category: 'Project' },
  { title: 'RACI Matrix Template', description: 'Responsibility assignment matrix (RACI) with tasks and deliverables mapped to team members as Responsible, Accountable, Consulted, or Informed. Clear ownership for every task.', tags: ['RACI', 'Responsibility', 'Matrix', 'Roles'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Project' },
  { title: 'Change Request Form', description: 'Formal change request template with change description, justification, impact analysis (scope, timeline, budget), approval workflow, and implementation plan.', tags: ['Change Request', 'Scope', 'Approval', 'PM'], type: 'Document', format: 'DOCX / PDF', category: 'Project' },
  { title: 'Resource Allocation Template', description: 'Resource planning spreadsheet with team members, project assignments, availability percentages, skill matching, and utilization rate calculations. Avoid overallocation.', tags: ['Resource', 'Allocation', 'Planning', 'Capacity'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Project' },
  { title: 'Project Retrospective Template', description: 'Post-project retrospective document with what went well, what could improve, lessons learned, actionable takeaways, and team feedback. Turn experience into improvement.', tags: ['Retrospective', 'Lessons Learned', 'Agile', 'Improvement'], type: 'Document', format: 'DOCX / PDF', category: 'Project' },

  // ── Career & Resume (45-50) ──────────────────────────────────────────────
  { title: 'Cover Letter Template', description: 'Professional cover letter format with attention-grabbing opening, relevant experience highlights, company-specific value proposition, and confident closing with call-to-action.', tags: ['Cover Letter', 'Job Application', 'Career', 'Writing'], type: 'Document', format: 'DOCX / PDF', category: 'Career' },
  { title: 'Creative Resume Template', description: 'Modern creative resume design for designers, marketers, and creative professionals. Visual layout with portfolio section, skills showcase, and personality-forward design.', tags: ['Creative Resume', 'Design', 'Portfolio', 'Visual'], type: 'Document', format: 'PDF', category: 'Career' },
  { title: 'LinkedIn Profile Optimizer', description: 'Step-by-step LinkedIn profile optimization checklist with headline formulas, about section templates, experience writing tips, skills strategy, and networking best practices.', tags: ['LinkedIn', 'Profile', 'Networking', 'Personal Brand'], type: 'Document', format: 'PDF', category: 'Career' },
  { title: 'Interview Preparation Worksheet', description: 'Interview prep document with company research template, common questions with answer frameworks (STAR method), questions to ask, and post-interview follow-up templates.', tags: ['Interview', 'Preparation', 'Questions', 'Career'], type: 'Document', format: 'DOCX / PDF', category: 'Career' },
  { title: 'Thank You Email After Interview', description: 'Post-interview thank you email templates for different scenarios: standard follow-up, after second interview, after rejection, and when you want to reiterate interest.', tags: ['Thank You', 'Follow-up', 'Interview', 'Email'], type: 'Document', format: 'DOCX / PDF', category: 'Career' },
  { title: 'Career Development Plan', description: 'Individual career development plan with current skills assessment, career goals, skill gaps, development activities, timeline, mentor identification, and progress milestones.', tags: ['Career Plan', 'Development', 'Growth', 'Goals'], type: 'Document', format: 'DOCX / PDF', category: 'Career' },

  // ── Education (51-55) ────────────────────────────────────────────────────
  { title: 'Lesson Plan Template', description: 'Structured lesson plan format with learning objectives, materials list, hook activity, direct instruction, guided practice, independent practice, assessment, and reflection sections.', tags: ['Lesson Plan', 'Teaching', 'Education', 'Classroom'], type: 'Document', format: 'DOCX / PDF', category: 'Education' },
  { title: 'Rubric Template', description: 'Customizable grading rubric with criteria rows, performance level columns (Exemplary to Unsatisfactory), point values, and description cells. Adaptable for any assignment type.', tags: ['Rubric', 'Grading', 'Assessment', 'Criteria'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Education' },
  { title: 'Student Progress Tracker', description: 'Student tracking spreadsheet with grades, attendance, assignment completion, participation scores, and trend analysis. Individual and class-level views with chart support.', tags: ['Student', 'Progress', 'Tracking', 'Grades'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Education' },
  { title: 'Course Syllabus Template', description: 'Academic course syllabus with course description, learning outcomes, schedule, grading policy, required materials, academic integrity policy, and instructor contact information.', tags: ['Syllabus', 'Course', 'Academic', 'University'], type: 'Document', format: 'DOCX / PDF', category: 'Education' },
  { title: 'Research Paper Template', description: 'Academic research paper template following standard format: title page, abstract, introduction, literature review, methodology, results, discussion, references, and appendices.', tags: ['Research Paper', 'Academic', 'APA', 'Writing'], type: 'Document', format: 'DOCX / PDF', category: 'Education' },

  // ── Legal (56-59) ────────────────────────────────────────────────────────
  { title: 'Non-Disclosure Agreement (NDA)', description: 'Mutual NDA template covering definition of confidential information, obligations, exclusions, term and survival, remedies, and governing law. Have a lawyer review before use.', tags: ['NDA', 'Confidentiality', 'Agreement', 'Legal'], type: 'Document', format: 'DOCX / PDF', category: 'Legal' },
  { title: 'Freelance Contract Template', description: 'Freelancer-client contract with scope of work, deliverables, timeline, payment terms, revision policy, intellectual property rights, termination clause, and dispute resolution.', tags: ['Freelance', 'Contract', 'Service', 'Agreement'], type: 'Document', format: 'DOCX / PDF', category: 'Legal' },
  { title: 'Terms of Service Template', description: 'Website terms of service covering user accounts, acceptable use, intellectual property, disclaimers, limitation of liability, and dispute resolution. Customize for your specific service.', tags: ['Terms of Service', 'ToS', 'Website', 'Legal'], type: 'Document', format: 'DOCX / PDF', category: 'Legal' },
  { title: 'Privacy Policy Template', description: 'GDPR and CCPA-compliant privacy policy template covering data collection, usage, cookies, third-party services, user rights, data retention, and contact information.', tags: ['Privacy Policy', 'GDPR', 'CCPA', 'Data'], type: 'Document', format: 'DOCX / PDF', category: 'Legal' },

  // ── Personal (60-65) ────────────────────────────────────────────────────
  { title: 'Weekly Meal Planner', description: 'Weekly meal planning template with breakfast, lunch, dinner, and snacks for each day. Includes grocery list generator, calorie tracking column, and prep notes for batch cooking.', tags: ['Meal Plan', 'Food', 'Health', 'Planning'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Personal' },
  { title: 'Habit Tracker Template', description: 'Monthly habit tracker with daily checkmarks for up to 12 habits, streak counting, completion rate calculations, and monthly reflection prompts. Build consistency with visual progress.', tags: ['Habit', 'Tracker', 'Goals', 'Self-improvement'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Personal' },
  { title: 'Travel Itinerary Template', description: 'Detailed travel itinerary with flight details, hotel bookings, daily schedule, restaurant reservations, activity plans, emergency contacts, and packing checklist.', tags: ['Travel', 'Itinerary', 'Planning', 'Vacation'], type: 'Document', format: 'DOCX / PDF', category: 'Personal' },
  { title: 'Wedding Planning Checklist', description: '12-month wedding planning timeline with venue, catering, photography, flowers, music, attire, invitations, and day-of coordination checklist. Never miss a deadline.', tags: ['Wedding', 'Planning', 'Checklist', 'Events'], type: 'Spreadsheet', format: 'XLSX / PDF', category: 'Personal' },
  { title: 'Fitness Workout Log', description: 'Workout tracking template with exercise name, sets, reps, weight, rest time, personal records, and weekly progress charts. Supports multiple workout splits and routines.', tags: ['Fitness', 'Workout', 'Gym', 'Health'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Personal' },
  { title: 'Reading List Tracker', description: 'Book tracking spreadsheet with title, author, genre, start/end dates, rating, review notes, and yearly reading goals. Statistics page with genres and pages read.', tags: ['Reading', 'Books', 'Tracker', 'Goals'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Personal' },

  // ── Productivity (66-72) ─────────────────────────────────────────────────
  { title: 'Daily Planner Template', description: 'Detailed daily planner with time blocks from 6am to 10pm, top 3 priorities, to-do list, hydration tracker, gratitude section, and evening reflection prompts.', tags: ['Daily Planner', 'Schedule', 'Time Blocking', 'Focus'], type: 'Document', format: 'PDF', category: 'Productivity' },
  { title: 'Weekly Review Template', description: 'Structured weekly review with accomplishments, incomplete tasks, lessons learned, energy assessment, next week priorities, and habit tracking. Improve continuously.', tags: ['Weekly Review', 'Reflection', 'Planning', 'Progress'], type: 'Document', format: 'DOCX / PDF', category: 'Productivity' },
  { title: 'Goal Setting Worksheet', description: 'Goal setting framework with SMART goal definition, milestone breakdown, habit stacking plan, obstacle anticipation, accountability structure, and progress tracking sections.', tags: ['Goals', 'SMART', 'Planning', 'Motivation'], type: 'Document', format: 'PDF', category: 'Productivity' },
  { title: 'Decision Matrix Template', description: 'Weighted decision matrix spreadsheet with criteria, weights, options, scoring, and automatic weighted totals. Make complex decisions systematically instead of guessing.', tags: ['Decision Matrix', 'Analysis', 'Framework', 'Logic'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Productivity' },
  { title: 'Eisenhower Matrix Template', description: 'Urgent/Important priority matrix with four quadrants: Do First, Schedule, Delegate, and Eliminate. Categorize tasks visually and focus on what truly matters.', tags: ['Eisenhower', 'Priority', 'Matrix', 'Time Management'], type: 'Document', format: 'PDF', category: 'Productivity' },
  { title: 'Brainstorming Session Template', description: 'Structured brainstorming template with problem statement, warm-up exercises, ideation rounds, dot voting matrix, idea evaluation criteria, and action plan for top concepts.', tags: ['Brainstorming', 'Ideation', 'Creativity', 'Facilitation'], type: 'Document', format: 'DOCX / PDF', category: 'Productivity' },
  { title: 'Kanban Board Template', description: 'Visual Kanban board with To Do, In Progress, Review, and Done columns. Track task cards with assignee, priority, due date, and blockers. For personal or team use.', tags: ['Kanban', 'Board', 'Agile', 'Workflow'], type: 'Spreadsheet', format: 'XLSX / Google Sheets', category: 'Productivity' },
];

// ─── Template Card Component ─────────────────────────────────────────────────
function TemplateCard({ template }: { template: typeof templates[0] }) {
  const TypeIcon = getTypeIcon(template.type);

  return (
    <Card className="group hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <TypeIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-medium text-muted-foreground">{template.type}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{template.format}</span>
        </div>
        <h3 className="text-base font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
          {template.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          <Badge className={`text-[10px] ${getCategoryColor(template.category)}`}>
            {template.category}
          </Badge>
        </div>
        <Link href="/" className="w-full block">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2" size="sm">
            <Upload className="h-4 w-4" />
            Upload & Share
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function TemplatesListContent() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTemplates = React.useMemo(() => {
    let result = templates;

    if (activeCategory !== 'all') {
      result = result.filter((t) => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          t.category.toLowerCase().includes(query) ||
          t.type.toLowerCase().includes(query) ||
          t.format.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    for (const t of templates) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-transparent to-emerald-50/50 dark:from-emerald-950/30 dark:via-transparent dark:to-emerald-950/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <LayoutTemplate className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Free Templates</h1>
              <p className="text-muted-foreground mt-1">Professional templates for every need</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-3 leading-relaxed">
            Browse our collection of {templates.length} professionally designed templates. From business documents and financial spreadsheets to marketing plans and project management tools — all free to use and customize.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-3 py-1">{templates.length} Templates</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">100% Free</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">No Sign-up</Badge>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner />
      </div>

      {/* Search and Filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates by name, tag, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-background text-muted-foreground border-border/60 hover:border-emerald-400 hover:text-emerald-600 dark:hover:border-emerald-600'
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.id === 'all' ? 'All' : cat.id.slice(0, 3)}</span>
                <span className={`text-[10px] px-1.5 py-0 rounded-full ${isActive ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {filteredTemplates.length} of {templates.length} templates
          {searchQuery && ` matching "${searchQuery}"`}
          {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
        </p>
      </section>

      {/* Templates Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.title} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <LayoutTemplate className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filter</p>
            <Button
              variant="outline"
              className="mt-4 gap-2"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="mt-12 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-8">
          <h3 className="text-xl font-bold mb-2">Need a custom template?</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload your own templates to share with the Zenvoora community</p>
          <Link href="/">
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Upload className="h-4 w-4" />
              Upload a Template
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
