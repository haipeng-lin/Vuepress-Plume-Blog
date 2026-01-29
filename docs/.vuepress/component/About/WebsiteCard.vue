<template>
    <div class="link-grid">
        <div v-for="(item, index) in siteList" :key="index" class="site-card" @click="handleJump(item.url)">
            <div class="card-content">
                <div class="icon">{{ item.icon || '🔗' }}</div>
                <div class="info">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const siteList = [
    { title: '相册馆', desc: '拍过的人生照片', url: 'https://picture.haipeng-lin.cn', icon: '📸' },
    { title: '音乐馆', desc: '收藏的网易云歌单', url: 'https://music.haipeng-lin.cn', icon: '🎧' },
    { title: '烟花秀', desc: '要看好多好多的烟花', url: 'https://firework.haipeng-lin.cn', icon: '🎇' },
    { title: '站点监测', desc: '监测网站的运行状况', url: 'https://status.haipeng-lin.cn', icon: '📊' }
];


const handleJump = (url) => {
    if (url) window.open(url, '_blank');
};
</script>

<style scoped>
.link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    padding: 20px;
}

.site-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.site-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    background: #ffffff;
}

.card-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.icon {
    font-size: 2rem;
    background: #f0f2f5;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.info h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    color: #333;
}

.info p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
}

@media (max-width: 600px) {
    .link-grid {
        grid-template-columns: 1fr;
    }
}
</style>