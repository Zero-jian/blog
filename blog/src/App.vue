<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
      <!-- <main-music></main-music> -->
    </keep-alive>
  </div>
</template>

<script>
import mainMusic from "@/components/music.vue";
export default {
  name: "App",
  components: {
    mainMusic
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
</style>

