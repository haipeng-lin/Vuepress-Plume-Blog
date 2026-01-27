---
title: Vuepress-Plume | 美化总结
createTime: 2025/11/15 14:47:21
permalink: /blog/1fntzdqy/
cover: https://img.haipeng-lin.cn/20260101081838.png
coverStyle:
  layout: left
  ratio: "16:9"
  width: 300
excerpt: "此篇记录了美化丰富 Vuepress-Plume 主题之路，包含了首页、字体、足迹、浏览量、以及藏宝阁等等"
tags:
  - Vuepress
  - 记录
carousel: true
carouselOrder: 2
carouselItemBg: "#19cfb3"
---

## 首页

效果图：

![image-20260101074829686](https://img.haipeng-lin.cn/1768622018580.png)

自定义组件：

在 docs/.vuepress/component/theme/home 文件夹下新增以下 vue

::: code-tabs

@tab CustomHome.vue

```vue
<template>
  <div>
    <div class="container">
      <canvas ref="canvasRef"></canvas>

      <!-- 第一行 -->
      <div class="about-me">
        <div class="about-me-3-2-row">
          <AboutMe />
          <AboutMeText>
            <template #motto>
              <slot name="motto">
                <p class="about-me-card-title-normal">𝓂𝑜𝓉𝓉𝑜</p>
                <p class="about-me-card-text-big">路漫漫其修远兮</p>
                <p class="about-me-card-text-big about-me-card-text-color">
                  吾将上下而求索
                </p>
              </slot>
            </template>
          </AboutMeText>
        </div>

        <!-- 第二行 -->
        <div class="about-me-3-2-row">
          <AboutMeSkill />
          <AboutMeLife />
        </div>

        <!-- 第三行 -->
        <div class="about-me-1-1-row" style="margin-bottom: 20px">
          <AboutMeText>
            <template #motto>
              <slot name="motto">
                <p class="about-me-card-title-normal">𝓈𝓁𝑜𝑔𝒶𝓃</p>
                <p class="about-me-card-text-big">
                  前方是<span style="color: #3a5ccc">未知</span
                  >&ensp;迎面是<span style="color: #3a5ccc">海风</span>
                </p>
                <p class="about-me-card-text-big">
                  塞壬的歌会诱人忘记<span style="color: #d53737">初衷</span>
                </p>
              </slot>
            </template>
          </AboutMeText>
          <AboutMeCharacter />
        </div>

        <!-- 第四行 -->
        <!-- <div class="about-me-1-row">
                <AboutMeFriendLink />
            </div> -->
      </div>
    </div>
    <VPPosts :home-posts="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AboutMe from "./AboutMe.vue";
import AboutMeText from "./AboutMeText.vue";
import AboutMeSkill from "./AboutMeSkill.vue";
import AboutMeCharacter from "./AboutMeCharacter.vue";
import AboutMeLife from "./AboutMeLife.vue";
import AboutMeFriendLink from "./AboutMeFriendLink.vue";

interface Comet {
  direction: "horizontal" | "vertical";
  position: number;
  progress: number;
  speed: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const linesGap = 20;
const comets = ref<Comet[]>([]);
const mouseX = ref(-1);
const mouseY = ref(-1);
let animationFrameId: number;

const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  ctx.value = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx.value) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const createComet = () => {
  const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
  const maxPosition =
    direction === "horizontal"
      ? Math.floor(window.innerHeight / linesGap)
      : Math.floor(window.innerWidth / linesGap);

  const position = Math.floor(Math.random() * maxPosition) * linesGap;

  if (comets.value.length < 20) {
    comets.value.push({
      direction,
      position,
      progress: 0,
      speed: Math.random() * 0.005 + 0.002,
    });
  }
};

onMounted(() => {
  initCanvas();
  // animate()
  setInterval(createComet, 500);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  // cancelAnimationFrame(animationFrameId)
});
</script>

<style scoped>
.container {
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

canvas {
  z-index: -1;
  position: fixed;
  top: -1px;
  left: -1px;
  pointer-events: none;
  /* 允许鼠标事件穿透 */
  overflow: hidden;
}

.about-me {
  max-width: 1380px;
  margin: 0 auto;
  width: 90%;

  @media screen and (max-width: 770px) {
    width: 94%;
  }
}

.about-me-3-2-row {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;

  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
}

.about-me-1-1-row {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
}

.about-me-1-row {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
```

@tab About.vue

```vue
<script setup></script>

<template>
  <router-link to="/about-me/" class="head-social-avatar">
    <div class="about-me-name">
      <p>𝐻𝑒𝓁𝓁𝑜, 𝓃𝒾𝒸𝑒 𝓉𝑜 𝓂𝑒𝑒𝓉 𝓎𝑜𝓊 !👋</p>
      <p class="about-me-card-text-big">你可以叫我 𝙁𝙡𝙖𝙨𝙝 .</p>
      <p>是一名喜欢摄影、民俗、记录 的 Java 后端开发工程师。</p>
    </div>
  </router-link>
</template>

<style scoped>
.about-me-name {
  border-radius: 12px;
  justify-content: center;
  padding: 2rem;
  color: #fff;
  background-image: linear-gradient(
    120deg,
    var(--vp-c-brand-3),
    var(--vp-c-brand-soft)
  );
  background-size: 200% 200%;

  > p {
    color: var(--vp-c-text-1);
  }
}
</style>
```

@tab AboutMeCharacter.vue

```vue
<script setup></script>

<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-character">
    <p class="about-me-card-title-normal">𝒸𝒽𝒶𝓇𝒶𝒸𝓉𝑒𝓇</p>
    <div class="about-me-character-content">
      <div class="about-me-character-type">
        <p class="about-me-card-text-big about-me-card-text-color">守卫者</p>
        <p class="about-me-card-text-big">ISFJ-T</p>
      </div>
      <div class="about-me-character-img"></div>
    </div>
  </div>
</template>

<style scoped>
.about-me-character {
  padding: 20px;

  &:hover .about-me-character-img {
    transform: scale(1.1);
  }
}

.about-me-character-content {
  display: flex;
}

.about-me-character-type {
  width: fit-content;
}

.about-me-character-img {
  display: flex;
  align-items: end;
  position: relative;
  flex: 1;
  transition: transform 1s;
  width: fit-content;
  min-height: 110px;
  background-image: url("https://www.16personalities.com/static/images/personality-types/avatars/email/large/ISFJ_male.png?v=1");
  background-position: right bottom;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
```

@tab AboutMeLife.vue

```vue
<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-life">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">𝐿𝒾𝒻𝑒</p>
      <p class="about-me-card-text-big">我的日常</p>
    </div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import * as echarts from 'echarts';

const chartRef = ref(null);

// 示例数据
const lifeData = [
  { name: "工作", value: (30 / 100).toFixed(2) },
  { name: "生活", value: (20 / 100).toFixed(2) },
  { name: "学习", value: (20 / 100).toFixed(2) },
  { name: "娱乐", value: (20 / 100).toFixed(2) },
  { name: "发呆", value: (10 / 100).toFixed(2) },
];
onMounted(() => {
  import("echarts").then((echarts) => {
    const myChart = echarts.init(chartRef.value);

    const option = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "我的日常",
          type: "pie",
          radius: ["40%", "65%"],
          center: ["50%", "35%"],
          startAngle: 180,
          endAngle: 360,
          data: lifeData,
        },
      ],
    };

    myChart.setOption(option);

    // 响应式调整
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
});
</script>

<style scoped>
.about-me-life {
  height: 316px;
  padding: 20px 0;
  overflow: inherit;
}

.chart-container {
  height: 100%;
}
</style>
```

@tab AboutMeSkill.vue

```vue
<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-skill">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">𝒮𝓀𝒾𝓁𝓁</p>
      <p class="about-me-card-text-big">我的能力</p>
    </div>
    <!-- 第一行向左移动 -->
    <div class="marquee-row first-row">
      <div class="marquee-content">
        <span v-for="(item, index) in technology" :key="index">
          <icon :name="item.icon" />
        </span>
        <span
          v-for="(item, index) in technology"
          :key="index + technology.length"
        >
          <icon :name="item.icon" />
        </span>
      </div>
    </div>
    <!-- 第二行向右移动 -->
    <div class="marquee-row second-row">
      <div class="marquee-content">
        <span v-for="(item, index) in tools" :key="index">
          <icon :name="item.icon" />
        </span>
        <span v-for="(item, index) in tools" :key="index + tools.length">
          <icon :name="item.icon" />
        </span>
      </div>
    </div>

    <div class="about-me-skill-detail">
      <span v-for="(item, index) in technology" :key="index">
        <icon :name="item.icon" /> <span>{{ item.type }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const technology = ref([
  { type: "Java", icon: "vscode-icons:file-type-java" },
  { type: "Python", icon: "material-icon-theme:python" },
  { type: "Vue", icon: "vscode-icons:file-type-vue" },
  { type: "MySQL", icon: "devicon:mysql" },
  { type: "Redis", icon: "devicon:redis" },
  { type: "RabbitMQ", icon: "devicon:rabbitmq" },
  { type: "Elasticsearch", icon: "vscode-icons:file-type-elastic" },
  { type: "MQ", icon: "simple-icons:apacherocketmq" },
  // {type: 'Go', icon: 'vscode-icons:file-type-go'},
]);

// https://icon-sets.iconify.design/?query=android
const tools = ref([
  { type: "IDEA", icon: "logos:intellij-idea" },
  { type: "VSCode", icon: "vscode-icons:file-type-vscode" },
  { type: "PyCharm", icon: "devicon:pycharm" },
  { type: "Postman", icon: "vscode-icons:file-type-postman" },
  { type: "Git", icon: "devicon:git" },
]);
</script>

<style scoped>
.about-me-skill {
  position: relative;
  min-height: 250px;
  padding: 20px 0;
  z-index: 1;

  &:hover .marquee-row {
    opacity: 0;
  }

  &:hover .about-me-skill-detail {
    opacity: 1;
  }
}

.about-me-skill-detail {
  position: absolute;
  top: 100px;
  opacity: 0;
  z-index: 2;
  display: flex;
  padding: 0 20px;
  transition: opacity 0.5s;
  flex-wrap: wrap;
}

.about-me-skill-detail > span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px 6px 0;
  border-radius: 8px;
  padding: 7px;
  font-size: 16px;
  color: var(--vp-c-text-2);
  background-color: var(--home-action-bnt-bg);
}

.marquee-row {
  transition: opacity 0.6s 0.1s;
  width: 105%;
  margin-left: -6px;
  overflow: hidden;
  white-space: nowrap;
  transform: rotateZ(-6deg);
}

.marquee-content {
  display: inline-flex;
  animation: marquee-left 30s linear infinite;
}

.marquee-content > span {
  border-radius: 20%;
  align-content: center;
  align-items: center;
  background-color: var(--about-me-skill-item-bg);
  width: 80px;
  height: 80px;
  font-size: 50px;
  margin: 0 10px;
}

.first-row {
  margin-top: 20px;
}

.second-row {
  margin-top: 20px;
}

.second-row .marquee-content {
  animation: marquee-right 50s linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>
```

@tab AboutMeText.vue

```vue
<script setup></script>

<template>
  <div class="about-me-card-bg vp-blog-post-item">
    <slot name="motto">
      <p class="about-me-card-title-normal">小标题</p>
      <p class="about-me-card-text-big about-me-card-text-soft">
        第一行<span style="color: #3a5ccc">内容</span>
      </p>
      <p class="about-me-card-text-big">
        第二行<span style="color: #3a5ccc">内容</span>
      </p>
    </slot>
  </div>
</template>

<style scoped></style>
```

:::

注册自定义首页组件：

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from 'vuepress/client'
import CustomHome from "./component/theme/home/CustomHome.vue";	// [!code ++]

export default defineClientConfig({

    enhance({ app, router, siteData }) {
        app.component('CustomHome', CustomHome)	// [!code ++]
    }
}
```

使用自定义首页组件：

```md title="/docs/README.md"
---
pageLayout: home
externalLinkIcon: false
config:
  - type: CustomHome
---
```

## 文章摘要

&emsp;&emsp;嘿嘿，由于之前在 Hexo 引入过 TianliGPT 来实现文章摘要，体验下来还是蛮不错的，但是一旦文章内容有变，便命中不了之前生成的记录，所以又再消耗额度，随着 Hexo 的远去，TianliGPT 也没有接触过了。最近偶然在网上刷到一篇《0 成本实现 TianliGPT》，芜湖，解锁新大陆，遂加入这一个本地的 AI 摘要，以下是实现过程

参考文章：

- [SimpleWordBI-AI 摘要](https://simpleword.bid/article/%E6%9D%82%E9%A1%B9/vitepress/AI%E6%91%98%E8%A6%81.html)
- [0 成本实现 TianliGPT，实现纯本地的 AI 摘要](https://blog.imsyy.top/posts/2024/0218)

效果图：

![image-20260122085457712](https://img.haipeng-lin.cn/1769043302910.png)

新增组件：

```vue title="/docs/.vuepress/component/ArticleGPT/index.vue"
<template>
  <div v-if="frontmatter.articleGPT" class="article-summary">
    <div class="summary-container">
      <div class="header">
        <div class="title-section">
          <div class="icon-wrapper">
            <div class="icon">
              <el-icon>
                <ChatDotRound />
              </el-icon>
            </div>
          </div>
          <span class="title">文章摘要</span>
        </div>
        <div class="action-section">
          <el-tooltip content="朗读摘要" placement="top" :show-after="300">
            <div
              class="speak-button"
              @click="toggleSpeak"
              :class="{ speaking: isSpeaking }"
            >
              <el-icon>
                <Microphone />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
      </div>

      <div class="content-box" :class="{ 'loading-box': loading }">
        <div class="bubble-container">
          <p class="text" :class="{ 'is-typing': loading }">
            {{
              abstractData === "" ? "AI 正在分析并生成摘要..." : abstractData
            }}
            <span v-if="loading" class="cursor">|</span>
          </p>
          <div class="bubble-decoration"></div>
        </div>
      </div>

      <div class="footer">
        <div class="meta-info">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>此内容根据文章生成，仅用于文章内容的解释与总结</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePageFrontmatter } from "vuepress/client";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ChatDotRound, Microphone, InfoFilled } from "@element-plus/icons-vue";

