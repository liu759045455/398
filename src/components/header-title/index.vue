<template>
  <div class="header-title">
    <div class="h-title" v-if="pathSrc">
      <router-link :to="{ path: '#' }">{{ title }}</router-link>
    </div>
    <div class="h-title" v-else>{{ title }}</div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: ["title", "pathSrc"],
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
};
</script>
<style scoped lang="less">
.header-title {
  width: 100%;
  padding-top: 60px;
  .h-title {
    // text-align: center;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: 700;
    color: #333333;
    margin-left: 24px;
  }
  .line {
    margin: 30px 0 0 24px;
    width: 60px;
    height: 3px;
    background: #2d5186;
  }
}
</style>