/* eslint-disable @typescript-eslint/no-explicit-any */
// test-setup.ts - Global test setup
import React from 'react';
import { vi } from 'vitest'

// ============================================================================
// 1. Mock Next.js & Foundation UI Components
// ============================================================================

vi.mock('next/image', () => ({
  default: (props: any) => React.createElement('img', {
    src: props.src?.src || props.src,
    alt: props.alt,
    ...props,
  }),
}))

vi.mock('next/link', () => ({
  default: (props: any) => React.createElement('a', {
    href: props.href,
    ...props,
  }),
}))

vi.mock('next/script', () => ({
  default: (props: any) => React.createElement('script', props),
}))

vi.mock('lucide-react', () => ({
  // Icons used in Header
  Menu: (props: any) => React.createElement('svg', props),
  X: (props: any) => React.createElement('svg', props),
  
  // Icons used in compliance page
  BadgeCheck: (props: any) => React.createElement('svg', props),
  LockKeyhole: (props: any) => React.createElement('svg', props),
  ServerCrash: (props: any) => React.createElement('svg', props),
  ShieldCheck: (props: any) => React.createElement('svg', props),
  
  // Icons used in docs page
  BookOpen: (props: any) => React.createElement('svg', props),
  Orbit: (props: any) => React.createElement('svg', props),
  PanelsTopLeft: (props: any) => React.createElement('svg', props),
  Zap: (props: any) => React.createElement('svg', props),
  Cog: (props: any) => React.createElement('svg', props),
  
  // Icons used in tour page
  Blocks: (props: any) => React.createElement('svg', props),
  FileSearch: (props: any) => React.createElement('svg', props),
  MessageSquareQuote: (props: any) => React.createElement('svg', props),
  Sparkles: (props: any) => React.createElement('svg', props),
  ArrowRight: (props: any) => React.createElement('svg', props),
  CheckCircle2: (props: any) => React.createElement('svg', props),
  
  // Icons used in blog page
  Newspaper: (props: any) => React.createElement('svg', props),
  
  // Type export
  LucideIcon: () => {},
}))

// ============================================================================
// 2. Mock Image & Asset Imports
// ============================================================================

// Replaced RegExp with explicit module string resolution pattern for Vitest compatibility
vi.mock('@/assets/**/*', () => ({
  default: '/test-image.jpg',
}))

// ============================================================================
// 3. Mock System & Global Configuration Libs
// ============================================================================

vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    cn: actual.cn,
  };
})

vi.mock('@/lib/site', () => ({
  siteUrl: 'https://digestengine.io',
}))

vi.mock('@/lib/themeInit', () => ({
  themeInitScript: '// theme init script',
}))

// ============================================================================
// 4. Mock Global Design & Structural Layout Content Defaults
// ============================================================================

vi.mock('@/lib/brandDefaults', () => ({
  defaultBrandSettingsContent: {
    tagline: 'AI-powered workflow automation for Backstage developer portals',
  },
  getBrandSettingsContent: vi.fn().mockResolvedValue({
    tagline: 'AI-powered workflow automation for Backstage developer portals',
  }),
}))

vi.mock('@/lib/headerDefaults', () => ({
  defaultHeaderComponentContent: {
    navigationItems: [
      { href: '/tour', label: 'How It Works' },
      { href: '/docs', label: 'Docs' },
      { href: '/blog', label: 'Blog' },
      { href: '/pricing', label: 'Pricing' },
    ],
    loginButtonText: 'Sign Up',
  },
  getHeaderComponentContent: vi.fn().mockResolvedValue({
    navigationItems: [
      { href: '/tour', label: 'How It Works' },
      { href: '/docs', label: 'Docs' },
      { href: '/blog', label: 'Blog' },
      { href: '/pricing', label: 'Pricing' },
    ],
    loginButtonText: 'Sign Up',
  }),
}))

// ============================================================================
// 5. Mock Shared & Global Layout Components
// ============================================================================

vi.mock('@/components/Section', () => ({
  PageSection: (props: any) => React.createElement('section', props),
}))

vi.mock('@/components/shared/button', () => ({
  Button: (props: any) => React.createElement('button', props),
}))

vi.mock('@/components/Header', () => ({
  Header: (props: any) => React.createElement('header', props),
}))

vi.mock('@/components/Footer', () => ({
  Footer: (props: any) => React.createElement('footer', props, [
    React.createElement('span', { key: 'tagline' }, props.brandTagline || ''),
    React.createElement('div', { key: 'content' }, JSON.stringify(props.content || {})),
  ]),
}))

vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: (props: any) => React.createElement('div', props),
}))

vi.mock('@/components/Consent', () => ({
  Consent: (props: any) => React.createElement('div', props),
}))

// ============================================================================
// 6. Mock Page-Specific Marketing UI Components
// ============================================================================

vi.mock('@/components/HomePage/CTA', () => ({
  CTA: (props: any) => React.createElement('div', props),
}))

vi.mock('@/components/HomePage/FAQ', () => ({
  default: (props: any) => React.createElement('div', props),
}))

// ============================================================================
// 7. Mock Analytics & Integrations Tracking
// ============================================================================

vi.mock('@/components/Clarity', () => ({
  Clarity: (props: any) => React.createElement('div', props),
}))

vi.mock('@/components/AttributionCapture', () => ({
  AttributionCapture: (props: any) => React.createElement('div', props),
}))

// ============================================================================
// 8. Mock Dynamic Content & Marketing Page Parameter Defaults
// ============================================================================

vi.mock('@/lib/homePageDefaults', () => ({
  defaultHeroProps: {
    title: 'Test Hero Title',
    description: 'Test Hero Description',
    btnGetStarted: { text: 'Get Started', link: '/signup' },
  },
  defaultFeatureItems: {
    title: 'Test Features',
    description: 'Test Features Description',
    items: [],
  },
  defaultHomePageFaqProps: {
    title: 'Test FAQ',
    description: 'Test FAQ Description',
    items: [],
  },
  defaultCtaProps: {
    eyebrow: 'Test Eyebrow',
    title: 'Test CTA Title',
    description: 'Test CTA Description',
    badges: [],
    primaryAction: { text: 'Start', link: '/signup' },
    highlights: [],
  },
  defaultProblemsProps: {
    eyebrow: 'Test Problems Eyebrow',
    title: 'Test Problems Title',
    description: 'Test Problems Description',
    toolsHeading: 'Test Tools Heading',
    toolsDescription: 'Test Tools Description',
    toolFailures: [],
    imageSrc: '/test-image.jpg',
  },
  defaultSolutionProps: {
    eyebrow: 'Test Solution Eyebrow',
    title: 'Test Solution Title',
    description: 'Test Solution Description',
    highlights: [],
  },
}))

vi.mock('@/lib/blogDefaults', () => ({
  defaultBlogPageContent: {
    metadata: { title: 'Test Blog', description: 'Test Blog Description' },
    hero: { badge: 'Blog', title: 'Test Blog Title', description: 'Test Blog Description' },
    postsSection: { fallbackDescription: 'Test fallback' },
  },
  defaultBlogContentPages: [
    {
      title: 'Introducing AI Crew Suite: Eighteen agentic workflow plugins for Backstage',
      description: "A deep dive into the architecture and philosophy behind our monorepo of agentic workflow plugins for Spotify's Backstage IDP.",
      publishedAt: 'August 27, 2026',
      slug: { current: 'introducing-ai-crew-suite' },
      sourcePath: 'introducing-ai-crew-suite/index.mdx',
      previewImage: { src: '/test-image.jpg' },
    },
    {
      title: 'Plugin-scoped automation: How AI Crew Suite maintains context across workflows',
      description: 'Explore how each plugin maintains its own memory and context, enabling complex multi-step workflows without losing track of dependencies.',
      publishedAt: 'August 20, 2026',
      slug: { current: 'plugin-scoped-automation' },
      sourcePath: 'plugin-scoped-automation/index.mdx',
      previewImage: { src: '/test-image.jpg' },
    },
    {
      title: 'Self-hosting AI Crew Suite: A Kubernetes-ready deployment guide',
      description: 'Step-by-step instructions for deploying AI Crew Suite in your own infrastructure with Docker Compose and Helm charts.',
      publishedAt: 'August 13, 2026',
      slug: { current: 'self-hosting-guide' },
      sourcePath: 'self-hosting-guide/index.mdx',
      previewImage: { src: '/test-image.jpg' },
    },
  ],
  getBlogContentPages: vi.fn(),
  blogImageMap: {
    'feature-01': { src: '/test-image.jpg' },
    'feature-02': { src: '/test-image.jpg' },
    'feature-03': { src: '/test-image.jpg' },
  },
}))

vi.mock('@/lib/docsDefaults', () => ({
  defaultDocsPageContent: {
    metadata: { title: 'Test Docs', description: 'Test Docs Description' },
    hero: { badge: 'Documentation', title: 'Test Docs Title', description: 'Test Docs Description' },
  },
}))

