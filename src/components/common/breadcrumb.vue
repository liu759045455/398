<template>
  <div class="breadcrumb">
    <div class="breadcrumb-index">
      <el-breadcrumb separator="-" v-if="currentRoute.length > 1">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="breadcrumb-icon"></i>
          首页
        </el-breadcrumb-item>
        <template v-if="$route.path == '/protection/search'">
          <el-breadcrumb-item class="item3">
            搜索内容
          </el-breadcrumb-item>
        </template>
        <template v-else>
          <template v-if="breadData">
            <el-breadcrumb-item v-if="currentRoute.length >= 2">
              <router-link :to="{ path: currentRoute[1].path }">{{
                breadcrumb[0]
              }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="item3" v-if="currentRoute.length >= 3">
              {{ breadcrumb[1] }}
            </el-breadcrumb-item>
          </template>
          <template v-else>
            <el-breadcrumb-item v-for="(cate,index) in categData" :key="index">
              <router-link :to="{ path: cate.url }">{{
                cate.name
              }}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="item3">
              {{ currentRoute[3].name }}
            </el-breadcrumb-item>
          </template>
        </template>
      </el-breadcrumb>
    </div>
    <div class="breadcrumb-line"></div>
  </div>
</template>

<script>
export default {
  props: ["breadData", "categories"],
  data() {
    return {
      currentRoute: [],
      breadcrumb: [],
      categData: [],
    };
  },
  created() {
    this.currentRoute = this.$router.currentRoute.matched;
    console.log(this.currentRoute);
    this.menuListFunc(this.$route.path);
  },

  methods: {
    menuListFunc(path) {
      if (this.breadData) {
        this.breadData.forEach((item, index) => {
          item.value.forEach((it, idx) => {
            if (it.link == path) {
              this.breadcrumb[0] = it.categoryName;
              this.breadcrumb[1] = it.title;
            }
          });
        });
      } else if (this.categories) {
        this.categData = this.categories.map((item) => {
          return {
            name: item.name,
            url: item.url
          };
        });
      }
    },
  },
  watch: {
    categories() {
      if (this.categories) {
        this.menuListFunc();
      }
    },
    breadData() {
      if (this.breadData) {
        this.menuListFunc(this.$route.path);
      }
    },
    $route: {
      handler() {
        this.menuListFunc(this.$route.path);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  flex-direction: column;
  /deep/.el-breadcrumb {
    .el-breadcrumb__item {
      &.item3 {
        .el-breadcrumb__inner {
          color: #2d5186;
        }
      }
    }
  }

  .breadcrumb-line {
    margin-top: 20px;
    width: 820px;
    height: 1px;
    background: #e5e5e5;
  }

  .breadcrumb-icon {
    vertical-align: top;
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url("~@a/images/index-001.png") no-repeat;
  }
}
</style>