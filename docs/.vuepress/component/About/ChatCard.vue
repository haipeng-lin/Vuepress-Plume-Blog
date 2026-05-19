<template>
    <div class="chat">
        <ul>
            <li class="textRight"><span>Hello！很幸运遇见你呀</span></li>
            <li class="textLeft left1"><span>Hi！</span></li>
            <li class="textLeft left2"><span>你为什么叫 𝙝𝙖𝙥𝙥𝙮𝙝𝙖𝙞 呀？</span></li>
            <li class="textRight"><span>和一款游戏的人物语音有关哇🥳</span></li>
            <li class="textLeft left3"><span>为什么会建这个小破站哩？</span></li>
            <li class="textRight"><span>请滑鼠标</span></li>
        </ul>
    </div>
</template>

<style scope>
.chat {
    margin: 4rem auto;
    width: 32rem;
    background-color: #ebebe9;
    box-shadow: 1.2rem 1rem 1.2rem rgba(0, 0, 0, 0.5);
}

.chat ul {
    padding: 1.6rem;
}

.chat li {
    padding: 2px;
    margin-bottom: 1rem;
}

.chat li span {
    position: relative;
    border-radius: 0.2rem;
    background-color: #a6e860;
    padding: 0.3rem 0.8rem 0.4rem 0.6rem;
    z-index: 1;
}

.left1 {
    position: relative;
    left: 2rem;
}

.left2 {
    position: relative;
    left: 2rem;
}

.left3 {
    position: relative;
    left: 2rem;
}

.chat .textLeft span {
    background-color: white;
    position: relative;
    left: -2rem;
}

.chat li.textLeft:before {
    content: url("https://gcore.jsdelivr.net/gh/CNhuazhu/TuChuang4/blog/avatar2.jpg");
    box-sizing: border-box;
    position: relative;
    left: -2.75rem;
    top: 0.6rem;
}

.chat li.textLeft span:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
    border-right: 0.5rem solid white;
    position: absolute;
    top: 0.5rem;
    left: -1rem;
}

.chat li.textRight:after {
    content: url("https://cdn.jsdelivr.net/gh/haipeng-lin/blog-img/202503211220050.png");
    box-sizing: border-box;
    position: relative;
    right: -1rem;
    top: 0.6rem;
}

.chat li.textRight span:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
    border-left: 0.5rem solid #a6e860;
    position: absolute;
    top: 0.5rem;
    right: -1rem;
}

.chat li {
    list-style: none;
}

.chat .textRight {
    text-align: right;
}

/* 微信聊天-结束 */
</style>