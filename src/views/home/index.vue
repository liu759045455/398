<template>
  <div class="s-style-box">
    <!-- banner图 -->
    <!-- <div class="v-banner"> -->
    <!-- <Banner/> -->
    <!-- </div> -->
    <!-- 新闻中心 -->
    <div class="v-box-news">
      <!-- 新闻中心图片 -->
      <div class="v-news">
        <img src="~@/assets/images/xwzx.png" alt="" />
      </div>
      <!-- 新闻中心头部 -->
      <div class="v-news-title">
        <ul>
          <li
            v-for="(item, index) in NewsData"
            :key="index"
            @click="handleCode(item.typeCode, index)"
            :class="{ active: active == index }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 内容区域 -->
      <div class="v-news-center">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item.path" alt="" @click="bannerClick(item.link)" />
            <p>
              <span> {{ item.title }}</span>
            </p>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="v-list-center">
        <div
          class="v-cen1"
          v-for="(item, index) in NewList"
          :key="index"
          @click="homeClick(item.id)"
        >
          <img :src="item.imagePath" alt="" v-if="item.imagePath" />
          <img src="@/assets/images/zcwj.png" alt="" v-else />
          <div>
            <h2>{{ item.title }}</h2>
            <p>
              {{ item.summary }}
            </p>
            <span>{{ format(item.createTime) }}</span>
          </div>
        </div>
        <p>
          <button class="button" @click="handlerMore">了解更多</button>
        </p>
      </div>
    </div>
    <!-- 宣传视频 -->
    <div class="v-video">
      <div class="v-img">
        <img src="~@/assets/images/video.png" alt="" />
      </div>
      <div class="v-video-img">
        <Video :videoSrc="videoSrc" v-if="off" @close="closeClick"></Video>
        <!-- <video autoplay="" :src="videoSrc" preload="true" controls="" v-if="off" ></video> -->
        <img :src="ImgSrc.val2" alt="" />
        <img src="~@/assets/images/bf.png" class="imgoff" @click="handleoff" />
      </div>
      <!-- <p v-html="ImgSrc.val3"></p> -->

      <p v-html="ImgSrc.val5"></p>
    </div>
    <!-- 专班服务 -->
    <div class="s-zbfw">
      <div class="img-zb">
        <img src="~@/assets/images/zbzz.png" alt="" />
      </div>
      <ul>
        <li
          v-for="(item, index) in zbList"
          :key="index"
          :class="{ actives: actives == index }"
          @click="handleZb(item.typeCode, index,item)"
        >
          <div>
            <img
              :src="actives != index ? item.imagePath : item.imageClickPath"
              alt=""
            />
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>

      <div class="v-banner-img" v-if="specialist">
        <img :src="specialist.imagePath" alt=""  v-if="specialist.imagePath"/>
        <img src="~@a/images/zcwj.png" alt=""  v-else/>
        <h2>{{ specialist.title }}</h2>
        <div v-html="specialist.content" class="t-content">
        </div>
       <div class="duo">
          <button class="button" @click="handlerZbfw()">了解更多</button>
        </div>
      </div>

      <div v-else class="v-banner-img">
        <img src="~@a/images/zcwj.png" alt="" />
        <!-- <div>
          <button class="button">了解更多</button>
        </div> -->
      </div>

    </div>
    <!-- 光影聚焦 -->
    <div class="s-gyjj">
      <div class="gyjj-img">
        <img src="@/assets/images/gyjj.png" alt="" />
      </div>
      <div class="card-banner">
        <!-- <el-carousel :interval="3000" type="card" height="200px" autoplay>
          <el-carousel-item v-for="(item, index) in gyjjBanner" :key="index">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel> -->
        <swiper
          :slides-per-view="3"
          :space-between="50"
          :options="swiperOption"
          v-if="gyjjBanner.length > 0"
        >
          <swiper-slide v-for="(item, index) in gyjjBanner" :key="index">
            <img :src="item" alt="" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { compareAsc, format } from "date-fns";
import {
  HomeListData,
  NewCodeType,
  HomeBanners,
  HomeSpecia,
} from "@/api/home.js";
import Title from "@/components/title";
import Video from "@/components/video";
import Banner from "@/components/Banner";

