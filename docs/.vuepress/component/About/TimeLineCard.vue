<template>
    <div class="site-time">
        <div class="timeline">
            <div v-for="(item, index) in timelineData" :key="index" class="timeline-item">
                <div class="timeline-left">
                    <div class="timeline-circle" :style="{ backgroundColor: item.color }"></div>
                    <div v-if="index !== timelineData.length - 1" class="timeline-line"></div>
                </div>

                <div class="timeline-right">
                    <div class="timeline-date">{{ item.date }}</div>
                    <div class="timeline-content">
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const timelineData = [
    { date: '2024/07/29', content: '基于Hexo、Butterfly初步搭建，部署于GitHub', color: '#9c27b0' },
    { date: '2024/09/16', content: '购买域名haipeng-lin.cn，并部署于Vercel，加快访问速度', color: '#9c27b0' },
    { date: '2024/09/16', content: '购买阿里云服务器，部署于阿里云，加快访问速度，开启域名备案', color: '#f44336' },
    { date: '2025/01/08', content: '域名备案成功，添加域名解析到阿里云服务器', color: '#2196f3' },
    { date: '2025/01/16', content: '基于vuepress和plume主题搭建新博客，并迁移笔记', color: '#ff9800' },
    { date: '2025/08/13', content: '迁移日记系列到公众号【喜欢睡觉的鱼】', color: '#f1f509ff' }
];
</script>

<style scoped>
.site-time {
    padding: 40px 20px;
    width: 100%;
    box-sizing: border-box;
}

.timeline {
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
}

.timeline-item {
    display: flex;
    gap: 20px;
}

.timeline-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 20px;
}

.timeline-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-top: 6px;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8);
    z-index: 1;
}

.timeline-line {
    flex: 1;
    width: 2px;
    background-color: #ebedf0;
    margin: 4px 0;
}

.timeline-right {
    padding-bottom: 30px;
    max-width: 500px;
}

.timeline-date {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--vp-c-brand, #9c27b0);
    margin-bottom: 6px;
}

.timeline-content p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--vp-c-text-1, #333);
    line-height: 1.6;
    text-align: justify;
}

.timeline-item:last-child .timeline-right {
    padding-bottom: 0;
}

@media (max-width: 600px) {
    .timeline {
        width: 100%;
        margin-left: 0;
    }

    .timeline-right {
        max-width: 100%;
    }
}
</style>