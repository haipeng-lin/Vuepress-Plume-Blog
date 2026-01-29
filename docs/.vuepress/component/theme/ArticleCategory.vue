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
                            </div>

                            <div class="card-info">
                                <div class="card-category-label">{{ post.category }}</div>

                                <h3 class="card-title">{{ post.title }}</h3>

                                <div class="card-footer">
                                    <div class="card-tags" v-if="post.frontmatter.tags">
                                        <span v-for="tag in post.frontmatter.tags.slice(0, 2)" :key="tag"
                                            class="tag-pill">
                                            #{{ tag }}
                                        </span>
                                    </div>
                                    <span class="date">{{ formatDate(post.frontmatter.date) }}</span>
                                </div>
                            </div>
                        </article>
                    </transition-group>
                </div>
            </main>

            <aside class="sidebar-info">
                <div class="profile-card">
                    <div class="avatar"></div>
                    <h2 class="nickname">𝙁𝙡𝙖𝙨𝙝</h2>
                    <p class="signature">全栈开发工程师</p>
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

const allPosts = inject('allBlogPosts', [])
const activeCat = ref('全部')

const categories = computed(() => {
    const set = new Set(['全部'])
    allPosts.forEach(p => set.add(p.category))
    return Array.from(set)
})

const filteredPosts = computed(() => {
    if (activeCat.value === '全部') return allPosts
    return allPosts.filter(p => p.category === activeCat.value)
})

const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '2026-01-27'
</script>

<style scoped>
/* 基础布局容器 */
.category-list-wrapper {
    max-width: 1280px;
    margin: 0.8rem auto;
    padding: 0 1rem;
}

.layout-container {
    display: flex;
    gap: 1.2rem;
}

/* 主内容区域 */
.main-content {
    flex: 7;
}

/* 分类标签栏 */
.main-content .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.8rem;
    padding: 0.5rem 1rem;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid var(--vp-c-divider);
}

.main-content .category-tabs .tab-item {
    padding: 2px 10px;
    border: none;
    background: var(--vp-c-bg);
    color: #000000;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 800;
}

.main-content .category-tabs .tab-item:hover,
.main-content .category-tabs .tab-item.active {
    background: var(--vp-c-brand);
    color: #fff;
    border-radius: 16px;
    transform: translateY(-2px);
}

/* 文章网格 */
.main-content .post-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.main-content .post-card {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--vp-c-divider);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.main-content .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    border-color: var(--vp-c-brand);
}

.main-content .post-card .card-image {
    height: 200px;
    overflow: hidden;
}

.main-content .post-card .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.main-content .post-card .card-info {
    padding: 1.2rem;
}

.main-content .post-card .card-info .card-category-label {
    font-size: 0.75rem;
    color: var(--vp-c-brand);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.4rem;
}

.main-content .post-card .card-info .card-title {
    font-size: 1.15rem;
    font-weight: bolder;
    margin: 0 0 0.8rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #000000;
}

.main-content .post-card .card-info .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-content .post-card .card-info .card-footer .card-tags {
    display: flex;
    gap: 8px;
}

.main-content .post-card .card-info .card-footer .card-tags .tag-pill {
    font-size: 0.8rem;
    color: var(--vp-c-text-2);
    font-weight: 500;
}

.main-content .post-card .card-info .card-footer .card-tags .tag-pill:hover {
    color: var(--vp-c-brand);
}

.main-content .post-card .card-info .card-footer .date {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    font-family: monospace;
}

/* 侧边栏 */
.sidebar-info {
    flex: 2;
}

.sidebar-info .profile-card {
    position: sticky;
    top: 100px;
    background: var(--vp-c-bg-soft);
    border-radius: 24px;
    padding: 2.5rem 1.5rem;
    text-align: center;
    border: 1px solid var(--vp-c-divider);
}

.sidebar-info .profile-card .avatar {
    width: 110px;
    height: 110px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    border: 4px solid var(--vp-c-brand-soft);
    background: #eee;
}

.sidebar-info .profile-card .nickname {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.sidebar-info .profile-card .signature {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.sidebar-info .profile-card .stats-row {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
}

.sidebar-info .profile-card .stats-row .stat-item {
    display: flex;
    flex-direction: column;
}

.sidebar-info .profile-card .stats-row .stat-item .count {
    font-size: 1.3rem;
    font-weight: 800;
}

.sidebar-info .profile-card .stats-row .stat-item .label {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
}

.sidebar-info .profile-card .social-box {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.sidebar-info .profile-card .social-box .social-btn {
    padding: 6px 12px;
    background: var(--vp-c-bg);
    border-radius: 8px;
    font-size: 0.8rem;
    border: 1px solid var(--vp-c-divider);
}

/* 动画 */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* 响应式媒体查询 */
@media (max-width: 1024px) {
    .layout-container {
        flex-direction: column;
    }

    .sidebar-info {
        order: -1;
    }

    .main-content .post-grid {
        grid-template-columns: 1fr;
    }
}
</style>