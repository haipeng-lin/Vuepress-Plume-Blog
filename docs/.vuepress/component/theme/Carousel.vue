<template>
  <div class="plume-custom-header" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div class="split-layout">
      <div class="layout-left" @click="goTo(activeArticle.path)">
        <transition name="cross-fade" mode="out-in">
          <div :key="activeIndex" class="main-stage" :style="heroBgStyle">
            <div class="stage-overlay">
              <div class="text-group">
                <h1 class="main-title">{{ activeArticle?.title }}</h1>
                <p class="main-desc">{{ activeArticle?.frontmatter?.description }}</p>
                <div class="action-btn">本站推荐 <span class="arrow">→</span></div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <aside class="layout-right" :style="{
        backgroundColor: activeArticle.frontmatter?.carouselItemBg
          ? `color-mix(in srgb, ${activeArticle.frontmatter.carouselItemBg}, white 80%)`
          : 'var(--vp-c-bg-soft)'
      }">
        <div class="thumb-stack">
          <div v-for="(post, index) in displayArticles" :key="post.path" :class="['thumb-item', {
            active: activeIndex === index,
            'on-custom-bg': activeArticle.frontmatter?.carouselItemBg
          }]" @mouseenter="activeIndex = index" @click="goTo(post.path)">
            <div class="item-thumb">
              <img :src="post.frontmatter?.cover || defaultCover" alt="thumb">
            </div>
            <div class="item-info">
              <div class="item-title">
                {{ post.title }}
              </div>
              <div class="item-date">
                {{ formatDate(post.frontmatter?.date) }}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// 导入 Node 端生成的临时数据
import { carouselPosts } from '@temp/carouselPosts'

const router = useRouter()
const activeIndex = ref(0)
const timer = ref(null)
const defaultCover = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200'

// 1. 数据处理
const displayArticles = computed(() => carouselPosts || [])
const activeArticle = computed(() => displayArticles.value[activeIndex.value] || {})

const heroBgStyle = computed(() => ({
  backgroundImage: `url(${activeArticle.value.frontmatter?.cover || defaultCover})`
}))

// 2. 轮播逻辑 (3.5秒)
const startTimer = () => {
  if (displayArticles.value.length <= 1) return
  stopTimer()
  timer.value = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % displayArticles.value.length
  }, 3500)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 3. 生命周期
onMounted(() => startTimer())
onUnmounted(() => stopTimer())

// 4. 工具函数
const goTo = (path) => router.push(path)
const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : 'Recent'
</script>

<style lang="scss" scoped>
.plume-custom-header {
  max-width: 1300px;
  margin: 0.8rem auto;
  padding: 0 1rem;
}

.split-layout {
  display: flex;
  height: 300px;
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.layout-left {
  // 占 3/4
  flex: 5;
  height: 100%;
  cursor: pointer;
  overflow: hidden;


  .main-stage {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;

    .stage-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      padding-left: 4rem;
    }

    .text-group {
      color: #fff;
      max-width: 550px;

      .main-title {
        font-size: 2rem;
        margin: 1.2rem 0;
        line-height: 1.1;
        font-weight: 800;
        position: relative;
        top: 5rem;
        /* 保留你的核心偏移 */
      }

      .main-desc {
        opacity: 0.8;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .action-btn {
        font-weight: 600;
        color: var(--vp-c-brand-lighter);

        .arrow {
          transition: transform 0.3s;
          display: inline-block;
        }

        &:hover .arrow {
          transform: translateX(5px);
        }
      }
    }
  }
}

/* 右侧：整体区域背景联动 */
.layout-right {
  flex: 2;
  border-left: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  .thumb-stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .thumb-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.1rem 0.4rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    // 默认样式
    .item-title {
      font-weight: 600;
      font-size: 0.9rem;
      transition: color 0.3s;
    }

    .item-date {
      font-size: 0.75rem;
      color: var(--vp-c-text-3);
      transition: color 0.3s;
    }

    .item-thumb {
      width: 70px;
      height: 50px;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 1rem;
      border: 2px solid transparent;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    // &.active .item-thumb {
    //   border-color: #ffffff;
    // }
  }
}

/* 切换动画 */
.cross-fade-enter-active,
.cross-fade-leave-active {
  transition: opacity 0.5s ease;
}

.cross-fade-enter-from,
.cross-fade-leave-to {
  opacity: 0;
}

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