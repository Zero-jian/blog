<template>
    <div>
        <div class="main">
            <div class="top" :class="{bottom:status}">
                <span>{{labels.length}} labels</span>
                <button type="button" @click="labelShow">New label</button>
            </div>
            <div class="create" v-show="colorBar">
                <input type="text" placeholder="New label name" class="labelName" v-model="label" @keyup.enter="create">
                <button type="button" class="colorBtn">色板</button>
                <input type="text" class="colorText" v-model="color" @keyup.enter="create">
                <button type="button" class="cancal" @click="cancal">Cancal</button>
                <button type="button" class="createLabel" @click="create" v-text="edit"></button>
            </div>
            <div class="labelItem" v-for="(item,index) in labels">
                <div class="label-left" :style="{background:item.color}"><span class="icon iconfont">&#xe63d; {{item.label}}</span></div>
                <div class="label-right">
                    <div class="labNum">{{item.number}} blogs</div>
                    <div class="demo">
                        <span class="icon iconfont" @click="editLabel(item)" style="cursor:pointer;">&#xe609;</span>
                        <span class="icon iconfont" @click="delLabel(item)" style="cursor:pointer;">&#xe64a;</span>
                    </div>
                </div>
            </div>
        </div>
        <blog-mask v-show="!labels.length"></blog-mask>
    </div>
</template>
<style scoped>
.main {
  max-width: 1012px;
  margin: 0 auto;
  padding: 0 10px;
}

.top {
  margin-top: 20px;
  height: 52px;
  background-color: #f6f8fa;
  border: 1px solid rgba(27, 31, 35, 0.15);
  padding-left: 16px;
  border-radius: 3px 3px 0 0;
  line-height: 50px;
  padding: 0 20px;
}

.bottom {
  margin-top: 175px;
}

.top span {
  display: block;
  width: 50%;
  float: left;
  height: 100%;
  text-align: left;
}

.top button {
  float: right;
  width: 100px;
  height: 35px;
  margin-top: 8px;
  line-height: 35px;
  border: none;
  color: #fff;
  background: #66c656;
  border-radius: 5px;
  outline: none;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}

.labelName {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  color: #24292e;
  font-size: 14px;
  padding: 6px 8px;
  -webkit-box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  background-color: #fafbfc;
  margin-left: 10px;
  width: 50%;
}

.create {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-top: none;
}

.createLabel,
.colorBtn {
  padding: 0 8px;
  color: #fff;
  border-radius: 3px;
  outline: none;
  background: #66c656;
  border: 1px solid #57a54c;
}

.cancal {
  background: #f7f9fb;
  padding: 0 8px;
  color: #333026;
  border-radius: 3px;
  outline: none;
  border: 1px solid #d5d7da;
}

.labelItem {
  width: 100%;
  border: 1px solid #000;
  border: 1px solid #d1d5da;
  border-top: none;
  height: 50px;
}

.label-left {
  background: #84adad;
  float: left;
  margin-left: 10px;
  height: 32px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkist-border-radius: 5px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  padding: 0 10px;
}

.label-right {
  float: right;
  width: 30%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.labNum {
  float: left;
}

.demo {
  float: left;
  width: 40%;
  display: flex;
  justify-content: space-around;
}

.colorText {
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  color: #24292e;
  font-size: 14px;
  padding: 6px 8px;
  -webkit-box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  background-color: #fafbfc;
}
@media screen and (max-width: 600px) {
  .top {
    height: 35px;
    line-height: 35px;
  }

  .label-left {
    width: 25%;
    max-width: 50%;
  }

  .label-right {
    width: 50%;
  }

  .top button {
    display: none;
  }
}
</style>

<script>
import blogMask from "@/components/mask.vue";
import base from "../../base/base.js";
export default {
  data: function() {
    return {
      colorBar: false,
      label: "",
      color: "",
      labels: "",
      edit: "Create Label",
      labelOld: ""
    };
  },
  components: {
    blogMask,
  },
  computed: {
    status: function() {
      return this.$store.state.status;
    }
  },
  methods: {
    labelShow() {
      this.colorBar = !this.colorBar;
      this.edit = "Create Label";
    },
    create() {
      if (this.$store.state.power == 1) {
        if (!this.label) {
          layer.msg("标签名不能为空");
        } else {
          if (!this.color) {
            layer.msg("标签色板不能为空");
          } else {
            if (this.edit == "Update Label") {
              let params = {
                url: "/updateLabel",
                data: {
                  label: this.label,
                  color: this.color,
                  labelOld: this.labelOld
                }
              };
              base.postMethod(params, res => {
                if (res.status == 200) {
                  layer.msg("标签更新成功");
                  this.init();
                } else {
                  layer.msg("服务器繁忙,标签更新失败");
                }
                this.cancal();
              });
            } else {
              let params = {
                url: "/createLabel",
                data: {
                  label: this.label,
                  color: this.color,
                  userId: this.$store.state.id
                }
              };
              base.postMethod(params, res => {
                if (res.status == 200) {
                  layer.msg("创建标签成功");
                  this.init();
                  setTimeout(() => {
                    this.cancal();
                  }, 500);
                } else if (res.status == 500) {
                  layer.msg("标签已存在，请勿重复创建");
                } else {
                  layer.msg("标签添加失败，服务器繁忙");
                }
              });
            }
          }
        }
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    },
    cancal() {
      this.color = "";
      this.label = "";
      this.colorBar = false;
    },
    init() {
      let params = {
        url: "/label"
      };
      base.getMethod(params, res => {
        if (res.status == 200) {
          this.labels = res.result;
        } else {
          layer.msg("服务器繁忙，请稍后重试");
        }
      });
    },
    editLabel(item) {
      if (this.$store.state.power == 1) {
        this.edit = "Update Label";
        this.colorBar = true;
        this.label = item.label;
        this.color = item.color;
        this.labelOld = item.label;
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    },
    delLabel(item) {
      if (this.$store.state.power == 1) {
        let self = this;
        layer.confirm(
          "是否确认进行标签删除？",
          {
            btn: ["确认", "取消"] //按钮
          },
          function() {
            //Yes
            if (item.number) {
              layer.msg("该标签存在着文章，暂时不能删除该标签");
            } else {
              let params = {
                url: "/delLabel",
                data: {
                  label: item.label
                }
              };
              base.postMethod(params, res => {
                if (res.status == 200) {
                  layer.msg("删除成功");
                  self.init();
                } else {
                  layer.msg("服务器繁忙，删除失败");
                }
              });
            }
          }
        );
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

