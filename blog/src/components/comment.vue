<template>
    <div class="comment-components">
        <div class="form">
            <p class="form-title" style="margin:0;">评论留言 :</p>
            <input type="text" v-model="name" class="input" placeholder="Nickname">
            <input type="text" v-model="email" class="input" placeholder="Email ( This is not required, it is convenient to contact )">
            <textarea v-model="content" class="comment" placeholder="Message content"></textarea>
            <slot name="form-btn"></slot>
        </div>
        <div class="msg-comment" v-show="comments.length">
            <div class="msg" v-for="(item,index) in comments">
                <div class="msg-top">
                    <div class="msg-left">
                        <img :src="item.image" alt="" class="img" style="height:100%;">
                    </div>
                    <div class="msg-right">
                        <p class="msg-name">{{item.name}}</p>
                        <p class="msg-time">{{item.time}}</p>
                    </div>
                </div>
                <div class="msg-bottom">
                    <p>{{item.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.hideBottom {
  border-top: none;
  border: 1px solid #d1d5da;
  border-radius: 5px;
}

.comment-components {
  max-width: 1012px;
  margin: 5px auto;
  padding: 0 15px;
}

.form {
  text-align: left;
  /* background: #abcdef; */
  text-indent: 15px;
}

.form-title {
  /* background: #ffedca; */
  height: 30px;
  line-height: 30px;
}

.input {
  border: 1px solid #d1d5da;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #24292e;
  font-size: 14px;
  -webkit-box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  background-color: #fafbfc;
  width: 100%;
  height: 40px;
  text-indent: 15px;
  outline: none;
}

.input:hover,
.comment:hover {
  border: 1px solid #5d88c0;
}

.comment {
  width: 100%;
  height: 100px;
  resize: none;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #24292e;
  font-size: 14px;
  -webkit-box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  background-color: #fafbfc;
  text-indent: 10px;
}

.comment-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: none;
  background: #66c656;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.comment-btn:hover {
  background: #3eb83e;
}

.msg-comment {
  margin-top: 20px;
  border: 1px solid #d1d5da;
  border-radius: 5px;
  margin-bottom: 100px;
}

.msg {
  padding: 10px 5px;
  border-bottom: 1px solid #d1d5da;
}

.msg-left {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}

.msg-top {
  display: flex;
}

.msg-right p {
  margin: 0;
}

.msg-right {
  margin-left: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  text-align: left;
}

.msg-name {
  color: #555;
}

.msg-time {
  color: #999;
}

.msg-bottom {
  /*     background:#b38282; */
  text-align: left;
  text-indent: 50px;
  font-size: 14px;
}

.msg-bottom p {
  width: 100%;
}
</style>
<script>
import base from "../../base/base.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      content: "",
      comments: ""
    };
  },
  methods: {
    remid() {
      if (!this.name) {
        layer.msg("昵称不能为空");
      } else {
        if (!this.comment) {
          layer.msg("留言不能为空");
        } else {
          let params = {
            url: "/saveComment",
            data: {
              name: this.name,
              email: this.email,
              content: this.content,
              id: this.$store.state.id
            }
          };
          base.postMethod(params, res => {
            if (res.status == 200) {
              layer.msg("留言成功");
              setTimeout(() => {
                this.name = "";
                this.content = "";
                this.email = "";
                this.comment();
              }, 500);
            } else {
              layer.msg("服务器繁忙，留言失败");
            }
          });
        }
      }
    },
    load() {
      if (this.$route.path == "/about") {
        this.comment();
      } else {
        this.articleComment();
      }
    },
    comment() {
      let params = {
        url: "/newComment"
      };
      base.getMethod(params, res => {
        if (res.status == 200) {
          // console.log(res.result);
          this.comments = res.result;
        }
      });
    },
    articleMsg() {
      if (!this.name) {
        layer.msg("昵称不能为空");
      } else {
        if (!this.comment) {
          layer.msg("留言不能为空");
        } else {
          let params = {
            url: "/saveArticleComment",
            data: {
              name: this.name,
              email: this.email,
              content: this.content,
              id: this.$store.state.id,
              articleId: this.$route.query.id
            }
          };
          base.postMethod(params, res => {
            if (res.status == 200) {
              layer.msg("留言成功");
              setTimeout(() => {
                this.name = "";
                this.content = "";
                this.email = "";
                this.articleComment();
              }, 500);
            } else {
              layer.msg("服务器繁忙，留言失败");
            }
          });
        }
      }
    },
    articleComment() {

      let params = {
        url: "/newArticleComment",
        data: {
          id: this.$route.query.id
        }
      };
      base.getMethod(params, res => {
        if (res.status == 200) {
          // console.log(res.result);
          this.comments = res.result;
        }
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>

