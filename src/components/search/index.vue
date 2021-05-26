<template>
  <div class="search">
    <breadcrumb />
    <template v-if="searchData.length">
      <div class="container">
        <div class="content" v-for="item in searchData" :key="item.id">
          <div class="title-data">
            <div
              class="title"
              v-html="item.title"
              @click="serachClick(item.id, item.typeCode)"
            ></div>
            <div class="data">
              <div class="data-time">
                {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
              </div>
              <!-- <div class="data-nums">浏览人数: {{ item.lookNum }}</div> -->
            </div>
          </div>
          <div class="content-des">
            {{ item.summary }}
          </div>
          <div class="content-line"></div>
        </div>
      </div>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="searchForm.page"
        :limit.sync="searchForm.pageSize"
        @pagination="getList"
      />
    </template>
    <template v-else>
      <div class="no-search">
        <img src="~@a/images/zanwu.png" alt="" />
      </div>
    </template>
  </div>
</template>

<script>
import breadcrumb from "@c/common/breadcrumb.vue";
import { getArticleList } from "@/api/indexApi.js";

export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      title: "",
      searchData: [],
      dayjs: "",
      total: 0,
      searchForm: {
        title: "",
        page: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.dayjs = require("dayjs");
    console.log(this.$route);
    this.searchForm.title = this.$route.query.searchValue;
    this.init();
  },
  watch: {
    $route: {
      handler() {
        this.searchForm.title = this.$route.query.searchValue;
        this.init();
      },
    },
  },
  methods: {
    //内容页事件
    serachClick(id, type) {
      console.log(id, type);
      if (type === "great") {
        this.$router.push({
          path: `/protection/news?id=${id}`,
        });
      } else if (type === "media") {
        this.$router.push({
          path: `/protection/news?id=${id}`,
        });
      } else if (type === "policy") {
        this.$router.push({
          path: `/protection/news?id=${id}`,
        });
      } else if (type === "party_building") {
        this.$router.push({
          path: `/protection/party?id=${id}`,
        });
      } else if (type === "special_activity") {
        this.$router.push({
          path: `/protection/party?id=${id}`,
        });
      } else if (type === "training") {
        this.$router.push({
          path: `/protection/resources?id=${id}`,
        });
      } else if (type === "result") {
        this.$router.push({
          path: `/protection/service?id=${id}`,
        });
      } else if (type === "news_issue") {
        this.$router.push({
          path: `/protection/service?id=${id}`,
        });
      }
    },

    //切换页码请求
    getList(data) {
      this.searchForm = Object.assign({}, this.searchForm, data);
      this.init();
      console.log(data);
    },
    async init() {
      console.log(this.searchForm);
      await getArticleList(this.searchForm).then((res) => {
        if (res.code === 0) {
          console.log(res);
          this.searchData = res.result.list;
          this.total = res.result.totalCount;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .no-search {
    width: 1200px;
    margin: 0 auto;
    min-height: 700px;
    position: relative;
    > img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  /deep/.breadcrumb {
    width: 1200px;
    margin: 40px auto;

    .breadcrumb-line {
      width: 1200px;
    }
  }

  /deep/.pagination-container {
    width: 1200px;
    margin: 0 auto;
    .el-pagination {
      text-align: center;
    }
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    min-height: 500px;
    .content {
      margin-top: 30px;
      &:last-of-type {
        margin-bottom: 20px;
      }
      /deep/.title-data {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        .title {
          cursor: pointer;
          width: 70%;
          color: #333;
          font-size: 18px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-all;
          overflow: hidden;
          .keyWord {
            color: #4070e5;
          }
        }
        .data {
          display: flex;
          color: #999;
          font-size: 14px;
          .data-nums {
            margin-left: 15px;
          }
        }
      }
      .content-des {
        margin-top: 20px;
        color: #666;
        line-height: 32px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
      }
      .content-line {
        width: 1200px;
        margin-top: 20px;
        height: 1px;
        background: #e5e5e5;
      }
    }
  }
}
</style>