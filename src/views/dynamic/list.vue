<template>
  <div class="s-style-box">
    <div class="title-ZW">
      <div class="s-title">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
        <h1>{{ $route.query.title }}</h1>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in Datalist"
          :key="index"
          @click="hanlderTz(item.id)"
        >
          <div class="s-box-img" v-if="item.imagePath">
            <div>
              <h2 v-html="item.title"></h2>
              <p>
                {{ item.summary }}
              </p>
              <p>{{ format(item.createTime, "yyyy-MM-dd") }}</p>
            </div>
            <img :src="item.imagePath" alt="" />
          </div>
          <div class="s-no-img" v-else>
            <h2 v-html="item.title"></h2>
            <p>
              {{ item.summary }}
            </p>
            <p>{{ format(item.createTime, "yyyy-MM-dd") }}</p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { CodeSeach } from "@/api/home.js";
import { compareAsc, format } from "date-fns";
export default {
  data() {
    return {
      Datalist: [],
      finished: false,
      loading: false,
      page: 0,
      pageSize: 6,
      totalPage: 0,
      isLoading: false,
    };
  },
  methods: {
    format(date, yyyy) {
      return format(new Date(date), yyyy);
    },
    onLoad() {
      if (this.page !== 0 && this.Pagesize >= this.totalPage) {
        return;
      }
      this.page++;
      setTimeout(() => {
        const data = {
          code: this.$route.query.typeCode,
          page: this.page,
          pageSize: this.pageSize,
        };
        CodeSeach(data).then((res) => {
          console.log(res);
          const newList = res.result.list;
          this.Datalist = this.Datalist.concat(newList);
          this.loading = false;
          let totalCount = res.result.totalCount;
          let _totalPage = Math.ceil(totalCount / this.pageSize);
          this.totalPage = _totalPage;
          if (this.page >= _totalPage) {
            this.finished = true;
          }
        });
      }, 500);
    },
    onRefresh() {
      this.$router.go(0);
      this.isLoading = false;

    },
    hanlderTz(id) {
      console.log(id);
      this.$router.push(`/details?id=${id}`);
    },
  },
  components: {},
};
</script>
<style scoped lang="less">
.s-style-box {
  height: 100%;
  .title-ZW {
    width: 100%;
    height: 100px;
    .s-title {
      position: fixed;
      top: 0;
      z-index: 1000;
      width: 100%;
      height: 100px;
      // background-color: #f1f4fa;
      display: flex;
      align-items: center;
      padding: 0 24px;
      box-sizing: border-box;
    }
    /deep/.van-icon {
      width: 100px;
      font-size: 50px;
    }
  }

  h1 {
    font: 700 32px/1 "Microsoft YaHei";
    margin: 0 0 0 180px;
  }
  .van-cell {
    padding: 0 24px;
    box-sizing: border-box;
    width: 100%;
    .s-box-img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 230px;
      border-bottom: 1px solid #919191;
      div {
        height: 150px;
        h2 {
          width: 473px;
          font: 400 28px/1 "Microsoft YaHei";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          width: 473px;
          height: 61px;
          font: 400 24px/1.4 "Microsoft YaHei";
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          color: #919191;
        }
        p:nth-of-type(1) {
          margin: 10px 0 15px 0;
        }
      }
    }
    img {
      width: 200px;
      height: 150px;
    }
    .s-no-img {
      height: 230px;
      border-bottom: 1px solid #919191;
      padding-top: 40px;
      box-sizing: border-box;
      h2 {
        width: 100%;
        font: 400 28px/1 "Microsoft YaHei";
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        width: 100%;
        height: 61px;
        font: 400 24px/1.4 "Microsoft YaHei";
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        overflow: hidden;
        color: #919191;
      }
      p:nth-of-type(1) {
        margin: 24px 0 20px 0;
      }
    }
  }
}
.van-pull-refresh {
  height: 100%;
  .van-pull-refresh__track {
    height: 100%;
    .van-list {
      min-height: 600px;
    }
  }
}
</style>