const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Andrey Pautov Blog Navigator',
  tagline: 'A structured map of Medium articles, guides, research notes, and reading paths.',
  favicon: 'img/favicon.svg',

  url: 'https://anpa1200.github.io',
  baseUrl: '/medium-blog-navigation/',
  organizationName: 'anpa1200',
  projectName: 'medium-blog-navigation',

  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-TMTG21RVHM',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TMTG21RVHM');
      `,
    },
  ],

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
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
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
            {label: 'CTI Analyst Field Manual', href: 'https://anpa1200.github.io/cti-analyst-field-manual/'},
            {label: 'CTI as a Code', href: 'https://anpa1200.github.io/CTI_as_a_Code/'},
            {label: 'Operation Desert Hydra', href: 'https://anpa1200.github.io/operation-desert-hydra/'},
            {label: 'Customer-Driven AI CTI', href: 'https://anpa1200.github.io/customer-driven-ai-cti-project/'},
            {label: 'Israel Threat Actors CTI', href: 'https://anpa1200.github.io/israel-government-threat-actors-cti/'},
            {label: 'AI vs Defense', href: 'https://anpa1200.github.io/ai-vs-defense/'},
            {label: 'HexStrike AI', href: 'https://github.com/0x4m4/hexstrike-ai'},
          ],
        },
        {href: 'https://medium.com/@1200km', label: 'Medium', position: 'right'},
        {href: 'https://github.com/anpa1200', label: 'GitHub', position: 'right'},
        {href: 'https://anpa1200.github.io/', label: 'Main Page', position: 'right', className: 'navbar-portfolio-btn'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
          {
            title: 'Ecosystem',
            items: [
              {label: 'CTI Analyst Field Manual', href: 'https://anpa1200.github.io/cti-analyst-field-manual/'},
              {label: 'CTI as a Code', href: 'https://anpa1200.github.io/CTI_as_a_Code/'},
              {label: 'Operation Desert Hydra', href: 'https://anpa1200.github.io/operation-desert-hydra/'},
              {label: 'Customer-Driven AI CTI', href: 'https://anpa1200.github.io/customer-driven-ai-cti-project/'},
              {label: 'Israel Threat Actors CTI', href: 'https://anpa1200.github.io/israel-government-threat-actors-cti/'},
              {label: 'AI vs Defense', href: 'https://anpa1200.github.io/ai-vs-defense/'},
              {label: 'HexStrike AI', href: 'https://github.com/0x4m4/hexstrike-ai'},
            ],
          },
          {
            title: 'Author',
            items: [
              {label: 'Medium', href: 'https://medium.com/@1200km'},
              {label: 'GitHub', href: 'https://github.com/anpa1200'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrey-pautov/'},
              {label: 'Main Page', href: 'https://anpa1200.github.io/'},
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
