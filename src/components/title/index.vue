<template>
  <!-- 标题头部 -->
  <div class="v-top">
    <div class="v-title">
      <img src="~@/assets/images/logo.png" alt="" />
      <img src="~@/assets/images/tc.png" alt="" @click="handlemenu" />
    </div>
    <van-popup v-model="show" position="right">
      <form action="javascript:return true" class="img-pos">
        <van-search
          v-model="content"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
        <img src="~@/assets/images/fdj.png" alt="" class="img-s" @click="onSearch">
      </form>
      <ul class="s-ul">
        <li v-for="(item,index) in routerList" :key="index" @click="handlerClick">
          <router-link :to='item.to'>{{item.name}}</router-link>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      show: false,
      routerList:[
        {to:'/index',name:'首页'},
        {to:'/situation',name:'新区概况'},
        {to:'/about',name:'关于我们'},
        {to:'/news',name:'新闻中心'},
        {to:'/service',name:'专班服务'},
        {to:'/party',name:'党建工作'},
        {to:'/resource',name:'人力资源'},
      ]
    };
  },
  created() {},
  methods: {
    // 菜单界面
    handlemenu() {
      this.show = this.show == false ? true : false;
    },
    onSearch() {
      this.$router.push({
        path: "/seach",
        query: {
          content: this.content,
        },
      });
    },
    handlerClick(){
      this.show = false
    }
  },
  components: {},
};
</script>
<style scoped lang="less">
.v-top {
  width: 750px;
  height: 110px;
  .v-title {
    position: fixed;
    background-color: #fff;
    top: 0;
    display: flex;
    width: 750px;
    height: 110px;
    z-index: 9999;
    img:nth-child(1) {
      width: 530px;
      height: 70px;
      text-align: center;
      margin: auto 0 auto 30px;
    }
    img:nth-last-of-type(1) {
      width: 46px;
      height: 34px;
      margin: auto 0 auto 114px;
    }
  }
  .van-popup {
    padding-top: 251px;
    height: 100%;
    width: 80%;
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
  }
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0);
  }
  .van-search {
    background-color: rgba(0, 0, 0, 0);
    .van-search__content {
      background-color: #7e7e7f;
    }
    /deep/.van-icon {
      // color: #afafb0;
      display: none;
    }
  }
  .s-ul {
    li {
      padding: 0 34px;
      margin: 0 20px;
      font: 400 28px/88px "Microsoft YaHei";
      border-bottom: 1px solid #383739;

      a {
        width: 100%;
        height: 100%;
        display: inline-block;
        color: #9c9c9d;
        &.router-link-exact-active {
          color: #fff;
        }
      }
    }
  }
}
/deep/.van-field__control {
  color: #fff !important;
}
.img-pos{
  position: relative;
  .img-s{
    position: absolute;
    top: 40px;
    right: 55px;
    width: 34px;
    height: 34px;
  }
}
</style>