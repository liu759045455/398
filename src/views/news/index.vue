<template>
  <div class="news">
    <div class="news-container">
      <template v-if="newsData.length">
        <div class="s-style-title-More">
          <v-header-title :title="newsData[0].categoryName" />
          <span @click="handlerNews(newsData[0].typeCode)">MORE</span>
        </div>
      </template>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in newsData" :key="index">
          <img
            v-if="item.imagePath"
            :src="item.imagePath"
            alt=""
            @click="newsClick(item.id)"
          />
          <img
            src="@/assets/images/zcwj.png"
            alt=""
            @click="newsClick(item.id)"
            v-else
          />
        </van-swipe-item>
      </van-swipe>
      <template v-if="newsData.length">
        <div class="news-big">
          <div class="big-title" @click="newsClick(newsData[0].id)">
            {{ newsData[0].title }}
          </div>
          <div class="big-content">
            {{ newsData[0].summary }}
          </div>
        </div>
      </template>
    </div>

    <div class="news-media">
      <div class="s-style-title-More">
        <v-header-title title="媒体报道" />
                  <span @click="handlerMt(mediaData[0].typeCode)">MORE</span>
      </div>
      <div
        class="media-content"
        v-for="(item, index) in mediaData"
        :key="index"
        @click="newsClick(item.id)"
      >
        <div class="media-img">
          <img v-if="item.imagePath" :src="item.imagePath" alt="" />
          <img src="@/assets/images/zcwj.png" alt="" v-else />
        </div>
        <div class="media-container">
          <div class="media-title">
            {{ item.title }}
          </div>
          <div class="media-des">
            {{ item.summary }}
          </div>
          <div class="media-time">
            {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
          </div>
        </div>
      </div>
    </div>
    <div class="news-video">
      <v-header-title :title="VideoData.title" />
      <div class="video-img">
        <img :src="VideoData.val2" alt="" />
        <img
          src="~@a/images/bf.png"
          class="video-stop"
          @click="videoClick"
          alt=""
        />
      </div>
      <div class="video-content">
        <!-- <div class="video-title" v-html="VideoData.val3"></div> -->
        <div class="video-des" v-html="VideoData.val5"></div>
      </div>
    </div>
    <div class="news-policy">
      <template v-if="policyData.length">
        <div @click="handlerZc(policyData[0].typeCode)" class="s-style-title-More">
          <v-header-title :title="policyData[0].categoryName" />
          <span>MORE</span>
        </div>
      </template>
      <div
        class="policy-content"
        v-for="(item, index) in policyData"
        :key="index"
      >
        <div class="policy-container">
          <div class="policy-logo">
            <img src="~@a/images/policy-logo.png" alt="" />
            <div class="date">
              <div class="dates">
                {{ dayjs(item.createTime).format("DD") }}
              </div>
              <div class="time">
                {{ dayjs(item.createTime).format("YYYY-MM") }}
              </div>
            </div>
          </div>
          <div class="policy-des" @click="newsClick(item.id)">
            {{ item.title }}
          </div>
        </div>

        <div class="line"></div>
      </div>
    </div>
    <v-video :videoSrc="VideoData.val1" v-if="isVideo" @close="closeClick" />
  </div>
</template>
<script>
import vTitle from "@c/title/index.vue";
import vHeaderTitle from "@c/header-title/index.vue";
import { getnewsCenter, getNews } from "@/api/home.js";
import VVideo from "@c/video/index";
export default {
  data() {
    return {
      mediaData: [],
      VideoData: {},
      policyData: [], //文件
      newsData: [],
      dayjs: "",
      isVideo: false,
    };
  },
  created() {
    this.dayjs = require("dayjs");
    let great = {
      code: "great",
      page: 1,
      pageSize: 4,
    };
    getNews(great).then((res) => {
      console.log(res);
      if (res.code === 0) {
        this.newsData = res.result.list;
        console.log(this.newsData);
      }
    });
    getnewsCenter().then((res) => {
      if (res.code === 0) {
        this.mediaData = res.result.media.list;
        this.VideoData = res.result.companyVideo;
        this.policyData = res.result.policy.list.filter((item, index) => {
          return index < 3;
        });
        console.log(this.policyData);
      }
      console.log(res);
    });
  },
  methods: {
    newsClick(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    videoClick() {
      this.isVideo = true;
    },
    closeClick(data) {
      this.isVideo = data;
    },
    handlerNews(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "大队新闻",
          typeCode: val,
        },
      });
    },
    handlerMt(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "媒体报道",
          typeCode: val,
        },
      });
    },
    handlerZc(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "政策文件",
          typeCode: val,
        },
      });
    },
  },
  components: {
    vTitle,
    vHeaderTitle,
    VVideo,
  },
};
</script>
<style scoped lang="less">
.news {
  .news-container {
    width: 100%;
    height: 895px;
    .my-swipe {
      height: 468px;
      margin: 40px 24px 0 24px;
      .van-swipe-item {
        //   width: 702px !important;
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .news-big {
      display: flex;
      flex-direction: column;
      width: 703px;
      margin: 40px auto 60px auto;
      .big-title {
        font: 700 28px/1.2 'Microsoft YaHei';
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .big-content {
        margin-top: 28px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #888888;
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }
  .news-media {
    width: 100%;
    // height: 735px;
    background: #f5f7fa;
    padding-bottom: 60px;
    .media-content {
      display: flex;
      justify-content: center;
      align-content: center;
      margin-top: 30px;

      .media-img {
        width: 200px;
        height: 150px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .media-container {
        width: 480px;
        margin-left: 20px;
        .media-title {
          width: 480px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font: 400 28px/1.2 'Microsoft YaHei';
          color: #333333;
        }
        .media-des {
          margin-top: 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
          line-height: 36px;
        }
        .media-time {
          margin-top: 10px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #888888;
          text-align: right;
        }
      }
    }
  }
  .news-video {
    margin-bottom: 60px;
    .video-img {
      position: relative;
      margin: 41px auto 0 auto;
      width: 702px;
      height: 395px;
      > img {
        width: 100%;
        height: 100%;
        &.video-stop {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: #000000;
          opacity: 0.4;
          border-radius: 50%;
        }
      }
    }
    .video-content {
      width: 574px;
      margin: 40px auto 0 auto;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 48px;
      text-align: center;
    }
  }
  .news-policy {
    width: 100%;
    background: #f5f7fa;
    .policy-content {
      display: flex;
      flex-direction: column;
      width: 702px;
      margin: 40px auto 0 auto;
      .line {
        width: 702px;
        height: 1px;
        background: #e5e5e5;
        margin: 40px auto 0 auto;
      }
      &.line:last-of-type {
        display: none;
      }
      .policy-container {
        display: flex;

        .policy-logo {
          position: relative;
          width: 115px;
          height: 115px;
          > img {
            width: 115px;
            height: 115px;
          }
          .date {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .dates {
              font: 400 40px/1 "Microsoft YaHei";
              color: #333333;
              margin: 0 0 10px;
            }
            .time {
              font: 400 20px/1 "Microsoft YaHei";
              color: #333333;
              width: 95px;
            }
          }
        }
        .policy-des {
          padding-top:10px;
          width: 582px;
          margin-left: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 48px;
        }
      }
    }
  }
}
</style>