<template>
  <div class="protection">
    <div class="protection-banner" v-if="$route.path == '/protection/index'">
      <!-- <img src="~@a/images/slogan.png" alt="" /> -->
      <h1 v-html="bannerTopImage.val1"></h1>
    </div>
    <div class="protection-head">
      <div class="protection-title">
        <div class="protection-logo">
          <img src="~@a/images/logo1.png" alt="" />
        </div>
        <div class="protection-link">
          <router-link
            v-for="(item, index) in routerList"
            :to="item.path"
            :key="index"
            @click="handleClick(index)"
            >{{ item.name }}
            <div :class="['hover-icon', 'hover']">
              <img src="@a/images/hover-logo.png" alt="" />
            </div>
          </router-link>
        </div>
        <div class="protection-so" @click="openSearch">
          <img src="~@a/images/soso.png" alt="" />
        </div>
      </div>
      <div
        :class="[
          'title-search',
          { 'animated fadeInDown': showSearch },
          {
            'search-index':
              $route.path == '/protection/index' ? 'search-index' : '',
          },
        ]"
        v-show="showSearch"
      >
        <el-input
          class="search-input"
          v-model="searchValue"
          placeholder="请输入您要搜索的关键词"
          :maxlength="50"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <span class="close" @click="closeSearch">取消</span>
        <span class="search-icon" @click="handleSearch"></span>
      </div>
    </div>
    <div
      class="banner-img"
      :class="{
        'img-height': $route.path == '/protection/index' ? 'img-height' : '',
      }"
    >
      <img
        v-if="$route.path == '/protection/index'"
        :src="bannerData.val1"
        alt=""
      />
      <img
        v-else-if="$route.path.indexOf('/protection/situation') != -1"
        :src="bannerData.val2"
        alt=""
      />
      <img
        v-else-if="$route.path.indexOf('/protection/about') != -1"
        :src="bannerData.val3"
        alt=""
      />
      <img
        v-else-if="$route.path.indexOf('/protection/news') != -1"
        :src="bannerData.val4"
        alt=""
      />
      <!-- <img
        v-else-if="$route.path.indexOf('/protection/service') != -1"
        :src="bannerData.val5"
        alt=""
      /> -->
      <img
        v-else-if="$route.path.indexOf('/protection/party') != -1"
        :src="bannerData.val6"
        alt=""
      />
      <img v-else :src="bannerData.val7" alt="" />
    </div>

    <router-view></router-view>
    <div class="protection-footer">
      <!-- 底部网站导航 -->
      <footer-nav :ListDataFoot="ListDataFoot" />
      <!-- 底部详情信息 -->
      <footer-details />
      <!-- 版权 -->
      <footer-copyright :ListData="ListData" />
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import footerNav from "@c/footer/footerNav.vue";
import footerCopyright from "@c/footer/footerCopyright.vue";
import footerDetails from "@c/footer/footerDetails.vue";
import { getCustomInfo, IndexList } from "@/api/indexApi.js";

