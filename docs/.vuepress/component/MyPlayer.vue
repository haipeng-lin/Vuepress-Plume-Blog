<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane class="music-container" label="2024年歌单" name="first" >
        <div id="aplayer2024" style="width: 60%"></div>
      </el-tab-pane>
      <el-tab-pane class="music-container" label="2023年歌单" name="second">
        <div id="aplayer2023" style="width: 60%"></div>
      </el-tab-pane>
      <el-tab-pane class="music-container" label="2022年歌单" name="third">
        <div id="aplayer2022" style="width: 60%"></div>
      </el-tab-pane>
      <el-tab-pane class="music-container" label="2021年歌单" name="fourth">
        <div id="aplayer2021" style="width: 60%"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script name="MyPlayer" lang="ts" setup>
import { ref, onMounted } from "vue";
import "aplayer/dist/APlayer.min.css";

const activeName = ref("first"); // 用来存储当前选中的标签

const audio2024 = ref([
  {
    name: "达尔文",
    artist: "林俊杰",
    url: "/music/达尔文.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250318/20250318151024669070.jpg",
    lrc: "/lrc/达尔文.lrc",
  },
  {
    name: "东北民谣",
    artist: "毛不易",
    url: "/music/东北民谣.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241203/20241203145401178225.jpg",
    lrc: "/lrc/东北民谣.lrc",
  },
  {
    name: "一笑江湖",
    artist: "姜姜",
    url: "/music/一笑江湖.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241108/20241108184906226358.jpg",
    lrc: "/lrc/一笑江湖.lrc",
  },
  {
    name: "画心",
    artist: "张信哲/黄霄云",
    url: "/music/画心.mp3",
    cover: "https://imge.kugou.com/stdmusic/20240503/20240503102101407007.jpg",
    lrc: "/lrc/画心.lrc",
  },

  {
    name: "安和桥",
    artist: "宇西",
    url: "/music/安和桥.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250306/20250306202203946460.jpg",
    lrc: "/lrc/安和桥.lrc",
  },
  {
    name: "一荤一素",
    artist: "毛不易",
    url: "/music/一荤一素.mp3",
    cover: "https://imge.kugou.com/stdmusic/20220512/20220512172410555244.jpg",
    lrc: "/lrc/一荤一素.lrc",
  },
  {
    name: "客子光阴",
    artist: "七叔-叶泽浩",
    url: "/music/客子光阴.mp3",
    cover: "https://imge.kugou.com/stdmusic/20201221/20201221210207596344.jpg",
    lrc: "/lrc/客子光阴.lrc",
  },
  {
    name: "No Footsteps to Follow",
    artist: "Galen Crew",
    url: "/music/No Footsteps to Follow.mp3",
    cover: "https://imge.kugou.com/stdmusic/20231022/20231022083302614426.jpg",
    lrc: "/lrc/No Footsteps to Follow.lrc",
  },
  {
    name: "Traveling Light",
    artist: "Joel Hanson / Sara Groves",
    url: "/music/Traveling Light.mp3",
    cover: "https://imge.kugou.com/stdmusic/20240306/20240306005002445169.jpg",
    lrc: "/lrc/Traveling Light.lrc",
  },
]);

const audio2023 = ref([
  // {
  // 	name: "The Nights",
  // 	artist: "Alyson Mary",
  // 	url: "/music/客子光阴.mp3",
  // 	cover: "http://imge.kugou.com/stdmusic/150/20170815/20170815070007812976.jpg",
  // 	lrc: "/lrc/一荤一素.lrc",
  // },
  {
    name: "虹之间",
    artist: "金贵晟",
    url: "/music/虹之间.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250207/20250207161306660783.jpg",
    lrc: "/lrc/虹之间.lrc",
  },
  {
    name: "Every Time We Touch",
    artist: "Dream Tunes",
    url: "/music/Every Time We Touch.mp3",
    cover: "https://imge.kugou.com/stdmusic/20230907/20230907142702894170.jpg",
    lrc: "/lrc/Every Time We Touch.lrc",
  },
  {
    name: "曾经的你",
    artist: "许巍",
    url: "/music/曾经的你.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250221/20250221180747451258.jpg",
    lrc: "/lrc/曾经的你.lrc",
  },
  {
    name: "喜悦",
    artist: "许巍",
    url: "/music/喜悦.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250807/20250807142812489671.jpg",
    lrc: "/lrc/喜悦.lrc",
  },
  {
    name: "Take Me to Your Heart",
    artist: "InstaHit Crew",
    url: "/music/Take Me to Your Heart.mp3",
    cover: "https://imge.kugou.com/stdmusic/20211008/20211008195506274271.jpg",
    lrc: "/lrc/Take Me to Your Heart.lrc",
  },
  {
    name: "星光就在前方",
    artist: "抠抠",
    url: "/music/星光就在前方.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250318/20250318151133870084.jpg",
    lrc: "/lrc/星光就在前方.lrc",
  },
  // {
  // 	name: "Gone",
  // 	artist: "Harry Hudson",
  // 	url: "/music/客子光阴.mp3",
  // 	cover: "https://imge.kugou.com/stdmusic/20230907/20230907142702894170.jpg",
  // 	lrc: "/lrc/一荤一素.lrc",
  // },
  {
    name: "大海",
    artist: "张雨生",
    url: "/music/大海.mp3",
    cover: "https://imge.kugou.com/stdmusic/20201125/20201125103505920689.jpg",
    lrc: "/lrc/大海.lrc",
  },
  {
    name: "救赎之旅",
    artist: "许巍",
    url: "/music/救赎之旅.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250807/20250807142812489671.jpg",
    lrc: "/lrc/救赎之旅.lrc",
  },
]);

