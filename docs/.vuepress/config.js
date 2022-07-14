const { defaultTheme } = require('@vuepress/theme-default');

module.exports = {
  lang: 'zh-CN',
  title: '阿鸿',
  description: '学习前端知识笔记',
  theme: defaultTheme({
    navbar: [
      {
        text: 'Javascript',
        link: '/javascript/',
      },
      {
        text: 'Typescript',
        link: '/typescript/',
      },
      {
        text: 'React',
        link: '/react/',
      },
      {
        text: 'Vue',
        link: '/vue/',
      },
      {
        text: 'Node',
        link: '/node/',
      },
    ],
  }),
};
