<template>
  <div class="news-nav">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#409eff"
      unique-opened
      :default-active="routerIndex"
      :default-openeds="openeds"
    >
      <el-submenu
        :index="String(1 + index)"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <template slot="title">
          <span class="nav-title" v-if="item.title != '专班服务'">{{ item.title }}</span>
        </template>
        <el-menu-item-group  v-if="item.title != '专班服务'">
          <el-menu-item
            :index="cell.link"
            v-for="(cell, idx) in item.value"
            :key="idx"
          >
            <span v-if="cell.link === 'video'" @click="videoCloses">
              {{ cell.title }}
            </span>
            <router-link
              v-if="cell.link != 'video'"
              :to="{ path: cell.link }"
              >{{ cell.title }}</router-link
            >
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <Video v-if="videoStatus" :videoSrc="videoSrc" @close="videoClose" />
  </div>
</template>

<script>
import Video from "@c/common/video.vue";
import { getnewsCenter, getArticleTree } from "@/api/indexApi.js";

export default {
  components: { Video },
  data() {
    return {
      videoStatus: false,
      routerIndex: "",
      openeds: [],
      // 视频
      videoSrc: "",
      menuList: [],
      breadcrumb: [],
      docIndex: 0,
    };
  },
  async created() {
    this.routerIndex = this.$route.path.substr(1);
    this.opensFunc(this.$route.path);
    await getArticleTree().then((res) => {
      if (res.code === 0) {
        this.menuList = res.result;
        console.log(this.menuList);
        this.$emit("menuList", this.menuList);
      }
    });
    getnewsCenter().then((res) => {
      if (res.code === 0) {
        this.videoSrc = res.result.companyVideo.val1;
      }
    });
  },
  
  methods: {
    videoCloses() {
      this.videoStatus = true;
    },
    videoClose(data) {
      this.videoStatus = data;
    },

    opensFunc(route) {
      if (route.indexOf("protection/news/") != -1) {
        this.openeds = ["1"];
      } 
      else if (route.indexOf("protection/party/") != -1) {
        this.openeds = ["3"];
      } else if (route.indexOf("protection/resources/") != -1) {
        this.openeds = ["2"];
      }
    },
  },
  watch: {
    $route: {
      handler() {
        this.opensFunc(this.$route.path);
        this.routerIndex = this.$route.path.substr(1);
        console.log(this.menuList);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.news-nav {
  border: solid 1px #e6e6e6;
  width: 330px;
  height: 566px;
  overflow-y: auto;
  margin-bottom: 20px;
  min-width: 330px;
  /deep/.el-menu {
    border-right: 0;
    .el-submenu {
      &.is-opened {
        .el-menu {
          .el-menu-item-group {
            ul {
              .el-menu-item {
                .router-link-exact-active {
                  color: #409eff;
                }

                .active-route {
                  color: #409eff;
                }
              }
            }
          }
        }
        position: relative;
        .el-submenu__title {
          background: #edf0f5;
          height: 69px;
          line-height: 69px;
          &::before {
            display: block;
            position: absolute;
            left: 0;
            content: "";
            width: 6px;
            height: 69px;
            background: #2d5186;
          }
          > span.nav-title {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #2d5186;
          }
        }
        .el-menu {
          .el-menu-item-group {
            > ul {
              > li {
                &.is-active {
                  > span {
                    color: #333 !important;
                  }
                }
                a {
                  font-size: 20px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: #666666;
                }
              }
            }
          }
        }
      }
      .el-submenu__title {
        border-bottom: solid 1px #e6e6e6;
        height: 69px;
        line-height: 69px;
        > span {
          font-size: 20px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666;
        }
      }
      .el-menu {
        .el-menu-item-group {
          .el-menu-item-group__title {
            padding: 0;
          }
          > ul {
            li.el-menu-item {
              border-bottom: solid 1px #e6e6e6;
              height: 69px;
              line-height: 69px;

              > a {
                display: block;
                width: 100%;
                height: 100%;
              }
              > span {
                display: block !important;
                width: 100%;
                height: 100%;
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
              }
            }
          }
        }
      }
    }
  }
}
</style>