<template>
  <div
    class="plume-custom-header"
    @mouseenter="stopTimer"
    @mouseleave="startTimer"
  >
    <div class="split-layout">
      <div class="layout-left" @click="goTo(activeArticle.path)">
        <transition name="cross-fade" mode="out-in">
          <div :key="activeIndex" class="main-stage" :style="heroBgStyle">
            <div class="stage-overlay">
              <div class="text-group">
                <h1 class="main-title">{{ activeArticle?.title }}</h1>
                <p class="main-desc">
                  {{ activeArticle?.frontmatter?.description }}
                </p>
                <div class="action-btn">
                  本站推荐 <span class="arrow">→</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <aside
        class="layout-right"
        :style="{
          backgroundColor: activeArticle.frontmatter?.carouselItemBg
            ? `${activeArticle.frontmatter.carouselItemBg}`
            : 'var(--vp-c-bg-soft)',
        }"
      >
        <div class="thumb-stack">
          <div
            v-for="(post, index) in displayArticles"
            :key="post.path"
            :class="[
              'thumb-item',
              {
                active: activeIndex === index,
                'on-custom-bg': activeArticle.frontmatter?.carouselItemBg,
              },
            ]"
            @mouseenter="activeIndex = index"
            @click="goTo(post.path)"
          >
            <div class="item-thumb">
              <img :src="post.frontmatter?.cover || defaultCover" alt="thumb" />
            </div>
            <div class="item-info">
              <div class="item-title">
                {{ post.title }}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

// 导入 Node 端生成的临时数据
import { carouselPosts } from "@temp/carouselPosts";

const router = useRouter();
const activeIndex = ref(0);
const timer = ref(null);
const defaultCover =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";

// 1. 数据处理
const displayArticles = computed(() => carouselPosts || []);
const activeArticle = computed(
  () => displayArticles.value[activeIndex.value] || {}
);

const heroBgStyle = computed(() => ({
  backgroundImage: `url(${
    activeArticle.value.frontmatter?.cover || defaultCover
  })`,
}));

// 2. 轮播逻辑 (3.5秒)
const startTimer = () => {
  if (displayArticles.value.length <= 1) return;
  stopTimer();
  timer.value = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % displayArticles.value.length;
  }, 3500);
};

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

// 3. 生命周期
onMounted(() => startTimer());
onUnmounted(() => stopTimer());

// 4. 工具函数
const goTo = (path) => router.push(path);
const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "Recent";
</script>

<style scoped>
/* 基础容器 */
.plume-custom-header {
  max-width: 1300px;
  margin: 0.8rem auto;
  padding: 0 1rem;
}

.split-layout {
  display: flex;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

/* 左侧区域样式 */
.layout-left {
  flex: 5;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
}

.layout-left .main-stage {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.layout-left .main-stage .stage-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding-left: 4rem;
}

/* 1. 调整容器，让内容堆叠到底部 */
.layout-left .main-stage .text-group {
  color: #fff;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 改为 flex-end，内容会靠下靠齐 */
  height: 100%;
  padding-bottom: 2.5rem;    /* 距离底边的间距，可以根据喜好调整 */
}

/* 2. 清理标题样式 */
.layout-left .main-stage .main-title {
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
}

/* 3. 描述文字样式 */
.layout-left .main-stage .main-desc {
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 4. 按钮样式 */
.layout-left .main-stage .action-btn {
  font-weight: 600;
  color: var(--vp-c-brand-lighter);
  cursor: pointer;
}

/* 5. 遮罩层背景优化 */
.layout-left .main-stage .stage-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;       /* 撑开以应用 text-group 的 flex-end */
  padding-left: 4rem;
  /* 渐变改从底部向上，确保底部文字清晰 */
  background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
}

.layout-left .main-stage .action-btn .arrow {
  transition: transform 0.3s;
  display: inline-block;
}

.layout-left .main-stage .action-btn:hover .arrow {
  transform: translateX(5px);
}

/* 右侧区域样式 */
.layout-right {
  flex: 2;
  border-left: none; 
  /* margin-left: -1px; */
  display: flex;
  flex-direction: column;
  padding: 0; 
  transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-right .thumb-stack {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0.5rem; 
}

.layout-right .thumb-item {
  /* position: relative; */
  display: flex;
  align-items: center;
  padding: 0.1rem 0.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.layout-right .thumb-item:hover,
.layout-right .thumb-item.active {
  opacity: 1 !important;
  background-color: rgba(255, 255, 255, 0.15); /* 透明度混合白色 */
}

.layout-right .thumb-item .item-title {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s;
}



.layout-right .thumb-item .item-thumb {
  width: 70px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 1rem;
  border: 2px solid transparent;
  flex-shrink: 0;
}

.layout-right .thumb-item .item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 状态类样式 */
.layout-right .thumb-item.active {
  /* 如果需要激活态样式可以在这里添加 */
}

/* 动画样式 */
.cross-fade-enter-active,
.cross-fade-leave-active {
  transition: opacity 0.5s ease;
}

.cross-fade-enter-from,
.cross-fade-leave-to {
  opacity: 0;
}

/* 响应式媒体查询 */
@media (max-width: 960px) {
  .split-layout {
    height: auto;
    flex-direction: column;
  }

  .layout-left {
    height: 350px;
  }
}
</style>