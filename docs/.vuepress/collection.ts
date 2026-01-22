import { defineCollections } from "vuepress-theme-plume";

export default defineCollections([
  {
    type: "doc",
    dir: "memorandum",
    title: "memorandum",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "Backend",
    title: "Backend",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "computer-basics",
    title: "computer-basics",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "Database",
    title: "Database",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "frame-work",
    title: "frame-work",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "cloud",
    title: "cloud",
    sidebar: "auto",
  },

  {
    type: "doc",
    dir: "middleware",
    title: "middleware",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "project/knowledge-stream",
    title: "knowledge-stream",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "project/project-stream",
    title: "project-stream",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "memorandum",
    title: "memorandum",
    sidebar: "auto",
  },
  {
    type: "doc",
    dir: "AI",
    title: "AI",
    sidebar: "auto",
  },

  // 文章
  {
    type: "post",
    dir: "blog",
    title: "博客",

    autoFrontmatter: {
      title: true, // 自动生成标题
      createTime: true, // 自动生成创建时间
      permalink: true, // 自动生成永久链接
    },

    postList: true, // 启用文章列表页
    link: "/blog/", // 列表页链接
    linkPrefix: "/blog/", // 文章链接前缀
    tags: true, // 启用标签页
    tagsLink: "/blog/tags/", // 标签页链接
    tagsTheme: "colored", // 标签主题 colored|gray|brand
    tagsText: "标签", // 标签页标题
    archives: true, // 启用归档页
    archivesLink: "/blog/archives/", // 归档页链接
    archivesText: "归档", // 归档页标题
    categories: true, // 启用分类页
    categoriesLink: "/blog/categories/", // 分类页链接
    categoriesText: "分类", // 分类页标题
    categoriesExpand: "deep", // 分类展开层级 number|'deep'
    categoriesTransform: (categories) => categories, // 分类转换函数
  },
]);
