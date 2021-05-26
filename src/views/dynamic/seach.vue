<template>
  <div class="s-styles-box">
      <div class="s-title">
      <van-icon name="arrow-left" @click="handlerTz" />
      <form action="javascript:return true" class="img-pos">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
        <img src="~@/assets/images/fdj1.png" alt="" class="img-s">
      </form>
      <p class="top-title" @click="onSearch">搜索</p>
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
        @click="handlerClick(item.id)"
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
import { PostSeach } from "@/api/home.js";
import { compareAsc, format } from "date-fns";

export default {
  data() {
    return {
      value: "",
      Datalist: [],
      finished: false,
      loading: false,
      page: 0,
      pageSize: 6,
      totalPage: 0,
      isLoading:false
    };
  },
  created() {
    if (this.$route.query.content) {
      this.value = this.$route.query.content
    }
    if(sessionStorage.getItem('history') == 'null'){
      sessionStorage.setItem('history','index')      
    }
  },
  methods: {
    handlerTz() {
      this.$router.replace({ name: sessionStorage.getItem('history') });
      // this.$router.go(-1);
    },
    format(date, yyyy) {
      return format(new Date(date), yyyy);
    },
    onSearch() {
      console.log(this.$route);
      const data = {
        title: this.value,
        page: 1,
        pageSize: 7,
      };
      PostSeach(data).then((res) => {
        this.Datalist = res.result.list;
        this.$router.push({
          path: `/seach?content=${this.value}`,
        });
      });
    },
    onRefresh(){
      this.$router.go(0)
      this.isLoading = false
    },
    onLoad() {
      if (this.page !== 0 && this.Pagesize >= this.totalPage) {
        return;
      }
      this.page++;
      setTimeout(() => {
        const data = {
          title: this.value,
          page: this.page,
          pageSize: this.pageSize,
        };
        PostSeach(data).then((res) => {
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
    handlerClick(id) {
      this.$router.push(`details?id=${id}`);
    },
  },
  components: {},
};
</script>
<style scoped lang='less'>
.s-styles-box {
  // width: 702px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  /deep/.keyWord {
    color: #4070e5 !important;
  }
  // margin: 0 auto;
  .s-title {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .top-title {
      position: absolute;
      top: 28px;
      right: 9px;
      font-size: 28px;
      width: 60px;
      // height: 60px;
      line-height: 60px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
    /deep/.van-search {
      width: 600px;
      height: 70px;
      padding: 0 20px;
      .van-search__content {
        height: 100%;
      }
      .van-cell {
        height: 100%;
        .van-field__left-icon {
          height: 100%;
          .van-icon {
            display: none;
            font-size: 40px;
            line-height: 70px;
          }
        }
        .van-cell__value {
          .van-field__body {
            height: 100%;
          }
        }
      }
    }
    .van-icon {
      width: 40px;
      font-size: 40px;
      color: #666666;
    }
  }
  .van-cell {
    padding: 0 0 0 35px;
    box-sizing: border-box;
    width: 100%;
    .s-box-img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 230px;
      // border-bottom: 1px solid #919191;
      div {
        height: 160px;
        h2 {
          width: 430px;
          font: 400 28px/1.2 "Microsoft YaHei";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          width: 430px;
          height: 70px;
          font: 400 24px/1.3 "Microsoft YaHei";
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
      height: 160px;
    }
    .s-no-img {
      height: 230px;
      // border-bottom: 1px solid #919191;
      padding-top: 40px;
      box-sizing: border-box;
      h2 {
        width: 100%;
        font: 400 28px/1.2 "Microsoft YaHei";
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
.img-pos{
  position: relative;
  .img-s{
    position: absolute;
    top: 18px;
    left: 45px;
    width: 34px;
    height: 34px;
  }
}

</style>