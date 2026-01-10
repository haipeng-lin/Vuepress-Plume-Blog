<template>
  <div id="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// 状态：用于跟踪地图是否加载完成（在 Composition API 中，通常用 ref 存储简单类型）
const isMapLoaded = ref(false);

/**
 * 动态加载高德地图 JS API Loader
 */
const loadAMap = async () => {
  // 确保 AMapLoader 只在客户端被导入
  const AMapLoader = await import("@amap/amap-jsapi-loader");

  // AMapLoader.load 会返回一个 Promise
  await AMapLoader.load({
    key: "04fc0ff41d59b411e57496afb25fea89",
    version: "2.0",
    plugins: ["AMap.ToolBar", "AMap.Scale"], // 添加常用插件
  });
};

/**
 * 初始化高德地图
 */
const initMap = () => {
  // 📍 城市数据列表，包含完整的描述 HTML 内容
  var cityList = [
    {
      adcode: "441800",
      name: "清远",
      position: [113.0505994, 23.6832984],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 清远市</h3><i>📅 2023（七天的三下乡旅程）</i><p style='line-height:8px'></p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206212719.png'/></div></div>",
    },
    {
      adcode: "440600",
      name: "佛山",
      position: [113.122717, 23.028762],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 佛山市</h3><i>📅 2023（祖庙）</i><p style='line-height:8px'></p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206213302.png'/><img width='150' src='https://img.haipeng-lin.cn/20251206213246.png'/></div></div>",
    },
    {
      adcode: "440100",
      name: "广州",
      position: [113.2592945, 23.1301964],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 广州市</h3><i>📅 2021-2025 (读书&打工)</i><p style='line-height:8px'>第二家乡，大学生活和打工历程</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251206212054.png'/><img width='150' src='https://img.haipeng-lin.cn/20251206212114.png'/></div></div>",
    },
    {
      adcode: "360100",
      name: "南昌",
      position: [115.8540042, 28.687547],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 南昌市</h3><i>📅 2025（游玩）</i><p style='line-height:8px'>超级好吃😋的南昌拌粉、好看的滕王阁等等</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251016000222.png'/><img width='150' src='https://img.haipeng-lin.cn/20251016000206.png'/></div></div>",
    },
    {
      adcode: "440300",
      name: "深圳",
      position: [114.0545429, 22.5445741],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 深圳市</h3><i>📅 2025（实习）</i><p style='line-height:8px'>印象：物价死贵、房东坑人</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251002162126.png'/></div></div>",
    },
    {
      adcode: "360300",
      name: "萍乡",
      position: [113.8830806, 27.6603206],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 萍乡市</h3><i>📅 2025（武功山）</i><p style='line-height:8px'>第一次爬1500的小山峰</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251123220552.png'/><img width='150' src='https://img.haipeng-lin.cn/20251123220722.png'/></div></div>",
    },
    {
      adcode: "440400",
      name: "珠海",
      position: [113.5721327, 22.273734],
      iconUrl: "",
      size: [30, 30],
      desc: "<div><h3 style='margin:10px'>📍 珠海市</h3><i>📅 2025（实习）</i><p style='line-height:8px'>很宜居、适合旅游的城市</p><div style='display: flex; gap: 5px;'><img width='150' src='https://img.haipeng-lin.cn/20251127000651.png'/><img width='150' src='https://img.haipeng-lin.cn/20251127000655.png'/></div></div>",
    },
  ];

  let adCode = [];
  for (var i = 0; i < cityList.length; i++) {
    adCode.push(cityList[i].adcode)
  }

  const mapContainer = document.getElementById("mapContainer");
  // 检查地图容器和全局 AMap 对象
  if (!mapContainer || typeof AMap === "undefined") {
    console.error("Map container not found or AMap not loaded");
    return;
  }

  try {
    // 🌎 总地图初始化
    const mapInstance = new AMap.Map("mapContainer", {
      viewMode: "3D",
      zoom: 6.5,
      center: [113.8830806, 23.6603206],
      pitch: 40,
      defaultCursor: "pointer",
      // 保持隐藏城市名称的特性 (参考上次的修改)
      features: ["bg", "road", "building", "area", "sky"],
    });
    mapInstance.setMapStyle("amap://styles/whitesmoke");

    // 🎨 填充省份颜色 (行政区划图层)
    const disProvince = new AMap.DistrictLayer.Province({
      zIndex: 12,
      zooms: [2, 15],
      adcode: adCode,
      depth: 2,
      styles: {
        fill: "rgba(100,149,237,0.3)",
        "province-stroke": "blue",
        "city-stroke": "cornflowerblue",
        "county-stroke": "rgba(100,149,237,0.2)",
      },
    });
    mapInstance.add(disProvince);

    // 🏷️ 创建 Label 图层用于容纳所有 LabelMarker
    var labelsLayer = new AMap.LabelsLayer({
      collision: false,
      animation: true,
      zIndex: 15,
    });

    // 循环创建和添加 Marker
    for (var i = 0; i < cityList.length; i++) {
      var city = cityList[i];

      // 1. 创建 LabelMarker (用于图标和文字标签)
      var labelsMarker = new AMap.LabelMarker({
        position: city.position,
        name: city.name,
        zooms: [4, 13],
        zIndex: 1,
        opacity: 1,
        icon: {
          image: city.iconUrl,
          size: new AMap.Size(city.size[0], city.size[1]),
          imageSize: new AMap.Size(city.size[0], city.size[1]),
          anchor: "center",
        },
        text: {
          content: city.name,
          direction: "bottom",
          offset: [0, 5],
          style: {
            fontSize: 12,
            fontWeight: "normal",
            fillColor: "#eee",
            strokeColor: "#88f",
            strokeWidth: 3,
            // cursor: pointer,
          },
        },
      });

      // 2. 创建信息窗体
      // ⚠️ 将 infoWindow 的创建放在循环内，确保每个 Marker 都有自己的弹窗引用
      const infoWindow = new AMap.InfoWindow({
        content: city.desc,
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, -15),
      });

      // 3. 绑定点击事件
      // 使用 IIFE (立即执行函数表达式) 或 let/const 的块级作用域来确保 infoWindow 和 city 的引用是正确的
      labelsMarker.on("click", function (e) {
        console.log(`点击了 ${city.name} 标记`);
        // 打开信息窗体，位置为当前点击的 Marker 的位置
        infoWindow.open(mapInstance, e.target.getPosition());
      });

      // 4. 将 Marker 添加到 LabelsLayer
      labelsLayer.add(labelsMarker);
    }

    // 将 LabelsLayer 添加到地图
    mapInstance.add(labelsLayer);

    // 5. 隐藏高德地图 Logo 和版权信息
    const logoElement = document.getElementsByClassName("amap-logo")[0];
    const copyrightElement =
      document.getElementsByClassName("amap-copyright")[0];
    if (logoElement) logoElement.innerHTML = "";
    if (copyrightElement) copyrightElement.innerHTML = "";
  } catch (error) {
    console.error("地图初始化失败:", error);
  }
};

// VUE 3 生命周期钩子：组件挂载后执行
onMounted(async () => {
  try {
    await loadAMap();
    // 等待 DOM 更新（虽然对于 #mapContainer 已经存在的情况可能不是严格必要，但保持严谨性）
    await nextTick();
    initMap();
    isMapLoaded.value = true;
  } catch (error) {
    console.error("地图加载失败:", error);
  }
});
</script>

<style>
#mapContainer {
  height: 1000px;
}
</style>