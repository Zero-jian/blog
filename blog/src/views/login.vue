<template>
    <div>
        <div class="logo" @click="$router.push({path:'/'});">
            <img v-lazy="'/static/logo.jpg'" alt="" style="width:100%; height:100%;">
        </div>
        <p class="title">Sign in to Last Blog</p>
        <form>
            <div class="user" @keyup.enter="login">
                <label for="username">Username</label>
                <input type="text" id="username" class="form-control" v-model="userName" autocomplete="off">
            </div>
            <div class="pwd" @keyup.enter="login">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="userPassword">
            </div>
            <button type="button" @click="login">Sign in</button>
        </form>
    </div>
</template>
<style scoped>
html,
body {
  height: 100%;
  background: #f9f9f9;
}

.logo {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin: 50px auto;
  margin-bottom: 35px;
  cursor: pointer;
}

p {
  font-size: 20px;
}

form {
  width: 308px;
  height: 238px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #d8dee2;
  margin: 0 auto;
  padding: 20px 20px;
}

label {
  display: block;
  text-align: left;
  margin-top: 5px;
}

input[type="text"] {
  margin-top: 5px;
}

button {
  margin-top: 20px;
  text-align: center;
  color: #fff;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#34d058),
    color-stop(90%, #28a745)
  );
  background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
  background-color: #28a745;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  width: 100%;
  outline: none;
}
</style>
<script>
import axios from "axios";
import base from "../../base/base.js";
export default {
  data() {
    return {
      userName: "",
      userPassword: ""
    };
  },
  methods: {
    login() {
      if (this.userName == "") {
        layer.msg("用户名不能为空");
      } else {
        if (this.userPassword == "") {
          layer.msg("密码不能为空");
        } else {
          let user = {
            Name: this.userName,
            Password: this.userPassword
          };
          let params = {
            url: "/login",
            data: user
          };
          base.postMethod(params, res => {
            if (res.status == 200) {
              layer.msg("登录成功");
              this.$store.commit("changePower", res.result.Power);
              this.$store.commit("changeId", res.result.Id);
              setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 1000);
            } else {
              layer.msg("用户不存在，请重新输入");
            }
          });
        }
      }
    }
  },
  mounted() {

  }
};
</script>

