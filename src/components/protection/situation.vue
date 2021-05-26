<template>
  <div class="situation">
    <Head :title="situationData.title ? situationData.title : '新区概况'" />
    <div class="situation-contaiber">
      <div class="contaiber-data" :class="{'contaiber-data-ie': isIe ? 'contaiber-data-ie' : ''}">
        <div class="composition">
          <div class="sju">
            <span>{{ situationData.val1 }}+</span>
          </div>
          <div class="line"></div>
          <div class="text">
            <span>{{ situationData.name1 }}</span>
          </div>
        </div>
        <div class="composition">
          <div class="sju">
            <span>{{ situationData.val2 }}</span>
          </div>
          <div class="line"></div>
          <div class="text">
            <span>{{ situationData.name2 }}</span>
          </div>
        </div>
        <div class="composition">
          <div class="sju">
            <span>{{ situationData.val3 }}+</span>
          </div>
          <div class="line"></div>
          <div class="text">
            <span>{{ situationData.name3 }}</span>
          </div>
        </div>
      </div>
      <div class="contaiber-content">
        <div class="content-text">
          <div v-html="situationData.val11"></div>
        </div>
        <div class="content-img">
          <img :src="situationData.val6" alt="" />
        </div>
      </div>
    </div>
    <div class="contaiber-footer">
      <img :src="situationData.val5" alt="" />
    </div>
  </div>
</template>

<script>
import Head from "@c/header-title/head.vue";
import { getCustomInfo } from "@/api/indexApi.js";
export default {
  components: {
    Head,
  },
  data() {
    return {
      code: "new_district_summary",
      situationData: {},
      isIe: false
    };
  },
  created() {
    this.init();
  },
  updated() {
    $('.content-text div').find('p').css('fontSize', '18px')
    $('.content-text div').find('p').css('fontFamily', 'Microsoft YaHei')
    $('.content-text div').find('span').css('fontSize', '18px')
    $('.content-text div').find('span').css('fontFamily', 'Microsoft YaHei')
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIe = true;
    }
  },
  methods: {
    async init() {
      // 新区概况数据请求
      await getCustomInfo(this.code).then((res) => {
        if (res.code === 0) {
          this.situationData = res.result;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.situation {
  .situation-contaiber {
    min-width: 1530px;
    display: flex;
    flex-direction: column;
    // width: 1200px;
    // margin: 0 auto;
    .contaiber-data {
      margin-left: 360px;
      margin-top: 80px;
      width: 951px;
      display: flex;
      justify-content: space-evenly;
      &.contaiber-data-ie {
        justify-content: space-between;
      }
      .composition {
        .line {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 24px;
          width: 30px;
          height: 2px;
          background: #999999;
        }
        .sju {
          text-align: center;
          font-size: 66px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .text {
          margin-top: 30px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
    }
    .contaiber-content {
      display: flex;
      justify-content: space-between;
      .content-text {
        margin-left: 360px;
        text-indent: 2em;
        width: 819px;
        margin-top: 80px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        line-height: 36px;
        >div {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 10;
          word-break: break-all;
          overflow: hidden;
        }
        // & p:nth-of-type(2) {
        //   margin-top: 40px;
        // }
      }
      .content-img {
        width: 670px;
        height: 446px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .contaiber-footer {
    width: 100%;
    height: 800px;
    min-width: 1530px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>