vi.mock('@/lib/sitemapDefaults', () => ({
  defaultSitemapContent: {
    singletonPages: [
      { documentType: "homePage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "blogPage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "docsPage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "tourPage" },
      { documentType: "signupPage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "compliancePage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "privacyPage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "termsPage", lastModified: "2026-08-27T00:00:00.000Z" },
      { documentType: "cookiesPage", lastModified: "2026-08-27T00:00:00.000Z" },
    ],
    blogPages: [],
    docsPages: [],
  },
}))

vi.mock('@/lib/complianceDefaults', () => ({
  defaultCompliancePageContent: {
    metadata: { title: 'Compliance', description: 'Compliance Description' },
    hero: {
      badge: 'Compliance',
      title: 'Compliance Title',
      description: 'Compliance Description',
      note: 'As an open-source project, we prioritize transparency in our security practices and welcome community feedback on security improvements.',
      checklistEyebrow: 'Security checklist',
      checklistItems: [
        { text: 'Regular security audits and code reviews' },
        { text: 'Vulnerability scanning and dependency updates' },
        { text: 'Secure defaults and configuration guidance' },
        { text: 'Transparent security incident reporting' },
      ],
    },
    highlightsSection: {
      eyebrow: 'Core security practices',
      title: 'Our approach to securing AI workflows',
      description: 'We implement comprehensive security controls to ensure safe operation of agentic workflows while maintaining the flexibility needed for plugin-based architectures.',
      items: [
        { title: 'Secure plugin architecture', description: 'Each plugin operates with least-privilege principles, isolated execution contexts, and secure inter-plugin communication channels.', icon: 'lockKeyhole' },
        { title: 'Vulnerability management', description: 'Automated scanning for dependencies, regular security updates, and a responsible disclosure program for vulnerability reporting.', icon: 'shieldCheck' },
        { title: 'Code quality & review', description: 'All code undergoes peer review, automated testing, and security-focused analysis before merging into the main repository.', icon: 'badgeCheck' },
        { title: 'Incident response', description: 'Clear procedures for security incident reporting, investigation, and remediation with transparent communication to the community.', icon: 'serverCrash' },
      ],
    },
    frameworksSection: {
      eyebrow: 'Standards & compliance',
      title: 'Alignment with security standards',
      description: 'While primarily an open-source project, we align our practices with established security frameworks and industry standards.',
      items: [
        { name: 'OpenSSF Best Practices', status: 'Verified', detail: 'Following Open Source Security Foundation guidelines for secure development, dependency management, and vulnerability disclosure.' },
        { name: 'CII Best Practices', status: 'Implementing', detail: 'Working towards Core Infrastructure Initiative best practices badge for open-source security.' },
        { name: 'OWASP Top 10', status: 'Addressed', detail: 'All plugins are designed with OWASP Top 10 application security risks in mind, including injection protection and secure authentication.' },
      ],
    },
    detailsSection: {
      eyebrow: 'Detailed practices',
      title: 'Comprehensive security implementation details',
      description: 'Our security practices are documented transparently to help users understand and trust the AI Crew Suite platform.',
      items: [
        { title: 'Security architecture', body: 'AI Crew Suite uses a defense-in-depth approach with plugin isolation, secure defaults, and comprehensive logging. Each plugin operates in its own security context with controlled access to resources.' },
        { title: 'Vulnerability disclosure', body: 'We maintain a responsible disclosure program and encourage security researchers to report vulnerabilities through our GitHub security advisory system. Critical vulnerabilities receive immediate attention and public disclosure.' },
        { title: 'Supply chain security', body: 'All dependencies are regularly scanned for vulnerabilities, and we use automated tools to detect compromised packages. Build artifacts are signed and verified to prevent tampering.' },
        { title: 'Access control & authentication', body: 'Plugins implement granular permission systems and support integration with enterprise identity providers. Authentication flows follow current security best practices.' },
      ],
    },
    contactSection: {
      eyebrow: 'Security contact',
      title: 'Have security questions or concerns?',
      description: 'For security-related inquiries, vulnerability reports, or questions about our security practices, please reach out to our team.',
      primaryAction: { label: 'Report a vulnerability', href: 'https://github.com/backstage/ai-crew-suite/security/advisories' },
      secondaryAction: { label: 'View privacy policy', href: '/privacy' },
    },
  },
}))

vi.mock('@/lib/cookiesDefaults', () => ({
  defaultCookiesPageContent: {
    metadata: { title: 'Cookies', description: 'Cookies Description' },
    hero: { badge: 'Cookies', title: 'Cookies Title', description: 'Cookies Description' },
    summarySection: {
      items: [
        { text: "Essential cookies ensure site security and basic functionality." },
        { text: "Analytics cookies help us understand how visitors use our site." },
        { text: "Preference cookies remember your consent choices and settings." },
      ],
    },
    policySection: {
      eyebrow: "Policy details",
      title: "AI Crew Suite Cookie Policy",
      description: "Please read this policy to learn more about the tools we use and your choices regarding them.",
      items: [],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Questions about cookies, consent, or data handling?",
      description: "For questions about our cookie policy, consent management, or data handling practices, please reach out through our GitHub repository or contact channels.",
      primaryAction: { label: "View privacy policy", href: "/privacy" },
      secondaryAction: { label: "View terms", href: "/terms" },
    },
  },
}))

vi.mock('@/lib/privacyDefaults', () => ({
  getPrivacyPageContent: vi.fn().mockResolvedValue({
    metadata: { title: 'Privacy', description: 'Privacy Description' },
    hero: { badge: 'Privacy', title: 'Privacy Title', description: 'Privacy Description' },
  }),
}))

vi.mock('@/lib/signupDefaults', () => ({
  getSignupPageContent: vi.fn().mockResolvedValue({
    metadata: { title: 'Sign Up', description: 'Sign Up Description' },
    hero: { badge: 'Sign Up', title: 'Sign Up Title', description: 'Sign Up Description' },
  }),
}))

vi.mock('@/lib/tourDefaults', () => ({
  defaultTourPageContent: {
    metadata: { title: 'Tour', description: 'Tour Description' },
    hero: { badge: 'Tour', title: 'Tour Title', description: 'Tour Description' },
  },
}))

vi.mock('@/lib/termsDefaults', () => ({
  defaultTermsPageContent: {
    metadata: { title: 'Terms', description: 'Terms Description' },
    hero: { badge: 'Terms', title: 'Terms Title', description: 'Terms Description' },
    summarySection: {
      items: [
        { text: "AI Crew Suite is open-source software licensed under the MIT License." },
        { text: "You retain ownership of your content and plugins built using AI Crew Suite." },
        { text: "We provide documentation and examples as-is, without warranties." },
      ],
    },
    policySection: {
      eyebrow: "Policy details",
      title: "AI Crew Suite Terms of Service",
      description: "Please read these terms carefully to understand your rights and obligations when using the AI Crew Suite open-source project.",
      items: [],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Questions about licensing, contributions, or terms?",
      description: "For questions about the MIT License, contribution process, or terms of service, please reach out through our GitHub repository or community channels.",
      primaryAction: { label: "View GitHub", href: "https://github.com/backstage/ai-crew-suite" },
      secondaryAction: { label: "View privacy policy", href: "/privacy" },
    },
  },
}))

// ============================================================================
// 9. Mock Data Utility Helpers & Trackers
// ============================================================================

vi.mock('@/lib/docsUtils', () => ({
  getAllDocsPages: vi.fn(),
  getDocsPage: vi.fn(),
  getDocsPageList: vi.fn(),
}))

vi.mock('@/lib/blogUtils', () => ({
  getAllBlogPages: vi.fn(),
  getBlogPage: vi.fn(),
  getBlogPageList: vi.fn(),
}))

vi.mock('@/lib/marketingAttribution', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/marketingAttribution')>();
  return {
    ...actual,
    // Override getMarketingAttributionSummary with our mock implementation
    getMarketingAttributionSummary: vi.fn().mockImplementation((attribution) => {
      if (!attribution || !attribution.utm_source) {
        return { medium: "direct", source: "direct" };
      }
      return {
        campaign: attribution.utm_campaign,
        medium: attribution.utm_medium ?? "campaign",
        referrer_host: attribution.referrer_host,
        source: attribution.utm_source,
      };
    }),
  };
})

vi.mock('@/lib/marketingConsent', () => ({
  CONSENT_STORAGE_KEY: "marketing-consent",
  MARKETING_CONSENT_CHANGED_EVENT: "marketing-consent-changed",
  readConsentPreferences: vi.fn(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem("marketing-consent");
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.marketing === 'boolean') {
        return { essential: true, marketing: parsed.marketing };
      }
      return null;
    } catch {
      return null;
    }
  }),
  writeConsentPreferences: vi.fn((marketing: boolean) => {
    const consentPreferences = { essential: true, marketing };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("marketing-consent", JSON.stringify(consentPreferences));
      window.dispatchEvent(new CustomEvent("marketing-consent-changed", { detail: consentPreferences }));
    }
    return consentPreferences;
  }),
  getMarketingConsent: vi.fn(),
}))
