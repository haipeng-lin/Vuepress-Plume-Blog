import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defineNoteConfig, plumeTheme } from 'vuepress-theme-plume'

import { getDirname, path } from 'vuepress/utils'
const __dirname = getDirname(import.meta.url)

import notes from './notes/index.js'


export default defineUserConfig({

    port: 88,

    alias: {
        '@theme/VPDocMeta.vue': path.resolve(
            __dirname,
            './component/theme/MyVPDocMeta.vue',
        ),
    },
    lang: 'zh-CN',
    title: '𝙁𝙡𝙖𝙨𝙝',
    
    head: [
        [ 'script', { type: 'text/javascript', src: '/js/tongji-data.js', } ],
        // 全局配置变量
        [ 'script', {}, `window.DENG_CONFIG = { text: '元旦快乐' };` ],
        // 灯笼脚本
        [ 'script', { type: 'text/javascript', src: '/js/denglong.js' } ],
        [ 'link', { rel: 'icon', type: 'image/png', size: '32x32', href: '/images/avatar.jpg' } ],
        [ 'link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' } ],
        [ 'link', { rel: 'stylesheet', href: 'https://fontsapi.zeoseven.com/292/gb-regular/result.css' } ],
        [ 'script', { type: 'text/javascript', src: 'https://webapi.amap.com/loader.js' } ],
        // 背景：樱花特效
        // [ 'script', { type: 'text/javascript', src: '/js/background.js' } ],
        // ['meta', { referrer: 'no-referrer' }]
    ],


    theme: plumeTheme({
        // 白天&黑夜模式
        appearance: false,

        // hostname: 'https://blog.haipeng-lin.cn',

        profile: {
            avatar: '/images/avatar.jpg',
            name: '𝙁𝙡𝙖𝙨𝙝',
            description: '保持热爱，奔赴山海',
            location: '广州 | 中国',
            circle: true,
            layout: 'right',
        },

        markdown: {
            icon: { provider: 'iconify' },
            demo: true,
        },

       
        plugins: {
            comment: {
                // 服务提供商
                provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
                // 是否默认启用评论
                comment: true,
                repo: 'haipeng-lin/giscus-comment',
                repoId: 'R_kgDOOzuxJA',
                category: 'Announcements',
                categoryId: 'DIC_kwDOOzuxJM4Cq2lP',
            },
            // 贡献者1
            // git: true,
            // 折叠代码块
            shiki: {
                collapsedLines: true,
                // languages: ["sql", "java", "xml", "yml", "js", "ts", "html", "dockerfile", "properties", "shell", "sh", "json", "go", "cmd"],
            }
        },


        // 文章版权
        copyright: {
            license: 'CC-BY-4.0'
        },

        // 脚部信息
        footer: {
            message: '欢迎光临小破站！<a href="https://beian.miit.gov.cn/#/Integrated/index" style="text-decoration:none">粤ICP备2025360098号-1</a>',
            copyright: '© Copyright 2024-2025 All Rights Reserved. 版权所有：𝙆𝙞𝙖𝙣𝙜'
        },

        // logo
        logo: '/images/avatar.jpg',

        // 贡献者2
        // contributors: true,

        // 笔记左边侧栏
        outline: [1, 4],


        social: [
            { icon: 'github', link: 'https://github.com/vuepress-theme-plume' },
        ],
        // 文章显示
        autoFrontmatter: {
            permalink: true, // 是否生成永久链接
            createTime: true, // 是否生成创建时间
            title: true, // 是否生成标题
        }
    }),


    // 右侧目录显示标题级别
    bundler: viteBundler({
        viteOptions: {
            server: {
                proxy: {
                    // 配置代理，解决跨域问题
                    '/baidu-api': {
                        target: 'https://openapi.baidu.com', // 目标接口域名
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/baidu-api/, ''), // 去掉前缀
                        // 【新增关键代码】伪造请求头，欺骗百度服务器
                        configure: (proxy, options) => {
                            proxy.on('proxyReq', (proxyReq, req, res) => {
                                // 伪装 Origin 和 Referer，让百度以为是自家发起的请求
                                proxyReq.setHeader('Origin', 'https://api.baidu.com');
                                proxyReq.setHeader('Referer', 'https://api.baidu.com');
                            });
                        }
                    }
                }
            }
        }
    }),
})