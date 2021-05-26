<template>
  <div class="great" id="news1">
    <breadcrumb :breadData="breadData" />
    <div class="great-list">
      <template>
        <div
          class="great-container"
          v-for="(item, index) in NewsDate"
          :key="index"
        >
          <div class="great-content">
            <div class="great-img">
              <img
                v-if="item.imagePath"
                :src="item.imagePath"
                @click="contentClick(item.id)"
                alt=""
              />
              <img
                src="~@a/images/zcwj.png"
                @click="contentClick(item.id)"
                alt=""
                v-else
              />
            </div>
            <div class="content">
              <h3 @click="contentClick(item.id)">{{ item.title }}</h3>
              <div class="date-count">
                <div class="date">{{ TimeDate(item.createTime) }}</div>
                <div class="count">浏览次数：{{ item.lookNum }}</div>
              </div>
              <div class="container">
                <p>{{ item.summary }}</p>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </template>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="great.page"
      :limit.sync="great.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import breadcrumb from "@c/common/breadcrumb.vue";
import { getnewsCenter, GetNews } from "@/api/indexApi.js";
import { compareAsc, format } from "date-fns";
export default {
  props: ["breadData"],
  components: {
    breadcrumb,
  },
  data() {
    return {
      total: 0,
      great: {
        code: "great",
        page: 1,
        pageSize: 5,
      },
      NewsDate: [],
    };
  },
  created() {
    console.log("大队------");
    this.getList();
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
      // getnewsCenter().then((res) => {
      //   console.log(res);
      //   this.NewsDate = res.result.great.list;
      //   this.total = res.result.great.totalCount;
      // });
      GetNews(this.great).then((res) => {
        if (res.code === 0) {
          this.NewsDate = res.result.list;
          this.total = res.result.totalCount;
        }
      });
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
          width: 488px;
          cursor: pointer;
          font-size: 18px;
          height: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
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
          p {
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