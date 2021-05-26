<template>
  <div class="s-style-box">
    <!-- 专班服务 -->
    <div class="s-zbfw">
      <Title title="专班职责" />

      <ul>
        <li
          v-for="(item, index) in zbList"
          :key="index"
          :class="{ actives: actives == index }"
          @click="handleZb(item.typeCode, index)"
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
        <img :src="specialist.imagePath" alt="" />
        <h2>{{ specialist.title }}</h2>
        <p v-html="specialist.content" class="t-content"></p>
        <div><button class="button" @click="handlerZbfw">了解更多</button></div>
      </div>

      <div v-else class="v-banner-img">
        <img src="~@a/images/zcwj.png" alt="" />
        <div></div>
      </div>
    </div>
    <!-- 技术支持 -->
    <div class="s-jszc">
      <Title title="技术支撑" />
      <p>
        {{ technology.summary }}
      </p>
      <div class="v-img" v-if="technology.imagePath2">
        <img :src="technology.imagePath2" alt="" />
      </div>
      <div class="v-img" v-else>
        <img src="~@/assets/images/zcwj.png" alt="" />
      </div>
    </div>
    <!-- 取得成果 -->
    <div class="s-qdcg">
      <div class="s-style-title-More">
        <Title title="取得成果" />
        <span @click="handlerCg(NewList[0].typeCode)">MORE</span>
      </div>
      <div class="v-list-center">
        <div
          class="v-cen1"
          v-for="(item, index) in NewList"
          :key="index"
          @click="techClick(item.id)"
        >
          <img :src="item.imagePath" alt="" v-if="item.imagePath" />
          <img src="~@a/images/zcwj.png" alt="" v-else />
          <div>
            <h2>{{ item.title }}</h2>
            <p>
              {{ item.summary }}
            </p>
            <span>{{ format(item.createTime, "yyyy-MM-dd") }}</span>
          </div>
        </div>
        <!-- <p>
          <button class="button">了解更多</button>
        </p> -->
      </div>
    </div>
    <!-- 信息发布 -->
    <div class="s-news">
      <div class="s-style-title-More">
        <Title title="信息发布" />
        <span @click="handlerNew(information[0].typeCode)">MORE</span>
      </div>
      <div class="s-center">
        <ul>
          <li v-for="(item, index) in information" :key="index">
            <p @click="techClick(item.id)">{{ item.title }}</p>
            <span>{{ format(item.createTime, "yyyy-MM-dd") }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "@c/header-title";
import { HomeListData, HomeSpecia, PostTechnical } from "@/api/home.js";
import { compareAsc, format } from "date-fns";
import $ from "jquery";

export default {
  data() {
    return {
      //   类名
      actives: 0,
      //   专版职责数组
      zbList: {},
      specialist: {},
      //   技术支持数组
      technology: {},
      //   取得成果数组
      NewList: [],
      //   信息发布数组
      information: [],
    };
  },
  created() {
    this.getList();
  },
  updated() {
    $(".t-content").find("p").css("fontSize", "12px");
    $(".t-content").find("span").css("fontSize", "12px");
    $(".t-content").find("span").css("lineHeight", "2");
  },
  methods: {
    handlerZbfw() {
      this.$router.push({ path: `/details?id=${this.specialist.id}` });
    },
    techClick(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    getList() {
      HomeListData().then((res) => {
        this.zbList = res.result.special_class;
        this.handleZb(res.result.special_class[0].typeCode, 0);
      });
      const data = {
        code: "technology",
        page: 1,
        pageSize: 1,
      };
      PostTechnical(data).then((res) => {
        this.technology = res.result.list[0];
      });
      const data1 = {
        code: "result",
        page: 1,
        pageSize: 3,
      };
      PostTechnical(data1).then((res) => {
        console.log(res);
        this.NewList = res.result.list;
      });

      const data2 = {
        code: "news_issue",
        page: 1,
        pageSize: 5,
      };
      PostTechnical(data2).then((res) => {
        console.log(res);
        this.information = res.result.list;
      });
    },
    // 专班服务
    handleZb(type, index) {
      this.actives = index;
      HomeSpecia(type).then((res) => {
        this.specialist = res.result;
      });
    },
    // 处理时间戳
    format(date, yyyy) {
      return format(new Date(date), yyyy);
    },
    handlerCg(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "取得成果",
          typeCode: val,
        },
      });
    },
    handlerNew(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "信息发布",
          typeCode: val,
        },
      });
    },
  },
  components: { Title },
};
</script>
<style scoped lang='less'>
.s-style-box {
  .s-zbfw {
    background-color: #f5f7fa;
    height: 1430px;
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
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
        color: #2d5186;
        margin: 40px 0 24px;
        text-align: center;
        font: 700 36px/58px "Microsoft YaHei";
      }
      p {
        font: 400 24px/44px "Microsoft YaHei";
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
        overflow: hidden;
      }
      > div {
        text-align: center;
        margin-top: 40px;
      }
    }
  }
  .s-jszc {
    width: 750px;
    height: 1266px;
    background-color: #fff;
    margin: 0 auto;
    > p {
      width: 703px;
      margin: 40px auto;
      height: 112px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-break: break-all;
      overflow: hidden;
      font: 400 24px/1.6 "Microsoft YaHei";
    }
    .v-img {
      text-align: center;
      > img {
        width: 702px;
        height: 890px;
      }
    }
  }
  .s-qdcg {
    width: 750px;
    height: 740px;
    background-color: #f5f7fa;
    .v-list-center {
      width: 702px;
      margin: 0 auto;
      .v-cen1 {
        display: flex;
        padding: 15px 0;
        img {
          width: 200px;
          height: 150px;
        }
        > div {
          margin-left: 20px;
          position: relative;
          h2 {
            width: 482px;
            font: 700 28px/1.2 "Microsoft YaHei";
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
      .v-cen1:nth-of-type(1) {
        margin-top: 26px;
      }
      > p {
        width: 702px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
  .s-news {
    // padding: 0 24px;
    // box-sizing: border-box;
    .s-center {
      width: 702px;
      height: 360px;
      margin: 0 auto;
      ul {
        margin-top: 61px;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          // width: 25%;
          p {
            width: 550px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font: 400 24px/1.2 "Microsoft YaHei";
          }
          span {
            font: 400 24px/1 "Microsoft YaHei";
            color: #888888;
          }
        }
      }
    }
  }
}
</style>