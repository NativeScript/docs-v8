module.exports = {
  lang: "en-US",
  title: "NativeScript",
  description: "NativeScript docs",

  themeConfig: {
    repo: "NativeScript/docs-new",
    docsDir: ".",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    //   algolia: {
    //     apiKey: 'xxx',
    //     indexName: 'xxx'
    //   },

    nav: [
      {
        text: "Docs",
        link: "/",
        activeMatch: "^/",
      },
      {
          text: 'Writing Guide',
          link: 'https://v3.vuejs.org/guide/contributing/writing-guide.html',
      }
    ],

    sidebar: {
      "/": getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
        text: 'Docs',
        children: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Environment Setup (Igor)', link: '/environment-setup' },
            { text: 'Development Workflow', link: '/development-workflow' },
            { text: 'UI & Styling (Igor)', link: '/ui-and-styling' },
            { text: 'Interaction (Nathan)', link: '/interaction' },
            { text: 'Networking (Brad)', link: '/networking' },
            { text: 'Security (Brad)', link: '/security' },
            { text: 'Performance (Brad)', link: '/performance' },
            { text: 'Advanced Concepts (Nathan & Nathanael)', link: '/advanced-concepts' },
            { text: 'Releasing your app (Igor)', link: '/releasing' },
            { text: 'Developing Plugins (Osei & Nathanael)', link: '/developing-plugins' },
            { text: 'Common Pitfalls (Nathan)', link: '/common-pitfalls' },
            { text: '______________', link: '#' },
            { text: 'Capacitor', link: '/capacitor' },
        ]
    }
  ];
}
