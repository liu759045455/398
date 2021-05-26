<template>
  <div class="great" id="news2">
    <breadcrumb :breadData="breadData" />
    <div class="great-list">
      <div
        class="great-container"
        v-for="(item, index) in MediaData"
        :key="index"
      >
        <div class="great-content">
          <div class="great-img">
            <img
              v-if="item.imagePath"
              :src="item.imagePath"
              alt=""
              @click="contentClick(item.id)"
            />
            <img
              src="~@a/images/zcwj.png"
              alt=""
              @click="contentClick(item.id)"
              v-else
            />
          </div>
          <div class="content">
            <h3 @click="contentClick(item.id)">{{ item.title }}</h3>
            <div class="date-count">
              <div class="date">{{ TimeDate(item.createTime) }}</div>
              <div class="count">浏览次数：{{ item.lookNum }}</div>
            </div>
            <div class="container" v-text="item.summary.trim()"></div>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="forms.page"
      :limit.sync="forms.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import breadcrumb from "@c/common/breadcrumb.vue";
import { getnewsCenter, getNews } from "@/api/indexApi.js";
import { compareAsc, format } from "date-fns";
export default {
  props: ["breadData"],
  components: {
    breadcrumb,
  },
  data() {
    return {
      total: 0,
      forms: {
        code: "media",
        page: 1,
        pageSize: 5,
      },

      MediaData: [],
    };
  },
  created() {
    this.getList();
    console.log(this.breadData);
  },
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
    } else {
      $(".great-list").css({
        flex: "1",
      });
    }
  },
  methods: {
    getList() {
      getNews(this.forms).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.MediaData = res.result.list;
          this.total = res.result.totalCount;
        }
      });
      // getnewsCenter().then((res) => {
      //   console.log(res);
      //   this.MediaData = res.result.media.list;
      //   this.total = res.result.media.totalCount;
      // });
    },
    TimeDate(time) {
      return format(new Date(time), "yyyy-MM-dd");
    },
    contentClick(id) {
      this.$router.push({
        path: `/protection/news`,
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.great {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  width: 815px;
  .pagination-container {
    text-align: center;
  }
  .great-list {
    // flex: 1;
    min-height: 600px;
    .great-content {
      display: flex;
      margin-top: 40px;
      .great-img {
        cursor: pointer;
        width: 300px;
        height: 180px;
        > img {
          width: 300px;
          height: 180px;
        }
      }
      .content {
        margin-left: 32px;
        > h3 {
          cursor: pointer;
          width: 488px;
          font-size: 18px;
          height: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #333333;
          // display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:hover {
            color: #2d5186;
          }
        }
        .date-count {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 21px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          width: 488px;
        }
        .container {
          width: 488px;
          margin-top: 30px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3; //行数
          -webkit-box-orient: vertical;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 18px;
          max-height: 54px;
        }
      }
    }
    .line {
      margin-top: 40px;
      width: 840px;
      height: 1px;
      background: #e5e5e5;
    }
  }
}
</style>