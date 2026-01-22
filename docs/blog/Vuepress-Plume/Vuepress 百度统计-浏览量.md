---
title: Vuepress | 百度统计-浏览量
createTime: 2025/12/20 23:52:15
permalink: /blog/bm44ybq6/
cover: https://img.haipeng-lin.cn/20251222234429.png
coverStyle:
  layout: left
  ratio: "16:9"
  width: 300
excerpt: "此篇记录了实现统计 vuepress-theme-plume 主题的博客浏览量的过程，实现过程中通过不断的查找资料，理解代码，解决Bug，到最后成功看到效果时和日渐增长的阅读量，还是挺有成就感滴！"
tags:
  - 百度统计
  - 浏览量
show: true
articleGPT: 这篇文章讲了在 VuePress 博客中集成百度统计并展示浏览量的全过程。作者记录了申请 API、配置路由埋点、利用反向代理解决跨域及重写主题组件的技术细节。针对构建时的 SSR 报错，博主也给出了判定环境的修复方案。内容涵盖接口调试与生产部署，是一份详尽的功能开发指南。
---

## 概述

&emsp;&emsp;此篇记录了实现统计 vuepress-theme-plume 主题的博客浏览量的过程，实现过程中通过不断的查找资料，理解代码，解决 Bug，到最后成功看到效果时和日渐增长的阅读量，还是挺有成就感滴！

参考链接：

