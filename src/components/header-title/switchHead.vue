<template>
  <div class="head-title">
    <div class="head">
      <div class="situation-heads">
        <div
          class="head-one"
          @mouseover="headersClick('head-one')"
          :class="{ 'headers': lineIf ? '' : 'headers' }"
        >
          {{ title[0] }}
          <span class="underline dis-none"></span>
        </div>
        <div
          class="head-two"
          @mouseover="headersClick('head-two')"
          :class="{ 'headers': lineIf ? '' : 'headers' }"
        >
          {{ title[1] }}
          <span class="underline dis-block"></span>
        </div>
      </div>
      <div class="situation-more" title="更多">
        <router-link :to="{ path: lineIf ? path[0] : path[1] }"
          >MORE</router-link
        >
      </div>
    </div>
    <span class="line-footer"></span>
  </div>
</template>

<script>
export default {
  props: ["path", "title"],
  data() {
    return {
      lineIf: true,
    };
  },
  methods: {
    headersClick(type) {
      if (type === "head-one") {
        if (this.lineIf) {
          return;
        } else {
          this.lineIf = true;
          this.$emit("lineIf", true);
        }
      } else {
        if (!this.lineIf) {
          return;
        } else {
          this.lineIf = false;
          this.$emit("lineIf", false);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head-title {
  display: flex;
  flex-direction: column;
  margin-left: 360px;
  .head {
    display: flex;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
    .situation-heads {
      display: flex;
      margin-top: 60px;
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      .head-one {
        cursor: pointer;
        color: #333333;
        .underline {
          display: block;
          margin-top: 20px;
          width: 60px;
          height: 3px;
          background: #2d5186;
        }
        &.headers {
          color: #bcbcbc;
          .dis-none {
            display: none;
          }
        }
      }
      .head-two {
        cursor: pointer;
        margin-left: 40px;
        color: #bcbcbc;
        .underline {
          display: none;
          margin-top: 20px;
          width: 60px;
          height: 3px;
          background: #2d5186;
        }
        &.headers {
          color: #333333;
          .dis-block {
            display: block;
          }
        }
      }
    }

    .situation-more {
      transform: translateY(150%);
      > a {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .situation-head {
      margin-top: 60px;
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>