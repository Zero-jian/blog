<template>
  <div class="container" :style="{marginTop: status ? '200px' : '0px'}">
    <div class="main">
      <div class="title">
        <div class="text" v-show="!show">{{article.title}}</div>
        <input type="text" class="edit-input" v-model="article.title" v-show="show" autofocus="true"
          style="width:50%;margin-top:6px; margin-left:-10px; float:left;">
        <div class="edit">
          <span class="icon iconfont" v-show="article.descript" @click="animate=!animate">&#xe63d;</span>
          <span class="icon iconfont" @click="edit">&#xe609;</span>
          <span class="icon iconfont" @click="del" v-show="article.descript">&#xe621;</span>
          <div class="articleLabel" :class="{animateShow:animate}" v-show="animate">
            <div class="labelShow" style="background:#f6f8fa"><input type="text" class="labelSearch"
                @keyup.enter="labelText" v-model="labelSearch"></div>
            <div class="labelShow" v-for="(item,index) in labels" :class="{checkLabel:article.label==item.label}"
              @dblclick="updateLabel(item)">
              <div class="labelColor" :style="{background:item.color}"></div>
              <div class="labelText">{{item.label}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ing">
      <div class="descridivtion" v-show="!show" style="text-indent:10px;">{{article.descript}}</div>
      <input type="text" class="edit-input" v-model="article.descript" v-show="article.descript&&show "
        autofocus="true">
      <div class="question" :class="{message:!article.descript}">
        <div class="question-label" style="text-indent:10px;"><span class="icon iconfont">&#xe708;</span><span
            class="label-title" style="margin-left:5px;">README.md</span></div>
        <div class="question-answer ql-editor" v-html="article.answer" v-show="!show"
          style="text-indent:10px; padding:0 15px; line-height:30px">
        </div>
        <edit v-show="show" :message="article.descript?0:1" :answer="article.answer" @close="editText" @msg="editMsg">
          <button slot="btn">save the edit</button>
        </edit>
      </div>
    </div>
  </div>
</template>
<style scoped>
.labelSearch {
  width: 100%;
  height: 80%;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  color: #24292e;
  font-size: 14px;
  text-indent: 10px;
  outline: none;
}

.photo {
  width: 100%;
}

.question-label {
  line-height: 50px;
}

.checkLabel {
  background: #03a9f473;
}

.articleLabel {
  width: 250px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  position: absolute;
  margin-top: -5px;
  z-index: 100;
  margin-left: -20px;
}

.articleLabel::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.articleLabel::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.articleLabel::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.labelShow {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  padding: 0 15px;
  border-bottom: 1px solid rgba(27, 31, 35, 0.15);
  cursor: pointer;
}

.labelShow:last-child {
  border-bottom: none;
}

.labelColor {
  width: 15px;
  height: 15px;
  border-radius: 3px;
}

.labelText {
  height: 100%;
  line-height: 40px;
}

.message {
  margin-top: 30px;
}

.edit-input {
  text-indent: 10px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  color: #24292e;
  font-size: 14px;
  -webkit-box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  background-color: #fafbfc;
  width: 100%;
  height: 38px;
}

.bottom {
  margin-top: 175px;
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
}

.ing {
  background: #fff;
  max-width: 1012px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: left;
  /* height: 50px; */
  line-height: 30px;
  /* padding-bottom: 200px; */
}

.main {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(27, 31, 35, 0.15);
  background: #fafbfc;
}

.container {
  transition: all 0.3s ease;
  width: 100%;
  background: #fff;
  padding: 0;
  box-sizing: border-box;
}

.title {
  max-width: 1012px;
  height: 100%;
  margin: 0 auto;
  line-height: 50px;
  padding: 0 25px;
}

.text {
  float: left;
  font-size: 18px;
  color: #216fd8;
  font-weight: 600;
}

.edit {
  float: right;
}

.edit span {
  display: inline-block;
  width: 50px;
  background: #eff3f6;
  height: 32px;
  line-height: 30px;
  margin-left: 15px;
  border: 1px solid #c4c9cc;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

@media screen and (max-width: 520px) {
  .title {
    line-height: 35px;
  }

  .message {
    margin-top: 15px;
  }

  .question-label {
    line-height: 35px;
  }

  .question-label {
    height: 35px;
  }

  .main {
    height: 35px;
  }

  .edit span {
    width: 30px;
  }

  .descridivtion,
  .question-answer {
    line-height: 30px;
    padding: 0 8px;
    overflow: hidden;
  }

  .edit {
    display: none;
  }

  .text {
    font-size: 14px;
  }
}
</style>
<script>
import edit from "./edit.vue";
import base from "../../base/base.js";
export default {
  props: ["article"],
  data: function() {
    return {
      show: false,
      message: 0,
      labels: "",
      animate: false,
      labelSave: "",
      labelSearch: ""
    };
  },
  components: {
    edit
  },
  computed: {
    status: function() {
      return this.$store.state.status;
    }
  },
  methods: {
    edit() {
      this.show = !this.show;
    },
    //编辑文章的方法
    editText(data) {
      if (this.$store.state.power == 1) {
        if (!this.article.title) {
          layer.msg("标题不能为空");
        } else if (!this.article.descript) {
          layer.msg("描述不能为空");
        } else if (!data) {
          layer.msg("内容不能为空");
        } else {
          let params = {
            url: "/editText",
            data: {
              title: this.article.title,
              descript: this.article.descript,
              answer: data,
              id: this.$route.query.id
            }
          };
          base.postMethod(params, res => {
            if (res.status == 200) {
              layer.msg("文章更新成功");
              setTimeout(() => {
                location.reload();
              }, 500);
            } else {
              layer.msg("服务器繁忙，文章更新失败");
            }
          });
        }
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    },
    del() {
      let self = this;
      layer.confirm(
        "是否确认进行删除文章",
        {
          btn: ["确认", "取消"] //按钮
        },
        function() {
          if (self.$store.state.power == 1) {
            let params = {
              url: "/delWrite",
              data: {
                id: self.$route.query.id
              }
            };
            base.postMethod(params, res => {
              if (res.status == 200) {
                layer.msg("文章删除成功");
                setTimeout(() => {
                  self.$router.push({
                    path: "/"
                  });
                }, 500);
              }
            });
          } else {
            layer.msg("你没有权限，请先进行登录");
          }
        }
      );
    },
    //编辑作者留言的方法
    editMsg(data) {
      if (this.$store.state.power == 1) {
        if (!this.article.title) {
          layer.msg("标题不能为空");
        } else if (!data) {
          layer.msg("内容不能为空");
        } else {
          let params = {
            url: "/editMsg",
            data: {
              title: this.article.title,
              answer: data,
              id: this.$store.state.id
            }
          };
          base.postMethod(params, res => {
            if (res.status == 200) {
              layer.msg("留言更新成功");
              setTimeout(() => {
                location.reload();
              }, 500);
            } else {
              layer.msg("服务器繁忙，文章更新失败");
            }
          });
        }
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    },
    //获取标签
    label() {
      let params = {
        url: "/label"
      };
      base.getMethod(params, res => {
        if (res.status == 200) {
          this.labels = this.labelSave = res.result;
        } else {
          layer.msg("服务器繁忙，请稍后重试");
        }
      });
    },
    updateLabel(item) {
      if (this.$store.state.power == 1) {
        let params = {
          url: "/upLabel",
          data: {
            articleId: this.$route.query.id,
            label: item.label,
            color: item.color,
            oldLabel: this.article.label
          }
        };
        base.postMethod(params, res => {
          if (res.status == 200) {
            layer.msg("标签更新成功");
            this.animate = false;
          }
        });
      } else {
        layer.msg("你没有权限，请先进行登录");
      }
    },
    labelText() {
      if (!this.labelSearch) {
        layer.msg("搜索内容不能为空");
      } else {
        if (this.$store.state.power == 1) {
          if (this.labelSearch == "all") {
            this.labels = this.labelSave;
            this.labelSearch = "";
            layer.msg("搜索全部标签成功");
          } else {
            let reg = eval("/" + this.labelSearch + "/ig");
            // let reg = \"/\" + data + \"/gi\";
            this.labels = [];
            this.labelSave.forEach(item => {
              if (reg.exec(item.label)) {
                this.labels.push(item);
              }
            });
            if (!this.labels.length) {
              this.labels = this.labelSave;
              layer.msg("搜索的文章标签不存在");
            } else {
              this.labelSearch = "";
              layer.msg("搜索成功");
            }
          }
        } else {
          layer.msg("你没有权限，请先进行登录");
        }
      }
    }
  },
  mounted() {
    this.label();
  }
};
</script>