- [CSDN 教程—vuepress-----23、百度分析](https://blog.csdn.net/weixin_44235759/article/details/134858510)

## 前提环境

- 一个百度开发者账号
- 已安装 Vuepress-theme-plume 主题

## 数据统计

[百度统计](https://tongji.baidu.com/main/setting/10000707520/home/site/index)：新建一个网站，填写域名、网站首页

![image-20251216115737338](https://img.haipeng-lin.cn/1765857481179.png)

新建完网站后，获取统计数据代码，并将代码内嵌在我们页面中

新建文件：

```js title="/docs/.vuepress/public/js/tongji-data.js"
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?c55881511f2633eed7be09790bdd636a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
```

引入该文件：

```ts title="/docs/.vuepress/config.ts"
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({

    head: [
        ['script', { type: 'text/javascript', src: '/js/tongji-data.js', }], // [!code ++]
    ],
)}
```

配置每切换路由，就触发百度数据统计

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({

    enhance({ app, router, siteData },) {
        // 路由切换事件处理		// [!code ++]
        router.beforeEach((to, from, next) => {	// [!code ++]
            //触发百度的pv统计	// [!code ++]
            if (typeof _hmt != "undefined") {	// [!code ++]
                if (to.path) {	// [!code ++]
                    _hmt.push(["_trackPageview", to.fullPath]);	// [!code ++]
                }	// [!code ++]
            }	// [!code ++]
            next();	// [!code ++]
        });	// [!code ++]
    }
}
```

启动访问，验证是否生效

![image-20251218143207145](https://img.haipeng-lin.cn/1766039567436.png)

## 数据展示

### 实现思路

百度统计提供一个功能：**受访页面**，记录了每个页面的访问数据，如 PV 、UV 等等，因此，我们可以基于这个实现开发和生产环境的分区，以及获取每一个页面的访问数据。

需要注意的是，百度统计的受访页面中：页面 URL 后缀并没有 / ，而我们生成的博客 URL 后缀有 /，所以在赋值页面的访问数据时，需要额外给页面 URL 加上后缀 /

### 获取数据

#### 调试接口

百度链接：

- [ 百度账号接口说明](https://tongji.baidu.com/api/manual/Chapter2/openapi.html)
- [Tongji API 调试工具](https://tongji.baidu.com/api/debug/)

简单来说，步骤如下：

1. 开通数据导出服务，获得`API Key`与`Secret Key`

2. {CLIENT_ID} 为 API Key，访问该链接后，点击授权，获取 code

   ```
   http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri=oob&scope=basic&display=popup
   ```

3. 获取 ACCESS_TOKEN，{CODE} 为刚刚获取到的 code，{CLIENT_ID} 为 API Key，{CLIENT_SECRET} 为 Secret Key

   ```
   http://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code={CODE}&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&redirect_uri=oob
   ```

4. 到上方提供的**Tongji API 调试工具**链接测试接口

- 可以通过“获取站点列表”接口获取 网站 id ，或者通过网站列表获取
- “获取报告数据”，选“受访页面”，填写**站点 id**、**查询起始时间**、**查询结束时间**，勾选**网站基础指标**：浏览量，响应结果如下

![image-20251218163142812](https://img.haipeng-lin.cn/1766046703058.png)

#### 引入接口

安装 axios 依赖：

```shell
npm install axios
```

新建文件，注意此处有跨域问题的 bug ，下面会提到

```js title="/docs/.vuepress/public/api/tongji-data.js"
import axios from "axios";

// 查询 PV/UV 数据
export function getPV() {
  const access_token = "";
  const site_id = "";
  const start_date = "20251216";
  const end_date = "20251220";
  const metrics = "pv_count";
  const method = "visit/toppage/a";

  const url =
    "https://openapi.baidu.com/baidu-api/rest/2.0/tongji/report/getData";
  const data = {
    access_token: access_token,
    site_id: site_id,
    start_date: start_date,
    end_date: end_date,
    metrics: metrics,
    method: method,
  };
  return axios.get(url, { params: data });
}
```

调用 getPV() 方法，修改文件：

```js
import { defineClientConfig } from "vuepress/client";
import { getPV } from "./public/api/tongji-data.js";
import path from "path";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach(async (to, from, next) => {
      console.log("路由进入之前触发");
      //触发百度的pv统计
      if (typeof _hmt != "undefined") {
        if (to.path) {
          _hmt.push(["_trackPageview", to.fullPath]);
        }
      }
      // 新增：获取统计数据
      await getPV().then((res) => {
        console.log("数据统计接口返回：", res.data);
        let pv = {};
        if (res.error_code) {
          // Access token 过期了
        } else {
          console.log("正常");
          const items = res.data.result.items || [];
          const page = items[0] || [],
            vis = items[1] || [];
          const n = page.length;
          if (to.path == "/") {
            // 首页
            let total = 0;
            page.forEach((value, index) => {
              // 确保是生产环境
              if (value[0].name.indexOf(window.location.origin) > -1) {
                total += vis[index][0];
              }
            });
            pv["home"] = total;
            for (let i = 0; i < n; i++) {
              pv[page[i][0].name] = vis[i][0];
            }
          } else {
            // 不是首页
            const pathUrl = window.location.origin + to.path;
            for (let i = 0; i < n; i++) {
              if (page[i][0].name + "/" == pathUrl) {
                pv[pathUrl] = vis[i][0]; // 不是首页只添加自己的页面
                break;
              }
            }
          }
        }
        console.log("pv：", pv);
        window.pv = pv;
      });
      next();
    });
  },
});
```

启动之后，发现出现**跨域问题**！

#### 解决跨域

解决方法：使用反向代理解决

修改文件：不要直接显示百度 api

```js title="/docs/.vuepress/public/api/tongji-data.js"
import axios from "axios";

// 查询 PV/UV 数据
export function getPV() {
  const access_token = "";
  const site_id = "";
  const start_date = "20251216";
  const end_date = "20251220";
  const metrics = "pv_count";
  const method = "visit/toppage/a";

  const url =
    "https://openapi.baidu.com/baidu-api/rest/2.0/tongji/report/getData"; // [!code --]
  const url = "baidu-api/rest/2.0/tongji/report/getData"; // [!code ++]
  const data = {
    access_token: access_token,
    site_id: site_id,
    start_date: start_date,
    end_date: end_date,
    metrics: metrics,
    method: method,
  };
  return axios.get(url, { params: data });
}
```

修改文件：

```ts title="/docs/.vuepress/config.ts"
import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  // 新增
  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          // 配置代理，解决跨域问题
          "/baidu-api": {
            target: "https://openapi.baidu.com", // 目标接口域名
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/baidu-api/, ""), // 去掉前缀
            // 伪造请求头，欺骗百度服务器
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
});
```

### 重写组件

修改配置文件，覆盖原有的组件：

```ts title="/docs/.vuepress/config.ts"
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

import { getDirname, path } from 'vuepress/utils'	// [!code ++]
const __dirname = getDirname(import.meta.url)		// [!code ++]

