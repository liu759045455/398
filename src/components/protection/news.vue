<template>
  <div class="new-index">
    <template v-if="$route.path === '/protection/news' && !$route.query.id">
      <div class="news-container">
        <template v-if="titleList.length">
          <switchHead
            :title="titleList"
            :path="pathList"
            @lineIf="lineIfFunc"
          />
        </template>

        <template v-if="lineIf">
          <div
            class="news-list"
            :class="[
              { newsTwo: newsData.length === 2 ? 'newsTwo' : '' },
              {
                newsFive: newsData.length === 5 ? 'newsFive' : '',
              },
            ]"
          >
            <div class="news-content" v-for="item in newsData" :key="item.id">
              <div class="news-img" @click="newsClick(item.id)">
                <img v-if="item.imagePath" :src="item.imagePath" alt="" />
                <img src="~@a/images/zcwj.png" alt="" v-else />
              </div>
              <div class="news-dateNum">
                <div class="date">
                  {{ dayjs(item.createTime).format("MM-DD") }}
                </div>
                <div class="numbers">浏览量：{{ item.lookNum }}</div>
              </div>
              <div class="content">
                <div class="content-title" @click="newsClick(item.id)">
                  {{ item.title }}
                </div>
                <div class="content-container">{{ item.summary }}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="!lineIf">
          <div
            class="media-list"
            :class="[
              { mediaTwo: mediaData.length === 2 ? 'mediaTwo' : '' },
              {
                mediaFive: mediaData.length === 5 ? 'newsFive' : '',
              },
            ]"
          >
            <div class="news-content" v-for="item in mediaData" :key="item.id">
              <div class="news-img">
                <img
                  v-if="item.imagePath"
                  :src="item.imagePath"
                  @click="newsClick(item.id)"
                  alt=""
                />
                <img
                  src="~@a/images/zcwj.png"
                  @click="newsClick(item.id)"
                  alt=""
                  v-else
                />
              </div>
              <div class="news-dateNum">
                <div class="date">
                  {{ dayjs(item.createTime).format("MM-DD") }}
                </div>
                <div class="numbers">浏览量：{{ item.lookNum }}</div>
              </div>
              <div class="content">
                <div class="content-title" @click="newsClick(item.id)">
                  {{ item.title }}
                </div>
                <div class="content-container">{{ item.summary }}</div>
              </div>
            </div>
          </div>
        </template>
        <!-- <div class="video-company">
          <img class="video-banner" :src="videoData.val2" alt="" />
          <Head :title="videoData.title" />
          <img
            @click="videoClick"
            class="video-stop"
            src="~@a/images/bofang.png"
            alt=""
          />
          <div class="video-content">
            <div class="video-title">{{ videoData.val3 }}</div>
            <div class="video-text">
              <p v-html="videoData.val4"></p>
            </div>
          </div>
        </div> -->
        <div class="policy-list" v-if="policyData.length">
          <Head
            :title="policyData[0].categoryName"
            whether="true"
            path="/protection/news/policy"
          />
          <div class="policy-content" v-for="item in policyData" :key="item.id">
            <div class="content-img">
              <img src="@a/images/baiselogo.png" alt="" />
              <div class="img-date">
                {{ dayjs(item.createTime).format("MM/DD") }}
              </div>
            </div>
            <div class="p-container">
              <div
                class="container-title"
                @click="newsClick(item.id, 'policy')"
              >
                {{ item.title }}
              </div>
              <div class="container-line"></div>
              <div class="container-matter">
                {{ item.summary }}
              </div>
            </div>
          </div>
        </div>
        <VideoWrapper
          v-if="startVideo"
          :videoSrc="videoData.val1"
          @close="closeClick"
        />
      </div>
    </template>
    <template
      v-else-if="
        $route.path === '/protection/news/great' ||
        $route.path === '/protection/news/media' ||
        $route.path === '/protection/news/policy'
      "
    >
      <div class="news">
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
import switchHead from "@c/header-title/switchHead.vue";
import { getnewsCenter } from "@/api/indexApi.js";
import Head from "@c/header-title/head.vue";
import VideoWrapper from "@c/common/video.vue";
import contents from "@c/content/index.vue";

