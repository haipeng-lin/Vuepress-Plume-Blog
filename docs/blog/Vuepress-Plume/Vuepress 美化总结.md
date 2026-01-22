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
sticky: 101
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

&emsp;&emsp;嘿嘿，由于之前在 Hexo 引入过  TianliGPT 来实现文章摘要，体验下来还是蛮不错的，但是一旦文章内容有变，便命中不了之前生成的记录，所以又再消耗额度，随着 Hexo 的远去，TianliGPT 也没有接触过了。最近偶然在网上刷到一篇《0成本实现 TianliGPT》，芜湖，解锁新大陆，遂加入这一个本地的 AI 摘要，以下是实现过程

参考文章：

- [SimpleWordBI-AI摘要](https://simpleword.bid/article/%E6%9D%82%E9%A1%B9/vitepress/AI%E6%91%98%E8%A6%81.html)
- [0 成本实现 TianliGPT，实现纯本地的 AI 摘要](https://blog.imsyy.top/posts/2024/0218)

效果图：

![image-20260122085457712](https://img.haipeng-lin.cn/1769043302910.png)

新增组件：

```vue title="/docs/.vuepress/component/ArticleGPT.vue"
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
import ArticleGPT from "./component/ArticleGPT.vue";	// [!code ++]

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

效果图

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
