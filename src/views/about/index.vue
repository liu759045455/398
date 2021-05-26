<template>
  <div class="about">
    <v-header-title title="大队概况" />
    <div class="about-data">
      <div class="s-datas w-width">
        <div class="datas-nums">
          <i>{{ aboutData.val1 }}</i
          >名
        </div>
        <div class="datas-name">环境监督专员<br/>组成</div>
      </div>
      <div class="s-datas">
        <div class="datas-nums">
          <i>{{ aboutData.val2 }}</i
          >年
        </div>
        <div class="datas-name">落实生态环境<br/>行动方案</div>
      </div>
      <div class="s-datas">
        <div class="datas-nums">
          <i>{{ aboutData.val3 }}</i
          >项
        </div>
        <div class="datas-name">重点实施环保<br/>工作任务</div>
      </div>
      <div class="s-datas">
        <div class="datas-nums">
          <i>{{ aboutData.val4 }}</i
          >个
        </div>
        <div class="datas-name">组建成立工作<br/>专班</div>
      </div>
    </div>
    <div class="about-content">
      <div v-html="aboutData.val11"></div>
    </div>
    <div class="footers">
      <img :src="aboutData.val8" alt="" />
    </div>
  </div>
</template>
<script>
import vHeaderTitle from "@c/header-title/index.vue";
import { getCustomInfo } from "@/api/home.js";

export default {
  data() {
    return {
      code: "base_info",
      aboutData: {},
      location: location.origin
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await getCustomInfo(this.code).then((res) => {
        if (res.code === 0) {
          this.aboutData = res.result;
        }
      });
    },
  },
  components: {
    vHeaderTitle,
  },
};
</script>
<style scoped lang="less">
.about {
  .about-data {
    display: flex;
    // justify-content: space-around;
    margin-top: 60px;
    .s-datas {
      width: 25%;
      text-align: center;
      .datas-nums {
        width: 100%;
        text-align: center;
        color: #333333;
        font-size: 18px;
        vertical-align: bottom;

        > i {
          font-size: 65px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
      .datas-name {
        // width: 120px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #858585;
        line-height: 30px;
      }
    }
  }
  .about-content {
    width: 702px;
    margin: 60px auto 0 auto;
    font: 400 28px/56px "Microsoft YaHei";
    color: #333;
  }
  .footers {
    margin-top: 40px;  
    width: 100%;
    height: 960px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>