const frontmatter = usePageFrontmatter();
const loading = ref(true);
const waitTimeOut = ref(null);
const abstractData = ref("");

// 语音相关状态（增加 window 检查，适配 SSR）
const isSpeaking = ref(false);
let speechSynth = null;
let utterance = null;

/**
 * 模拟打字机效果
 */
const typeWriter = (text = null, targetRef = abstractData, callback = null) => {
  try {
    const data = text || frontmatter.value.articleGPT;
    if (!data) return;

    targetRef.value = "";
    let index = 0;

    const type = () => {
      if (index < data.length) {
        const char = data.charAt(index++);
        targetRef.value += char;

        // 标点符号停顿感
        const isPunctuation = [
          ",",
          "，",
          ".",
          "。",
          "!",
          "！",
          "?",
          "？",
          ";",
          "；",
          ":",
          "：",
        ].includes(char);
        const delay = isPunctuation
          ? Math.random() * 50 + 100
          : Math.random() * 40 + 20;

        setTimeout(type, delay);
      } else {
        if (callback) callback();
        if (targetRef === abstractData) loading.value = false;
      }
    };
    type();
  } catch (error) {
    loading.value = false;
    targetRef.value = "摘要加载异常";
    console.error("Typewriter Error:", error);
  }
};

/**
 * 语音朗读控制
 */
