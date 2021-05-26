<template>
  <div class="s-style-box">
    <div class="s-style-title">
      <!-- 新闻中心头部 -->
      <div class="s-style-news">
        <img src="~@a/images/xwzx.png" alt="" />
        <div class="s-style-list">
          <template v-if="ListData.length">
            <span
              :class="{ actives: actives === index }"
              v-for="(item, index) in ListData"
              :key="index"
              @click="handlerClick(item.typeCode, index)"
              >{{ item.name }}</span
            >
          </template>
          <div class="s-span-end" @click="handlerRouter">MORE</div>
        </div>
      </div>
      <!--  新闻中心列表 -->
      <div class="s-style-body">
        <ul>
          <template v-if="ListDataList.length">
            <li v-for="(item, index) in ListDataList" :key="index">
              <img
                v-if="item.imagePath"
                :src="item.imagePath"
                alt=""
                @click="pathClick(item.id, item.typeCode)"
              />
              <img
                src="~@a/images/zcwj.png"
                alt=""
                @click="pathClick(item.id, item.typeCode)"
                v-else
              />
              <div>
                <p>
                  <span @click="pathClick(item.id, item.typeCode)">{{
                    item.title
                  }}</span>
                  <span>{{ TimeData(item.createTime) }}</span>
                </p>
                <p @click="pathClick(item.id, item.typeCode)">
                  {{ item.summary }}
                </p>
              </div>
            </li>
          </template>
        </ul>
        <div>
          <div class="block">
            <el-carousel trigger="click" height="150px">
              <template v-if="Banners.length">
                <el-carousel-item v-for="(item, index) in Banners" :key="index">
                  <span>{{ item.title }}</span>
                  <router-link :to="item.link">
                    <img :src="item.path" alt="" />
                  </router-link>
                </el-carousel-item>
              </template>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频 -->
    <div class="s-style-video">
      <div class="s-style-img">
        <img v-if="videoImg" :src="videoImg" alt="" />
        <template v-if="videoConcent">
          <Head :title="videoConcent.title" />
        </template>
        <img src="~@a/images/bofang.png" alt="" @click="videoCloses" />
        <template v-if="videoConcent">
          <p>{{ videoConcent.val3 }}</p>
          <p v-html="videoConcent.val4"></p>
        </template>
      </div>
      <Video v-if="videoStatus" :videoSrc="videoSrc" @close="videoClose" />
    </div>
    <!-- 专班服务 -->
    <!-- <div class="s-style-zb">
      <img src="~@a/images/zbzz-zz.png" alt="" />
      <ul>
        <template v-if="Service.length">
          <li
            v-for="(item, index) in Service"
            :key="index"
            @click="handlerSpecial(item.typeCode, item, index)"
            :class="{ active: active == index }"
          >
            <div>
              <img
                :src="active == index ? item.imageClickPath : item.imagePath"
                alt=""
              />
            </div>
            <span>{{ item.name }}</span>
            <div></div>
          </li>
        </template>
      </ul>
    </div>
    <div class="s-style-images" v-if="ServiceContent">
      <div>
        <img :src="location.origin + ServiceContent.imagePath" alt="" />
        <div class="s-div">
          <h1>{{ ServiceContent.title }}</h1>
          <span></span> -->
          <!-- <p>{{ ServiceContent.summary }}</p> -->
          <!-- <div class="s-text" v-html="ServiceContent.content"></div>
          <div class="btns" @click="serviceClick(ServiceContent.id)">
            了解更多
          </div>
        </div>
      </div>
    </div>
    <div v-else class="s-style-null">
      <p>
        <img src="~@a/images/zanwu.png" alt="" />
      </p>
    </div> -->
    <!-- 光影聚焦 -->
    <div class="s-style-gyjj">
      <div class="s-title">
        <img src="~@a/images/gyjj.png" alt="" />
      </div>
      <swiper :options="swiperOption" class="s-box" ref="swipers">
        <template v-if="temp">
          <swiper-slide v-for="(item, index) in temp" :key="index">
            <img :src="item" alt="" />
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>
<script>
import {
  IndexList,
  PostBanners,
  GetNews,
  GetSpecial,
  getCustomInfo,
} from "@/api/indexApi.js";
import Head from "@c/header-title/head.vue";
import { format } from "date-fns";
import Video from "@c/common/video.vue";
import { directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import Swiper2, { Navigation, Pagination, Autoplay } from "swiper";

Swiper2.use([Navigation, Pagination, Autoplay]);
export default {
  components: {
    Video,
    Head,
  },
  mounted() {
    var that = this;
  },
  computed: {
    swiper() {
      return this.$refs.swipers.$swiper;
    },
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        pagination: {
          el: ".swiper-pagination",
        },
        speed: 2000,
        autoplay: {
          stopOnLastSlide: true,
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        loop: true,
      },
      // location: location,
      // 页面数据
      ListData: {},
      // 新闻轮播
      Banners: {},
      // 新闻列表
      ListDataList: {},
      // 专版服务
      // Service: {},
      // ServiceContent: {},
      // 光影聚焦
      Shadow: {},
      ShadowContent: {},
      temp: {},
      // 视频
      videoSrc: "",
      videoStatus: false,
      videoImg: "",
      videoConcent: "",
      active: 0,
      actives: 0,
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
      fontWeight: "400",
      lineHeight: "32px",
    });
    $(".s-text").find("span").css({
      color: "#666",
      fontFamily: "Microsoft YaHei",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "32px",
    });
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $(".s-text").css({
        height: '165px'
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
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    pathClick(id, type) {
      console.log(type);
      // if (type === "great") {
      this.$router.push({
        path: `/protection/news?id=${id}`,
      });
      // } else if (type === "media") {
      //   this.$router.push({
      //     path: `/protection/news?id=${id}`,
      //   });
      // } else if (type === "policy") {
      //   this.$router.push({
      //     path: `/protection/news?id=${id}`,
      //   });
      // }
    },

    // 获取列表
    getList() {
      // this.ListDataList = {};
      // let res = await IndexList();
      // let res_1 = await PostBanners();
      // let res_2 = await getCustomInfo("light_shadow");
      // Promise.all[res,res_1,res_2]
      // this.ListData = res.result.news_center;
      // this.Service = res.result.special_class;
      // this.Shadow = res.result.lightShadow;
      // this.Banners = res_1.result;
      // this.handlerClick(this.ListData[0].typeCode, 0);
      // this.handlerSpecial(this.Service[0].typeCode, this.Service[0], 0);
      // this.ShadowContent = res_2.result;
      // let temp = {};
      // for (let i in this.ShadowContent) {
      //   if (i.indexOf("val") !== -1) {
      //     temp[i] = this.ShadowContent[i];
      //   }
      // }
      // this.temp = temp;
      // console.log(this.ShadowContent);
      // this.videoSrc = res.result.companyVideo.val1;
      // this.videoImg = res.result.companyVideo.val2;
      // this.videoConcent = res.result.companyVideo;

      this.ListDataList = {};
      Promise.all([
        IndexList(),
        PostBanners(),
        getCustomInfo("light_shadow"),
      ]).then((res) => {
        // console.log(res);
        this.ListData = res[0].result.news_center;
        console.log(this.ListData);
        // this.Service = res[0].result.special_class;
        // console.log(this.Service);
        this.Shadow = res[0].result.lightShadow;
        this.Banners = res[1].result;
        // console.log(this.Banners);
        this.handlerClick(this.ListData[0].typeCode, 0);
        // this.handlerSpecial(this.Service[0].typeCode, this.Service[0], 0);
        this.ShadowContent = res[2].result;
        let temp = {};
        for (let i in this.ShadowContent) {
          if (i.indexOf("val") !== -1) {
            temp[i] = this.ShadowContent[i];
          }
        }
        this.temp = temp;
        this.videoSrc = res[0].result.companyVideo.val1;
        this.videoImg = res[0].result.companyVideo.val2;
        this.videoConcent = res[0].result.companyVideo;
        // console.log(this.videoConcent);
      });
    },
    videoClose(data) {
      this.videoStatus = data;
    },
    videoCloses() {
      this.videoStatus = true;
    },
    // 新闻中心切换事件
    handlerClick(type, index) {
      this.actives = index;
      const data = {
        code: type,
        page: 1,
        pageSize: 3,
      };
      GetNews(data).then((res) => {
        this.ListDataList = res.result.list;
        // console.log(this.ListDataList);
      });
    },
    // 新闻中心时间翻译
    TimeData(time) {
      return format(new Date(time), "MM-dd");
    },
    // // 专项服务
    // handlerSpecial(type, item, index) {
    //   this.active = index;
    //   GetSpecial(type).then((res) => {
    //     console.log(res);
    //     this.ServiceContent = res.result;
    //   });
    // },
    handlerRouter() {
      switch (this.actives) {
        case 0:
          this.$router.push({ path: "/protection/news/great" });
          break;
        case 1:
          this.$router.push({ path: "/protection/news/media" });
          break;
        case 2:
          this.$router.push({ path: "/protection/news/policy" });
          break;
      }
    },
  },
};
</script>
<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.s-style-box {
  .s-style-title {
    padding: 0 360px;
    .s-style-news {
      min-width: 1180px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 80px;
      img {
        width: 472px;
        height: 74px;
      }
      .s-style-list {
        margin: 41px 0;
        display: flex;
        > span {
          text-align: center;
          width: 231px;
          color: #999999;
          font: 400 24px/1 Microsoft YaHei;
          cursor: pointer;
          &:hover {
            color: #56729c !important;
          }
        }
        .actives {
          text-align: center;
          width: 231px;
          color: #56729c;
          font: 400 24px/1 Microsoft YaHei;
          cursor: pointer;
        }
        span:nth-of-type(2) {
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
        }
        .s-span-end {
          cursor: pointer;
          position: absolute;
          right: 0;
          font: 400 16px/24px Microsoft YaHei;
          color: #999999;
        }
      }
    }
    .s-style-body {
      height: 400px;
      display: flex;
      ul {
        width: 582px;
        li {
          margin-bottom: 20px;
          width: 582px;
          list-style: none;
          display: flex;
          img {
            width: 160px;
            height: 120px;
            margin-right: 16px;
            cursor: pointer;
          }
          > div {
            width: 405px;

            p:nth-of-type(1) {
              height: 20px;
              font: 400 20px/20px Microsoft YaHei;
              color: #333333;
              margin: 10px 0 20px 0;
              display: flex;
              span:nth-of-type(1) {
                cursor: pointer;
                width: 354px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 700;
                &:hover {
                  color: #2d5186;
                }
              }
              span:nth-of-type(2) {
                width: 51px;
                color: #848484;
                font: 400 18px/1 Microsoft YaHei;
              }
            }
            p:nth-of-type(2) {
              cursor: pointer;
              height: 44px;
              color: #848484;
              font: 400 16px/1.4 Microsoft YaHei;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              word-break: break-all;
              overflow: hidden;
            }
          }
        }
      }
      > div {
        margin-left: 60px;
        .block {
          width: 540px;
          height: 400px;
        }
        .el-carousel {
          cursor: pointer;
          width: 540px;
          height: 400px;
          /deep/.el-carousel__container {
            width: 540px;
            height: 400px !important;
            span {
              position: absolute;
              bottom: 0;
              width: 540px;
              line-height: 48px;
              background: #000000;
              // opacity: 0.3;
              background: rgba(0, 0, 0, 0.3);
              color: #fff;
              font-size: 20px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding: 0 20px 5px;
            }
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .s-style-video {
    height: 760px;
    margin: 80px 0 0 0;
    .s-style-img {
      min-width: 1530px;
      position: relative;
      /deep/.situation-title {
        position: absolute;
        left: 360px;
        top: 0;
        .underline {
          background: #ffffff !important;
        }
        .line-footer {
          background: #e1e1e1;
          opacity: 0.4;
        }
        .head {
          .situation-head {
            color: #ffffff;
          }
        }
      }
      img:nth-of-type(1) {
        height: 760px;
        width: 100%;
      }
      img:nth-of-type(2) {
        cursor: pointer;
        position: absolute;
        left: 360px;
        bottom: 330px;
      }
      p:nth-of-type(1) {
        font: 400 30px/1 Microsoft YaHei;
        color: #fff;
        position: absolute;
        left: 360px;
        bottom: 164px;
      }
      p:nth-of-type(2) {
        font: 400 18px/26px Microsoft YaHei;
        height: 80px;
        width: 850px;
        color: #fff;
        position: absolute;
        left: 360px;
        bottom: 55px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }
  .s-style-zb {
    text-align: center;
    // padding: 0 360px;
    margin: 0 auto;
    width: 1200px;
    > img {
      width: 543px;
      height: 74px;
      margin-bottom: 40px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      li {
        cursor: pointer;
        // margin-right: 16px;
        width: 130px;

        > div:nth-of-type(1) {
          width: 88px;
          height: 88px;
          border: 2px solid #ccc;
          border-radius: 50%;
          line-height: 115px;
          margin: 0 auto;
          img {
            width: 40px;
            height: 40px;
          }
        }
        > div:nth-of-type(2) {
          height: 40px;
        }
        > span {
          display: inline-block;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #8c8c8c;
          margin-top: 20px;
        }
      }
      .active {
        cursor: pointer;
        // margin-right: 16px;
        width: 130px;

        > div:nth-of-type(1) {
          width: 88px;
          height: 88px;
          border: 2px solid #ccc;
          border-radius: 50%;
          line-height: 115px;
          margin: 0 auto;
          background-color: #2d5186;
          img {
            width: 40px;
            height: 40px;
          }
        }
        > div:nth-of-type(2) {
          height: 40px;
        }
        > span {
          display: inline-block;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #2d5186;
          margin-top: 20px;
        }
      }
    }
  }
  .s-style-images {
    // padding: 0 360px;
    margin: 0 auto;
    width: 1200px;
    > div {
      width: 100%;
      height: 420px;
      display: flex;
      img {
        width: 50%;
        height: 420px;
      }

      .s-div {
        width: 50%;
        height: 420px;
        background: #f5f7fa;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 40px 40px 0;
        position: relative;
        .btns {
          position: absolute;
          bottom: 50px;
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

        span {
          width: 50px;
          height: 2px;
          background: #335689;
          margin: 19px 0 30px 0;
        }
        h1 {
          font: 400 28px/1.2 Microsoft YaHei;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        div {
          font: 400 14px/1.5 Microsoft YaHei;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          word-break: break-all;
          overflow: hidden;
          // line-height:  20px;
          // height: 192px;
          // /deep/ul {
          //   list-style: inside !important;
          // }
        }
      }
    }
  }
  .s-style-null {
    padding: 0 360px;
    height: 420px;
    text-align: center;
    font: 700 30px/1 Microsoft YaHei;
    p {
      position: relative;
      background: #f5f7fa;
      height: 420px;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .s-style-gyjj {
    width: 100%;
    min-width: 1530px;
    height: 604px;
    // margin-top: 80px;
    background: #f4f6f9;
    .s-title {
      text-align: center;
      padding: 80px 0 60px 0;
      img {
        width: 583px;
        height: 74px;
      }
    }
    .s-box {
      text-align: center;
      width: 1200px;
      margin: 0 auto;
      .swiper-wrapper {
        .swiper-slide {
          width: 390px !important;
          margin-right: 10px;
        }
      }
      img {
        width: 390px;
        height: 290px;
      }
    }
  }
}
</style>