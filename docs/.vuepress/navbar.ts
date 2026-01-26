import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "首页", link: "/", icon: "material-symbols:home" },
  { text: "博客", link: "/blog/archives/", icon: "material-symbols:article" },
  {
    text: "笔记",
    icon: "mdi:learn-outline",
    items: [
      { text: "AI应用", link: "/AI/", icon: "ri:ai" },
      {
        text: "后端",
        link: "/Backend/Python/",
        icon: "devicon-plain:java",
      },
      { text: "数据库", link: "/Database/MySQL/", icon: "mdi:sql-query" },
      {
        text: "中间件",
        link: "/middleware/message-queue/",
        icon: "oui:nav-service-map",
      },
      { text: "微服务", link: "/cloud/", icon: "ri-cloud-line" },
      {
        text: "计算机基础",
        link: "/computer-basics/",
        icon: "ic:outline-computer",
      },
    ],
  },
  {
    text: "记录",
    icon: "material-symbols:camera-rounded",
    items: [
      { text: "诗词", link: "/memory/poem/", icon: "icon-park-solid:like" },
      {
        text: "足迹",
        link: "/memory/foot/",
        icon: "material-symbols:barefoot",
      },
      {
        text: "藏宝阁",
        link: "/memory/movie/",
        icon: "material-symbols:movie-info-rounded",
      },
      { text: "备忘录", link: "/memorandum/Git/", icon: "circum:memo-pad" },
      { text: "网址导航", link: "/memory/site-collect/", icon: "ion:navigate" },
    ],
  },
  {
    text: "好玩",
    icon: "typcn:point-of-interest",
    items: [
      {
        text: "音乐馆",
        link: "https://music.haipeng-lin.cn",
        icon: "mdi:music",
      },
      {
        text: "烟花秀",
        link: "https://firework.haipeng-lin.cn",
        icon: "streamline-freehand:fireworks-2",
      },
      {
        text: "站点监测",
        link: "https://status.haipeng-lin.cn/",
        icon: "pajamas:status-health",
      },
    ],
  },
  // {
  //   text: "项目",
  //   icon: "material-symbols:water-full-rounded",
  //   items: [
  //     {
  //       text: "项目集合",
  //       link: "/project/",
  //       icon: "fa7-solid:project-diagram",
  //     },
  //     {
  //       text: "项目管控流式平台",
  //       link: "/project/project-stream/",
  //       icon: "ant-design:project-filled",
  //     },
  //     {
  //       text: "知识交流平台",
  //       link: "/project/knowledge-stream/",
  //       icon: "fluent:stream-20-filled",
  //     },
  //   ],
  // },
  {
    text: "关于",
    link: "/about-me/",
    icon: "material-symbols-light:id-card-rounded",
  },
]);
