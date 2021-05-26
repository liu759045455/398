<template>
  <div class="resources-index">
    <template
      v-if="$route.path === '/protection/resources' && !$route.query.id"
    >
      <div class="resources-index">
        <Head title="人才招聘" id="resources0" />
        <div class="resources-content">
          <div
            class="res-content"
            v-for="(item, index) in resData"
            :key="item.id"
          >
            <div class="res-img">
              <template v-if="index == 0">
                <a
                  href="http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjIiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi56S+5Lya5oub6IGYIiwidGl0bGVFTiI6IlNvY2lhbCIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L3NvY2lhbD9icmFuZENvZGU9MSIsImluZGV4IjoyLCJlbnRyYW5jZVR5cGUiOjF9"
                  target="_blank"
                >
                  <img src="~@a/images/shehui.png" alt="" />
                </a>
              </template>
              <template v-if="index == 1">
                <a
                  href="http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjEiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi5qCh5Zut5oub6IGYIiwidGl0bGVFTiI6IkNhbXB1cyIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L2NhbXB1cz9icmFuZENvZGU9MSIsImluZGV4IjoxLCJlbnRyYW5jZVR5cGUiOjF9"
                  target="_blank"
                >
                  <img src="~@a/images/xiaoyuan.png" alt="" />
                </a>
              </template>
              <div class="res-title">
                <div class="title">{{ item.title }}</div>
                <div class="icon" @click="pathClick(index)">
                  <img src="~@a/images/jiantou.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="training">
        <img src="~@a/images/peixun.png" alt="" />
        <Head
          title="培训发展"
          whether="true"
          path="/protection/resources/training"
        />
        <div
          class="training-container"
          :class="{
            trainingTwo: trainingData.length === 2 ? 'trainingTwo' : '',
          }"
        >
          <div
            class="training-content"
            v-for="item in trainingData"
            :key="item.id"
            :class="{ 'training-ie': isIe ? 'training-ie' : '' }"
          >
            <div class="training-title" @click="trainingClick(item.id)">
              {{ item.title }}
            </div>
            <div class="training-des">
              {{ item.summary }}
            </div>
            <div class="training-date">
              <div class="date">
                {{ dayjs(item.createTime).format("MM-DD") }}
              </div>
            </div>
            <div class="training-icon" @click="trainingClick(item.id)">
              <img src="~@a/images/right.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <Head title="联系方式" id="resources2" />
        <div class="contact-content">
          <div class="contact-code">
            <img :src="contactData.val7" alt="" />
            <div class="code-title">
              {{ contactData.val1 }}
            </div>
          </div>
          <div class="container">
            <div class="c-contact" :class="{ 'c-ie': isIe ? 'c-ie' : '' }">
              <div class="img">
                <img src="~@a/images/address.png" alt="" />
              </div>
              <div class="text">
                {{ contactData.val2 }}
              </div>
            </div>
            <div class="c-contact" :class="{ 'c-ie': isIe ? 'c-ie' : '' }">
              <div class="img">
                <img src="~@a/images/phone.png" alt="" />
              </div>
              <div class="text">
                {{ contactData.val4 }}
              </div>
            </div>
            <div class="c-contact">
              <div class="img">
                <img src="~@a/images/email.png" alt="" />
              </div>
              <div class="text">
                {{ contactData.val8 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template
      v-else-if="
        $route.path === '/protection/resources/recruitment' ||
        $route.path === '/protection/resources/training' ||
        $route.path === '/protection/resources/contact'
      "
    >
      <div class="resources">
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
import { getNews, getCustomInfo } from "@/api/indexApi.js";
import contents from "@c/content/index.vue";

export default {
  components: {
    NewsNav,
    Head,
    contents,
  },
  data() {
    return {
      trainingData: [],
      contactData: {},
      breadData: [], //面包削数据
      dayjs: "",
      isIe: false,
      resData: [
        {
          id: "001",
          title: "社会招聘",
        },
        {
          id: "002",
          title: "校园招聘",
        },
      ],
    };
  },

  created() {
    this.dayjs = require("dayjs");
    this.init();
  },

  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIe = true;
      $('.resources-index .training').css({
        'overflow': 'hidden'
      })
    }
  },

  methods: {
    pathClick(index) {
      if (index == 0) {
        window.open(
          "http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjIiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi56S+5Lya5oub6IGYIiwidGl0bGVFTiI6IlNvY2lhbCIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L3NvY2lhbD9icmFuZENvZGU9MSIsImluZGV4IjoyLCJlbnRyYW5jZVR5cGUiOjF9",
          "_blank"
        );
      } else {
        window.open(
          "http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjEiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi5qCh5Zut5oub6IGYIiwidGl0bGVFTiI6IkNhbXB1cyIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L2NhbXB1cz9icmFuZENvZGU9MSIsImluZGV4IjoxLCJlbnRyYW5jZVR5cGUiOjF9",
          "_blank"
        );
      }
    },
    //面包削数据
    menuListFunc(data) {
      this.breadData = data;
    },
    async init() {
      //培训发展
      await getNews({
        code: "training",
        lastReqTime: "",
        page: 1,
        pageSize: 3,
      }).then((res) => {
        if (res.code === 0) {
          this.trainingData = res.result.list;
        }
      });
      //联系方式
      await getCustomInfo("contact_us").then((res) => {
        if (res.code === 0) {
          // console.log(res);
          this.contactData = res.result;
        }
      });
    },
    // 详情页跳转
    trainingClick(id) {
      this.$router.push({
        path: `/protection/resources?id=${id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.resources-index {
  min-width: 1530px;
  .resources {
    display: flex;
    width: 1200px;
    margin: 61px auto 0 auto;
  }
  .resources-content {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 40px auto 80px auto;
    .res-content {
      .res-img {
        position: relative;
        width: 585px;
        height: 350px;
        cursor: pointer;
        > img {
          width: 100%;
          height: 100%;
        }
        .res-title {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 110px;
          transform: translate(-50%, -50%);
          text-align: center;
          .title {
            text-align-last: justify;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
          .icon {
            margin-top: 32px;
            width: 100%;
            > img {
              width: 15px;
              height: 12px;
            }
          }
        }
      }
    }
  }
  .training {
    min-width: 1530px;
    position: relative;
    // width: 100%;
    height: 640px;
    > img {
      width: 100%;
      height: 640px;
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
    }
    /deep/.underline {
      background: #ffffff !important;
    }
    .line-footer {
      background: #ffffff;
      opacity: 0.4;
    }

    .training-container {
      display: flex;
      justify-content: space-between;
      width: 1200px;
      margin: 40px auto 60px auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 150px;
      &.trainingTwo {
        justify-content: start;
        .training-content {
          &:nth-of-type(2) {
            margin-left: 120px;
          }
        }
      }
      .training-content {
        display: flex;
        flex-direction: column;
        position: relative;
        &.training-ie {
          &:nth-of-type(1)::after {
            top: 20px;
          }
          &:nth-of-type(2)::after {
            top: 20px;
          }
        }
        &:nth-of-type(1)::after {
          content: "";
          display: block;
          position: absolute;
          right: -60px;
          width: 1px;
          height: 331px;
          background: #eeeeee;
        }
        &:nth-of-type(2)::after {
          content: "";
          right: -60px;
          display: block;
          position: absolute;
          width: 1px;
          height: 331px;
          background: #eeeeee;
        }
        // .training-images {
        //   cursor: pointer;
        //   width: 320px;
        //   height: 180px;
        //   > img {
        //     width: 100%;
        //     height: 100%;
        //   }
        // }
      }
      .training-title {
        width: 234px;
        cursor: pointer;
        line-height: 28px;
        margin-top: 24px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        overflow: hidden;
        height: 56px;
      }
      .training-des {
        margin-top: 50px;
        line-height: 20px;
        width: 320px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        word-break: break-all;
        overflow: hidden;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.8;
        height: 100px;
        letter-spacing: 1px;
      }
      .training-date {
        width: 320px;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        .date {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }

      .training-icon {
        cursor: pointer;
        margin-top: 40px;
        width: 30px;
        height: 30px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .contact {
    .contact-content {
      width: 1200px;
      margin: 40px auto 80px auto;
      display: flex;
      .container {
        display: flex;

        align-items: center;
        width: 900px;
        height: 300px;
        background: #f5f7fa;
        .c-contact {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 300px;
          height: 300px;
          &.c-ie {
            &:nth-of-type(1)::after{
              top: 50px;
            }
            &:nth-of-type(2)::after{
              top: 50px;
            }
          }
          &:nth-of-type(1)::after {
            position: absolute;
            right: 0;
            content: "";
            width: 1px;
            height: 180px;
            background: #d2d2d2;
          }
          &:nth-of-type(2)::after {
            position: absolute;
            right: 0;
            content: "";
            width: 1px;
            height: 180px;
            background: #d2d2d2;
          }
          .img {
            text-align: center;
            width: 60px;
            height: 60px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            margin-top: 20px;
            text-align: center;
            width: 182px;
            height: 36px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
          }
        }
      }
      .contact-code {
        width: 300px;
        height: 300px;
        background: #2d5186;
        position: relative;
        > img {
          width: 160px;
          height: 160px;
          position: absolute;
          border: 5px solid #fff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .code-title {
          position: absolute;
          bottom: 30px;
          font-size: 20px;
          font-family: FZZhengHeiS-DB-GB;
          font-weight: 400;
          color: #ffffff;
          margin-top: 85px;
          text-align: center;
          width: 100%;
        }
      }
    }
  }
}
</style>