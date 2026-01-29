<template>
    <div class="profile-card">
        <div class="profile-left-side">
            <div class="profile-image-wrapper">
                <div class="profile-image">
                    <img class="avatar entered loaded" src="/images/avatar.webp"
                        data-lazy-src="https://www.hudi.space/img/avator.jpg" data-ll-status="loaded">
                </div>
            </div>
            <div class="profile-info">
                <h3 class="profile-name">来自梦里的一条鱼(𝙁𝙡𝙖𝙨𝙝)</h3>
                <p class="profile-motto">"保持热爱，奔赴山海"</p>
                <div class="profile-details">
                    <div class="profile-detail-item">
                        <span>广东 · 揭阳</span>
                    </div>
                    <div class="profile-detail-item">
                        <span>高级CV工程师、国家一级退堂鼓选手、百亿项目参与者</span>
                    </div>
                    <div class="profile-detail-item">
                        <span style="text-align: center">新年都顺顺！</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.profile-card p {
    line-height: 0px
}

.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    backdrop-filter: blur(10px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 20px;
    border-radius: 20px;
    gap: 15px;
    padding: 2px;
    background: rgba(255, 255, 255, 0.95);
}

.profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 1 400px;
    padding: 0px 10px;
}

.profile-left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 2px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    /*background: var(--bg-color);*/
}

.profile-image-wrapper {
    flex: 0 0 120px;
}

.profile-info {
    flex: 0 1 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
}

.profile-name {
    font-size: 1.6em;
    font-weight: 600;
    margin-bottom: 5px;
    background: #3b82f6;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
}

.profile-motto {
    font-size: 0.95em;
    color: #666;
    margin-bottom: 12px;
    font-style: italic;
    line-height: 1.3;
    text-align: center;
    padding: 0 5px;
}

/* 详细信息容器 */
profile-detail-item {
    width: 100%;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 详细信息项居中 */
.profile-detail-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 8px;
    color: #4a5568;
    font-size: 0.9em;
    line-height: 1.3;
    padding: 4px 0;
    width: fit-content;
}

.profile-detail-item i {
    font-size: 1.2em;
    color: #3b82f6;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
}



/* 社交链接容器 */
.profile-social {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* 社交链接按钮 */
.social-link {
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.1);
    /*color: #3b82f6;*/
    transition: all 0.3s ease;
}

.social-link:hover {
    transform: translateY(-3px);
}


/* 修改头像尺寸 */
.profile-image {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    margin: 0 auto 15px;
}

.profile-image .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
}

/* 发光效果 */
.profile-image::before {
    content: '';
    position: absolute;
    inset: -3px;
    background: linear-gradient(135deg,
            #FF6B6B 0%,
            #4ECDC4 50%,
            #6EE7B7 100%);
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    transition: all 0.4s ease;
}

/* 新的悬停效果 */
.profile-image:hover .avatar {
    transform: scale(1.02);
    border-color: transparent;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.profile-image:hover::before {
    opacity: 1;
    animation: glowPulse 2s ease-in-out infinite;
}

/* 脉冲发光动画 */
@keyframes glowPulse {
    0% {
        transform: scale(1);
        filter: blur(5px);
    }

    50% {
        transform: scale(1.02);
        filter: blur(8px);
    }

    100% {
        transform: scale(1);
        filter: blur(5px);
    }
}

/* 暗色模式适配 */
@media (prefers-color-scheme: dark) {
    .profile-image .avatar {
        border-color: #2d2d2d;
    }

    .profile-image:hover .avatar {
        border-color: transparent;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
}

/* 响应式适配 */
@media (max-width: 768px) {
    .profile-image {
        width: 100px;
        height: 100px;
    }
}

.profile-card {

    transition: all 0.5s ease;
}

/* 悬停效果 */
.profile-card:hover {
    transform: translateY(-5px) rotateX(5deg);
}
</style>