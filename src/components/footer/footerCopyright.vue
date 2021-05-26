<template>
  <div class="footer-copyright">
    {{ListData.name4}}：{{ListData.val4}}
    <span>|</span>
    {{ListData.val5}}
  </div>
</template>


<script>
export default {
 data(){
 return{
  }
 },
 props:["ListData"],
 created(){
 },
 methods:{

 },
 components:{}
}
</script>

<style lang="less" scoped>
.footer-copyright {
  background-color: #35425c;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1530px;
  height: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  span {
    margin: 0 10px;
  }
}
</style>