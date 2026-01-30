import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { defineNoteConfig, plumeTheme } from "vuepress-theme-plume";

import { getDirname, path } from "vuepress/utils";
const __dirname = getDirname(import.meta.url);
import { blogDataPlugin } from "./plugin/blog-data-plugin";

export default defineUserConfig({
  port: 88,

  // alias: {
  //   "@theme/VPDocMeta.vue": path.resolve(
  //     __dirname,
  //     "./component/theme/MyVPDocMeta.vue"
  //   ),
  // },
  lang: "zh-CN",
  title: "𝙁𝙡𝙖𝙨𝙝",
  head: [
    [
      "script",
      {
        defer: true,
        src: "https://umami.haipeng-lin.cn/script.js",
        "data-website-id": "cd6d1d13-8962-4997-a516-a31e563bec5c",
        "data-domains": "blog.haipeng-lin.cn",
      },
    ],
    ["script", { type: "text/javascript", src: "/js/tongji-data.js" }],
    // 全局配置变量
    ["script", {}, `window.DENG_CONFIG = { text: '元旦快乐' };`],
    // 灯笼脚本
    // [ 'script', { type: 'text/javascript', src: '/js/denglong.js' } ],
    // 头像
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        size: "32x32",
        href: "/images/avatar.webp",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fontsapi.zeoseven.com/292/gb-regular/result.css",
      },
    ],
    [
      "script",
      { type: "text/javascript", src: "https://webapi.amap.com/loader.js" },
    ],
  ],

  theme: plumeTheme({
    // 白天&黑夜模式
    appearance: false,

    hostname: "https://haipeng-lin.cn",

    profile: {
      avatar: "/images/avatar.webp",
      name: "𝙁𝙡𝙖𝙨𝙝",
      description: "保持热爱，奔赴山海",
      location: "广州 | 中国",
      circle: true,
      layout: "right",
    },

    markdown: {
      icon: { provider: "iconify" },
      demo: true,
      timeline: true,
    },

    plugins: {
      comment: {
        // 服务提供商
        provider: "Twikoo", // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        // 是否默认启用评论
        comment: true,
        // repo: "haipeng-lin/giscus-comment",
        // repoId: "R_kgDOOzuxJA",
        // category: "Announcements",
        // categoryId: "DIC_kwDOOzuxJM4Cq2lP",
        envId: "https://twikoo.haipeng-lin.cn",
        region: "ap-guangzhou",
      },
      // 贡献者1
      // git: true,
      // 折叠代码块
      shiki: {
        collapsedLines: true,
        // languages: ["sql", "java", "xml", "yml", "js", "ts", "html", "dockerfile", "properties", "shell", "sh", "json", "go", "cmd"],
      },
    },

    // 文章版权
    copyright: {
      license: "CC-BY-4.0",
    },

    // 脚部信息
    footer: {
      message:
        '欢迎光临小破站！<a href="https://beian.miit.gov.cn/#/Integrated/index" style="text-decoration:none">粤ICP备2025360098号-1</a>',
      copyright: "© Copyright 2024-2026 All Rights Reserved. 版权所有：𝙁𝙡𝙖𝙨𝙝",
    },

    // logo
    logo: "/images/avatar.webp",

    // 贡献者2
    // contributors: true,

    // 笔记左边侧栏
    outline: [1, 4],

    social: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m-1.852 4.444a3.704 3.704 0 0 0-3.704 3.704v6.913c0 .273.222.495.494.495h7.285a3.334 3.334 0 0 0 3.333-3.333v-2.84a.494.494 0 0 0-.495-.494h-5.678a.495.495 0 0 0-.494.494v1.234c0 .273.22.494.493.494h3.458c.272 0 .493.221.493.493v.248a1.48 1.48 0 0 1-1.481 1.481H9.16a.494.494 0 0 1-.494-.493v-4.692c0-.818.663-1.48 1.482-1.481h6.913a.495.495 0 0 0 .494-.494V6.938a.493.493 0 0 0-.494-.494z"/></svg>',
          name: "gitee",
        },
        link: "https://gitee.com/linhaipengg",
      },

      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 3.121V15h16V3.121l-8 8z"/><path fill="currentColor" d="M16 1H0l8 8z"/></svg>',
          name: "email",
        },
        link: "mailto:hi@haipeng_lin@163.com",
      },
    ],
    navbarSocialInclude: ["gitee", "email"],

    // 文章显示
    autoFrontmatter: {
      permalink: true, // 是否生成永久链接
      createTime: true, // 是否生成创建时间
      title: true, // 是否生成标题
    },
  }),

  // 右侧目录显示标题级别
  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          // 配置代理，解决跨域问题
          "/baidu-api": {
            target: "https://openapi.baidu.com", // 目标接口域名
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/baidu-api/, ""), // 去掉前缀
            // 【新增关键代码】伪造请求头，欺骗百度服务器
            configure: (proxy, options) => {
              proxy.on("proxyReq", (proxyReq, req, res) => {
                // 伪装 Origin 和 Referer，让百度以为是自家发起的请求
                proxyReq.setHeader("Origin", "https://api.baidu.com");
                proxyReq.setHeader("Referer", "https://api.baidu.com");
              });
            },
          },
        },
      },
    },
  }),

  // 对md文档操作
  extendsMarkdown: (md) => {
    md.core.ruler.before("normalize", "inject-content", (state) => {
      const frontmatter = state.env.frontmatter;
      if (
        frontmatter &&
        frontmatter.show === true &&
        !state.env._gpt_injected
      ) {
        state.src = `<ArticleGPT />\n\n${state.src}`;
        state.env._gpt_injected = true;
      }
    });
  },

  plugins: [
    blogDataPlugin(), // 就像引入官方插件一样
  ],
  // 关键：在 VuePress 准备阶段提取数据
  onPrepared: async (app) => {
    const carouselPosts = app.pages
      .filter((page) => page.frontmatter.carousel === true)
      .sort((a, b) => {
        const orderA = (a.frontmatter.carouselOrder as number) || 99;
        const orderB = (b.frontmatter.carouselOrder as number) || 99;
        return orderA - orderB;
      })
      .slice(0, 5)
      .map((page) => ({
        title: page.title,
        path: page.path,
        frontmatter: page.frontmatter,
      }));

    // 将过滤后的数据写入临时文件，供前端调用
    await app.writeTemp(
      "carouselPosts.js",
      `export const carouselPosts = ${JSON.stringify(carouselPosts)}`
    );
  },
});
