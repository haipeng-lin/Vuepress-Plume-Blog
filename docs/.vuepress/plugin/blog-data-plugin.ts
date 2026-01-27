import { type Plugin } from "@vuepress/core";

interface BlogPostFrontmatter {
  createTime?: string | number;
  home?: boolean;
  [key: string]: any;
}

export const blogDataPlugin = (): Plugin => ({
  name: "vuepress-plugin-blog-data",

  onPrepared: async (app) => {
    const allPosts = app.pages
      .filter((page) => {
        return (
          page.filePathRelative?.startsWith("blog/") &&
          page.title &&
          !page.frontmatter.home
        );
      })
      .map((page) => {
        const frontmatter = page.frontmatter as BlogPostFrontmatter;

        const relativePath = page.filePathRelative || "";
        const segments = relativePath.split("/");

        // 2. 自动分类逻辑：
        let category = "随笔";
        if (segments.length > 2) {
          category = segments[1];
        }

        return {
          title: page.title,
          path: page.path,
          category: category,
          frontmatter: frontmatter,
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.createTime || 0).getTime();
        const dateB = new Date(b.frontmatter.createTime || 0).getTime();
        return dateB - dateA;
      });

    await app.writeTemp(
      "blog-posts-data.js",
      `export const allPosts = ${JSON.stringify(allPosts)}`
    );
  },

  clientConfigFile: (app) => {
    return app.writeTemp(
      "blog-data-client-config.js",
      `
      import { allPosts } from './blog-posts-data.js'
      import { defineClientConfig } from '@vuepress/client'

      export default defineClientConfig({
        enhance({ app }) {
          app.provide('allBlogPosts', allPosts)
        }
      })
    `
    );
  },
});