const audio2022 = ref([
  {
    name: "我用什么把你留住",
    artist: "福禄寿",
    url: "/music/我用什么把你留住.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200918/20200918222902157666.jpg",
    lrc: "/lrc/我用什么把你留住.lrc",
  },
  {
    name: "Dirty Daws",
    artist: "Of Monsters And Men",
    url: "/music/Dirty Daws.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200623/20200623003444649700.jpg",
    lrc: "/lrc/Dirty Daws.lrc",
  },
  {
    name: "Summertime Sadness",
    artist: "Lana Del Rey",
    url: "/music/Summertime Sadness.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241115/20241115095201257667.jpg",
    lrc: "/lrc/Summertime Sadness.lrc",
  },
  {
    name: "千千阙歌",
    artist: "陈慧娴",
    url: "/music/千千阙歌.mp3",
    cover: "https://imge.kugou.com/stdmusic/20241206/20241206175512631404.jpg",
    lrc: "/lrc/千千阙歌.lrc",
  },
  {
    name: "沉默是金",
    artist: "张国荣",
    url: "/music/沉默是金.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250311/20250311104914634074.jpg",
    lrc: "/lrc/沉默是金.lrc",
  },
  {
    name: "Dancing With Your Ghost(Live)",
    artist: "于文文",
    url: "/music/Dancing With Your Ghost(Live).mp3",
    cover: "https://imge.kugou.com/stdmusic/20190626/20190626210118627550.jpg",
    lrc: "/lrc/Dancing With Your Ghost(Live).lrc",
  },
  //  {
  //   name: "暖暖",
  //   artist: "1个球",
  //   url: "/music/暖暖.mp3",
  //   cover: "",
  //   lrc: "/lrc/暖暖.lrc",
  //  },
  {
    name: "平凡之路(Live)",
    artist: "朴树",
    url: "/music/平凡之路(Live).mp3",
    cover: "https://imge.kugou.com/stdmusic/20200620/20200620071827410208.jpg",
    lrc: "/lrc/平凡之路(Live).lrc",
  },
]);

const audio2021 = ref([
  {
    name: "海底",
    artist: "一支榴莲",
    url: "/music/海底.mp3",
    cover: "https://imge.kugou.com/stdmusic/20200316/20200316175845625083.jpg",
    lrc: "/lrc/海底.lrc",
  },
  {
    name: "城南花已开",
    artist: "三亩地",
    url: "/music/城南花已开.mp3",
    cover: "https://imge.kugou.com/stdmusic/20181102/20181102115543498345.jpg",
    lrc: "/lrc/城南花已开.lrc",
  },
  {
    name: "错位时空",
    artist: "艾辰",
    url: "/music/错位时空.mp3",
    cover: "",
    lrc: "/lrc/错位时空.lrc",
  },
  {
    name: "讲不出再见",
    artist: "谭咏麟",
    url: "/music/讲不出再见.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250125/20250125121713244765.jpg",
    lrc: "/lrc/讲不出再见.lrc",
  },
  //   {
  //     name: "只要你在我身边",
  //     artist: "鹤先生Music",
  //     url: "/music/只要你在我身边.mp3",
  //     cover: "",
  //     lrc: "/lrc/只要你在我身边.lrc",
  //   },
  //   {
  //     name: "青衣",
  //     artist: "九鸢Pro/在下河帛",
  //     url: "/music/青衣.mp3",
  //     cover: "",
  //     lrc: "/lrc/青衣.lrc",
  //   },
  {
    name: "时光背面的我",
    artist: "刘至佳/韩瞳",
    url: "/music/时光背面的我.mp3",
    cover: "https://imge.kugou.com/stdmusic/20210702/20210702141406996785.jpg",
    lrc: "/lrc/时光背面的我.lrc",
  },
  {
    name: "忘记时间",
    artist: "胡歌",
    url: "/music/忘记时间.mp3",
    cover: "https://imge.kugou.com/stdmusic/20250221/20250221180731140818.jpg",
    lrc: "/lrc/忘记时间.lrc",
  },
]);
async function addMyAudio() {
  const { default: APlayer } = await import("aplayer");

  const ap2024 = new APlayer({
    container: document.getElementById("aplayer2024"),
    audio: audio2024.value,
    showlrc: true,
    lrcType: 3,
    listMaxHeight: 1000,
    autoplay: false,
    loop: "all",
    order: "list",
    autoplay: true,
  });

  const ap2023 = new APlayer({
    container: document.getElementById("aplayer2023"),
    audio: audio2023.value,
    showlrc: true,
    lrcType: 3,
    listMaxHeight: 1000,
    autoplay: false,
    loop: "all",
    order: "list",
    autoplay: false,
  });

  const ap2022 = new APlayer({
    container: document.getElementById("aplayer2022"),
    audio: audio2022.value,
    showlrc: true,
    lrcType: 3,
    listMaxHeight: 1000,
    autoplay: false,
    loop: "all",
    order: "list",
    autoplay: false,
  });

  const ap2021 = new APlayer({
    container: document.getElementById("aplayer2021"),
    audio: audio2021.value,
    showlrc: true,
    lrcType: 3,
    listMaxHeight: 1000,
    autoplay: false,
    loop: "all",
    order: "list",
    autoplay: false,
  });
}

onMounted(() => {
  addMyAudio();
});
</script>

<style>
.music-container {
  display: flex;
  justify-content: center;
}

.aplayer {
  font-family: "LXGW WenKai GB";
}
</style>