<template>
  <div class="situation">
    <v-header-title :title="situationData.title" />
    <div class="situation-data">
      <div class="s-datas w-width">
        <div class="datas-nums">{{ situationData.val1 }}+</div>
        <div class="line"></div>
        <div class="datas-name">新区现已完成投资<br/>（亿元）</div>
      </div>
      <div class="s-datas t-width">
        <div class="datas-nums">{{ situationData.val2 }}</div>
        <div class="line"></div>
        <div class="datas-name">累计引进重大产业项目<br/>（个）</div>
      </div>
      <div class="s-datas">
        <div class="datas-nums">{{ situationData.val3 }}</div>
        <div class="line"></div>
        <div class="datas-name s-width">总投资<br/>（亿元）</div>
      </div>
    </div>
    <div class="situation-content">
      <div v-html="situationData.val11"></div>
    </div>
    <div class="footers">
      <img :src="situationData.val4" alt="" />
    </div>
  </div>
</template>
<script>
import vTitle from "@c/title/index.vue";
import vHeaderTitle from "@c/header-title/index.vue";
import { getCustomInfo } from "@/api/home.js";

export default {
  data() {
    return {
      code: "new_district_summary",
      situationData: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await getCustomInfo(this.code).then((res) => {
        if (res.code === 0) {
          this.situationData = res.result;
          console.log(this.situationData);
        }
      });
    },
  },
  components: {
    vTitle,
    vHeaderTitle,
  },
};
</script>
<style scoped lang="less">
.situation {
  .situation-data {
    display: flex;
    justify-content: space-around;
    margin-top: 60px;
    .s-datas {
      width: 160px;
      text-align: center;
      &.w-width {
        width: 200px;
      }
      &.t-width {
        width: 240px;
      }

      .datas-nums {
        width: 100%;
        text-align: center;
        font-size: 66px;
        font-family: Arial;
        font-weight: 400;
        color: #333333;
      }
      .line {
        width: 30px;
        height: 2px;
        background: #e4e4e4;
        margin: 10px auto;
      }
      .datas-name {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #858585;
        line-height: 30px;
        &.s-width {
          width: 100px;
          margin: 0 auto;
        }
      }
    }
  }
  .situation-content {
    width: 702px;
    line-height: 56px;
    margin: 60px auto 0 auto;
  }
  .footers {
    width: 100%;
    height: 570px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>