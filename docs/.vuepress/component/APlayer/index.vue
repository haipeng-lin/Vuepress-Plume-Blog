<template>
    <div class="player-wrapper">
        <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="tab in tabConfig" :key="tab.name" :label="tab.label" :name="tab.name">
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
    tabConfig.forEach(tab => {
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
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05),
        0 8px 25px rgba(170, 218, 225, 0.1);
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