export default defineUserConfig({

    alias: {									// [!code ++]
        '@theme/VPDocMeta.vue': path.resolve(		// [!code ++]
            __dirname,						       // [!code ++]
            './component/theme/MyVPDocMeta.vue',	// [!code ++]
        ),										// [!code ++]
    },											// [!code ++]
}
```

新建 vue 文件，尤其注意该组件**原本引用的子组件的路径**！

```vue title="/docs/.vuepress/component/theme/MyVPDocMeta.vue"
<template>
  <div class="vp-doc-title">
    <slot name="doc-title-before" />
    <h1 class="page-title" :class="{ padding: !hasMeta }">
      <VPBadge v-if="page.frontmatter.draft" type="warning" text="DRAFT" />
      {{ page.title }}
      <VPBadge v-if="badge" :type="badge.type || 'tip'" :text="badge.text" />
    </h1>
    <slot name="doc-title-after" />
  </div>
  <div v-if="hasMeta" class="vp-doc-meta">
    <slot name="doc-meta-before" />
    <!-- 阅读时间 -->
    <p
      v-if="readingTime.time && matter.readingTime !== false"
      class="reading-time"
    >
      <span class="vpi-books icon" />
      <span>{{ readingTime.words }}</span>
      <span>{{ readingTime.time }}</span>
    </p>
    <!-- 标签 -->
    <p v-if="tags.length > 0">
      <span class="vpi-tag icon" />
      <VPLink
        v-for="tag in tags"
        :key="tag.name"
        class="tag"
        :class="tag.className"
        :href="
          tagsLink?.link && isPosts
            ? `${tagsLink.link}?tag=${tag.name}`
            : undefined
        "
      >
        {{ tag.name }}
      </VPLink>
    </p>
    <!-- 阅读：增加以下配置 -->
    <p v-if="pvCount !== null">
      <span
        style="display: inline-block; width: 14px; height: 14px; background-color: currentColor; mask: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z%22/></svg>') no-repeat center; -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z%22/></svg>') no-repeat center;"
      />
      <span>{{ pvCount + " 阅读量" }}</span>
    </p>
    <slot name="doc-meta-after" />
    <!-- 创建时间 -->
    <p v-if="createTime" class="create-time">
      <span class="vpi-clock icon" /><span>{{ createTime }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted, onUnmounted, watch } from "vue";
import VPBadge from "../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPBadge.vue";
import VPLink from "../../../../node_modules/vuepress-theme-plume/lib/client/components/VPLink.vue";
import { useReadingTimeLocale } from "@vuepress/plugin-reading-time/client";
import {
  useData,
  useInternalLink,
  usePostsPageData,
  useTagColors,
} from "../../../../node_modules/vuepress-theme-plume/lib/client/composables/index.js";

const { page, frontmatter: matter, theme, collection } = useData<"post">();
const colors = useTagColors();
const readingTime = useReadingTimeLocale();
const { tags: tagsLink } = useInternalLink();
const { isPosts } = usePostsPageData();

// 当前页面浏览量										// [!code ++]
const pvCount = window.pv[window.location.href] || 0; // [!code ++]

const createTime = computed(() => {
  const show = theme.value.createTime ?? true;
  if (!show || (show === "only-posts" && !isPosts.value)) return "";
  if (matter.value.createTime)
    return matter.value.createTime.split(/\s|T/)[0].replace(/\//g, "-");
  return "";
});

const tags = computed(() => {
  const tagTheme = collection.value?.tagsTheme ?? "colored";
  if (matter.value.tags) {
    return matter.value.tags.slice(0, 4).map((tag) => ({
      name: tag,
      className: colors.value[tag]
        ? `vp-tag-${colors.value[tag]}`
        : `tag-${tagTheme}`,
    }));
  }
  return [];
});

const badge = computed(() => {
  if (matter.value.badge) {
    return typeof matter.value.badge === "string"
      ? { text: matter.value.badge }
      : matter.value.badge;
  }
  return false;
});

const hasDocMetaSlot = inject("doc-meta-slot-exists", ref(false));

const hasMeta = computed(
  () =>
    readingTime.value.time ||
    tags.value.length ||
    createTime.value ||
    hasDocMetaSlot.value ||
    pvCount.value !== null
);
</script>

<style scoped>
/* 保持您原有的样式不变 */
@media (min-width: 768px) {
  .vp-doc-title {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
  }
}

.page-title {
  flex: 1;
  min-width: 0;
  margin-bottom: 0.7rem;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  transition: color var(--vp-t-color);
}

.page-title.padding {
  padding-bottom: 4rem;
}

.vp-doc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0 0.5rem;
  margin-bottom: 2rem;
  font-size: 14px;
  color: var(--vp-c-text-3);
  border-bottom: solid 1px var(--vp-c-divider);
  transition: color var(--vp-t-color), border-bottom var(--vp-t-color);
}

.vp-doc-meta p {
  display: flex;
  gap: 6px;
  align-items: center;
}

.vp-doc-meta .icon {
  width: 14px;
  height: 14px;
}

.vp-doc-meta .tag {
  display: inline-block;
  padding: 3px 5px;
  font-size: 12px;
  line-height: 1;
  color: var(--vp-tag-color);
  background-color: var(--vp-tag-bg);
  border-radius: 3px;
}

.vp-doc-meta .create-time {
  text-align: right;
}

@media (min-width: 768px) {
  .vp-doc-meta .create-time {
    flex: 1 2;
    justify-content: right;
  }
}
</style>
```

测试：

![image-20251218171528691](https://img.haipeng-lin.cn/1766049328827.png)

## 部署

### 发现 Bug

执行 npm run docs:build ，报错：

```shell
报错：TypeError: Invalid URL
    at new URL (node:internal/url:818:25)
    at dispatchHttpRequest (file:///F:/haipeng-lin/git/blog/node_modules/axios/lib/adapters/http.js:408:20)
```

原因：在浏览器环境中，相对路径会自动补全当前域名；但在 Node.js 环境（Build 时）中，没有“域名”概念，Axios 无法解析 `/baidu-api` 到底指向哪里，因此报错

额外的错误：

- **浏览器特有对象缺失**：使用了 `window` 和 `window.location.origin`。在 Node.js 环境下，`window` 对象是不存在的，强行访问会导致程序崩溃
- **统计逻辑的位置不对**：`router.beforeEach` 在 Build 阶段也会被触发

### 解决 Bug

解决思路：通过：**meta.env.SSR** 解决。这是 VuePress 注入的一个全局常量。在执行 `vuepress build` 生成静态文件时，它是 `true`；在用户浏览器打开网页时，它是 `false`

#### 重构 config.ts

修改 config. ts 文件：

- 新增全局响应式状态
- 根据 meta.env.SSR 判断是否为浏览器环境

完整代码如下

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { getPV } from "./public/api/tongji-data.js";
import { onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";

// 全局响应式状态
const stats = reactive({
  pvData: {},
});

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 将响应式对象提供给所有组件
    app.provide("globalStats", stats);

    // 路由切换事件处理
    router.beforeEach((to, from, next) => {
      //触发百度的pv统计
      if (typeof _hmt != "undefined") {
        if (to.path) {
          _hmt.push(["_trackPageview", to.fullPath]);
        }
      }
      next();
    });
  },

  setup() {
    // meta.env.SSR 为 true ，非浏览器环境
    if (import.meta.env.SSR) return;
    const route = useRoute();
    // 定义统计逻辑函数
    const trackAndFetchPV = async (toPath, fullPath) => {
      // 1. 百度统计数据
      if (typeof _hmt !== "undefined") {
        _hmt.push(["_trackPageview", fullPath]);
      }

      // 2. 获取统计数据
      try {
        const res = await getPV();
        if (res.error_code) return;

        const pv = {};
        const newPv = {};
        const items = res.data.result.items || [];
        const page = items[0] || [],
          vis = items[1] || [];
        const origin = window.location.origin;

        if (toPath === "/") {
          // 首页
          let total = 0;
          page.forEach((value, index) => {
            if (value[0].name.indexOf(origin) > -1) total += vis[index][0];
          });
          newPv["home"] = total;
          page.forEach((item, i) => {
            newPv[item[0].name] = vis[i][0];
          });
        } else {
          //
          const pathUrl = origin + toPath;
          const index = page.findIndex(
            (p) => p[0].name === pathUrl || p[0].name + "/" === pathUrl
          );
          if (index !== -1) newPv[pathUrl] = vis[index][0];
        }
        stats.pvData = newPv;
        console.log("pvData：", stats.pvData);
      } catch (e) {
        console.error("PV Fetch Error:", e);
      }
    };

    // 页面首次加载
    onMounted(() => {
      trackAndFetchPV(route.path, route.fullPath);
    });

    // 监听路由变化
    watch(
      () => route.fullPath,
      (newVal) => {
        trackAndFetchPV(route.path, newVal);
      }
    );
  },
});
```

#### 修改 MyVPDocMeta.vue

修改文件：

```vue title="/docs/.vuepress/component/theme/MyVPDocMeta.vue"
<script>
const globalStats = inject("globalStats", { pvData: {} });

const pvCount = computed(() => {
  if (import.meta.env.SSR) return null;
  // 当前页面 url
  const pathUrl = window.location.origin + page.value.path;
  // 阅读量
  const count =
    globalStats.pvData[pathUrl] || globalStats.pvData[page.value.path];
  return count !== undefined ? count : null;
});
</script>
```

### 反向代理

配置反向代理到百度服务器上：

```shell
location /baidu-api/ {
    # 重写路径：去掉开头的 /baidu-api
    rewrite ^/baidu-api/(.*)$ /$1 break;

    # 目标接口域名
    proxy_pass https://openapi.baidu.com;

    # 关键：伪造请求头，欺骗百度服务器（对应 Vite 的 configure 部分）
    proxy_set_header Host openapi.baidu.com;
    proxy_set_header Origin https://api.baidu.com;
    proxy_set_header Referer https://api.baidu.com;

    # 传递客户端真实 IP
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # 解决 HTTPS 代理可能出现的 SNI 问题
    proxy_ssl_server_name on;
}
```
