<template>
  <div>
    <div class="container">
      <canvas ref="canvasRef"></canvas>

      <Carousel />
      <CategoryPostList />
    </div>
    <!-- <VPPosts :home-posts="true" /> -->
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AboutMe from "./AboutMe.vue";
import AboutMeText from "./AboutMeText.vue";
import AboutMeSkill from "./AboutMeSkill.vue";
import AboutMeCharacter from "./AboutMeCharacter.vue";
import AboutMeLife from "./AboutMeLife.vue";
import Carousel from "../Carousel.vue";
import CategoryPostList from "../CategoryPostList.vue";

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