const toggleSpeak = () => {
  if (isSpeaking.value) {
    stopSpeak();
  } else {
    startSpeak();
  }
};

const startSpeak = () => {
  if (!abstractData.value || loading.value || !speechSynth) return;

  // 停止之前的播放
  speechSynth.cancel();

  utterance = new SpeechSynthesisUtterance(abstractData.value);
  utterance.lang = "zh-CN";
  utterance.rate = 1.1; // 语速稍微快一点点

  utterance.onend = () => {
    isSpeaking.value = false;
  };

  isSpeaking.value = true;
  speechSynth.speak(utterance);
};

const stopSpeak = () => {
  if (speechSynth) {
    speechSynth.cancel();
  }
  isSpeaking.value = false;
};

const initAbstract = () => {
  // 模拟 AI 思考延迟
  waitTimeOut.value = setTimeout(() => {
    abstractData.value = "";
    typeWriter();
  }, Math.random() * 500 + 500);
};

onMounted(() => {
  // 仅在客户端浏览器环境下初始化语音 API
  if (typeof window !== "undefined") {
    speechSynth = window.speechSynthesis;
  }

  // 如果 frontmatter 里有数据则开始渲染
  if (frontmatter.value && frontmatter.value.articleGPT) {
    initAbstract();
  }
});

