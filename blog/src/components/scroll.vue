<template>
  <div class="top" v-show="scrollShow">
    <img src="/static/top.png" alt="让我们一起回到顶部" class="imgScroll" @click="scrollData">
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollShow: false
    };
  },
  methods: {
    scrollDom() {
      window.addEventListener("scroll", this.handleScroll);
    },
    scrollData() {
      $(document.body).animate(
        {
          scrollTop: 0
        },
        500
      );
    },
    handleScroll() {
      //兼容谷歌浏览器
      let top = document.body.scrollTop + document.documentElement.scrollTop;
      if (top > 0 && document.body.clientWidth >= 980) {
        this.scrollShow = true;
      } else {
        this.scrollShow = false;
      }
    }
  },
  mounted() {
    this.scrollDom();
  }
};
</script>
<style>
.imgScroll {
  width: 200px;
  position: fixed;
  bottom: 50px;
  right: 30px;
  cursor: pointer;
}
</style>
