<template>
  <div>
    <img
      class="index-Img"
      :src="ListData.val1"
      alt=""
      v-if="$route.meta.name === '首页'"
    />
    <img
      class="s-Img"
      :src="ListData.val2"
      alt=""
      v-if="$route.meta.name === '新区概况'"
    />
    <img
      class="s-Img"
      :src="ListData.val3"
      alt=""
      v-if="$route.meta.name === '关于我们'"
    />
    <img
      class="s-Img"
      :src="ListData.val4"
      alt=""
      v-if="$route.meta.name === '新闻中心'"
    />
    <img
      class="s-Img"
      :src="ListData.val5"
      alt=""
      v-if="$route.meta.name === '专班服务'"
    />
    <img
      class="s-Img"
      :src="ListData.val6"
      alt=""
      v-if="$route.meta.name === '党建工作'"
    />
    <img
      class="s-Img"
      :src="ListData.val7"
      alt=""
      v-if="$route.meta.name === '人力资源'"
    />
  </div>
</template>
<script>
import { GetBanners } from "@/api/home.js";
export default {
  data() {
    return {
      ListData: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      GetBanners("header_h5_img").then((res) => {
        this.ListData = res.result;
        console.log(res);
        console.log(this.$route);
      });
    },
  },
  components: {},
};
</script>
<style scoped>
.s-Img {
  width: 750px;
  height: 400px;
}
.index-Img {
  width: 750px;
  height: 1300px;
}
</style>