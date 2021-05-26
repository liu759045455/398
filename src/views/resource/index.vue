<template>
  <div class="resource">
    <vHeaderTitle title="人才招聘" />
    <div class="resource-link">
      <div class="social-campus" @click="linkClick('social')">
        <img src="~@a/images/shezhao.png" alt="" />
        <div class="social-content">
          <div class="social-text">社会招聘</div>
          <div class="social-icon">
            <img src="~@a/images/right-jiantou.png" alt="" />
          </div>
        </div>
      </div>
      <div class="social-campus" @click="linkClick('campus')">
        <img src="~@a/images/xiaozhao.png" alt="" />
        <div class="social-content">
          <div class="social-text">校园招聘</div>
          <div class="social-icon">
            <img src="~@a/images/right-jiantou.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="resource-training">
      <div @click="handlerFz(trainingData[0].typeCode)">
        <vHeaderTitle title="培训发展" />
      </div>
      <div class="training">
        <img src="~@a/images/peixun.png" alt="" />
        <div class="training-container">
          <div
            class="training-content"
            v-for="(item, index) in trainingData"
            :key="index"
          >
            <div class="training-des">
              <div class="des-title" @click="detailsClick(item.id)">
                {{ item.title }}
              </div>
              <div class="des-time">
                {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="resource-contact">
      <vHeaderTitle title="联系方式" />
      <div class="contact-bgc">
        <div class="contact-img">
          <img :src="contactData.val9" alt="" />
        </div>
        <div class="contact-title">
          {{ contactData.val1 }}
        </div>
        <div class="contact-address contact-text">
          地址：{{ contactData.val2 }}
        </div>
        <div class="contact-phone contact-text">
          电话：{{ contactData.val4 }}
        </div>
        <div class="contact-email contact-text">
          邮箱：{{ contactData.val8 }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vHeaderTitle from "@c/header-title/index.vue";
import { getNews, getCustomInfo } from "@/api/home.js";
export default {
  data() {
    return {
      dayjs: "",
      trainingData: [],
      contactData: {},
    };
  },
  created() {
    this.dayjs = require("dayjs");
    this.init();
  },
  methods: {
    async init() {
      //培训发展
      await getNews({
        code: "training",
        lastReqTime: "",
        page: 1,
        pageSize: 4,
      }).then((res) => {
        if (res.code === 0) {
          console.log(res, "-------------");
          this.trainingData = res.result.list;
        }
      });
      //联系方式
      await getCustomInfo("contact_us").then((res) => {
        if (res.code === 0) {
          console.log(res, "****************");
          this.contactData = res.result;
        }
      });
    },
    detailsClick(id) {
      console.log(id);
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    //跳转外链
    linkClick(type) {
      if (type === "social") {
        window.location.href =
          "http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjIiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi56S+5Lya5oub6IGYIiwidGl0bGVFTiI6IlNvY2lhbCIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L3NvY2lhbD9icmFuZENvZGU9MSIsImluZGV4IjoyLCJlbnRyYW5jZVR5cGUiOjF9";
      } else {
        window.location.href =
          "http://www.hotjob.cn/wt/YJSH/web/index#/position/eyJpZCI6IjAiLCJyZWNydWl0VHlwZSI6IjEiLCJzdWJtZW51cyI6W10sInRpdGxlIjoi5qCh5Zut5oub6IGYIiwidGl0bGVFTiI6IkNhbXB1cyIsInR5cGUiOiJCIiwidXJsIjoiL3d0L1lKU0gvd2ViL2luZGV4L2NhbXB1cz9icmFuZENvZGU9MSIsImluZGV4IjoxLCJlbnRyYW5jZVR5cGUiOjF9";
      }
    },
    handlerFz(val) {
      this.$router.push({
        path: "/list",
        query: {
          title: "培训发展",
          typeCode: val,
        },
      });
    },
  },
  components: {
    vHeaderTitle,
  },
};
</script>
<style scoped lang="less">
.resource {
  background-color: #fff;
  .resource-link {
    display: flex;
    justify-content: space-around;
    margin: 40px 0 60px 0;
    .social-campus {
      width: 345px;
      height: 458px;
      position: relative;
      > img {
        width: 100%;
        height: 100%;
      }
      .social-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .social-text {
          font-size: 32px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
        .social-icon {
          width: 30px;
          height: 24px;
          margin: 40px auto 0 auto;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .resource-training {
    width: 100%;
    background: #f5f7fa;
    .training {
      width: 702px;
      height: 395px;
      margin: 40px auto 0 auto;
      padding-bottom: 80px;
      position: relative;
      > img {
        width: 100%;
        height: 100%;
      }
      .training-container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .training-content {
          display: flex;
          flex-direction: column;
          margin-top: 35px;
          .line {
            width: 660px;
            height: 1px;
            background: #ffffff;
            opacity: 0.1;
            margin-top: 30px;
          }
          .training-des {
            box-sizing: border-box;
            padding: 0 20px 0;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            width: 702px;
            .des-title {
              width: 457px;
              font: 400 28px/1.2 "Microsoft YaHei";
              color: #ffffff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .des-time {
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .resource-contact {
    .contact-bgc {
      background-color: #f5f7fa;
      width: 702px;
      margin: 0 auto;
    }
    .contact-img {
      width: 702px;
      height: 255px;
      margin: 40px auto 0 auto;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .contact-title {
      width: 702px;
      margin: 40px auto 40px 20px;
      font-size: 28px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
    .contact-text {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      margin: 0 0 20px 20px;
    }
    .contact-address {
      width: 702px;
    }
    .contact-phone {
      width: 702px;
      // margin: 20px 0;
    }
    .contact-email {
      width: 702px;
      padding-bottom: 40px;
    }
  }
}
</style>