onBeforeUnmount(() => {
  if (waitTimeOut.value) clearTimeout(waitTimeOut.value);
  stopSpeak();
});
</script>

<style scoped>
.article-summary {
  margin: 2.5rem 0;
  max-width: 100%;
}

.summary-container {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(235, 235, 235, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.summary-container:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid #f0f0f0;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #3498db;
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #34495e;
}

.speak-button {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8f9fa;
  cursor: pointer;
  color: #3498db;
  transition: all 0.2s ease;
  border: 1px solid #eee;
}

.speak-button:hover {
  background: #e1f0fa;
  transform: scale(1.1);
}

.speak-button.speaking {
  background: #3498db;
  color: white;
  animation: wave 1.5s infinite ease-in-out;
}

/* 内容区域 */
.content-box {
  padding: 20px;
  background: #fff;
}

.bubble-container {
  position: relative;
  background: #fdfdfd;
  padding: 16px;
  border-radius: 10px;
  border-left: 4px solid #3498db;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
}

.text {
  margin: 0;
  line-height: 1.7;
  color: #4a5568;
  font-size: 15px;
  text-align: justify;
  text-indent: 2em;
}

.cursor {
  font-weight: bold;
  color: #3498db;
  animation: blink 1s infinite;
}

/* 底部区域 */
.footer {
  padding: 10px 20px;
  background: #fcfcfc;
  border-top: 1px dashed #eee;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
}

/* 动画 */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@keyframes wave {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
}

/* 深色模式适配 */
:root.dark .summary-container {
  background: #1e1e1e;
  border-color: #333;
}

:root.dark .header {
  background: #252525;
  border-bottom-color: #333;
}

:root.dark .title {
  color: #e0e0e0;
}

:root.dark .content-box {
  background: #1e1e1e;
}

:root.dark .bubble-container {
  background: #2a2a2a;
  border-left-color: #3498db;
}

:root.dark .text {
  color: #ccc;
}

:root.dark .speak-button {
  background: #333;
  border-color: #444;
}

:root.dark .footer {
  background: #252525;
  border-top-color: #333;
}
</style>
```

注册组件：

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from 'vuepress/client'
import ArticleGPT from "./component/ArticleGPT/index.vue";	// [!code ++]

export default defineClientConfig({

    enhance({ app, router, siteData }) {
        app.component('ArticleGPT', ArticleGPT)	// [!code ++]
    }
}
```

使用组件，对 MD 文档进行嵌入

```ts title="/docs/.vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { defineNoteConfig, plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
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
});
```

在文章加上摘要内容：

```md
---
show: true
articleGPT: 该文章讲了从 Windows 阵营切换到 MacBook 后的系统“开荒”与习惯适配过程。作者记录了如何通过修改修饰键位（如 Command 与 Ctrl 互换）来找回熟悉的快捷键手感，并详细列举了从代码开发工具到 AltTab、PicGo 等各类提升效率的必备软件清单，旨在帮助同样习惯 Windows 的用户快速度过系统迁移的阵痛期。
---
```

## 足迹

效果图：

![image-20260123113201964](https://img.haipeng-lin.cn/1769139122178.png)

参考文档

- [高德地图 JS API 2.0 文档](https://lbs.amap.com/api/javascript-api-v2/summary)
- [高德地图 JS API 2.0 示例](https://lbs.amap.com/demo/javascript-api-v2/example/map-lifecycle/map-show)

新增组件：

```vue title="/docs/.vuepress/component/FootMap/index.vue"
<template>
  <div id="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// 状态：用于跟踪地图是否加载完成
const isMapLoaded = ref(false);

/**
 * 动态加载高德地图 JS API Loader
 */
const loadAMap = async () => {
  // 确保 AMapLoader 只在客户端被导入
  const AMapLoader = await import("@amap/amap-jsapi-loader");

  // AMapLoader.load 会返回一个 Promise
  await AMapLoader.load({
    key: "04fc0ff41d59b411e57496afb25fea89",
    version: "2.0",
    plugins: ["AMap.ToolBar", "AMap.Scale"], // 添加常用插件
  });
};

/**
 * 初始化高德地图
 */
const initMap = () => {
  var cityList = [
    {
      adcode: "441800",
      name: "清远",
      position: [113.0505994, 23.6832984],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 清远市</h3><i>📅 2023（七天的三下乡旅程）</i><p style='line-height:8px'></p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206212719.png'/></div></div>",
    },
    {
      adcode: "440600",
      name: "佛山",
      position: [113.122717, 23.028762],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 佛山市</h3><i>📅 2023（祖庙）</i><p style='line-height:8px'></p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206213302.png'/><img width='150' src='https://img.haipeng-lin.cn/20251206213246.png'/></div></div>",
    },
    {
      adcode: "440100",
      name: "广州",
      position: [113.2592945, 23.1301964],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 广州市</h3><i>📅 2021-2025 (读书&打工)</i><p style='line-height:8px'>第二家乡，大学生活和打工历程</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206212054.png'/><img width='150' src='https://img.haipeng-lin.cn/20251206212114.png'/></div></div>",
    },
    {
      adcode: "360100",
      name: "南昌",
      position: [115.8540042, 28.687547],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 南昌市</h3><i>📅 2025（游玩）</i><p style='line-height:8px'>超级好吃😋的南昌拌粉、好看的滕王阁等等</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251016000222.png'/><img width='150' src='https://img.haipeng-lin.cn/20251016000206.png'/></div></div>",
    },
    {
      adcode: "440300",
      name: "深圳",
      position: [114.0545429, 22.5445741],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 深圳市</h3><i>📅 2025（实习）</i><p style='line-height:8px'>印象：物价死贵、房东坑人</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251002162126.png'/></div></div>",
    },
    {
      adcode: "360300",
      name: "萍乡",
      position: [113.8830806, 27.6603206],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 萍乡市</h3><i>📅 2025（武功山）</i><p style='line-height:8px'>第一次爬1500的小山峰</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251123220552.png'/><img width='150' src='https://img.haipeng-lin.cn/20251123220722.png'/></div></div>",
    },
    {
      adcode: "440400",
      name: "珠海",
      position: [113.5721327, 22.273734],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 珠海市</h3><i>📅 2025（实习）</i><p style='line-height:8px'>很宜居、适合旅游的城市</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251127000651.png'/><img width='150' src='https://img.haipeng-lin.cn/20251127000655.png'/></div></div>",
    },
  ];

  let adCode = [];
  for (var i = 0; i < cityList.length; i++) {
    adCode.push(cityList[i].adcode);
  }

  const mapContainer = document.getElementById("mapContainer");
  // 检查地图容器和全局 AMap 对象
  if (!mapContainer || typeof AMap === "undefined") {
    console.error("Map container not found or AMap not loaded");
    return;
  }

  try {
    // 总地图初始化
    const mapInstance = new AMap.Map("mapContainer", {
      viewMode: "3D",
      zoom: 6.5,
      center: [113.8830806, 23.6603206],
      pitch: 40,
      defaultCursor: "pointer",
      features: ["bg", "road", "building", "area", "sky"],
    });
    mapInstance.setMapStyle("amap://styles/whitesmoke");

    // 填充省份颜色
    const disProvince = new AMap.DistrictLayer.Province({
      zIndex: 12,
      zooms: [2, 15],
      adcode: adCode,
      depth: 2,
      styles: {
        fill: "rgba(100,149,237,0.3)",
        "province-stroke": "blue",
        "city-stroke": "cornflowerblue",
        "county-stroke": "rgba(100,149,237,0.2)",
      },
    });
    mapInstance.add(disProvince);

    // 创建 Label 图层用于容纳所有 LabelMarker
    var labelsLayer = new AMap.LabelsLayer({
      collision: false,
      animation: true,
      zIndex: 15,
    });

    // 循环创建和添加 Marker
    for (var i = 0; i < cityList.length; i++) {
      var city = cityList[i];

      // 创建 LabelMarker (用于图标和文字标签)
      var labelsMarker = new AMap.LabelMarker({
        position: city.position,
        name: city.name,
        zooms: [4, 13],
        zIndex: 1,
        opacity: 1,
        icon: {
          image: city.iconUrl,
          size: new AMap.Size(city.size[0], city.size[1]),
          imageSize: new AMap.Size(city.size[0], city.size[1]),
          anchor: "center",
        },
        text: {
          content: city.name,
          direction: "bottom",
          offset: [0, 5],
          style: {
            fontSize: 12,
            fontWeight: "normal",
            fillColor: "#eee",
            strokeColor: "#88f",
            strokeWidth: 3,
            // cursor: pointer,
          },
        },
      });

      // 创建信息窗体
      const infoWindow = new AMap.InfoWindow({
        content: city.desc,
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, -15),
      });

      // 绑定点击事件
      labelsMarker.on("click", function (e) {
        console.log(`点击了 ${city.name} 标记`);
        // 打开信息窗体，位置为当前点击的 Marker 的位置
        infoWindow.open(mapInstance, e.target.getPosition());
      });

      // 将 Marker 添加到 LabelsLayer
      labelsLayer.add(labelsMarker);
    }

    // 将 LabelsLayer 添加到地图
    mapInstance.add(labelsLayer);

    // 隐藏高德地图 Logo 和版权信息
    const logoElement = document.getElementsByClassName("amap-logo")[0];
    const copyrightElement =
      document.getElementsByClassName("amap-copyright")[0];
    if (logoElement) logoElement.innerHTML = "";
    if (copyrightElement) copyrightElement.innerHTML = "";
  } catch (error) {
    console.error("地图初始化失败:", error);
  }
};

// VUE 3 生命周期钩子：组件挂载后执行
onMounted(async () => {
  try {
    await loadAMap();
    // 等待 DOM 更新（虽然对于 #mapContainer 已经存在的情况可能不是严格必要，但保持严谨性）
    await nextTick();
    initMap();
    isMapLoaded.value = true;
  } catch (error) {
    console.error("地图加载失败:", error);
  }
});
</script>

<style>
#mapContainer {
  height: 1000px;
}
</style>
```

注册组件：

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from 'vuepress/client'
import FootMap from "./component/FootMap/index.vue";	// [!code ++]

export default defineClientConfig({

    enhance({ app, router, siteData }) {
        app.component('FootMap', FootMap)	// [!code ++]
    }
}
```

使用组件：

```md
---
title: 足迹
permalink: /memory/foot/
comment: false
aside: false
copyright: false
createTime: 2025/01/16 12:47:43
---

<FootMap></FootMap>
```

## 藏宝阁

由于现在的 Vuepress 主题市面上使用的人数较 Hexo 主题少，找不到实现心心念念的藏宝阁教程，故逐步探索着实现过程：如何在 Vuepress 主题注册 Vue 组件？页面结构   样式设计？如何使用 Vue 组件。

效果图：

![image-20260123112928497](https://img.haipeng-lin.cn/1769138970037.png)

实现过程：

自定义组件：

```vue title="/docs/.vuepress/component/Movie/index.vue"
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

注册组件：

```ts title="/docs/.vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import Movie from "./component/Movie/index.vue"; // [!code ++]

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("Movie", Movie); // [!code ++]
  },
});
```

使用组件：

```md title="/docs/.vuepress/blog/movie.md"
---
title: 藏宝阁
permalink: /movie/
createTime: false
readingTime: false
---

<Movie></Movie>
```

## 音乐馆

效果图：

![image-20260123112158320](https://img.haipeng-lin.cn/1769138522467.png)

自定义组件：

```vue title="/docs/.vuepress/component/APlayer/index.vue"
<template>
  <div class="player-wrapper">
    <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabConfig"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <div class="music-container">
          <div :id="tab.id" class="aplayer-instance"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script name="MyPlayer" lang="ts" setup>
import { ref, onMounted } from "vue";
import "aplayer/dist/APlayer.min.css";
import { audio2024, audio2023, audio2022, audio2021 } from "./data";

const activeName = ref("first");
const players: Record<string, any> = {};

const tabConfig = [
  { label: "2024年歌单", name: "first", id: "aplayer2024", data: audio2024 },
  { label: "2023年歌单", name: "second", id: "aplayer2023", data: audio2023 },
  { label: "2022年歌单", name: "third", id: "aplayer2022", data: audio2022 },
  { label: "2021年歌单", name: "fourth", id: "aplayer2021", data: audio2021 },
];

async function addMyAudio() {
  const { default: APlayer } = await import("aplayer");

  const createPlayer = (id: string, audioData: any, isAutoplay = false) => {
    const container = document.getElementById(id);
    if (!container) return null;

    return new APlayer({
      container: container,
      audio: audioData,
      showlrc: true,
      lrcType: 3,
      listMaxHeight: 1000,
      loop: "all",
      order: "list",
      autoplay: isAutoplay,
    });
  };

  // 根据配置自动初始化所有播放器
  tabConfig.forEach((tab) => {
    players[tab.name] = createPlayer(tab.id, tab.data, tab.name === "first");
  });
}

const handleClick = (pane: any) => {
  const targetName = pane.paneName;
  Object.keys(players).forEach((key) => {
    if (key !== targetName && players[key]) {
      players[key].pause();
    }
  });
};

onMounted(() => {
  addMyAudio();
});
</script>

<style scoped>
/* 定义颜色变量 */
.player-wrapper {
  --theme-color: rgb(75, 209, 230);
  --theme-color-dark: rgb(140, 198, 205);
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;
}

/* 1. 取消标签页选中项的下划线（指示条） */
:deep(.el-tabs__active-bar) {
  display: none !important;
}

/* 2. 取消标签页头部的长灰色底线 */
:deep(.el-tabs__nav-wrap::after) {
  display: none !important;
}

/* Tab 居中 */
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

/* 未选中状态 */
:deep(.el-tabs__item) {
  font-size: 1.1rem;
  color: #999;
  padding: 0 35px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: "LXGW WenKai GB", sans-serif;
}

/* 鼠标悬停 */
:deep(.el-tabs__item:hover) {
  color: var(--theme-color-dark);
  transform: translateY(-2px);
  /* 悬停微动增加反馈感 */
}

:deep(.el-tabs__item.is-active) {
  color: var(--theme-color);
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 4px 10px rgba(170, 218, 225, 0.3);
}

/* 播放器容器 */
.music-container {
  display: flex;
  justify-content: center;
  padding-top: 5px;
  animation: fadeIn 0.6s ease-out;
}

.aplayer-instance {
  width: 80%;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05), 0 8px 25px rgba(170, 218, 225, 0.1);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(170, 218, 225, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* APlayer 字体应用 */
:deep(.aplayer) {
  font-family: "LXGW WenKai GB", sans-serif !important;
}

/* 适配移动端 */
@media (max-width: 768px) {
  .aplayer-instance {
    width: 100%;
  }

  :deep(.el-tabs__item) {
    padding: 0 15px;
    font-size: 0.95rem;
  }

  :deep(.el-tabs__item.is-active) {
    font-size: 1.05rem;
  }
}
</style>
```

新增数据：

```ts title="/docs/.vuepress/component/APlayer/data.ts"
// 定义歌曲对象的接口
export interface Song {
  name: string;
  artist: string;
  url: string;
  cover: string;
  lrc: string;
}

// 2024年歌单
export const audio2024: Song[] = [
  {
    name: "达尔文",
    artist: "林俊杰",
    url: "https://mp3.haipeng-lin.cn/达尔文.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250318/20250318151024669070.jpg",
    lrc: "/lrc/达尔文.lrc",
  },
  {
    name: "东北民谣",
    artist: "毛不易",
    url: "https://mp3.haipeng-lin.cn/东北民谣.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241203/20241203145401178225.jpg",
    lrc: "/lrc/东北民谣.lrc",
  },
  {
    name: "一笑江湖",
    artist: "姜姜",
    url: "https://mp3.haipeng-lin.cn/一笑江湖.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241108/20241108184906226358.jpg",
    lrc: "/lrc/一笑江湖.lrc",
  },
  {
    name: "画心",
    artist: "张信哲/黄霄云",
    url: "https://mp3.haipeng-lin.cn/画心.mp3",
    cover: "https://imge.kugou.com/stdmusic/20240503/20240503102101407007.jpg",
    lrc: "/lrc/画心.lrc",
  },
  {
    name: "安和桥",
    artist: "宇西",
    url: "https://mp3.haipeng-lin.cn/安和桥.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250306/20250306202203946460.jpg",
    lrc: "/lrc/安和桥.lrc",
  },
  {
    name: "一荤一素",
    artist: "毛不易",
    url: "https://mp3.haipeng-lin.cn/一荤一素.mp3",
    cover: "https://imge.kugou.com/stdmusic/20220512/20220512172410555244.jpg",
    lrc: "/lrc/一荤一素.lrc",
  },
  {
    name: "客子光阴",
    artist: "七叔-叶泽浩",
    url: "https://mp3.haipeng-lin.cn/客子光阴.mp3",
    cover: "https://imge.kugou.com/stdmusic/20201221/20201221210207596344.jpg",
    lrc: "/lrc/客子光阴.lrc",
  },
  {
    name: "No Footsteps to Follow",
    artist: "Galen Crew",
    url: "https://mp3.haipeng-lin.cn/No Footsteps to Follow.mp3",
    cover: "https://imge.kugou.com/stdmusic/20231022/20231022083302614426.jpg",
    lrc: "/lrc/No Footsteps to Follow.lrc",
  },
  {
    name: "Traveling Light",
    artist: "Joel Hanson / Sara Groves",
    url: "https://mp3.haipeng-lin.cn/Traveling Light.mp3",
    cover: "https://imge.kugou.com/stdmusic/20240306/20240306005002445169.jpg",
    lrc: "/lrc/Traveling Light.lrc",
  },
];

// 2023年歌单
export const audio2023: Song[] = [
  {
    name: "The Nights",
    artist: "Alyson Mary",
    url: "https://mp3.haipeng-lin.cn/客子光阴.mp3",
    cover:
      "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg",
    lrc: "/lrc/一荤一素.lrc",
  },
  {
    name: "虹之间",
    artist: "金贵晟",
    url: "https://mp3.haipeng-lin.cn/虹之间.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250207/20250207161306660783.jpg",
    lrc: "/lrc/虹之间.lrc",
  },
  {
    name: "Every Time We Touch",
    artist: "Dream Tunes",
    url: "https://mp3.haipeng-lin.cn/Every Time We Touch.mp3",
    cover: "https://imge.kugou.com/stdmusic/20230907/20230907142702894170.jpg",
    lrc: "/lrc/Every Time We Touch.lrc",
  },
  {
    name: "曾经的你",
    artist: "许巍",
    url: "https://mp3.haipeng-lin.cn/曾经的你.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250221/20250221180747451258.jpg",
    lrc: "/lrc/曾经的你.lrc",
  },
  {
    name: "喜悦",
    artist: "许巍",
    url: "https://mp3.haipeng-lin.cn/喜悦.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250807/20250807142812489671.jpg",
    lrc: "/lrc/喜悦.lrc",
  },
  {
    name: "Take Me to Your Heart",
    artist: "InstaHit Crew",
    url: "https://mp3.haipeng-lin.cn/Take Me to Your Heart.mp3",
    cover: "https://imge.kugou.com/stdmusic/20211008/20211008195506274271.jpg",
    lrc: "/lrc/Take Me to Your Heart.lrc",
  },
  {
    name: "星光就在前方",
    artist: "抠抠",
    url: "https://mp3.haipeng-lin.cn/星光就在前方.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250318/20250318151133870084.jpg",
    lrc: "/lrc/星光就在前方.lrc",
  },
  {
    name: "大海",
    artist: "张雨生",
    url: "https://mp3.haipeng-lin.cn/大海.mp3",
    cover: "https://imge.kugou.com/stdmusic/20201125/20201125103505920689.jpg",
    lrc: "/lrc/大海.lrc",
  },
  {
    name: "救赎之旅",
    artist: "许巍",
    url: "https://mp3.haipeng-lin.cn/救赎之旅.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250807/20250807142812489671.jpg",
    lrc: "/lrc/救赎之旅.lrc",
  },
];

// 2022年歌单
export const audio2022: Song[] = [
  {
    name: "我用什么把你留住",
    artist: "福禄寿",
    url: "https://mp3.haipeng-lin.cn/我用什么把你留住.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200918/20200918222902157666.jpg",
    lrc: "/lrc/我用什么把你留住.lrc",
  },
  {
    name: "Dirty Daws",
    artist: "Of Monsters And Men",
    url: "https://mp3.haipeng-lin.cn/Dirty Daws.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200623/20200623003444649700.jpg",
    lrc: "/lrc/Dirty Daws.lrc",
  },
  {
    name: "Summertime Sadness",
    artist: "Lana Del Rey",
    url: "https://mp3.haipeng-lin.cn/Summertime Sadness.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241115/20241115095201257667.jpg",
    lrc: "/lrc/Summertime Sadness.lrc",
  },
  {
    name: "千千阙歌",
    artist: "陈慧娴",
    url: "https://mp3.haipeng-lin.cn/千千阙歌.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241206/20241206175512631404.jpg",
    lrc: "/lrc/千千阙歌.lrc",
  },
  {
    name: "沉默是金",
    artist: "张国荣",
    url: "https://mp3.haipeng-lin.cn/沉默是金.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250311/20250311104914634074.jpg",
    lrc: "/lrc/沉默是金.lrc",
  },
  {
    name: "Dancing With Your Ghost(Live)",
    artist: "于文文",
    url: "https://mp3.haipeng-lin.cn/Dancing With Your Ghost(Live).mp3",
    cover: "https://imge.kugou.com/stdmusic/20190626/20190626210118627550.jpg",
    lrc: "/lrc/Dancing With Your Ghost(Live).lrc",
  },
  {
    name: "平凡之路(Live)",
    artist: "朴树",
    url: "https://mp3.haipeng-lin.cn/平凡之路(Live).mp3",
    cover: "https://imge.kugou.com/stdmusic/20200620/20200620071827410208.jpg",
    lrc: "/lrc/平凡之路(Live).lrc",
  },
];

// 2021年歌单
export const audio2021: Song[] = [
  {
    name: "海底",
    artist: "一支榴莲",
    url: "https://mp3.haipeng-lin.cn/海底.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200316/20200316175845625083.jpg",
    lrc: "/lrc/海底.lrc",
  },
  {
    name: "城南花已开",
    artist: "三亩地",
    url: "https://mp3.haipeng-lin.cn/城南花已开.mp3",
    cover: "https://imge.kugou.com/stdmusic/20181102/20181102115543498345.jpg",
    lrc: "/lrc/城南花已开.lrc",
  },
  {
    name: "错位时空",
    artist: "艾辰",
    url: "https://mp3.haipeng-lin.cn/错位时空.mp3",
    cover: "",
    lrc: "/lrc/错位时空.lrc",
  },
  {
    name: "讲不出再见",
    artist: "谭咏麟",
    url: "https://mp3.haipeng-lin.cn/讲不出再见.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250125/20250125121713244765.jpg",
    lrc: "/lrc/讲不出再见.lrc",
  },
  {
    name: "时光背面的我",
    artist: "刘至佳/韩瞳",
    url: "https://mp3.haipeng-lin.cn/时光背面的我.mp3",
    cover: "https://imge.kugou.com/stdmusic/20210702/20210702141406996785.jpg",
    lrc: "/lrc/时光背面的我.lrc",
  },
  {
    name: "忘记时间",
    artist: "胡歌",
    url: "https://mp3.haipeng-lin.cn/忘记时间.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250221/20250221180731140818.jpg",
    lrc: "/lrc/忘记时间.lrc",
  },
];
```

注册组件：

```ts title="/docs/.vuepress/client.ts
import { defineClientConfig } from 'vuepress/client'
import APlayer from "./component/APlayer/index.vue";	// [!code ++]

export default defineClientConfig({

    enhance({ app, router, siteData }) {
        app.component('APlayer', APlayer)	// [!code ++]
    }
}
```

使用组件：

```md
---
title: 足迹
permalink: /memory/foot/
comment: false
aside: false
copyright: false
createTime: 2025/01/16 12:47:43
---

<FootMap></FootMap>
```

## 百度统计 | 浏览量

效果图：

![image-20260101074945885](https://img.haipeng-lin.cn/20260101074946.png)

实现记录：

[【Vuepress】百度统计-浏览量](https://haipeng-lin.cn/blog/bm44ybq6/)

## 鼠标点击爆炸烟花特效

效果图：

![特效](https://img.haipeng-lin.cn/20251002000336.gif)

实现记录：

[鼠标点击爆炸粒子烟花特效](https://haipeng-lin.cn/blog/dhg6719f/)

## 修改字体

由于服务器资源有限，所以我便把本地的字体资源替换为在线链接，嵌入到我们网站中

首先需要到 [zeoseven](https://fonts.zeoseven.com/) 或者 [天天字体](https://www.ttfont.com/) 查询自己喜欢的字体并找到嵌入链接

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
import "./public/css/custom.css";
```

引入字体在线 css

```ts title="config.ts"
import { defineUserConfig } from "vuepress";
import { defineNoteConfig, plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  head: [
    [
      // [!code ++]
      "link",
      {
        rel: "stylesheet",
        href: "https://fontsapi.zeoseven.com/292/gb-regular/result.css",
      }, // [!code ++]
    ], // [!code ++]
  ],
});
```

##
