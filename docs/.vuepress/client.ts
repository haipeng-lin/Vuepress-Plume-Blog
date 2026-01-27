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
});
