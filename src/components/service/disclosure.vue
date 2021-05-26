<template>
  <div class="disclosure" id="service3">
    <breadcrumb :breadData="breadData" />
    <div class="disclosure-list">
      <div
        class="disclosure-container"
        v-for="(item, index) in disclosureData"
        :key="index"
      >
        <div class="disclosure-content">
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
import { GetNews } from "@/api/indexApi.js";
export default {
  props: ["breadData"],
  components: {
    breadcrumb,
  },
  data() {
    return {
      total: 0,
      forms: {
        code: "news_issue",
        page: 1,
        pageSize: 5,
      },
      disclosureData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    contentClick(id) {
      this.$router.push({
        path: `/protection/service?id=${id}`,
      });
    },
    getList() {
      this.forms = Object.assign({}, this.forms, this.data);
      this.init();
    },
    async init() {
      GetNews(this.forms).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.disclosureData = res.result.list;
          this.total = res.result.totalCount;
        }
      });
    },
  },
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
    } else {
      $(".disclosure-list").css({
        flex: "1",
      });
    }
  },
};
</script>

<style lang="less" scoped>
.disclosure {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  width: 815px;
  .pagination-container {
    text-align: center;
  }
  .disclosure-list {
    // flex: 1;
    min-height: 600px;
    .disclosure-content {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      .title {
        cursor: pointer;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        &:hover {
          color: #2d5186;
        }
      }
      .content {
        width: 818px;
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