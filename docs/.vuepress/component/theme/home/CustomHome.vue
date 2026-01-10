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
//

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
