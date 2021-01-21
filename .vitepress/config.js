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
            { text: 'Interaction', link: '/interaction' },
            { text: 'Networking', link: '/networking' },
            { text: 'Security', link: '/security' },
            { text: 'Performance', link: '/performance' },
            { text: 'Advanced Concepts', link: '/advanced-concepts' },
            { text: 'Releasing your app', link: '/releasing' },
            { text: 'Developing Plugins', link: '/developing-plugins' },
            { text: 'Common Pitfalls', link: '/common-pitfalls' },
        ]
    }
  ];
}
