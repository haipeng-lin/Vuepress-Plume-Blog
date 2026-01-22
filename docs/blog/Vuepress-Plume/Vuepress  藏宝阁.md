---
title: Vuepress | 藏宝阁
createTime: 2025/12/20 23:52:10
permalink: /blog/u5gmpjmf/
cover: https://img.haipeng-lin.cn/20251222235050.png
coverStyle:
  layout: left
  ratio: "16:9"
  width: 300
excerpt: "此篇记录了藏宝阁（电影观看记录）页面的实现过程。由于现在的 Vuepress 主题市面上使用的人数较 Hexo 主题少，找不到实现心心念念的藏宝阁教程，故逐步探索着实现过程：如何在 Vuepress 主题注册 Vue 组件？页面结构&样式设计？如何使用 Vue 组件。"
tags:
  - 电影电视剧
  - 回忆
show: true
articleGPT: 这篇文章讲了在 VuePress 博客中实现“藏宝阁”电影记录页的全过程。作者记录了因教程稀缺而自主探索的经历，包括编写支持响应式的 Movie 视频海报组件、设计星级评价系统及注册全局组件的方法。通过将 Vue 组件无缝嵌入 Markdown 页面，成功打造出一个极具仪式感的观影回忆空间。
---

## 概述

&emsp;&emsp;此篇记录了藏宝阁（电影观看记录）页面的实现过程。由于现在的 Vuepress 主题市面上使用的人数较 Hexo 主题少，找不到实现心心念念的藏宝阁教程，故逐步探索着实现过程：如何在 Vuepress 主题注册 Vue 组件？页面结构   样式设计？如何使用 Vue 组件。

## 效果图

