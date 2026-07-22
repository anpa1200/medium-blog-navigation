const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const embeddedArchive = process.env.ARTICLE_ARCHIVE_EMBED === '1';
const baseUrl = process.env.ARTICLE_BASE_URL || '/medium-blog-navigation/';
const articleRouteBase = embeddedArchive ? 'read' : 'docs/articles';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '1200km',
  tagline: 'A local archive of security research, technical guides, case studies, and lab notes.',
  favicon: 'img/favicon.svg',

  url: 'https://1200km.com',
  baseUrl,
  scripts: [{src: 'https://1200km.com/assets/docusaurus-ecosystem.js?v=20260614-3', defer: true}],
  organizationName: 'anpa1200',
  projectName: 'medium-blog-navigation',


  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: embeddedArchive ? 'docs/articles' : 'docs',
          routeBasePath: embeddedArchive ? 'read' : 'docs',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        gtag: {trackingID: 'G-TMTG21RVHM', anonymizeIP: true},
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/favicon.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    announcementBar: embeddedArchive ? undefined : {
      id: 'articles_moved_202607',
      content: 'The canonical article archive now lives at <a href="https://1200km.com/articles/">1200km.com/articles/</a>.',
      backgroundColor: '#0f62fe',
      textColor: '#ffffff',
      isCloseable: false,
    },
    navbar: {
      title: embeddedArchive ? 'Articles' : 'Blog Navigator',
      logo: {
        alt: '1200km',
        src: 'img/logo.svg',
      },
      items: embeddedArchive ? [
        {to: '/', label: 'All Articles', position: 'left'},
        {to: `/${articleRouteBase}`, label: 'Browse by Year', position: 'left'},
        {href: 'https://1200km.com/guides.html', target: '_self', label: 'Guides', position: 'left'},
        {href: 'https://1200km.com/projects.html', target: '_self', label: 'Projects', position: 'left'},
        {href: 'https://1200km.com/search.html', target: '_self', label: 'Search 1200km', position: 'right'},
        {href: 'https://1200km.com/', target: '_self', label: '1200km Home', position: 'right', className: 'navbar-portfolio-btn'},
      ] : [
        {to: '/', label: 'Navigator', position: 'left'},
        {to: '/docs/analysis', label: 'Analysis', position: 'left'},
        {to: '/docs/reading-paths', label: 'Reading Paths', position: 'left'},
        {to: '/docs/articles', label: 'Articles', position: 'left'},
        {to: '/docs/labs', label: 'Labs', position: 'left'},
                {
          label: 'Projects',
          position: 'right',
          items: [
            {label: 'CTI Analyst Field Manual', href: 'https://1200km.com/cti-analyst-field-manual/'},
            {label: 'CTI as a Code', href: 'https://1200km.com/CTI_as_a_Code/'},
            {label: 'Operation Desert Hydra', href: 'https://1200km.com/operation-desert-hydra/'},
            {label: 'Customer-Driven AI CTI', href: 'https://1200km.com/customer-driven-ai-cti-project/'},
            {label: 'Israel Threat Actors CTI', href: 'https://1200km.com/israel-government-threat-actors-cti/'},
            {label: 'AI vs Defense', href: 'https://1200km.com/ai-vs-defense/'},
            {label: 'HexStrike AI', href: 'https://github.com/0x4m4/hexstrike-ai'},
            {label: 'AdversaryGraph Docs', href: 'https://1200km.com/adversarygraph-docs/'},
          ],
        },
        {href: 'https://medium.com/@1200km', label: 'Medium', position: 'right'},
        {href: 'https://github.com/anpa1200', label: 'GitHub', position: 'right'},
        {href: 'https://1200km.com/', label: 'Main Page', position: 'right', className: 'navbar-portfolio-btn'},
      ],
    },
    footer: {
      style: 'dark',
      links: embeddedArchive ? [
        {
          title: 'Explore',
          items: [
            {label: 'All Articles', to: '/'},
            {label: 'Browse by Year', to: `/${articleRouteBase}`},
            {label: 'Research', href: 'https://1200km.com/cti.html', target: '_self'},
            {label: 'Guides', href: 'https://1200km.com/guides.html', target: '_self'},
          ],
        },
        {
          title: '1200km',
          items: [
            {label: 'Projects', href: 'https://1200km.com/projects.html', target: '_self'},
            {label: 'Privacy / Data Handling', href: 'https://1200km.com/privacy.html', target: '_self'},
            {label: 'Contact', href: 'https://1200km.com/about.html#contact', target: '_self'},
            {label: 'GitHub', href: 'https://github.com/anpa1200'},
          ],
        },
      ] : [
          {
            title: 'Ecosystem',
            items: [
              {label: 'CTI Analyst Field Manual', href: 'https://1200km.com/cti-analyst-field-manual/'},
              {label: 'CTI as a Code', href: 'https://1200km.com/CTI_as_a_Code/'},
              {label: 'Operation Desert Hydra', href: 'https://1200km.com/operation-desert-hydra/'},
              {label: 'Customer-Driven AI CTI', href: 'https://1200km.com/customer-driven-ai-cti-project/'},
              {label: 'Israel Threat Actors CTI', href: 'https://1200km.com/israel-government-threat-actors-cti/'},
              {label: 'AI vs Defense', href: 'https://1200km.com/ai-vs-defense/'},
              {label: 'HexStrike AI', href: 'https://github.com/0x4m4/hexstrike-ai'},
              {label: 'AdversaryGraph Docs', href: 'https://1200km.com/adversarygraph-docs/'},
            ],
          },
          {
            title: 'Author',
            items: [
              {label: 'Medium', href: 'https://medium.com/@1200km'},
              {label: 'GitHub', href: 'https://github.com/anpa1200'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrey-pautov/'},
              {label: 'Main Page', href: 'https://1200km.com/'},
            ],
          },
        {
          title: 'Navigate',
          items: [
            {label: 'Main Navigator', to: '/'},
            {label: 'Blog Analysis', to: '/docs/analysis'},
            {label: 'Reading Paths', to: '/docs/reading-paths'},
            {label: 'Article Archive', to: '/docs/articles'},
            {label: 'Labs', to: '/docs/labs'},
          ],
        },
        {
          title: 'Profiles',
          items: [
            {label: 'Medium', href: 'https://medium.com/@1200km'},
            {label: 'GitHub', href: 'https://github.com/anpa1200'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrey-pautov/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andrey Pautov. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  customFields: {
    embeddedArchive,
    articleRouteBase,
  },
};

module.exports = config;
