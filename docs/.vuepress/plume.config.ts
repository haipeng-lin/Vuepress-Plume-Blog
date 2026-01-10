import {defineThemeConfig} from 'vuepress-theme-plume'
import navbar from './navbar.ts'
import collections from './collection.ts'


export default defineThemeConfig({
    // 导航
    navbar,
    // 集合（注意，需要加 s ）
    collections,
})