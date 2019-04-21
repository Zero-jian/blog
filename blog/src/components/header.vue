<template>
    <div class="header">
        <header>
            <div class="left">
                <div class="logo" @click="show" v-show="hidden" :class="{animate:$store.state.music}">
                    <img v-lazy="'/static/logo.jpg'" alt="" style="width:100%; height:100%;">
                </div>
                <div class="logo" @click="show" v-show="!hidden" :class="{animate:$store.state.music}">
                    <img v-lazy="'/static/user.jpg'" alt="" style=" height:100%;">
                </div>
                <!-- <div class="search">
                    <input type="text" placeholder="Search Blog" stlye="width:90%; height:100%;" @keyup.enter="search" v-model="searchText">
                </div> -->
                <div class="nav">
                    <ul>
                        <li v-for="(item,index) in nav" @click="push(index)">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <span class="icon iconfont">&#xe669;</span>
                <span class="icon iconfont" style="font-size:23px;" @click="$router.push({path:'/write'});">&#xe6a1;</span>
                <span class="login" @click="$router.push({path:'/login'})" v-if="hidden">Login</span>
                <span class="login" @click="logout" v-if="!hidden">logout</span>
            </div>
        </header>
        <transition name="sideDown">
            <div class="navHidden" v-if="status">
                <ul>
                    <li v-for="(item,index) in nav" @click="push(index)">{{item}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<style scoped>
.animate {
  animation: myrotate 40s linear infinite;
}

@keyframes myrotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.sideDown-enter-active,
.sideDown-leave-active {
  transition: all 0.3s ease;
  height: 175px;
}
.sideDown-enter,
.sideDown-leave-to {
  height: 0;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  overflow: hidden;
  margin-top: 5px;
  float: left;
}

.header {
  background: #24292e;
  height: 50px;
  color: hsla(0, 0%, 100%, 0.75);
  cursor: pointer;
}

header {
  max-width: 1012px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.search {
  /* width: 60%; */
  height: 30px;
  float: left;
}

input[type="text"] {
  width: 100%;
  height: 100%;
  background: #3f4448;
  border: none;
  border-radius: 5px;
  text-indent: 10px;
  margin-top: 10px;
  margin-left: 10px;
  outline: none;
  color: hsla(0, 0%, 100%, 0.75);
}

.nav {
  float: left;
  width: 450px;
  height: 100%;
  margin-left: 15px;
}

.nav ul {
  display: flex;
}

.nav ul li {
  flex: 1;
  font-size: 14px;
  line-height: 50px;
}

li:hover {
  color: #fff;
}

.left {
  width: 70%;
  float: left;
  height: 50px;
}

.right {
  float: right;
  width: 20%;
  display: flex;
  justify-content: space-around;
  height: 100%;
}

span {
  display: block;
  height: 100%;
  line-height: 50px;
  float: left;
}

.login {
  height: 100%;
  line-height: 50px;
}

.icon:hover,
.login:hover {
  color: #fff;
}
@media screen and (max-width: 980px) {
  .nav {
    display: none;
  }

  .navHidden {
    background: #24292e;
    max-width: 10120px;
    margin: 0 auto;
  }

  .navHidden ul li {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: left;
    text-indent: 20px;
  }

  .search {
    width: 60%;
    height: 30px;
    float: left;
  }

  .right {
    float: right;
    width: 20%;
    display: flex;
    justify-content: space-around;
    height: 100%;
  }

  .left {
    width: 80%;
  }
}

@media screen and (max-width: 450px) {
  header {
    padding: 0 10px;
  }

  .right {
    float: right;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
  }

  .left {
    width: 70%;
  }

  .search {
    width: 60%;
  }
}
</style>

<script>
//Vuex
//state (this.music)
//mutations (this.musicStatus)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import base from "../../base/base.js";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      nav: ["Overview", "Articles", "Labels", "About", "Search"],
      hidden: true,
      searchText: ""
    };
  },
  methods: {
    push(index) {
      if (document.body.clientWidth <= 980) {
        this.$store.commit("changeStatus", this.$store.state.status);
      }
      switch (index) {
        case 0:
          this.$router.push({ path: "/" });
          break;
        case 1:
          this.$router.push({ path: "/article" });
          break;
        case 2:
          this.$router.push({ path: "/label" });
          break;
        case 3:
          this.$router.push({ path: "/about" });
          break;
        case 4:
          this.$router.push({ path: "/search" });
          break;
      }
    },
    show() {
      //只有在首页点击头像才会改变音乐状态，其余都是返回首页
      if (this.$route.path === "/") {
        this.musicStatus(this.music);
      }
      if (document.body.clientWidth >= 980) {
        this.$router.push({ path: "/" });
      } else {
        this.$store.commit("changeStatus", this.$store.state.status);
      }
    },
    init() {
      let params = {
        url: "/status",
        data: {
          status: "login"
        }
      };
      base.getMethod(params, res => {
        if (res.power == 1) {
          this.hidden = false;
          this.$store.commit("changePower", res.power);
          this.$store.commit("changeId", res.id);
          // console.log(this.$store.state.power);
        } else {
        }
      });
    },
    logout() {
      let params = {
        url: "/status",
        data: {
          status: "logout"
        }
      };
      base.getMethod(params, res => {
        if (res == base.cookie_del) {
          layer.msg("登出成功");
          setTimeout(() => {
            // this.$router.push({ path: "/login" });
            location.reload();
          }, 1000);
        }
      });
    },
    search() {
      this.$emit("search", this.searchText);
    },
    cleanSearch() {
      this.searchText = "";
    },
    ...mapMutations({
      musicStatus: "changeMusic"
    })
  },
  computed: {
    status() {
      return this.$store.state.status;
    },
    ...mapState({
      music: "music"
    })
  },
  mounted() {
    this.init();
  }
};
</script>

