<template>
  <div class="about" id="AboutUs0">
    <Head title="大队概况" />
    <div class="container">
      <div class="content-sju" :class="{'content-sju-ie': isIe ? 'content-sju-ie' : ''}">
        <div class="composition">
          <div class="sju">
            <span>{{ aboutData.val1 }}</span
            >名
          </div>
          <div class="text">
            <span>{{ aboutData.name1 }}</span>
          </div>
        </div>
        <div class="composition">
          <div class="sju">
            <span>{{ aboutData.val2 }}</span
            >年
          </div>
          <div class="text">
            <span>{{ aboutData.name2 }}</span>
          </div>
        </div>
        <div class="composition">
          <div class="sju">
            <span>{{ aboutData.val3 }}</span
            >项
          </div>
          <div class="text">
            <span>{{ aboutData.name3 }}</span>
          </div>
        </div>
        <div class="composition">
          <div class="sju">
            <span>{{ aboutData.val4 }}</span
            >个
          </div>
          <div class="text">
            <span>{{ aboutData.name4 }}</span>
          </div>
        </div>
      </div>
      <div class="container-content">
        <div class="container-text">
          <div class="text">
            <div v-html="aboutData.val11"></div>
          </div>
          <div class="btns">
            <a :href="locationImg" download="" class="text-btn">下载宣传册</a>
          </div>
        </div>
        <div class="container-img">
          <img :src="aboutData.val6" alt="" />
        </div>
      </div>
      <!-- 组织架构 -->
      <div class="footers" id="AboutUs1">
        <div class="footers-img">
          <img :src="aboutData.val5" alt="" />
        </div>
        <Head :title="aboutData.name5" />
      </div>
      <!-- 目标任务 -->
      <div class="target" id="AboutUs3">
        <template v-if="targetData">
          <Head :title="targetData.categoryName" />
          <div class="target-container">
            <div class="target-img">
              <img :src="targetData.imagePath" alt="" />
            </div>
            <div class="target-content">
              <div class="target-title">
                {{ targetData.categoryName }}
              </div>
              <div class="target-line">
                <div class="line"></div>
              </div>
              <div class="target-text" v-html="targetData.content"></div>
            </div>
          </div>
        </template>
      </div>
      <!-- 技术支撑 -->
      <div class="s-technology" id="AboutUs2">
        <Head
          :title="
            technology.categoryName ? technology.categoryName : '技术支撑'
          "
        />
        <p>{{ technology.summary }}</p>
        <div class="s-img">
          <img :src="technology.imagePath" alt="" v-if="technology.imagePath" />
          <img src="~@a/images/zcwj.png" alt="" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@c/header-title/head.vue";
import { getCustomInfo, GetSpecial } from "@/api/indexApi.js";
import { GetNews } from "@/api/indexApi.js";
export default {
  components: {
    Head,
  },

  data() {
    return {
      code: "base_info",
      codeTarget: "target_mission",
      aboutData: {},
      locationImg: "",
      targetData: {},
      //技术支撑
      technology: [],
      isIe: false
    };
  },

  created() {
    this.init();
  },

  updated() {
    $(".text div").find("p").css("fontSize", "18px");
    $(".text div").find("p").css("fontFamily", "Microsoft YaHei");
    $(".text div").find("span").css("fontSize", "18px");
    $(".text div").find("span").css("fontFamily", "Microsoft YaHei");
    $(".target-text").find("p").css("fontSize", "18px");
    $(".target-text").find("span").css("fontSize", "18px");
    $(".target-text").find("span").css("lineHeight", "36px");
    $(".target-text").find("p").css("lineHeight", "36px");
    $(".target-text").find("span").css("fontFamily", "Microsoft YaHei");
    $(".target-text").find("p").css("fontFamily", "Microsoft YaHei");
    $(".target-text").find("p").css("textAlign", "justify");
    $(".target-text").find("span").css("textAlign", "justify");
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIe = true;
      $('.footers').css({
        'overflow': 'hidden'
      })
    }
  },

  methods: {
    async init() {
      await getCustomInfo(this.code).then((res) => {
        if (res.code === 0) {
          this.aboutData = res.result;
          this.locationImg = location.origin + this.aboutData.val7;
        }
      });
      await GetSpecial(this.codeTarget).then((res) => {
        if (res.code === 0) {
          console.log(res);
          this.targetData = res.result;
        }
      });
      await GetNews({
        code: "technology",
        page: 1,
        pageSize: 1,
      }).then((res) => {
        if (res.code == 0) {
          this.technology = res.result.list[0];
          console.log(res);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.about {
  min-width: 1530px;
  .container {
    .content-sju {
      margin-top: 80px;
      display: flex;
      width: 1200px;
      margin: 80px auto 0 auto;
      justify-content: space-evenly;
      &.content-sju-ie {
        justify-content: space-around;
      }
      .composition {
        .sju {
          text-align: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          span {
            font-size: 66px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
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

    .container-content {
      margin: 81px auto 60px auto;
      display: flex;
      width: 1200px;
      justify-content: space-between;
      .container-text {
        width: 633px;
        height: 390px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .text {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333;
          line-height: 35px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 12;
          word-break: break-all;
          overflow: hidden;
        }
        .btns {
          width: 160px;
          height: 48px;
          .text-btn {
            display: block;
            cursor: pointer;
            width: 160px;
            height: 48px;
            background: #ffffff;
            border: 1px solid #2d5186;
            border-radius: 24px;
            text-align: center;
            line-height: 48px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d5186;
          }
        }
      }
      .container-img {
        width: 520px;
        height: 390px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .footers {
      position: relative;
      width: 100%;
      height: 726px;
      background: url("~@a/images/zuzhi-bg.png") no-repeat center center;
      background-size: 100% 100%;
      .footers-img {
        width: 1200px;
        min-width: 1200px;
        height: 450px;
        margin: 0 auto;
        > img {
          width: 100%;
          height: 100%;
          margin-top: 185px;
        }
      }

      .situation-title {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .target {
      width: 1200px;
      margin: 0 auto 60px auto;
      .target-container {
        margin-top: 40px;
        display: flex;
        .target-img {
          width: 840px;
          height: 500px;
          > img {
            width: 100%;
            height: 100%;
          }
        }

        .target-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 360px;
          height: 500px;
          background: #f5f7fa;
          .target-title {
            // margin-top: 80px;
            // margin-left: 39px;
            width: 271px;
            margin: 0 auto;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          .target-line {
            margin-top: 20px;
            width: 271px;
            margin: 20px auto 0 auto;
            .line {
              width: 50px;
              height: 2px;
              background: #2d5186;
            }
          }
          .target-text {
            width: 271px;
            margin: 24px auto 0 auto;
          }
        }
      }
    }

    .s-technology {
      background: #f5f7fa;
      height: 885px;
      margin: 0 auto;
      color: #333;
      p {
        width: 1200px;
        margin: 40px auto;
        font: 400 18px/36px Microsoft YaHei;
      }
      .s-img {
        width: 1200px;
        margin: 0 auto;
        > img {
          width: 1200px;
          height: 500px;
        }
      }
    }
  }
}
</style>