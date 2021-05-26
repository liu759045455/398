<template>
  <div class="service-index" v-loading.fullscreen.lock="fullscreenLoading">
    <template v-if="$route.path === '/protection/service' && !$route.query.id">
      <!-- 专版职责头部 -->
      <div class="s-style-service" id="service0">
        <Head title="专班职责" />
        <div class="v-dev">
          <ul>
            <li
              v-for="(item, index) in Service"
              :key="index"
              :class="{ active: active === index }"
              @click="handlerService(item.typeCode, index)"
            >
              <div>
                <img
                  :src="active === index ? item.imageClickPath : item.imagePath"
                  alt=""
                />
              </div>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 专班职责内容 -->
      <div class="s-service-concnet">
        <div class="s-style-box" v-if="ServiceImageList">
          <img :src="ServiceImageList.imagePath" alt="" />
          <div>
            <h1>{{ ServiceImageList.title }}</h1>
            <span></span>
            <ul>
              <li class="s-text" v-html="ServiceImageList.content"></li>
              <div class="btns" @click="serviceClick(ServiceImageList.id)">
                了解更多
              </div>
            </ul>
          </div>
        </div>
        <div v-else class="v-style-div">
          <img src="~@a/images/zanwu.png" alt="" />
        </div>
      </div>
      <!-- 技术支撑 -->
      <div class="s-technology" id="service1">
        <Head
          :title="
            technology.categoryName ? technology.categoryName : '技术支撑'
          "
        />
        <p>{{ technology.summary }}</p>
        <img :src="technology.imagePath" alt="" v-if="technology.imagePath" />
        <img src="~@a/images/zcwj.png" alt="" v-else />
      </div>
      <!-- 取得成果 -->
      <div class="s-achievement">
        <div>
          <div class="top-style-more">
            <Head title="取得成果" />
            <span @click="Achiebement">MORE</span>
          </div>
          <ul>
            <li v-for="(item, index) in achievement" :key="index">
              <img
                v-if="item.imagePath"
                :src="item.imagePath"
                alt=""
                @click="serviceClick(item.id, 'achievement')"
              />
              <img
                src="~@a/images/zcwj.png"
                alt=""
                @click="serviceClick(item.id, 'achievement')"
                v-else
              />
              <div>
                <p>
                  <span @click="serviceClick(item.id, 'achievement')">
                    {{ item.title }}</span
                  >
                  <span>{{ TimeDate(item.createTime) }}</span>
                </p>
                <p>{{ item.summary }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 信息发布 -->
      <div class="s-message">
        <div class="top-style-more">
          <Head title="信息发布" />
          <span @click="handlerMessage">MORE</span>
        </div>
        <ul>
          <li v-for="(item, index) in message" :key="index">
            <p @click="serviceClick(item.id, 'message')">
              {{ item.title }}
            </p>
            <span>{{ TimeDate(item.createTime) }}</span>
          </li>
        </ul>
      </div>
    </template>
    <template
      v-else-if="
        $route.path === '/protection/service/bearfruit' ||
        $route.path === '/protection/service/disclosure'
      "
    >
      <div class="service">
        <news-nav @menuList="menuListFunc" />
        <router-view :breadData="breadData"></router-view>
      </div>
    </template>
    <template v-else>
      <contents />
    </template>
  </div>
</template>

<script>
import NewsNav from "@c/newsNav/index.vue";
import Head from "@c/header-title/head.vue";
import { PostMostService, GetSpecial, GetNews } from "@/api/indexApi.js";
import { compareAsc, format } from "date-fns";
import contents from "@c/content/index.vue";

export default {
  components: {
    NewsNav,
    Head,
    contents,
  },
  data() {
    return {
      fullscreenLoading: false,
      //专班职责
      Service: [],
      active: 0,
      ServiceImageList: {},
      //技术支撑
      technology: [],
      // 取得成果
      achievement: [],
      // 信息发布
      message: [],
      messageTitle: "",
      achievementTitle: "",
      breadData: [], //面包削数据
    };
  },
  created() {
    this.getList();
  },
  updated() {
    $(".s-text").find("p").css({
      color: "#666",
      fontFamily: "Microsoft YaHei",
      fontSize: "16px",
      lineHeight: "32px",
      fontWeight: "400",
    });
    $(".s-text").find("span").css({
      color: "#666",
      fontFamily: "Microsoft YaHei",
      fontSize: "16px",
      lineHeight: "32px",
      fontWeight: "400",
    });
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $(".s-text").css({
        height: "165px",
      });
      $('.s-achievement > div ul li > div p:nth-of-type(2)').css({
        'maxHeight': '81px'
      })
    }
  },
  methods: {
    serviceClick(id) {
      console.log(id);
      this.$router.push({
        path: "/protection/service",
        query: {
          id,
        },
      });
    },
    //详情页跳转
    serviceClick(id, type) {
      if (type === "achievement") {
        this.$router.push({
          path: `/protection/service?id=${id}`,
        });
      } else {
        this.$router.push({
          path: `/protection/service?id=${id}`,
        });
      }
    },
    //面包削数据
    menuListFunc(data) {
      this.breadData = data;
      // console.log(data);
    },

    async getList() {
      // // 专版服务
      // let res1 = await PostMostService("special_service");
      // this.Service = res1.result;
      // this.handlerService(this.Service[0].typeCode, 0);
      // //技术支撑
      // const data1 = {
      //   code: "technology",
      //   page: 1,
      //   pageSize: 1,
      // };
      // let res2 = await GetNews(data1);
      // this.technology = res2.result.list[0];
      // // 取得成果
      // const data2 = {
      //   code: "result",
      //   page: 1,
      //   pageSize: 3,
      // };
      // let res3 = await GetNews(data2);
      // this.achievement = res3.result.list;
      // // 信息发布
      // const data3 = {
      //   code: "news_issue",
      //   page: 1,
      //   pageSize: 8,
      // };
      // let res4 = await GetNews(data3);
      // this.message = res4.result.list;

      //技术支撑
      const data1 = {
        code: "technology",
        page: 1,
        pageSize: 1,
      };
      // 取得成果
      const data2 = {
        code: "result",
        page: 1,
        pageSize: 3,
      };
      // 信息发布
      const data3 = {
        code: "news_issue",
        page: 1,
        pageSize: 8,
      };
      Promise.all([
        PostMostService("special_service"),
        GetNews(data1),
        GetNews(data2),
        GetNews(data3),
      ])
        .then((res) => {
          this.Service = res[0].result;
          this.handlerService(this.Service[0].typeCode, 0);
          this.technology = res[1].result.list[0];
          this.achievement = res[2].result.list;
          this.message = res[3].result.list;
          // this.messageTitle = this.message ? this.message[0].categoryName : '';
          // this.achievementTitle = this.achievement[0].categoryName;
        })
        .catch((error) => {
          console.log(error);
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.$message.error("加载失败");
            this.$router.push({ path: "/protection/index" });
            this.fullscreenLoading = false;
          }, 8000);
        });
    },
    handlerService(type, index) {
      this.active = index;
      GetSpecial(type).then((res) => {
        this.ServiceImageList = res.result;
        // console.log(this.ServiceImageList, "---------");
      });
    },
    TimeDate(time) {
      return format(new Date(time), "MM-dd");
    },
    Achiebement() {
      this.$router.push({ path: "/protection/service/bearfruit" });
    },
    handlerMessage() {
      this.$router.push({ path: "/protection/service/disclosure" });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .situation-title {
  .line-footer {
    width: 100% !important;
  }
}
.service-index {
  .service {
    display: flex;
    width: 1200px;
    margin: 61px auto 0 auto;
  }
  .s-style-service {
    > .v-dev {
      margin: 0 auto;
      width: 1200px;
      ul {
        margin: 40px 0;
        display: flex;
        justify-content: space-between;
        li {
          cursor: pointer;
          width: 100%;
          text-align: center;
          > div {
            width: 88px;
            height: 88px;
            border: 1px solid #999;
            border-radius: 50%;
            text-align: center;
            line-height: 120px;
            margin: 0 auto;
          }
          p {
            margin-top: 20px;
            font: 400 18px/1 Microsoft YaHei;
            color: #8c8c8c;
          }
        }
        .active {
          text-align: center;
          > div {
            width: 88px;
            height: 88px;
            border: 1px solid #999;
            border-radius: 50%;
            text-align: center;
            line-height: 120px;
            margin: 0 auto;
            background-color: #2d5186;
          }
          p {
            margin-top: 20px;
            font: 400 18px/1 Microsoft YaHei;
            color: #666;
            color: #2d5186;
          }
        }
      }
    }
  }
  .s-service-concnet {
    height: 570px;
    background-color: #f5f7fa;
    .s-style-box {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      padding: 60px 0;
      position: relative;
      img {
        width: 600px;
        height: 450px;
      }
      > div {
        width: 600px;
        height: 450px;
        padding: 0 0 0 40px;
        display: flex;
        flex-direction: column;
        h1 {
          margin-top: 20px;
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
        span {
          width: 50px;
          height: 2px;
          background-color: #2e5186;
          margin: 19px 0 31px;
        }
        > ul {
          li {
            line-height: 25px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            word-break: break-all;
            overflow: hidden;
          }
          .btns {
            position: absolute;
            bottom: 60px;
            // margin: 10px 0;
            width: 100px;
            height: 36px;
            background: #2d5186;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
    .v-style-div {
      text-align: center;
      font: 700 30px/2 Microsoft YaHei;
      position: relative;
      height: 100%;
      > img {
        position: absolute;
        width: 550px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .s-technology {
    height: 838px;
    // padding: 0 360px;
    margin: 0 auto;
    width: 1200px;
    color: #333;
    p {
      width: 1200px;
      margin: 40px 0;
      font: 400 18px/36px Microsoft YaHei;
    }
    img {
      width: 1200px;
      height: 500px;
    }
  }
  .s-achievement {
    height: 825px;
    // padding: 0 360px;
    background-color: #f5f7fa;
    > div {
      margin: 0 auto;
      width: 1200px;
      ul {
        width: 1200px;
        li {
          display: flex;
          margin-top: 20px;
          img {
            width: 240px;
            height: 180px;
            cursor: pointer;
          }
          > div {
            margin-left: 30px;
            p:nth-of-type(1) {
              position: relative;
              span:nth-of-type(1) {
                cursor: pointer;
                display: inline-block;
                width: 700px;
                font: 700 20px/1 Microsoft YaHei;
                margin: 15px 0 23px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:hover {
                  color: #2d5186;
                }
              }
              span:nth-of-type(2) {
                position: absolute;
                top: 15px;
                font: 400 19px/1 Microsoft YaHei;
                color: #848484;
                right: 0;
              }
            }
            p:nth-of-type(2) {
              width: 929px;
              color: #848484;
              font: 400 18px/1.5 Microsoft YaHei;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              word-break: break-all;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .s-message {
    height: 492px;
    width: 1200px;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      width: 1200px;
      li {
        // display: flex;
        width: 48%;
        position: relative;
        border-bottom: 1px solid #d2d2d2;
        p {
          margin: 24px 0;
          width: 494px;
          font: 400 20px/1.3 Microsoft YaHei;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
          text-overflow: ellipsis;
          &:hover {
            color: #2d5186;
          }
        }
        span {
          position: absolute;
          right: 0;
          top: 32px;
        }
      }
      li:nth-child(odd) {
        margin-right: 47px;
      }
      li:nth-last-of-type(-n + 2) {
        border-bottom: 0;
      }
    }
  }
  .top-style-more {
    position: relative;
    width: 1200px;
    span {
      position: absolute;
      right: 0;
      top: 70px;
      cursor: pointer;
    }
  }
}
</style>