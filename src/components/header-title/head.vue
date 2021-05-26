<template>
  <div class="situation-title">
    <div class="head">
      <div class="situation-head">{{ title }}</div>
      <div class="situation-more" title="更多" v-if="whether">
        <router-link :to="{ path: path }">MORE</router-link>
      </div>
    </div>
    <span class="underline"></span>
    <span class="line-footer"></span>
  </div>
</template>

<script>
export default {
  props: ["title", "path", "whether"],
};
</script>

<style lang="less" scoped>
.situation-title {
  display: flex;
  flex-direction: column;
  width: 1200px;
    margin: 0 auto; 
  .head {
    display: flex;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
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

  .underline {
    margin-top: 20px;
    width: 60px;
    height: 3px;
    background: #2d5186;
  }

  .line-footer {
    margin-top: 30px;
    margin-bottom: 10px;
    width: 1200px;
    height: 1px;
    background: #d2d2d2;
  }
}
</style>