import "swiper/swiper-bundle.css";
import { swiper, swiperSlide, directive } from "vue-awesome-swiper";
import $ from 'jquery'

export default {
  data() {
    return {
      NewsData: {},
      NewList: [],
      videoSrc: "",
      ImgSrc: "",
      off: false,
      zbList: [],
      active: 0,
      actives: 0,
      bannerList: [],
      gyjjBanner: [],
      specialist: {},
      ListTypeCode: "",
      SpecialId:null,
      // swiper 配置
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        effect: "coverflow",
        slidesPerView: 2,
        speed: 500,
        centeredSlides: true,
        // centeredSlidesBounds: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        coverflowEffect: {
          rotate: 1,
          stretch: 10,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        loop: true,
        loopAdditionalSlides: 0,
        loopedSlides: 2,
      },
    };
  },
  created() {
    this.getList();
  },
    updated(){
     $('.t-content').find('p').css('fontSize', '12px')
    $('.t-content').find('span').css('fontSize', '12px')
    $('.t-content').find('span').css('lineHeight', '2')
  },
  methods: {
    handlerZbfw(){
      console.log(this.SpecialId);
      this.$router.push({path:`/details?id=${this.specialist.id}`,})
    },
    homeClick(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    bannerClick(path) {
      this.$router.push({
        path: path,
      });
    },
    getList() {
      HomeListData().then((res) => {
        this.NewsData = res.result.news_center;
        console.log(res.result);
        this.videoSrc = res.result.companyVideo.val1;
        this.ImgSrc = res.result.companyVideo;
        this.zbList = res.result.special_class;
        this.handleCode(res.result.news_center[0].typeCode, 0);
        this.gyjjBanner = res.result.lightShadow;
        this.handleZb(res.result.special_class[0].typeCode, 0,res.result.special_class[0]);

        let arr = [];
        for (let key in this.gyjjBanner) {
          if (key.indexOf("val") != -1) {
            arr.push(this.gyjjBanner[key]);
          }
        }
        this.gyjjBanner = arr;
      });
      HomeBanners().then((res) => {
        this.bannerList = res.result;
        console.log(res);
      });
    },
    // 处理时间戳
    format(date) {
      return format(new Date(date), "yyyy-MM-dd");
    },
    //打开视频
    handleoff() {
      this.off = true;
    },
    //关闭视频
    closeClick(data) {
      this.off = data;
    },
    // 新闻中心
    handleCode(type, index) {
      this.ListTypeCode = type;
      const data = {
        code: type,
        page: 1,
        pageSize: 2,
      };
      NewCodeType(data).then((res) => {
        console.log(res);
        this.NewList = res.result.list;
        this.active = index;
      });
    },
    // 专班服务
    handleZb(type, index,row) {
      this.actives = index;
      this.SpecialId = row.id
      console.log(row);
      HomeSpecia(type).then((res) => {
        this.specialist = res.result;
      });
    },
    // 更多 跳转 新闻中心
    handlerMore() {
      if (this.active == 0) {
        // this.$router.push({ path: `/list?title=大队新闻${this.ListTypeCode}` });
        this.$router.push({
          path: `/list`,
          query: {
            title: "大队新闻",
            typeCode: this.ListTypeCode,
          },
        });
      }
      if (this.active == 1) {
        // this.$router.push({ path: `/list?title=媒体报导typecode=${this.ListTypeCode}` });
        this.$router.push({
          path: `/list`,
          query: {
            title: "媒体报导",
            typeCode: this.ListTypeCode,
          },
        });
      }
      if (this.active == 2) {
        // this.$router.push({ path: `/list?title=政策文件${this.ListTypeCode}` });
        this.$router.push({
          path: `/list`,
          query: {
            title: "政策文件",
            typeCode: this.ListTypeCode,
          },
        });
      }
    },
  },
  components: { Title, Video, Banner, swiper, swiperSlide, directive },
};
</script>
<style scoped lang="less">
.s-style-box {
  .v-banner {
    width: 750px;
    height: 1300px;
  }
  .v-box-news {
    width: 750px;
    height: 1240px;
    background-color: #f5f7fa;
    margin: 0 auto;
    padding: 80px 0 0;
    .v-news {
      text-align: center;
      img {
        width: 600px;
        height: 74px;
      }
    }
    .v-news-title {
      width: 100%;
      margin: 41px 0;
      ul {
        padding: 0 127px;
        display: flex;
        justify-content: space-around;
        li {
          width: 152px;
          font: 400 28px/28px "Microsoft YaHei";
          text-align: center;
        }
        li:nth-of-type(1),
        li:nth-of-type(2) {
          border-right: 1px solid #e2e2e2;
        }
        .active {
          color: #486694;
        }
      }
    }
    /deep/.v-news-center {
      position: relative;
      width: 702px;
      height: 468px;
      margin: 0 auto;
      .my-swipe {
        width: 702px;
        height: 468px;
        .van-swipe__indicators {
          left: 90%;
          z-index: 1000;
        }
        img {
          width: 702px;
          height: 468px;
        }
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 702px;
        height: 60px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;

        span {
          margin-top: 15px;
          width: 600px;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font: 400 28px/1 "Microsoft YaHei";
        }
      }
    }
    .v-list-center {
      width: 702px;
      height: 500px;
      margin: 0 auto;
      position: relative;
      .v-cen1 {
        display: flex;
        padding: 30px 0;
        img {
          width: 200px;
          height: 150px;
        }
        > div {
          margin-left: 20px;
          position: relative;
          h2 {
            width: 482px;
            font: 700 28px/1.1 "Microsoft YaHei";
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 10px 0;
          }
          p {
            width: 482px;
            font: 400 24px/1.4 "Microsoft YaHei";
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            overflow: hidden;
            color: #888;
          }
          span {
            font: 400 20px/1 "Microsoft YaHei";
            color: #888;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
      .v-cen1:nth-last-of-type(1) {
        border-top: 1px solid #e1e1e1;
      }
      > p {
        width: 702px;
        position: absolute;
        bottom: 0;
        text-align: center;
      }
    }
  }
  .v-video {
    padding-top: 80px;
    background-color: #fff;
    height: 830px;
    .v-img {
      text-align: center;
      margin-bottom: 40px;
      img {
        width: 600px;
        height: 74px;
      }
    }
    .v-video-img {
      width: 702px;
      height: 395px;
      margin: 0 auto;
      position: relative;
      video {
        width: 702px;
        height: 395px;
      }
      img {
        width: 702px;
        height: 395px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .imgoff {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 158px;
        left: 311px;
      }
    }
    > p:nth-of-type(2) {
      width: 600px;
      text-align: center;
      font: 400 24px/48px "Microsoft YaHei";
      margin: 0 auto 0;
    }
    > p:nth-of-type(1) {
      width: 574px;
      text-align: center;
      font: 400 24px/48px "Microsoft YaHei";
      margin: 40px auto 0;
    }
  }
  .s-zbfw {
    background-color: #f5f7fa;
    height: 1430px;
    padding-top: 80px;
    .img-zb {
      text-align: center;
      img {
        width: 600px;
        height: 74px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-top: 40px;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > div {
          border: 1px solid #d9dadd;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          text-align: center;
          line-height: 120px;
        }
        img {
          width: 50px;
          height: 50px;
        }
        p {
          font: 400 24px/1 "Microsoft YaHei";
          margin-top: 16px;
        }
      }
      .actives {
        p {
          color: #2d5186;
        }
        > div {
          background-color: #2d5186;
        }
      }
    }
    .v-banner-img {
      width: 702px;
      height: 400px;
      margin: 40px auto 0;
      img {
        width: 702px;
        height: 400px;
      }
      h2 {
        color:#2D5186;
        margin: 40px 0 24px;
        text-align: center;
        font: 700 36px/58px "Microsoft YaHei";
      }
      div.t-content {
        font: 400 24px/44px "Microsoft YaHei";
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
        overflow: hidden;
        height: 156px;
      }
      > div.duo {
        text-align: center;
        margin-top: 40px;
      }
    }
  }
  .s-gyjj {
    height: 600px;
    .gyjj-img {
      text-align: center;
      margin: 80px 0 60px;
      img {
        width: 600px;
        height: 74px;
      }
    }
    .card-banner {
      // width: 750px;
      // margin: 0 auto;
      // text-align: center;
      margin-top: 90px;
      img {
        width: 410px;
        height: 310px;
        object-fit: cover;
        z-index: 9999;
      }
    }
  }
}
</style>