<template>
  <div class="des">
    <div class="s-title">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <h1>详情</h1>
    </div>
    <h1 class="des-title">{{ desData.title }}</h1>
    <div class="s-date">
      <p>时间: {{ dayjs(desData.createTime).format("YYYY-MM-DD") }}</p>
      <p>浏览次数: {{ desData.lookNum }}</p>
    </div>
    <div class="des-content" v-html="desData.content"></div>
  </div>
</template>
<script>
import { getArticle } from "@/api/home.js";
export default {
  data() {
    return {
      id: 0,
      dayjs: "",
      desData: {},
    };
  },
  created() {
    this.dayjs = require("dayjs");
    this.id = this.$route.query.id;
    getArticle(this.id).then((res) => {
      console.log(res, "详情页信息");
      if (res.code === 0) {
        this.desData = res.result;
      }
    });
  },
  methods: {},
  components: {},
};
</script>
<style scoped lang='less'>
.des {
  // padding: 0 23px;
  // box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
  .des-title {
    width: 658px;
    margin: 100px auto 0 auto;
    color: #000000;
    font-size: 44px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000000;
    line-height: 80px;
  }
  .des-content {
    min-height: 408px;
    width: 704px;
    margin: 60px auto;
    line-height: 56px;
  }
  .s-title {
    position: fixed;
    top: 0;
    background: #F1F4FA;
    z-index: 1000;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    h1 {
      font: 700 32px/1 "Microsoft YaHei";
      color: #000;
      // margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .van-icon-arrow-left {
      margin-left: 20px;
    }
  }
  .s-date {
    display: flex;
    width: 658px;
    margin: 39px auto 59px auto;
    // justify-content: space-between;
    p {
      font: 400 24px/1 "Microsoft YaHei";
      color: #b6b6b6;
      margin-right: 60px;
    }
  }
  /deep/.van-icon {
    width: 100px;
    font-size: 40px;
     color: #666666;
  }
  /deep/video {
    width: 99% !important;
    height: auto !important;
  }
  /deep/img {
    width: 99% !important;
    height: auto !important;
  }
}
</style>