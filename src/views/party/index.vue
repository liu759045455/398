<template>
  <div class="s-style-box">
    <!-- 大队建档 -->
    <div class="s-filing">
      <div class="s-style-title-More">
        <Title title="大队党建" />
        <span @click="handlerJd(filingList[0].typeCode)">MORE</span>
      </div>
      <div class="v-img">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in filingList" :key="index">
            <img
              v-if="item.imagePath"
              :src="item.imagePath"
              alt=""
              @click="filingClick(item.id)"
            />
            <img
              src="@/assets/images/zcwj.png"
              alt=""
              @click="filingClick(item.id)"
              v-else
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="v-center">
        <h2 @click="filingClick(filing.id)">{{ filing.title }}</h2>
        <p>{{ filing.summary }}</p>
      </div>
    </div>
    <!-- 专题活动 -->
    <div class="s-activity">
        <div class="s-style-title-More">
        <Title title="专题活动" />
        <span  @click="handlerHd(filingList[0].typeCode)">MORE</span>
      </div>
      <div class="v-list-center">
        <div
          class="v-cen1"
          v-for="(item, index) in NewList"
          :key="index"
          @click="filingClick(item.id)"
        >
          <img :src="item.imagePath" alt="" v-if="item.imagePath" />
          <img src="@/assets/images/zcwj.png" alt="" v-else />
          <div>
            <h2 @click="filingClick(item.id)">{{ item.title }}</h2>
            <p>
              {{ item.summary }}
            </p>
            <span>{{ format(item.createTime, "yyyy-MM-dd") }}</span>
          </div>
        </div>
        <!-- <p>
          <button class="button">了解更多</button>
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
import Title from "@c/header-title";
import { PostTechnical } from "@/api/home.js";
import { compareAsc, format } from "date-fns";

export default {
  data() {
    return {
      filing: [],
      filingList: [],
      activity: [],
      NewList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    filingClick(id) {
      this.$router.push({
        path: "/details",
        query: {
          id,
        },
      });
    },
    getList() {
      const data = {
        code: "party_building",
        page: 1,
        pageSize: 4,
      };
      PostTechnical(data).then((res) => {
        console.log(res);
        this.filing = res.result.list[0];
        this.filingList = res.result.list;
      });
      const data1 = {
        code: "special_activity",
        page: 1,
        pageSize: 3,
      };
      PostTechnical(data1).then((res) => {
        this.NewList = res.result.list;
      });
    },
    // 处理时间戳
    format(date, yyyy) {
      return format(new Date(date), yyyy);
    },
    handlerJd(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "大队党建",
          typeCode: val,
        },
      });
    },
    handlerHd(val) {
      this.$router.push({
        path: `/list?`,
        query: {
          title: "专题活动",
          typeCode: val,
        },
      });
    },
  },
  components: { Title },
};
</script>
<style scoped lang='less'>
.s-filing {
  width: 750px;
  height: 895px;
  // margin: 0 auto;
  .v-img {
    width: 702px;
    height: 468px;
    margin: 40px auto;
    img {
      width: 702px;
      height: 468px;
    }
  }
  .v-center {
    width: 703px;
    margin: 0 auto;
    h2 {
      width: 703px;
      font: 700 28px/1.2 "Microsoft YaHei";
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 28px;
    }
    p {
      width: 703px;
      height: 115px;
      font: 400 24px/1.4 "Microsoft YaHei";
      color: #888;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-break: break-all;
      overflow: hidden;
    }
  }
}
.s-activity {
  background-color: #f5f7fa;
  padding-bottom: 50px;
  .v-list-center {
    width: 702px;
    margin: 26px auto 0;
    .v-cen1 {
      display: flex;
      padding: 15px 0;
      img {
        width: 200px;
        height: 150px;
      }
      > div {
        margin-left: 20px;
        position: relative;
        h2 {
          width: 482px;
          font: 700 28px/1.2 "Microsoft YaHei";
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 10px 0;
        }
        p {
          width: 482px;
          font: 400 24px/1.3 "Microsoft YaHei";
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
          color: #888;
        }
        span {
          font: 400 20px/1 "Microsoft YaHei";
          color: #888;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
    > p {
      width: 702px;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>