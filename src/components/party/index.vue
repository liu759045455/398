<template>
  <div class="brigade" id="party0">
    <breadcrumb :breadData="breadData" />
    <div class="brigade-list">
      <div
        class="brigade-container"
        v-for="(item, index) in brigadeData"
        :key="index"
      >
        <div class="brigade-content">
          <div class="brigade-img">
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
            <div class="container">
              <p>{{ item.summary }}</p>
            </div>
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
import { getNews } from "@/api/indexApi.js";
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
        code: "party_building",
        page: 1,
        pageSize: 5,
      },
      brigadeData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    getList() {
      this.forms = Object.assign({}, this.forms, this.data);
      this.init();
    },
    async init() {
      getNews(this.forms).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.brigadeData = res.result.list;
          this.total = res.result.totalCount;
        }
      });
    },
    contentClick(id) {
      this.$router.push({
        path: `/protection/party?id=${id}`,
      });
    },
    TimeDate(time) {
      return format(new Date(time), "yyyy-MM-dd");
    },
  },
  updated() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
    } else {
      $(".brigade-list").css({
        flex: "1",
      });
    }
  },
};
</script>

<style lang="less" scoped>
.brigade {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  width: 815px;
  .pagination-container {
    text-align: center;
  }
  .brigade-list {
    // flex: 1;
    min-height: 600px;
    .brigade-content {
      display: flex;
      margin-top: 40px;
      .brigade-img {
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