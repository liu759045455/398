<template>
  <div class="content">
    <breadcrumb :categories="categories" />
    <div class="container">
      <div class="container-title">
        {{ contentData.title }}
      </div>
      <div class="date-nums">
        <div class="date">
          时间：{{ dayjs(contentData.createTime).format("YYYY-MM-DD") }}
        </div>
        <div class="nums">浏览次数：{{ contentData.lookNum }}</div>
      </div>
      <div class="t-content" v-html="contentData.content"></div>
      <div class="jump">
        <template v-if="contentData.prevId">
          <div class="jump-left">
            <span>上一篇：</span>
            <span @click="pathClick('prev')">{{ contentData.prevTitle }}</span>
          </div>
        </template>
        <template v-if="contentData.nextId">
          <div class="jump-rigth">
            <span>下一篇：</span>
            <span @click="pathClick('next')">{{ contentData.nextTitle }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@c/common/breadcrumb.vue";
import { getArticle } from "@/api/indexApi.js";
export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      id: 0,
      contentData: {},
      dayjs: "",
      pathSub: "",
      categories: [],
    };
  },
  updated() {
    $('.t-content').find('p').css('fontSize', '16px')
    $('.t-content').find('p').css('lineHeight', '2')
    $('.t-content').find('p').css('fontFamily', 'Microsoft YaHei')
    $('.t-content').find('span').css('fontFamily', 'Microsoft YaHei')
    $('.t-content').find('span').css('fontSize', '16px')
    $('.t-content').find('span').css('lineHeight', '2')
    $('.t-content').find('img').css('maxWidth', '1000px')
    $('.t-content').find('img').css('height', 'auto')
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $('.t-content').find('span').css("cssText",'font-size: 16px !important;')
      $('.t-content').find('p').css("cssText",'font-size: 16px !important;')
    }
  },
  created() {
    this.dayjs = require("dayjs");
    this.id = this.$route.query.id;
    $(window).scrollTop(500);
    this.init();
  },
  watch: {
    $route: {
      handler() {
        this.id = this.$route.query.id;
        $(window).scrollTop(500);
        this.init();
      },
    },
  },
  methods: {
    async init() {
      await getArticle(this.id).then((res) => {
        console.log(res);
        if (res.code === 0) {
          console.log(res);
          this.contentData = res.result;
          this.categories = this.contentData.categories;
          console.log(this.categories);
        }
      });
    },
    pathClick(type) {
      if (type === "prev") {
        this.$router.push({
          path: `${this.$route.path}?id=${this.contentData.prevId}`,
        });
      } else {
        this.$router.push({
          path: `${this.$route.path}?id=${this.contentData.nextId}`,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  /deep/.breadcrumb {
    width: 1200px;
    margin: 60px auto 0 auto;
    .breadcrumb-line {
      width: 1200px;
    }
  }
  .container {
    width: 1200px;
    margin: 40px auto 60px auto;
    .container-title {
      font-size: 26px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #333333;
      line-height: 35px;
      text-align: center;
    }
    .date-nums {
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      line-height: 58px;
      .nums {
        margin-left: 30px;
      }
    }
    /deep/.t-content {
      line-height: 2;
      width: 1000px;
      min-height: 500px;
      margin: 40px auto 0 auto;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    .jump {
      width: 1000px;
      margin: 60px auto 0 auto;
      position: relative;
      height: 58px;
      line-height: 58px;
      .jump-left {
        float: left;
        width: 450px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        > span {
          margin-left: 10px;
          &:nth-of-type(2) {
            cursor: pointer;
          }
        }
      }

      .jump-rigth {
        position: absolute;
        right: 0;
        width: 450px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: right;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        > span {
          margin-left: 10px;
          &:nth-of-type(2) {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>