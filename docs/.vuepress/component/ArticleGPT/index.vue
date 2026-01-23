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
                        <div class="speak-button" @click="toggleSpeak" :class="{ speaking: isSpeaking }">
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
                        {{ abstractData === "" ? "AI 正在分析并生成摘要..." : abstractData }}
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
import { usePageFrontmatter } from 'vuepress/client';
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ChatDotRound, Microphone, InfoFilled } from '@element-plus/icons-vue';

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
                const isPunctuation = [',', '，', '.', '。', '!', '！', '?', '？', ';', '；', ':', '：'].includes(char);
                const delay = isPunctuation ? Math.random() * 50 + 100 : Math.random() * 40 + 20;

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
    utterance.lang = 'zh-CN';
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
    waitTimeOut.value = setTimeout(
        () => {
            abstractData.value = "";
            typeWriter();
        },
        Math.random() * 500 + 500,
    );
};

onMounted(() => {
    // 仅在客户端浏览器环境下初始化语音 API
    if (typeof window !== 'undefined') {
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