![image-20251219113016207](https://img.haipeng-lin.cn/1766115017464.png)

## 动手实操

### 新增组件

新增文件：

```vue title="/docs/.vuepress/component/Movie.vue"
<template>
  <div class="movie-collection-container">
    <div class="header">
      <h2>🎬 电影</h2>
      <p class="subtitle">
        喜欢港片、悬疑片、恐怖片（越菜越爱玩）. 共收藏
        {{ movieList.length }} 部影片
      </p>
    </div>
    <div class="movie-grid">
      <div v-for="movie in movieList" :key="movie.id" class="movie-grid-item">
        <div class="poster-wrapper">
          <!-- 图片 -->
          <img :src="movie.poster" :alt="movie.title" loading="lazy" />
          <!-- 状态 -->
          <span class="status-badge">{{ movie.status }}</span>
          <div class="movie-overlay-info">
            <!-- 标题 -->
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="meta-row">
              <div class="rating-stars">
                <!-- 星星 -->
                <span
                  v-for="(type, index) in getStars(movie.score)"
                  :key="index"
                  class="star-icon"
                  :class="type"
                  >★</span
                >
                <!-- 评分 -->
                <span class="score-num">{{ movie.score }}</span>
              </div>
            </div>
            <!-- 日期 -->
            <span class="watch-date">{{ movie.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 电影列表
const movieList = ref([
  {
    title: "爱·作战",
    poster: "",
    score: 5,
    date: "2025-07",
    status: "已看",
  },
  {
    title: "的士判官",
    poster: "",
    score: 4,
    date: "2025-07",
    status: "已看",
  },
  {
    title: "龙虎风云",
    poster: "",
    score: 4.5,
    date: "2025-07",
    status: "已看",
  },
  {
    title: "猎金游戏",
    poster: "",
    score: 4,
    date: "2025-07",
    status: "已看",
  },
  {
    title: "常在我心",
    poster: "",
    score: 5,
    date: "2025-07",
    status: "已看",
  },
  {
    title: "铿钱家族",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "每当变幻时",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "神雕侠侣",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "冲锋陷阵",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "使徒行者",
    poster: "",
    score: 4.5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "卧虎藏龙",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
  {
    title: "英雄",
    poster: "",
    score: 5,
    date: "2025-06",
    status: "已看",
  },
]);

/** 获取星星 */
const getStars = (score) => {
  const stars = [];
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 !== 0;
  for (let i = 0; i < fullStars; i++) stars.push("full");
  if (hasHalf) stars.push("half");
  while (stars.length < 5) stars.push("empty");
  return stars;
};
</script>

<style scoped>
/** 变量定义 */
.movie-collection-container {
  --card-bg: #ffffff;
  --text-overlay: #fff;
  /* 遮罩层文字颜色 */
  --text-overlay-sub: rgba(255, 255, 255, 0.7);
  /* 遮罩层次要文字颜色 */
  --primary: #49b1f5;
  --star-color: #ffc107;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.2);
  min-height: 100vh;
}

.header {
  margin: 0 auto 10px;
  text-align: center;
}

.header h2 {
  margin: 0 0 10px;
  color: #4c4948;
}

.subtitle {
  color: #999;
  font-size: 0.9rem;
}

/** 网格布局 */
.movie-grid {
  display: grid;
  /* 核心需求：一行显示6个。使用 minmax 确保最小宽度，避免过分挤压 */
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  /* 卡片间距 */
  max-width: 1400px;
  /* 增加最大宽度以容纳6列 */
  margin: 0 auto;
}

/** 卡片项样式 */
.movie-grid-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  background: var(--card-bg);
  /* 强制设置宽高比为常见的海报比例 (2:3) */
  aspect-ratio: 2 / 3;
  /* 解决 Safari 圆角溢出问题 */
  transform: translateZ(0);
}

.movie-grid-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

/* 海报包裹层 */
.poster-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}

.poster-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 确保图片填满且不变形 */
  transition: transform 0.5s ease;
}

.movie-grid-item:hover .poster-wrapper img {
  transform: scale(1.05);
  /* 轻微放大效果 */
}

/* --- 右上角状态 --- */
.status-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  /* 改为右上角 */
  background: rgba(0, 0, 0, 0.65);
  color: var(--text-overlay);
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 2;
  font-weight: 500;
}

/* --- 左下角信息遮罩层 --- */
.movie-overlay-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 50px 12px 12px;
  /* 顶部留出空间给渐变 */
  box-sizing: border-box;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* 关键：底部黑色渐变，保证文字清晰度 */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 60%,
    transparent 100%
  );
  color: var(--text-overlay);
}

/* 电影标题 */
.movie-title {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.3;
  color: #ffffff;
}

/* 评分行 */
.meta-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.rating-stars {
  display: flex;
  align-items: center;
}

/* 星星图标调整得更紧凑小巧 */
.star-icon {
  font-size: 12px;
  margin-right: 1px;
}

.star-icon.full {
  color: var(--star-color);
}

.star-icon.half {
  color: transparent;
  background: linear-gradient(
    90deg,
    var(--star-color) 50%,
    rgba(255, 255, 255, 0.3) 50%
  );
  background-clip: text;
  -webkit-background-clip: text;
}

.star-icon.empty {
  color: rgba(255, 255, 255, 0.3);
}

.score-num {
  margin-left: 6px;
  color: var(--star-color);
  font-weight: bold;
  font-size: 0.9rem;
}

/* 观看时间 */
.watch-date {
  font-size: 0.75rem;
  color: var(--text-overlay-sub);
}

/* --- 响应式适配 (重要) --- */
/* 确保在小屏幕上不会强制6列导致不可看 */
@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 992px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .movie-collection-container {
    padding: 20px 10px;
  }

  .movie-grid {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .movie-title {
    font-size: 0.9rem;
  }
}
</style>
```

### 注册组件

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Movie from "./component/Movie.vue"; // [!code ++]

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // [!code ++]
    app.component("Movie", Movie); // [!code ++]
  }, // [!code ++]
});
```

### 使用组件

新建笔记：

```md title="/docs/.vuepress/blog/movie.md"
---
title: 藏宝阁
permalink: /movie/
createTime: false
readingTime: false
---

<Movie></Movie>
```
