<template>
  <div class="vp-doc-title">
    <slot name="doc-title-before" />
    <h1 class="page-title" :class="{ padding: !hasMeta }">
      <VPBadge v-if="page.frontmatter.draft" type="warning" text="DRAFT" />
      {{ page.title }}
      <VPBadge v-if="badge" :type="badge.type || 'tip'" :text="badge.text" />
    </h1>
    <slot name="doc-title-after" />
  </div>
  <div v-if="hasMeta" class="vp-doc-meta">
    <slot name="doc-meta-before" />
    <!-- 阅读时间 -->
    <p
      v-if="readingTime.time && matter.readingTime !== false"
      class="reading-time"
    >
      <span class="vpi-books icon" />
      <span>{{ readingTime.words }}</span>
      <span>{{ readingTime.time }}</span>
    </p>
    <!-- 阅读量 -->
    <p v-if="pvCount !== null">
      <!-- <span
        style="
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: currentColor;
          mask: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z%22/></svg>')
            no-repeat center;
          -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z%22/></svg>')
            no-repeat center;
        "
      /> -->
      <span>{{ pvCount + " 阅读" }}</span>
    </p>
    <!-- 标签 -->
    <p v-if="tags.length > 0">
      <span class="vpi-tag icon" />
      <VPLink
        v-for="tag in tags"
        :key="tag.name"
        class="tag"
        :class="tag.className"
        :href="
          tagsLink?.link && isPosts
            ? `${tagsLink.link}?tag=${tag.name}`
            : undefined
        "
      >
        {{ tag.name }}
      </VPLink>
    </p>

    <slot name="doc-meta-after" />
    <!-- 创建时间 -->
    <p v-if="createTime" class="create-time">
      <span class="vpi-clock icon" /><span>{{ createTime }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted, onUnmounted, watch } from "vue";
import VPBadge from "../../../../node_modules/vuepress-theme-plume/lib/client/components/global/VPBadge.vue";
import VPLink from "../../../../node_modules/vuepress-theme-plume/lib/client/components/VPLink.vue";
import { useReadingTimeLocale } from "@vuepress/plugin-reading-time/client";
import {
  useData,
  useInternalLink,
  usePostsPageData,
  useTagColors,
} from "../../../../node_modules/vuepress-theme-plume/lib/client/composables/index.js";

const { page, frontmatter: matter, theme, collection } = useData<"post">();
const colors = useTagColors();
const readingTime = useReadingTimeLocale();
const { tags: tagsLink } = useInternalLink();
const { isPosts } = usePostsPageData();

const globalStats = inject("globalStats", { pvData: {} });

const pvCount = computed(() => {
  if (import.meta.env.SSR) return null;
  // 当前页面 url
  const pathUrl = window.location.origin + page.value.path;
  // 阅读量
  const count =
    globalStats.pvData[pathUrl] || globalStats.pvData[page.value.path];
  return count !== undefined ? count : null;
});

const createTime = computed(() => {
  const show = theme.value.createTime ?? true;
  if (!show || (show === "only-posts" && !isPosts.value)) return "";
  if (matter.value.createTime)
    return matter.value.createTime.split(/\s|T/)[0].replace(/\//g, "-");
  return "";
});

const tags = computed(() => {
  const tagTheme = collection.value?.tagsTheme ?? "colored";
  if (matter.value.tags) {
    return matter.value.tags.slice(0, 4).map((tag) => ({
      name: tag,
      className: colors.value[tag]
        ? `vp-tag-${colors.value[tag]}`
        : `tag-${tagTheme}`,
    }));
  }
  return [];
});

const badge = computed(() => {
  if (matter.value.badge) {
    return typeof matter.value.badge === "string"
      ? { text: matter.value.badge }
      : matter.value.badge;
  }
  return false;
});

const hasDocMetaSlot = inject("doc-meta-slot-exists", ref(false));

const hasMeta = computed(
  () =>
    readingTime.value.time ||
    tags.value.length ||
    createTime.value ||
    hasDocMetaSlot.value ||
    pvCount.value !== null
);
</script>

<style scoped>
/* 保持您原有的样式不变 */
@media (min-width: 768px) {
  .vp-doc-title {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
  }
}

.page-title {
  flex: 1;
  min-width: 0;
  margin-bottom: 0.7rem;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  transition: color var(--vp-t-color);
}

.page-title.padding {
  padding-bottom: 4rem;
}

.vp-doc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0 0.5rem;
  margin-bottom: 2rem;
  font-size: 14px;
  color: var(--vp-c-text-3);
  border-bottom: solid 1px var(--vp-c-divider);
  transition: color var(--vp-t-color), border-bottom var(--vp-t-color);
}

.vp-doc-meta p {
  display: flex;
  gap: 6px;
  align-items: center;
}

.vp-doc-meta .icon {
  width: 14px;
  height: 14px;
}

.vp-doc-meta .tag {
  display: inline-block;
  padding: 3px 5px;
  font-size: 12px;
  line-height: 1;
  color: var(--vp-tag-color);
  background-color: var(--vp-tag-bg);
  border-radius: 3px;
}

.vp-doc-meta .create-time {
  text-align: right;
}

@media (min-width: 768px) {
  .vp-doc-meta .create-time {
    flex: 1 2;
    justify-content: right;
  }
}
</style>