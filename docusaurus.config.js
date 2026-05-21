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
        {href: 'https://medium.com/@1200km', label: 'Medium', position: 'right'},
        {href: 'https://github.com/anpa1200', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
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
