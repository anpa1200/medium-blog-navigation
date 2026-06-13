const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Andrey Pautov Blog Navigator',
  tagline: 'A structured map of Medium articles, guides, research notes, and reading paths.',
  favicon: 'img/favicon.svg',

  url: 'https://1200km.com',
  baseUrl: '/medium-blog-navigation/',
  scripts: [{src: 'https://1200km.com/assets/docusaurus-ecosystem.js?v=20260613-1', defer: true}],
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
    metadata: [
      {
        name: 'keywords',
        content: 'Andrey Pautov blog, threat intelligence articles, CTI research, detection engineering articles, malware analysis, Medium security research, 1200km, InfoSec Write-ups, security blog',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Blog Navigator',
      logo: {
        alt: '1200km',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Navigator', position: 'left'},
        {to: '/docs/analysis', label: 'Analysis', position: 'left'},
        {to: '/docs/reading-paths', label: 'Reading Paths', position: 'left'},
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
            {label: 'ThreatMapper Docs', href: 'https://1200km.com/threatmapper-docs/'},
          ],
        },
        {href: 'https://medium.com/@1200km', label: 'Medium', position: 'right'},
        {href: 'https://github.com/anpa1200', label: 'GitHub', position: 'right'},
        {href: 'https://1200km.com/', label: 'Main Page', position: 'right', className: 'navbar-portfolio-btn'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
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
              {label: 'ThreatMapper Docs', href: 'https://1200km.com/threatmapper-docs/'},
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
};

module.exports = config;