export default {
  components: {
    footerNav,
    footerCopyright,
    footerDetails,
  },
  data() {
    return {
      routerList: [],
      showSearch: false, //搜索框
      searchValue: "",
      isFixed: false,
      path: 1,
      bannerData: {},
      bannerTopImage: {},
      ListData: {},
      ListDataFoot: {},
    };
  },
  mounted() {
    $(window).scroll(() => {
      //为了保证兼容性，这里取两个值，哪个有值取哪一个
      //scrollTop就是触发滚轮事件时滚轮的高度
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.path == "/protection/index") {
        if (scrollTop < 80) {
          $(".protection-banner").css("position", "relative");
          $(".protection-title").css("position", "relative");
          $(".protection-head").css("position", "absolute");
          $(".protection-head").css("top", "80px");
          $(".title-search").css("position", "absolute");
          $(".title-search").css("top", "90px");
        } else if (scrollTop >= 80) {
          $(".protection-title").css("position", "fixed");
          $(".protection-title").css("top", 0);
          $(".title-search").css("position", "fixed");
          if (scrollTop >= 764) {
            $(".protection-title").css("opacity", 1);
          } else {
            $(".protection-title").css("opacity", 0.8);
          }
        }
      } else {
        $(".protection-title").css("position", "fixed");
        if (scrollTop >= 764) {
          $(".protection-title").css("opacity", 1);
        } else {
          $(".protection-title").css("opacity", 0.8);
        }
      }
    });
  },
  created() {
    let routers = router.options.routes;
    let routerList = [];
    let list = routers.filter((item) => {
      return item.path === "/protection";
    });
    list.forEach((item) => {
      routerList = item.children;
    });
    this.routerList = routerList.filter((item) => {
      return item.alias === "nav";
    });
    this.path = this.$route.path;
    getCustomInfo("header_img").then((res) => {
      if (res.code === 0) {
        this.bannerData = res.result;
      }
    });
    IndexList().then((res) => {
      this.bannerTopImage = res.result.indexBase;
      this.ListData = res.result.footInfos;
      this.ListDataFoot = res.result.webLinks;
    });
  },
  watch: {
    $route: {
      handler() {
        this.path = this.$route.path;
        this.showSearch = false;
      },
    },
  },
  methods: {
    /** 搜索 */
    handleSearch() {
      console.log(1);
      this.$router.push({
        path: "/protection/search",
        query: {
          searchValue: this.searchValue,
        },
      });
      this.showSearch = false;
      this.searchValue = null;
    },

    /** 清空搜索框 */
    handleClear() {
      this.searchValue = null;
    },
    /** 打开搜索框 */
    openSearch() {
      if (this.showSearch) {
        this.showSearch = false;
        return;
      }
      this.showSearch = true;
    },
    /** 关闭搜索框 */
    closeSearch() {
      this.showSearch = false;
      this.searchValue = null;
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1700px) {
  .protection-banner {
    > h1 {
      font: 700 55px/80px "FZCYJ" !important;
    }
  }
}
@media screen and (max-width: 1600px) {
  .protection-link {
    a {
      text-align: center;
      font: 400 18px/1 Microsoft YaHei;
      width: 85px;
    }
  }
  .protection-so {
    img {
      min-width: 10px !important;
      min-height: 10px !important;
      height: 15px !important;
      width: 15px !important;
    }
  }
  .protection-banner {
    > h1 {
      font: 700 50px/80px "FZCYJ" !important;
    }
  }
}
@media screen and (max-width: 1350px) {
  .protection-link {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .protection-logo {
    display: none;
    img {
      width: 245px;
      height: 35px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .protection-title {
    .protection-link {
      width: 100%;
      // margin: 0 auto !important;
      a {
        font: 400 14px/1 Microsoft YaHei;
        width: 65px;
        margin-right: 30px !important;
      }
      .router-link-exact-active {
        font: 700 16px/1 Microsoft YaHei !important;
      }
    }
  }
}

.protection {
  // position: relative;
  width: 100%;
  // width: 1903px;
  .protection-banner {
    // min-width: 1530px;
    width: 100%;
    height: 80px;
    > h1 {
      min-width: 1530px;
      background-color: #2d5186;
      color: #fff;
      text-align: center;
      font: 400 60px/80px "FZCYJ";
      min-width: 1530px;
      width: 100%;
      height: 100%;
      line-height: 80px;
      padding-top: 2px;
    }
  }
  .protection-head {
    width: 100%;
    // min-width: 1530px;
    .protection-title {
      // min-width: 1530px;
      position: fixed;
      overflow-x: hidden;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90px;
      background: #ffffff;
      opacity: 0.8;
      z-index: 10;
      .protection-logo {
        margin-left: 40px;
        width: 560px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .protection-link {
        font-size: 21px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        display: flex;
        color: #333333;
        > a {
          position: relative;
          margin-right: 50px;

          .hover-icon {
            width: 100%;
            position: absolute;
            bottom: -20px;
            display: flex;
            justify-content: center;
            align-items: center;
            > img {
              display: none;
              width: 44px;
              height: 12px;
            }
          }
          &.router-link-exact-active {
            font-size: 21px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #2d5186;
            .hover {
              > img {
                display: inline-block;
              }
            }
          }
          &.active-router {
            font-size: 21px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #2d5186;
            .hover {
              > img {
                display: inline-block;
              }
            }
          }
        }
      }

      .protection-so {
        margin-right: 60px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  /deep/.s-style-box {
    .s-style-body {
      > div {
        .block {
          .el-carousel {
            .el-carousel__indicators--horizontal {
              bottom: 10px;
              right: 20px;
              left: 50%;
              width: 100%;
              display: flex;
              justify-content: flex-end;
              margin-left: -20px;
              .el-carousel__indicator {
                .el-carousel__button {
                  width: 8px;
                  height: 8px;
                  background: #ffffff;
                  // opacity: 0.6;
                  border-radius: 50%;
                }
                &.is-active {
                  .el-carousel__button {
                    width: 28px;
                    height: 8px;
                    background: #ffffff;
                    border-radius: 4px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .banner-img {
    position: initial !important;
    height: 580px;
    width: 100%;
    &.img-height {
      height: 690px;
    }
    img {
      width: 100%;
      height: 100%;
      min-width: 1530px;
    }
  }

  .protection-footer {
    min-width: 1530px;
    background: #485671;
  }
  .title-search {
    z-index: 10;
    height: 90px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation-duration: 0.5s;
    position: fixed;
    left: 0;
    top: 90px;
    width: 100%;
    min-width: 900px;
    &.search-index {
      top: 170px;
    }
    .search-input {
      text-align: center;
      width: 940px;
      /deep/.el-input__inner {
        height: 56px;
        text-indent: 30px;
        font-size: 16px;
        max-width: 940px;
        line-height: 56px;
        color: #fff;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.6);
      }
    }
    /deep/.el-input__suffix {
      &:nth-of-type(1) {
        width: 21px;
        height: 21px;
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translateY(-50%);
      }
      .el-input__suffix-inner {
        display: inline-block !important;
        width: 21px;
        height: 21px;
        i {
          &:nth-of-type(1) {
            display: inline-block !important;
            width: 21px;
            height: 21px;
            cursor: pointer;
            background: url("~@a/images/yj_icon_gbnr.png") center center
              no-repeat;
          }
        }
      }
    }

    .search-icon {
      position: absolute;
      z-index: 10;
      width: 16px;
      height: 16px;
      left: 70%;
      cursor: pointer;
      background: url("~@a/images/soso-2.png") center center no-repeat;
    }
    .close {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      margin-left: 24px;
      cursor: pointer;
    }
  }
}
</style>