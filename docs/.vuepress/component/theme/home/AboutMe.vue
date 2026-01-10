<script setup>

</script>

<template>
  <router-link to="/about-me/" class="head-social-avatar">
    <div class="about-me-name">
      <p>𝐻𝑒𝓁𝓁𝑜, 𝓃𝒾𝒸𝑒 𝓉𝑜 𝓂𝑒𝑒𝓉 𝓎𝑜𝓊 !👋</p>
      <p class="about-me-card-text-big">你可以叫我 𝙁𝙡𝙖𝙨𝙝 .</p>
      <p>是一名喜欢摄影、民俗、记录 的 Java 后端开发工程师。</p>
    </div>
  </router-link>


</template>

<style scoped>
.about-me-name {
  border-radius: 12px;
  justify-content: center;
  padding: 2rem;
  color: #fff;
  background-image: linear-gradient(120deg, var(--vp-c-brand-3), var(--vp-c-brand-soft));
  background-size: 200% 200%;

  > p {
    color: var(--vp-c-text-1);
  }
}
</style>
