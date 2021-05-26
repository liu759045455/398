<template>
  <div class="party-index">
    <template v-if="$route.path === '/protection/party' && !$route.query.id">
      <div class="party-index">
        <Head
          v-if="activityData.length"
          :title="buildingData[0].categoryName"
          whether="true"
          path="/protection/party/index"
        />
        <Head
          v-else
          title="大队党建"
          whether="true"
          path="/protection/party/index"
        />
        <div
          class="party-container"
          :class="{ partyTwo: buildingData.length === 2 ? 'partyTwo' : '' }"
        >
          <template v-if="buildingData.length">
            <div
              class="party-content"
              v-for="item in buildingData"
              :key="item.id"
              :class="{ 'party-ie': isIe ? 'party-ie' : '' }"
            >
              <div class="party-images">
                <img
                  v-if="item.imagePath"
                  :src="item.imagePath"
                  alt=""
                  @click="partyClick(item.id, 'party')"
                />
                <img
                  src="~@a/images/zcwj.png"
                  alt=""
                  @click="partyClick(item.id, 'party')"
                  v-else
                />
              </div>
              <div class="party-title" @click="partyClick(item.id, 'party')">
                {{ item.title }}
              </div>
              <div class="party-des">
                {{ item.summary }}
              </div>
              <div class="party-date">
                <div class="date">
                  {{ dayjs(item.createTime).format("MM-DD") }}
                </div>
                <div class="party-icon" @click="partyClick(item.id, 'party')">
                  <img src="~@a/images/go-look.png" alt="" />
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="party-activities">
          <Head
            v-if="activityData.length"
            :title="activityData[0].categoryName"
            whether="true"
            path="/protection/party/activities"
          />
          <Head
            v-else
            title="专题活动"
            whether="true"
            path="/protection/party/index"
          />
          <div class="activities-container" v-if="activityData.length">
            <div
              class="activities-content"
              v-for="item in activityData"
              :key="item.id"
            >
              <div
                class="activities-images"
                @click="partyClick(item.id, 'activities')"
              >
                <img v-if="item.imagePath" :src="item.imagePath" alt="" />
                <img src="~@a/images/zcwj.png" alt="" v-else />
              </div>

              <div class="a-content">
                <div
                  class="activities-title"
                  @click="partyClick(item.id, 'activities')"
                >
                  {{ item.title }}
                </div>
                <div class="activities-des">
                  {{ item.summary }}
                </div>
                <div class="activities-date">
                  {{ dayjs(item.createTime).format("MM-DD") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template
      v-else-if="
        $route.path === '/protection/party/index' ||
        $route.path === '/protection/party/activities'
      "
    >
      <div class="party">
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
import { getNews } from "@/api/indexApi.js";
import contents from "@c/content/index.vue";

export default {
  components: {
    NewsNav,
    Head,
    contents,
  },
  data() {
    return {
      buildingData: [],
      dayjs: "",
      activityData: [],
      breadData: [], //面包削数据
      isIe: false,
    };
  },

  created() {
    this.dayjs = require("dayjs");
    this.init();
  },
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIe = true;
      $(".a-content .activities-title").css({
        height: "18px",
      });
    }
  },

  methods: {
    //详情页跳转
    partyClick(id, type) {
      if (type === "party") {
        this.$router.push({
          path: `/protection/party?id=${id}`,
        });
      } else {
        this.$router.push({
          path: `/protection/party?id=${id}`,
        });
      }
    },
    //nav列表--面包削数据
    menuListFunc(data) {
      this.breadData = data;
      console.log(data);
    },
    async init() {
      // 大队建党列表
      await getNews({
        code: "party_building",
        lastReqTime: "",
        page: 1,
        pageSize: 3,
      }).then((res) => {
        if (res.code === 0) {
          this.buildingData = res.result.list;
          console.log(res);
        }
      });
      // 专题活动
      await getNews({
        code: "special_activity",
        lastReqTime: "",
        page: 1,
        pageSize: 6,
      }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.activityData = res.result.list;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.party-index {
  min-height: 1110px;
  min-width: 1530px;
  .party {
    width: 1200px;
    margin: 61px auto 0 auto;
    display: flex;
  }
  .activities-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1200px;
    margin: 40px auto 30px auto;
    .activities-content {
      display: flex;
      // width: 580px;
      .activities-images {
        cursor: pointer;
        margin-bottom: 30px;
        width: 160px;
        height: 100px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .a-content {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .activities-title {
          cursor: pointer;
          width: 406px;
          font-size: 18px;
          line-height: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
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
        .activities-date {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-top: 10px;
        }

        .activities-des {
          width: 406px;
          line-height: 24px;
          font-size: 14px;
          margin-top: 10px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          height: 48px;
        }
      }
    }
  }
  .party-container {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 40px auto 60px auto;
    &.partyTwo {
      justify-content: flex-start;
      .party-content {
        &:nth-of-type(2) {
          margin-left: 120px;
        }
      }
    }
    .party-content {
      display: flex;
      flex-direction: column;
      position: relative;
      &.party-ie {
        &:nth-of-type(1)::after {
          top: 10px;
        }
        &:nth-of-type(2)::after {
          top: 10px;
        }
      }
      &:nth-of-type(1)::after {
        content: "";
        display: block;
        position: absolute;
        right: -60px;
        width: 1px;
        height: 407px;
        background: #eeeeee;
      }
      &:nth-of-type(2)::after {
        content: "";
        right: -60px;
        display: block;
        position: absolute;
        width: 1px;
        height: 407px;
        background: #eeeeee;
      }
      .party-images {
        cursor: pointer;
        width: 320px;
        height: 180px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .party-title {
      cursor: pointer;
      line-height: 24px;
      margin-top: 24px;
      width: 320px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #343232;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      overflow: hidden;
      max-height: 48px;
      &:hover {
        color: #2d5186;
      }
    }
    .party-des {
      margin-top: 24px;
      line-height: 20px;
      width: 320px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      word-break: break-all;
      overflow: hidden;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      height: 80px;
    }
    .party-date {
      width: 320px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .date {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #666666;
      }
      .party-icon {
        cursor: pointer;
        width: 30px;
        height: 30px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>