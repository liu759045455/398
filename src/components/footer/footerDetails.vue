<template>
  <div class="footer-details">
    <div class="details-contact">
      <div class="contact-code">
        <div class="contact-qrcode">
          <img :src="ListDataFoot.val6" alt="" />
        </div>

        <div class="contact-phone">
          <p>{{ ListDataFoot.name1 }}</p>
          <p>{{ ListDataFoot.val1 }}</p>
        </div>
      </div>

      <div class="contact-infor">
        <div class="contact-address">
          {{ ListDataFoot.name3 }}：{{ ListDataFoot.val3 }}
        </div>
        <div class="contact-email">
          {{ ListDataFoot.name2 }}：{{ ListDataFoot.val2 }}
        </div>
      </div>
    </div>
    <div class="contact-link">
      <div class="details-about">
        <h3>关于我们</h3>
        <ul>
          <li
            v-for="(item, index) in AboutUs"
            :key="index"
            @click="custormAnchor('AboutUs' + index)"
          >
            <router-link :to="item.link" :title="item.title">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="details-news">
        <h3>新闻中心</h3>
        <ul>
          <li
            v-for="(item, index) in pressCenter"
            :key="index"
            @click="custormAnchor('news' + index, 'scrollTop100')"
          >
            <router-link :to="item.link" v-if="item.link != 'video'" :title="item.title">{{
              item.title
            }}</router-link>
            <a
              href="#"
              @click="videoCloses(item.link)"
              v-if="item.link == 'video'"
              :title="item.title"
              >{{ item.title }}</a
            >
          </li>
          <!-- <li @click="videoCloses" style="cursor: pointer;">宣传视频</li> -->
        </ul>
      </div>
      <!-- <div class="details-service">
        <h3>专班服务</h3>
        <ul>
          <li
            v-for="(item, index) in Mostservice"
            :key="index"
            @click="
              custormAnchor(
                'service' + index,
                index == 2 || index == 3 ? 'scrollTop100' : null
              )
            "
          >
            <router-link :to="item.link" :title="item.title">{{ item.title }}</router-link>
          </li>
        </ul>
      </div> -->
      <div class="details-party">
        <h3>党建工作</h3>
        <ul>
          <li
            v-for="(item, index) in PartyBuilding"
            :key="index"
            @click="custormAnchor('party' + index, 'scrollTop100')"
          >
            <router-link :to="item.link" :title="item.title">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <div class="details-resources">
        <h3>人力资源</h3>
        <ul>
          <li
            v-for="(item, index) in Manpower"
            :key="index"
            @click="
              custormAnchor(
                'resources' + index,
                index == 1 ? 'scrollTop100' : null
              )
            "
          >
            <router-link :to="item.link" :title="item.title">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <Video v-if="videoStatus" :videoSrc="videoSrc" @close="videoClose" />
  </div>
</template>

<script>
import { IndexList, getnewsCenter } from "@/api/indexApi.js";
import Video from "@c/common/video.vue";

export default {
  components: { Video },
  data() {
    return {
      docIndex: "",
      docTop: "",
      videoStatus: false,
      videoSrc: {},
      ListDataFoot: {},
      // 关于我们
      AboutUs: {},
      // 新闻中心
      pressCenter: {},
      // 专班服务
      // Mostservice: {},
      // 党建工作
      PartyBuilding: {},
      // 人力资源
      Manpower: {},
    };
  },
  created() {
    this.getList();
  },
  watch: {
    $route() {
      this.custormAnchor(this.docIndex, this.docTop);
    },
  },
  methods: {
    custormAnchor(index, top) {
      console.log(index, top);
      this.docIndex = index;
      this.docTop = top;
      let anchorElement = document.getElementById(index);
      console.log(anchorElement);
      if (anchorElement) {
        console.log(index, "anchorElement");
        anchorElement.scrollIntoView(true);
        $(window).scrollTop(document.documentElement.scrollTop - 50);
        if (top == "scrollTop100") {
          console.log(top);
          $(window).scrollTop(document.documentElement.scrollTop - 100);
        }
      }
    },
    async getList() {
      let res = await IndexList();
      this.ListDataFoot = res.result.footInfos;
      // this.ListDataBody = res.result.otherWebs;
      this.AboutUs = res.result.otherWebs.filter((item) => {
        return item.categoryName === "关于我们";
      });
      this.pressCenter = res.result.otherWebs.filter((item) => {
        return item.categoryName === "新闻中心";
      });
      // this.Mostservice = res.result.otherWebs.filter((item) => {
      //   return item.categoryName === "专班服务";
      // });
      this.PartyBuilding = res.result.otherWebs.filter((item) => {
        return item.categoryName === "党建工作";
      });
      this.Manpower = res.result.otherWebs.filter((item) => {
        return item.categoryName === "人力资源";
      });
    },
    async videoCloses(val) {
      if (val == "video") {
        this.videoStatus = true;
        let res_1 = await getnewsCenter();
        this.videoSrc = res_1.result.companyVideo.val1;
        console.log(this.videoSrc);
      }
    },
    videoClose(data) {
      this.videoStatus = data;
    },
  },
};
</script>

<style lang="less" scoped>
.footer-details {
  width: 100%;
  min-width: 1530px;
  height: 320px;

  display: flex;
  justify-content: center;
  align-items: center;
  .details-contact {
    display: flex;
    flex-direction: column;
    margin-right: 130px;
    .contact-code {
      display: flex;
      margin-bottom: 19px;
      .contact-qrcode {
        // border: 5px solid #fff;
        width: 100px;
        height: 100px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .contact-phone {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        margin-left: 20px;
        & p:nth-of-type(1) {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.4;
          margin-bottom: 17px;
        }
        & p:nth-of-type(2) {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .contact-infor {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.4;
      .contact-address {
        margin-bottom: 10px;
      }
    }
  }

  .contact-link {
    display: flex;
    > div {
      margin-right: 80px;
    }
    h3 {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 31px;
      text-align: center;
    }
    ul {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.4);
      li {
        margin-bottom: 15px;
        text-align: center;
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        > a {
          color: rgba(255, 255, 255, 0.4);
          &:hover {
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }
}
</style>