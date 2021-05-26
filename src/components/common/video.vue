<template>
  <div class="s-mask-fixed" style="z-index: 11">
    <div class="s-video-wrapper" id="videoWrapper">
      <div class="close" id="close" @click="closeClick">X 关闭</div>
      <video autoplay="" :src="videoSrc" preload="true" controls=""></video>
    </div>
  </div>
</template>

<script>
export default {
  props: ["videoSrc"],
  created() {
  },
  methods: {
    closeClick() {
        this.$emit('close', false);
    },
  },
};
</script>

<style lang="less" scoped>
.s-mask-fixed {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.98);
  z-index: 11;
  .s-video-wrapper {
    position: relative;
    width: 100%;
    .close {
      cursor: pointer;
      font-size: 18px;
      position: absolute;
      top: -5%;
      right: 1%;
      color: #fff;
    }
    video {
      display: block;
      width: 100%;
      margin: 0 auto;
      height: 434px;
      object-fit: fill;
    }
  }
}
</style>