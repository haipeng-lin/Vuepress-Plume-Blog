<template>
    <div>
        <div class="talk-word">
            <TalkWordCard msg="Welcome to my blog ~" />
        </div>
        <ProfileCard />
        <div class="about-me-3-2-row">
            <SkillCard />
            <MyTextCard>
                <template #motto>
                    <slot name="motto">
                        <p class="about-me-card-title-normal">𝓂𝑜𝓉𝓉𝑜</p>
                        <p class="about-me-card-text-big">路漫漫其修远兮</p>
                        <p class="about-me-card-text-big about-me-card-text-color">
                            吾将上下而求索
                        </p>
                    </slot>
                    <slot name="motto">
                        <p class="about-me-card-title-normal">𝓈𝓁𝑜𝑔𝒶𝓃</p>
                        <p class="about-me-card-text-big">
                            前方是<span style="color: #3a5ccc">未知</span>&ensp;迎面是<span style="color: #3a5ccc">海风</span>
                        </p>
                        <p class="about-me-card-text-big">
                            塞壬的歌会诱人忘记<span style="color: #d53737">初衷</span>
                        </p>
                    </slot>
                </template>
            </MyTextCard>
        </div>
        <div>
            <h3>站点</h3>
            <WebsiteCard />
        </div>
        <div class="chat">
            <ChatCard />
        </div>
        <div class="about-bio">
            <p>
                此小破站源于 <strong>Kiang</strong> 的兴趣爱好，未来 <strong>Kiang</strong> 会努力更新维护此站。
                此站基于 <strong>VuePress</strong> 搭建，使用 <strong>Plume</strong> 主题，部署于阿里云。
            </p>

            <p>
                在高考完的那个暑假，想先在网上自学 <strong>C 语言</strong> 的一些基础知识，“笨鸟先飞，勤能补拙”嘛。
                便注册了一个 CSDN 账号，并按照网上的教程成功安装了 VS2019，当我打印出第一行
                <span class="code-text">“Hello, World”</span>
                时，还记得当时能高兴很久（笑），毕竟这是第一次接触到代码。
                当时还没有记录博客的想法，更多是查找资料解决 Bug，但这也算是梦开始的地方！
            </p>

            <p>
                大二时，学校开设了 <strong>JS 课</strong>，那是我第一次接触到前端。虽然样式调整过程挺繁琐，但当最终效果呈现出来时，觉得非常有成就感。
            </p>

            <p>
                大三时，我意识到“学习不单是输入，还需要输出”。写笔记和讲给同学听都是输出知识的方式。
                我开始在 <strong>CSDN</strong> 记录笔记，后来积累了 <strong>2000+ 粉丝</strong>。
                每当想到能帮助到别人，特别是收到求助评论时，内心都很开心。但后来觉得 CSDN 过于单一，无法实现个性化，便萌生了搭建个人站点的念头。
            </p>

            <p>
                大四时，我基于 <strong>Hexo</strong> 和 <strong>Butterfly</strong> 主题搭建了第一个静态博客。
                那时候不懂前端原理，只是单纯地 Copy 大佬们的代码，哪怕只是实现了一个小功能，都能让我兴奋到忘记吃饭。
                相比 CSDN，这里多了自述页面、吐槽闲聊、倒计时等个性化功能。
                <span class="old-site">
                    旧站点详情：<a href="https://life.haipeng-lin.cn" target="_blank">life.haipeng-lin.cn</a>（已停更）
                </span>
            </p>

            <p>
                随着笔记日益增多，Hexo 的局限性开始暴露：分类文章查看效果一般、样式过多导致加载缓慢。
                所以最终我搬到了 <strong>VuePress</strong>，它更轻量、加载更快，也更适合技术笔记的沉淀。
            </p>
        </div>
        <TimeLineCard />
        <TalkWordCard msg="一切均在不言中 ~" />
    </div>
</template>

<script setup>
import ChatCard from './ChatCard.vue';
import ProfileCard from './ProfileCard.vue';
import MyTextCard from './MyTextCard.vue';
import SkillCard from './SkillCard.vue';
import TalkWordCard from './TalkWordCard.vue';
import TimeLineCard from './TimeLineCard.vue';
import WebsiteCard from './WebsiteCard.vue';

</script>

<style scope>
.talk-word {
    margin: 0 0 50px;
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

.about-bio {
    line-height: 1;
    color: #000000;
    font-size: 1.05rem;
    background-color: #d8f0f3;
    padding: 10px 20px
}

.about-bio p {
    text-indent: 2em;
    /* 实现段落缩进 */
    text-align: justify;
    /* 文字两端对齐 */
}

.about-bio strong {
    font-weight: 600;
}

.code-text {
    background: rgba(62, 175, 124, 0.1);
    color: #3eaf7c;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-weight: bold;
}
</style>