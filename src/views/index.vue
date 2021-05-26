<template>
  <div class="s-box">
    <div v-if="$route.meta.name" class="s-title">
      <Title />
    </div>
    <div v-if="$route.meta.banner" class="s-box-banner">
      <img
        class="index-Img"
        :src="ListData.val1"
        alt=""
        v-if="$route.meta.name === '首页'"
      />
      <img
        class="s-Img"
        :src="ListData.val2"
        alt=""
        v-if="$route.meta.name === '新区概况'"
      />
      <img
        class="s-Img"
        :src="ListData.val3"
        alt=""
        v-if="$route.meta.name === '关于我们'"
      />
      <img
        class="s-Img"
        :src="ListData.val4"
        alt=""
        v-if="$route.meta.name === '新闻中心'"
      />
      <img
        class="s-Img"
        :src="ListData.val5"
        alt=""
        v-if="$route.meta.name === '专班服务'"
      />
      <img
        class="s-Img"
        :src="ListData.val6"
        alt=""
        v-if="$route.meta.name === '党建工作'"
      />
      <img
        class="s-Img"
        :src="ListData.val7"
        alt=""
        v-if="$route.meta.name === '人力资源'"
      />
    </div>
    <router-view />
    <div class="v-foot" v-if="$route.meta.foot">
      <div class="v-foot-top">
        <img src="~@a/images/footlogo.png" alt=""/>
        <h2>徐圩新区环境综合治理攻坚大队</h2>
        <ul>
          <li>
            {{ IndexFootData.val1 }}
            <span></span>
          </li>
          <li>
            {{ IndexFootData.val2 }}
          </li>
          <li>
            {{ IndexFootData.val3 }}
          </li>
        </ul>
      </div>
      <div class="v-foot-bottom">
        <p>{{IndexFootData.name4}}{{ IndexFootData.val4 }}</p>
        <p>{{ IndexFootData.val5 }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "@/components/title";
import { GetBanners, HomeListData } from "@/api/home.js";
export default {
  data() {
    return {
      ListData: {},
      IndexFootData: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      GetBanners("header_h5_img").then((res) => {
        this.ListData = res.result;
        console.log(res);
        console.log(this.$route);
      });
      HomeListData().then((res) => {
        this.IndexFootData = res.result.footInfos;
      });
    },
  },
  components: { Title },
};
</script>
<style lang="less">
.s-box {
  width: 100%;
}
.s-title {
  width: 750px;
  height: 110px;
}
.s-box-banner {
  width: 750px;
  min-height: 400px;
}
.s-Img {
  width: 750px;
  height: 400px;
}
.index-Img {
  width: 750px;
  height: 1300px;
}
.v-foot {
  .v-foot-top {
    width: 750px;
    height: 330px;
    background-color: #485671;
    position: relative;
    text-align: center;
    padding-top: 79px;

    img {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 35px;
      left: 225px;
    }
    h2 {
      font: 700 36px/1 "Microsoft YaHei";
      padding: 0 0 37px;
      margin: 0 24px;
      color: #fff;
      border-bottom: 1px solid #5b677f;
    }
    ul {
      li {
        font: 400 20px/1 "Microsoft YaHei";
        color: #dcdfe4;
      }
      li:nth-of-type(1) {
        margin-top: 38px;
        span {
          display: block;
          width: 48px;
          height: 2px;
          background-color: #dcdfe4;
          margin: 16px auto;
        }
      }

      li:nth-of-type(3) {
        margin-top: 16px;
      }
    }
  }
  .v-foot-bottom {
    width: 750px;
    height: 90px;
    background-color: #35425c;
    text-align: center;
    padding-top: 24px;
    p {
      font: 400 16px/36px "Microsoft YaHei";
      color: #6c7384;
    }
  }
}
</style>
