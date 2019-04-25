<template>
    <div>
        <div class="main" :style="{marginTop: status ? '200px' : '0px'}">
            <div class="title">
                <div class="title-left">
                    <div class="title-left-icon">
                        <span class="icon iconfont">&#xe632;</span>
                    </div>
                    <div class="title-left-input">
                        <input type="text" placeholder="title of this article" v-model="title">
                    </div>
                </div>
                <div class="title-right">
                  <button class="powerBtn" @click="setPrivate">是否设密</button>
                    <!-- <span class="icon iconfont" style="font-size:15px;">保存</span>
                    <span class="icon iconfont">&#xe64a;</span> -->
                </div>
            </div>
        </div>
        <div class="write-main">
            <div class="detailed">
                <input type="text" placeholder="Short description of this article" style="width:100%; " v-model="description">
                <div class="detailed-label" style="display:flex; justify-content:space-between;">
                    <input type="text" placeholder="description of this label" style="width:48%; " v-model="label" >
                    <input type="text" placeholder="description of this label color" style="width:48%;" v-model="color" >
                </div>
            </div>
        </div>
        <div class="ing">
            <div class="question">
                <div class="question-label"><span class="icon iconfont">&#xe708;</span><span class="label-title" style="margin-left:5px;">README.md</span></div>
                <!-- <div class="question-answer">
                    <p>人在广东已经漂泊十年,有时亦怀念当初一起经已改变</p>
                </div> -->
                <edit  @close="save" ref="child">
                    <button slot="btn">发布问题</button>
                </edit>
            </div>
        </div>
    </div>
</template>
<style scoped>
button {
  text-indent: 0px;
}

.question-answer {
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-top: none;
}

.question-label {
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 5px 5px 0 0;
  background: #fafbfc;
  height: 50px;
  width: 100%;
  font-weight: 600;
  text-indent: 10px;
  border-bottom: none;
}

.ing {
  background: #fff;
  max-width: 1012px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: left;
  height: 50px;
  line-height: 50px;
  margin-top: 10px;
}

.bottom {
  margin-top: 175px;
}

.title-left-input input[type="text"] {
  width: 300px;
  height: 30px;
}
.main {
  transition: all 0.3s ease;
  width: 100%;
  border-bottom: 1px solid rgba(27, 31, 35, 0.15);
}

.title {
  max-width: 1012px;
  margin: 0 auto;
  height: 70px;
  padding: 0 15px;
}

.title-left {
  width: 80%;
  height: 70px;
  padding-top: 20px;
  float: left;
}

.title-left-icon {
  float: left;
}

.title-left-input {
  float: left;
  width: 80%;
}

.title-left-input input[type="text"] {
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
  width: 100%;
  height: 36px;
  margin-left: 10px;
}

.icon {
  font-size: 20px;
}

.title-right {
  float: right;
  width: 20%;
  margin-top: 20px;
}

.title-right span {
  display: inline-block;
  width: 50px;
  background: #eff3f6;
  height: 30px;
  line-height: 30px;
  margin-left: 15px;
  border: 1px solid #c4c9cc;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.write-main {
  max-width: 1012px;
  margin: 0 auto;
}

.detailed {
  padding: 0 15px;
}

.detailed input[type="text"] {
  height: 36px;
  margin-top: 15px;
  border: none;
  border: 1px solid #d1d5da;
  text-indent: 10px;
  border-radius: 5px;
}

.powerBtn {
  height: 36px;
  width: 100px;
  border: none;
  color: #fff;
  border-radius: 3px;
  background: #66c656;
  outline: none;
}
@media screen and (max-width: 850px) {
  .powerBtn {
    height: 30px;
    width: 80px;
  }

  .title {
    padding: 0 15px;
    height: 50px;
  }

  .title-left-input input[type="text"] {
    width: 100%;
    height: 100%;
  }

  .title-left {
    width: 80%;
    height: 100%;
    margin-top: -10px;
  }

  .title-right span {
    font-size: 14px;
    width: 35px;
  }

  .title-right {
    width: 20%;
    margin-top: 10px;
  }

  .detailed {
    padding: 0 15px;
  }

  .detailed input[type="text"] {
    margin-bottom: 10px;
    margin-top: 0;
  }

  .question-label {
    height: 35px;
    line-height: 35px;
  }
}
</style>

<script>
import edit from "@/components/edit.vue";
import base from "../../base/base.js";
export default {
  data: function() {
    return {
      description: "",
      title: "",
      power: "",
      label: "",
      color: "",
      priArtucke: false
    };
  },
  components: {
    edit,
  },
  computed: {
    status: function() {
      return this.$store.state.status;
    }
  },
  methods: {
    save(text) {
      if (this.$store.state.power == 1) {
        if (!this.title) {
          layer.msg("标题不能为空");
        } else {
          if (!text) {
            layer.msg("回答不能为空");
          } else {
            var params = {
              url: "/saveWrite",
              data: {
                title: this.title,
                descript: this.description,
                answer: text,
                label: this.label,
                color: this.color,
                userId: this.$store.state.id,
                status: "write",
                power: this.priArtucke
              }
            };
            base.postMethod(params, res => {
              if (res.status == 200) {
                layer.msg("发布文章成功");
                setTimeout(() => {
                  this.title = "";
                  this.description = "";
                  this.$refs.child.clearText();
                  this.$router.push({ path: "/" });
                }, 1000);
              } else {
                layer.msg("服务器繁忙，请稍后重试");
              }
            });
          }
        }
      } else {
        layer.msg("请先进行登录");
      }
    },
    setPrivate() {
      this.priArtucke = !this.priArtucke;
      if (this.priArtucke) {
        layer.msg("设密成功,能看到文章的仅仅只有你");
      } else {
        layer.msg("解除设密,大家都能看到文章");
      }
    }
  }
};
</script>