export default {
  components: {
    NewsNav,
    switchHead,
    Head,
    VideoWrapper,
    contents,
  },
  data() {
    return {
      startVideo: false,
      titleList: [],
      pathList: ["/protection/news/great", "/protection/news/media"],
      lineIf: true,
      newsData: [], //新区新闻
      // videoData: {}, //视频
      mediaData: [], //媒体报道
      policyData: [], //文件
      dayjs: "",
      breadData: [], //面包削数据
    };
  },
  created() {
    this.dayjs = require("dayjs");
    this.init();
    console.log(this.$route);
  },
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $(".news-list .news-content .content .content-title").css({
        height: "18px",
      });
      $(".news-list .news-content .content .content-container").css({
        maxHeight: "50px",
      });

      $(".media-list .news-content .content .content-title").css({
        height: "18px",
      });
      $(".media-list .news-content .content .content-container").css({
        maxHeight: "50px",
      });

      $(".policy-list .policy-content .p-container .container-matter").css({
        maxHeight: "72px",
      });
    }
  },
  watch: {
    $route: {
      handler() {
        console.log(this.breadData);
      },
    },
  },
  methods: {
    newsClick(id) {
      this.$router.push({
        path: `/protection/news?id=${id}`,
      });
    },
    menuListFunc(data) {
      this.breadData = data;
      console.log(data);
    },
    // //开始视频
    // videoClick() {
    //   this.startVideo = true;
    // },
    // //关闭视频
    // closeClick(data) {
    //   this.startVideo = data;
    // },
    //判断显示"新区新闻" / "媒体报道"
    lineIfFunc(data) {
      this.lineIf = data;
    },
    async init() {
      await getnewsCenter().then((res) => {
        if (res.code === 0) {
          this.newsData = res.result.great.list;
          // this.videoData = res.result.companyVideo;
          this.mediaData = res.result.media.list;
          this.policyData = res.result.policy.list.filter((item, index) => {
            return index < 3;
          });
          // console.log(this.newsData);
          this.titleList[0] = this.newsData[0].categoryName;
          this.titleList[1] = this.mediaData[0].categoryName;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.new-index {
  .news-container {
    .news-list {
      margin: 40px auto 0 auto;
      width: 1200px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &.newsTwo {
        justify-content: flex-start;
        .news-content {
          &:nth-of-type(2) {
            margin-left: 60px;
          }
        }
      }
      &.newsFive {
        justify-content: flex-start;
        .news-content {
          &:nth-of-type(1) {
            margin-right: 60px;
          }
          &:nth-of-type(2) {
            margin-right: 60px;
          }

          &:nth-of-type(4) {
            margin-right: 60px;
          }
        }
      }
      .news-content {
        width: 360px;
        display: flex;
        flex-direction: column;
        .news-img {
          cursor: pointer;
          width: 360px;
          height: 216px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .news-dateNum {
          display: flex;
          margin-top: 13px;
          .date {
            width: 50px;
            height: 20px;
            background: #2d5186;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #f5f5f5;
            text-align: center;
            line-height: 20px;
          }
          .numbers {
            line-height: 20px;
            margin-left: 25px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
        .content {
          margin-bottom: 37px;
          .content-title {
            cursor: pointer;
            margin-top: 26px;
            font-size: 18px;
            line-height: 23px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-all;
            overflow: hidden;
            &:hover {
              color: #2d5186;
            }
          }
          .content-container {
            margin-top: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            overflow: hidden;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 25px;
          }
        }
      }
    }
    .media-list {
      margin-left: 360px;
      margin-top: 40px;
      width: 1200px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &.mediaTwo {
        justify-content: flex-start;
        .news-content {
          &:nth-of-type(2) {
            margin-left: 60px;
          }
        }
      }
      &.mediaFive {
        justify-content: flex-start;
        .news-content {
          &:nth-of-type(1) {
            margin-right: 60px;
          }
          &:nth-of-type(2) {
            margin-right: 60px;
          }

          &:nth-of-type(4) {
            margin-right: 60px;
          }
        }
      }
      .news-content {
        width: 360px;
        display: flex;
        flex-direction: column;
        .news-img {
          cursor: pointer;
          width: 360px;
          height: 216px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .news-dateNum {
          display: flex;
          margin-top: 13px;
          .date {
            width: 50px;
            height: 20px;
            background: #2d5186;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #f5f5f5;
            text-align: center;
            line-height: 20px;
          }
          .numbers {
            line-height: 20px;
            margin-left: 25px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
        .content {
          margin-bottom: 37px;
          .content-title {
            cursor: pointer;
            margin-top: 26px;
            font-size: 18px;
            line-height: 23px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-all;
            overflow: hidden;
            &:hover {
              color: #2d5186;
            }
          }
          .content-container {
            margin-top: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            overflow: hidden;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 25px;
          }
        }
      }
    }
    .policy-list {
      background: #f5f7fa;
      .policy-content {
        display: flex;
        width: 1200px;
        margin: 60px auto 0 auto;
        &:last-of-type {
          padding-bottom: 80px;
        }
        .p-container {
          margin-left: 107px;
          .container-title {
            cursor: pointer;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #333333;
            &:hover {
              color: #2d5186;
            }
          }
          .container-line {
            width: 36px;
            height: 5px;
            background: #2d5186;
            opacity: 0.5;
            margin-top: 16px;
          }
          .container-matter {
            width: 923px;
            margin-top: 20px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 24px;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            word-break: break-all;
            overflow: hidden;
          }
        }
        .content-img {
          position: relative;
          width: 100px;
          height: 100px;
          > img {
            width: 100%;
            height: 100%;
          }
          .img-date {
            position: absolute;
            top: 50%;
            transform: translateY(-18%);
            font-size: 38px;
            font-family: DengXian;
            font-weight: 400;
            color: #666666;
            left: 55px;
          }
        }
      }
    }

    .video-company {
      min-width: 1530px;
      position: relative;
      width: 100%;
      height: 760px;
      .video-banner {
        width: 100%;
        height: 100%;
      }
      .video-stop {
        position: absolute;
        cursor: pointer;
        left: 360px;
        bottom: 300px;
      }
      .video-content {
        position: absolute;
        left: 360px;
        bottom: 110px;

        .video-title {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
        .video-text {
          margin-top: 29px;
          width: 850px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 36px;
        }
      }
      /deep/.situation-title {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .head {
          .situation-head {
            font-size: 30px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .underline {
          background: #ffffff;
        }
        .line-footer {
          background: #ffffff;
          opacity: 0.4;
        }
      }
    }

    .line-footer {
      margin-top: 30px;
      margin-bottom: 10px;
      width: 1200px;
      height: 1px;
      background: #d2d2d2;
    }
  }
  .news {
    margin-top: 61px;
    margin-left: 360px;
    display: flex;
  }
}
</style>