#!/usr/bin/env sh

# 构建文档
npm run docs:build

# 进入构建的文件夹
cd docs/.vuepress/dist

# 初始化 Git 仓库
git init 

# 添加所有文件到 Git 暂存区
git add -A

# 提交更改
git commit -m "部署"

# 强制推送到远程 Git 仓库
git push -f git@8.155.33.36:/var/repo/vuepress2.git main:master
# 返回到原来的目录
cd -

# 休眠 100000 秒
sleep 100000
