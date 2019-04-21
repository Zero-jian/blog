<template>
  <div id="mask">
    <img src="../../static/loading.gif" alt="">
  </div>
</template>
<style scoped>
  #mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgb(254,254,254);
  }

img {
  position: relative;
  top: 50%;
  margin-top: -300px;
}

@media screen and (max-width: 980px) {
  img {
    width: 500px;
    margin-top: -187.69px;
  }
}

@media screen and (max-width: 450px) {
  img {
    width: 360px;
    margin-top: -135.135px;
  }
}
</style>
