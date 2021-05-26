<template>
  <div class="footer-nav">
    <span>网站导航</span>
    <ul class="footer-nav-ul">
      <li v-for="(item,index) in ListDataFoot" :key="index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
 data(){
 return{ 
 }
 },
 created(){
 },
 props:["ListDataFoot"],
 methods:{},
 components:{}
}
</script>

<style lang="less" scoped>
.footer-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-width: 1530px;
      height: 90px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      border-bottom: 1px solid rgba(255,255,255, 0.1);
      > span {
        margin-right: 44px;
      }
      .footer-nav-ul {
        display: flex;
        > li {
          width: 360px;
          height: 50px;
          background-color: rgba(255, 255, 255, 0.08);
          margin-right: 10px;
          a {
            display: block;
            line-height: 50px;
            text-align: center;
            width: 100%;
            height: 100%;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
</style>