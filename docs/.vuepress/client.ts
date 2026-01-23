import { defineClientConfig } from "vuepress/client";
import { clickEffect3 } from "./custom.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./public/css/index.css";
import "./public/css/custom.css";

import { getPV } from "./public/api/tongji-data.js";

import APlayer from "./component/APlayer/index.vue";
import ArticleGPT from "./component/ArticleGPT/index.vue";
import FootMap from "./component/FootMap/index.vue";
import Movie from "./component/Movie/index.vue";
import Poem from "./component/Poem/index.vue";
import SakuraManager from "./component/js/SakuraManager/index.vue";

import CustomHome from "./component/theme/home/CustomHome.vue";

import RepoCard from "vuepress-theme-plume/features/RepoCard.vue";

import VPPosts from "../../node_modules/vuepress-theme-plume/lib/client/components/Posts/VPPosts.vue";

import { useRoute } from "vue-router";

import { onMounted, watch, reactive } from "vue";
const stats = reactive({
  pvData: {},
  ai: {},
});

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 注册element-plus
    app.use(ElementPlus);
    // 其他逻辑
    app.component("APlayer", APlayer);
    app.component("ArticleGPT", ArticleGPT);
    app.component("FootMap", FootMap);
    app.component("Movie", Movie);
    app.component("Poem", Poem);
    app.component("SakuraManager", SakuraManager);

    app.component("CustomHome", CustomHome);
    app.component("VPPosts", VPPosts);
    app.component("RepoCard", RepoCard);

    app.provide("globalStats", stats);
  },
  setup() {
    // setup 在 client 端也会执行，但我们可以利用 import.meta.env.SSR
    if (import.meta.env.SSR) return;

    const route = useRoute();

    // 定义统计逻辑函数
    const trackAndFetchPV = async (toPath, fullPath) => {
      // console.log('统计数据')
      // 1. 百度统计数据
      if (typeof _hmt !== "undefined") {
        _hmt.push(["_trackPageview", fullPath]);
      }

      // 2. 获取统计数据
      try {
        const res = await getPV();
        // console.log("res:", res)
        if (res.error_code) return;

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
        // console.log("pvData：", stats.pvData)
      } catch (e) {
        console.error("PV Fetch Error:", e);
      }
    };

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
