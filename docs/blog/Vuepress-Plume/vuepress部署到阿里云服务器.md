---
title: vuepress部署到阿里云服务器
createTime: 2025/01/24 16:34:27
permalink: /blog/jmh3sdmp/
cover: https://img.haipeng-lin.cn/20251002162603.png
coverStyle:
  layout: left
  ratio: "16:9"
  width: 300
excerpt: vuepress部署到阿里云服务器，前置条件：购买阿里云服务器和域名、域名备案（没备案，可使用公网ip访问）、服务器安装宝塔面板和Nginx
tags:
  - vuepress
show: true
articleGPT: 这篇文章讲了将 VuePress 部署到阿里云服务器的流程。作者记录了 SSH 免密配置、Git 钩子自动同步及本地部署脚本的实现细节。通过在服务器建立裸仓库并配合 Git Hook，实现了代码从本地构建到线上目录自动更新的自动化闭环，显著提升了博客的运维与发布效率。
---

## 1.前置条件

购买阿里云服务器和域名、域名备案（没备案，可使用公网 ip 访问）、服务器安装宝塔面板和 Nginx

## 2.本地生成 ssh 公钥

cmd 管理员模式输入以下命令后，连续敲回车三次，到路径：C:\Users(用户)\你的用户名.ssh\id_rsa.pub，用 txt 文件打开并复制里面的内容，后续用于和线上服务器建立连接

```
ssh-keygen -t rsa
```

![image-20241229212127747](https://img.haipeng-lin.cn/20251002162626.png)

## 3.阿里云服务器配置

### 3.1 新增网站

![image-20241229212450167](https://img.haipeng-lin.cn/20251002162637.png)

配置：

![image-20241229212548929](https://img.haipeng-lin.cn/20251002162643.png)

> 修改：设置——>配置文件
>
> 1. ==server_name，填写自己的域名 OR 公网 IP==
> 2. ==root，修改网站访问的目标路径==

![image-20241229212652201](https://img.haipeng-lin.cn/20251002162649.png)

### 3.2 安装 Git

> root 身份下操作：

安装依赖库：

```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
```

安装编译工具：

```shell
yum install gcc perl-ExtUtils-MakeMaker package
```

如果服务器已经安装好了 git，建议重装，保持版本一致

```shell
# 查看git
git version

# 删除git
yum remove git -y
```

下载并解压 2.28.0 版本：

```shell
cd /usr/local/src  #进入下载的目录
wget https://www.kernel.org/pub/software/scm/git/git-2.28.0.tar.gz    #下载最新版
tar -zxvf git-2.28.0.tar.gz   #解压到当前文件夹
```

编译并安装，编译过程可能有点慢，耐心等待

```shell
cd git-2.28.0  #进入文件夹
make prefix=/usr/local/git all #编译源码
make prefix=/usr/local/git install    #安装路径
```

配置环境变量后，并再次查看版本号，检查是否安装成功

```shell
# 配置环境变量
echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc

# 刷新配置环境变量
source /etc/bashrc
```

### 3.3 配置用户 git

**创建 git 账户**

```shell
# 创建git账户
adduser git
# 给git账户设置密码
passwd git
chmod 740 /etc/sudoers
```

添加账户的权限，添加以下内容：

```shell
vim /etc/sudoers
```

```shell
git	ALL=(ALL)	ALL
```

![image-20241229214105859](https://img.haipeng-lin.cn/20251002162655.png)

### 3.4 建立 shh 连接

切换到 git 用户，并且创建~/.ssh 文件和~/.ssh/authorized_keys 文件

```shell
su git		#切换到git账户
mkdir ~/.ssh	#创建~/.ssh文件
vim ~/.ssh/authorized_keys		#打开文件
```

然后把前面在 Windows10 中生成的 id_rsa.pub 文件中的公钥内容复制到 authorized_keys 里面去

**_给文件赋予权限_**

```shell
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
```

**_测试在本机环境下，是否能免密登录 git_**

```shell
ssh -v git@你的服务器IP地址
```

### 3.5 仓库目录和网站目录

> 先切换为 root 用户

1. **建立仓库目录，修改目录权限拥有者，权限值**

   ```shell
   # /var/repo作为git仓库目录
   mkdir /var/repo
   chown -R git:git /var/repo
   chmod -R 755 /var/repo
   ```

2. **创建网站目录，修改目录权限拥有者，权限值**

   ```shell
   # /var/www/hexo为网站目录
   mkdir /var/www/vuepress
   chown -R git:git /var/www/vuepress
   chmod -R 755 /var/www/vuepress
   ```

### 3.6 新建空仓库

1. **创建一个裸的 git 仓库**

   ```shell
   cd /var/repo
   git init --bare vuepress.git
   ```

2. **新建钩子函数**，使得本地每次使用 hexo d 命令部署 hexo 博客时，同步网站根目录

   ```shell
   vim /var/repo/vuepress.git/hooks/post-receive
   ```

   新增以下内容，指定 git 工作树源代码和 git 目录

   ```shell
   git --work-tree=/var/www/vuepress --git-dir=/var/repo/vuepress.git checkout -f
   ```

3. **增加文件权限以运行**（非常重要）

   ```shell
   chown -R git:git /var/repo/vuepress.git/hooks/post-receive
   chmod +x /var/repo/vuepress.git/hooks/post-receive
   ```

## 4.本地脚本

将该脚本文件放置在 vuepress 根目录下。注意：**仓库的 master 适用于 git 旧版本**，git 新版本需要更换为 main 默认分支，否则会出现服务器网站根目录数据同步不了的情况（**此为本人亲自踩坑**）

```sh
#!/usr/bin/env sh

npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m "部署"

git push -f git@IP地址:/var/repo/vuepress2.git master:master
cd -


sleep 100000
```

## 5.测试

### 5.1 执行脚本命令

<img src="https://img.haipeng-lin.cn/20251002162717.png" style="zoom:50%;" />

观察服务器上网站站点文件：

<img src="https://cdn.jsdelivr.net/gh/haipeng-lin/blog-img/202503201824790.png" style="zoom:50%;" />

### 5.2 观察网站并测速

![image-20250124155245249](https://img.haipeng-lin.cn/20251002162740.png)

![image-20250124155317441](https://img.haipeng-lin.cn/20251002162745.png)
