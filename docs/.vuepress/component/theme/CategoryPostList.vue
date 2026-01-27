<template>
    <div class="category-list-wrapper">
        <div class="layout-container">
            <main class="main-content">
                <nav class="category-tabs">
                    <button v-for="cat in categories" :key="cat" :class="['tab-item', { active: activeCat === cat }]"
                        @click="activeCat = cat">
                        {{ cat }}
                    </button>
                </nav>

                <div class="post-grid">
                    <transition-group name="fade-up">
                        <article v-for="post in filteredPosts" :key="post.path" class="post-card"
                            @click="router.push(post.path)">
                            <div class="card-image">
                                <img :src="post.frontmatter.cover || defaultCover" alt="cover">
                                <div class="card-category">{{ post.category }}</div>
                            </div>
                            <div class="card-info">
                                <h3 class="card-title">{{ post.title }}</h3>
                                <div class="card-tags" v-if="post.frontmatter.tags">
                                    <span v-for="tag in post.frontmatter.tags.slice(0, 2)" :key="tag"
                                        class="tag-pill">#{{ tag }}</span>
                                </div>
                                <div class="card-footer">
                                    <span class="date">{{ formatDate(post.frontmatter.date) }}</span>
                                </div>
                            </div>
                        </article>
                    </transition-group>
                </div>
            </main>

            <aside class="sidebar-info">
                <div class="profile-card">
                    <div class="avatar">
                        <!-- <img src="/logo.png" alt="avatar"> -->
                    </div>
                    <h2 class="nickname">开发者</h2>
                    <p class="signature">全栈开发工程师 · UI 探索者</p>
                    <div class="stats-row">
                        <div class="stat-item">
                            <span class="count">{{ allPosts.length }}</span>
                            <span class="label">文章</span>
                        </div>
                        <div class="stat-item">
                            <span class="count">{{ categories.length - 1 }}</span>
                            <span class="label">分类</span>
                        </div>
                    </div>
                    <div class="social-box">
                        <div class="social-btn">GitHub</div>
                        <div class="social-btn">RSS</div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const defaultCover = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800'

// 注入插件提供的自动分类数据
const allPosts = inject('allBlogPosts', [])

const activeCat = ref('全部')

// 自动提取分类列表
const categories = computed(() => {
    const set = new Set(['全部'])
    allPosts.forEach(p => set.add(p.category))
    return Array.from(set)
})

// 分类过滤逻辑
const filteredPosts = computed(() => {
    if (activeCat.value === '全部') return allPosts
    return allPosts.filter(p => p.category === activeCat.value)
})

const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '2026-01-27'
</script>

<style lang="scss" scoped>
.category-list-wrapper {
    max-width: 1280px;
    margin: 0.8rem auto;
    padding: 0 1rem;
}

.layout-container {
    display: flex;
    gap: 2.5rem;
}

/* 左侧内容区 */
.main-content {
    flex: 3;

    .category-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.8rem;
        padding: 0.5rem 1rem;
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid var(--vp-c-divider);

        .tab-item {
            padding: 2px 10px;
            border: none;
            background: var(--vp-c-bg);
            color: #000000;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 800;

            &:hover,
            &.active {
                background: var(--vp-c-brand);
                color: #fff;
                border-color: var(--vp-c-brand);
                transform: translateY(-2px);
                border-radius: 16px;
                border: 1px solid var(--vp-c-divider);

            }
        }
    }

    .post-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .post-card {
        background: var(--vp-c-bg-soft);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid var(--vp-c-divider);
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            border-color: var(--vp-c-brand);
        }

        .card-image {
            height: 200px;
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .card-category {
                position: absolute;
                bottom: 12px;
                left: 12px;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                color: #fff;
                padding: 2px 12px;
                border-radius: 6px;
                font-size: 0.75rem;
            }
        }

        .card-info {
            padding: 1.5rem;

            .card-title {
                font-size: 1.25rem;
                margin: 0 0 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 3.2rem;
            }

            .card-tags {
                margin-bottom: 1rem;

                .tag-pill {
                    color: var(--vp-c-brand);
                    font-size: 0.8rem;
                    margin-right: 10px;
                    font-weight: 600;
                }
            }

            .card-footer {
                font-size: 0.85rem;
                color: var(--vp-c-text-3);
            }
        }
    }
}

/* 右侧侧边栏 */
.sidebar-info {
    flex: 1;

    .profile-card {
        position: sticky;
        top: 100px;
        background: var(--vp-c-bg-soft);
        border-radius: 24px;
        padding: 2.5rem 1.5rem;
        text-align: center;
        border: 1px solid var(--vp-c-divider);

        .avatar {
            width: 110px;
            height: 110px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid var(--vp-c-brand-soft);

            img {
                width: 100%;
                height: 100%;
            }
        }

        .nickname {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .signature {
            color: var(--vp-c-text-2);
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }

        .stats-row {
            display: flex;
            justify-content: space-around;
            margin-bottom: 2rem;

            .stat-item {
                display: flex;
                flex-direction: column;

                .count {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: var(--vp-c-text-1);
                }

                .label {
                    font-size: 0.8rem;
                    color: var(--vp-c-text-3);
                }
            }
        }

        .social-btn {
            padding: 8px;
            background: var(--vp-c-bg);
            border-radius: 8px;
            font-size: 0.85rem;
            border: 1px solid var(--vp-c-divider);
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                border-color: var(--vp-c-brand);
                color: var(--vp-c-brand);
            }
        }
    }
}

/* 列表动画 */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

@media (max-width: 1024px) {
    .layout-container {
        flex-direction: column;
    }

    .sidebar-info {
        order: -1;
    }

    /* 移动端头像优先 */
    .post-grid {
        grid-template-columns: 1fr;
    }
}
</style>