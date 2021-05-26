<template>
  <div class="policy" id="news3">
    <breadcrumb :breadData="breadData"/>
    <div class="policy-list">
      <div
        class="policy-container"
        v-for="(item, index) in PolicyData"
        :key="index"
      >
        <div class="policy-content">
          <div class="title" @click="contentClick(item.id)">
            {{ item.title }}
          </div>
          <div class="content">
            {{ item.summary }}
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
export default {
  props: ["breadData"],
  components: {
    breadcrumb,
  },
  data() {
    return {
      total: 0,
      forms: {
        code: 'policy',
        page: 1,
        pageSize: 10,
      },
      PolicyData: [],
    };
  },
  created() {
    console.log(1);
    this.getList();
  },
  methods: {
    getList() {
      getNews(this.forms).then(res => {
        if(res.code === 0) {
          this.PolicyData = res.result.list;
          this.total = res.result.totalCount;
        }
      })
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
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
    } else {
      $(".policy-list").css({
        flex: "1",
      });
    }
  },
};
</script>

<style lang="less" scoped>
.policy {
  margin-left: 50px;
  width: 815px;
  display: flex;
  flex-direction: column;
  .pagination-container {
    text-align: center;
  }
  .policy-list {
    // flex: 1;
    min-height: 600px;
    .policy-content {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      .title {
        cursor: pointer;
        font-size: 18px;
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
      .content {
        width: 818px;
        // cursor: pointer;
        margin-top: 19px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //行数
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
</style>