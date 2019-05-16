<template>
  <div id="app">
    <blog-nav></blog-nav>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <main-music v-if="play"></main-music> -->
  </div>
</template>

<script>
  import blogNav from '@/components/header.vue'
  // import mainMusic from "@/components/music.vue";
  export default {
    name: "App",
    data() {
      return {
        play: true,
      }
    },
    components: {
      // mainMusic,
      blogNav
    },
    mounted() {
      this.getWidth();
    },
    methods: {
      getWidth() {
        if (document.documentElement.clientWidth <= 980) {
          this.play = this.$store.state.music = false;
        }
      }
    }
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  *,
  body,
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter-active {
    transition: all 0.2s ease;
  }

</style>
