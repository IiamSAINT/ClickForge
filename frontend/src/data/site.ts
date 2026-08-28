import { LayoutTemplate, MousePointerClick, TrendingUp, Zap } from 'lucide-react';

export const navigation = [
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
] as const;

export const services = [
  {
    id: 'design',
    title: 'Conversion design',
    eyebrow: '01 / Make the first impression count',
    description: 'Brand systems, websites and landing pages with a clear message, sharp user journeys and measurable conversion intent.',
    outcome: 'Clearer offer. Stronger conversion path.',
    metrics: ['Message clarity', 'Landing-page CVR', 'Creative velocity'],
    icon: LayoutTemplate,
  },
  {
    id: 'paid',
    title: 'Paid click management',
    eyebrow: '02 / Create demand with intent',
    description: 'Search and social campaigns built around stronger hooks, smarter targeting and weekly optimisation—not vanity metrics.',
    outcome: 'More qualified clicks. Less wasted spend.',
    metrics: ['Click-through rate', 'Cost per acquisition', 'Return on ad spend'],
    icon: MousePointerClick,
  },
  {
    id: 'seo',
    title: 'SEO & content systems',
    eyebrow: '03 / Compound the right attention',
    description: 'Technical SEO, high-intent content and on-page improvements that earn durable rankings and better-qualified visitors.',
    outcome: 'Discoverable expertise that keeps working.',
    metrics: ['Organic visibility', 'Qualified sessions', 'Content conversion'],
    icon: TrendingUp,
  },
  {
    id: 'retainer',
    title: 'Creative growth retainers',
    eyebrow: '04 / Keep the momentum moving',
    description: 'An integrated creative and growth partner to keep your site, search strategy and campaigns moving in one direction.',
    outcome: 'One team. A faster feedback loop.',
    metrics: ['Sprint velocity', 'Test cadence', 'Growth opportunities shipped'],
    icon: Zap,
  },
] as const;

export const processSteps = [
  { num: '01', title: 'Audit & Align', desc: 'Quick discovery survey plus a full CRO audit of your current assets.' },
  { num: '02', title: 'Sprint Kickoff', desc: 'Scope and timeline locked within 48–72 hours of signing on.' },
  { num: '03', title: 'Design & Build', desc: 'Rapid iteration cycles with async feedback loops in Figma and Loom.' },
  { num: '04', title: 'Launch & Optimize', desc: 'Ship live, then monitor and iterate against real performance data.' },
] as const;
