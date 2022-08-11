/*
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-07-14 17:03:30
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-08-08 19:27:32
 */
const { defaultTheme } = require('@vuepress/theme-default');
const { searchPlugin } = require('@vuepress/plugin-search');

module.exports = {
  dest: './dist',
  lang: 'zh-CN',
  title: '阿鸿',
  description: '前端学习笔记',
  head: [['link', { rel: 'icon', href: '/images/logo.jpeg' }]],
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],
  theme: defaultTheme({
    logo: '/images/logo.jpeg',
    repo: 'https://github.com/Mr-WangYH',
    navbar: [
      {
        text: 'Javascript',
        children: [
          {
            text: 'Js',
            link: '/js/',
          },
          {
            text: 'Ts',
            link: '/ts/',
          },
          {
            text: 'Promise',
            link: '/promise/',
          },
        ],
      },
      {
        text: 'Node',
        link: '/node/',
      },
      {
        text: 'Webpack',
        link: '/webpack/',
      },
      {
        text: '框架',
        children: [
          {
            text: 'React',
            link: '/react/',
          },
          {
            text: 'Vue',
            link: '/vue/',
          },
        ],
      },
      {
        text: '基本技能',
        link: '/common/',
      },
      {
        text: '技术分享',
        children: [
          {
            text: '工作中用到的npm包',
            link: '/npm/',
          },
        ],
      },
    ],
  }),
};
