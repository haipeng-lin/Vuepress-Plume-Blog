---
title: Vuepress-Plume美化总结
createTime: 2025/11/15 14:47:21
permalink: /blog/1fntzdqy/
cover: https://img.haipeng-lin.cn/20260101081838.png
coverStyle:
    layout: left
    ratio: '16:9'
    width: 300
excerpt: '此篇记录了美化丰富 Vuepress-Plume 主题之路，包含了首页、字体、足迹、浏览量、以及藏宝阁等等'
tags:
    - Vuepress
    - 记录

sticky: 101

---


## 首页

效果图：

![image-20260101074829686](https://img.haipeng-lin.cn/20260101074829.png)

自定义组件：

待写

## 修改字体

由于服务器资源有限，所以我便把字体资源替换为在线链接，嵌入到我们网站中，首先需要到 [zeoseven](https://fonts.zeoseven.com/) 或者 [天天字体](https://www.ttfont.com/) 查询自己喜欢的字体并找到嵌入链接

![image-20260101080821768](https://img.haipeng-lin.cn/20260101080821.png)

新增 css 

```css title="custom.css"
body {
    font-family: "LXGW WenKai GB";
    font-weight: normal;
}
```

引入字体配置

```ts title="client.ts"
import './public/css/custom.css'
```

引入字体在线 css

```ts title="config.ts"
import { defineUserConfig } from 'vuepress'
import { defineNoteConfig, plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({

    head: [
        [		// [!code ++]
          'link', { rel: 'stylesheet', href: 'https://fontsapi.zeoseven.com/292/gb-regular/result.css' } // [!code ++]
        ]	// [!code ++]
    ]
})
```

## 足迹

效果图：

![image-20260101081440762](https://img.haipeng-lin.cn/20260101081440.png)

参考文档

- [高德地图 JS API 2.0 文档](https://lbs.amap.com/api/javascript-api-v2/summary)
- [高德地图 JS API 2.0 示例](https://lbs.amap.com/demo/javascript-api-v2/example/map-lifecycle/map-show)

自定义组件

待写：

## 藏宝阁

效果图：

![image-20251222235925205](https://img.haipeng-lin.cn/20251223000030.png)

实现记录：[【Vuepress】藏宝阁](https://haipeng-lin.cn/blog/u5gmpjmf/)

## 百度统计-浏览量

效果图：

![image-20260101074945885](https://img.haipeng-lin.cn/20260101074946.png)

实现记录：

[【Vuepress】百度统计-浏览量](https://haipeng-lin.cn/blog/bm44ybq6/)

## 鼠标点击爆炸烟花特效

效果图：

![特效](https://img.haipeng-lin.cn/20251002000336.gif)

实现记录：

[鼠标点击爆炸粒子烟花特效](https://haipeng-lin.cn/blog/dhg6719f/)





