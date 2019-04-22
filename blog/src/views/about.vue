<template>
    <div>
        <question :article="article"></question>
        <comment ref="remid">
          <button slot="form-btn" class="comment-btn" @click="msgCli">save the message</button>
        </comment>
        <blog-mask v-show="!article"></blog-mask>
    </div>
</template>
<script>
import blogMask from "@/components/mask.vue";
import comment from "@/components/comment.vue";
import base from "../../base/base.js";
import question from "@/components/question.vue";
import edit from "@/components/edit.vue";
export default {
  data() {
    return {
      article: ""
    };
  },
  components: {
    question,
    comment,
    blogMask,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let params = {
        url: "/message"
      };
      base.postMethod(params, res => {
        if (res.status == 200) {
          this.article = res.result;
        } else {
          layer.msg("服务器方面，文章查询失败");
          // setTimeout(() => {
          //   this.$router.push({ path: "/" });
          // }, 500);
        }
      });
    },
    msgCli() {
      this.$refs.remid.remid();
    }
    // saveMsg() {
    //   if (!this.name) {
    //     layer.msg("昵称不能为空");
    //   } else if (!this.content) {
    //     layer.msg("内容不能为空");
    //   } else {
    //     // alert(this.content.substr(0, 1) == "@");
    //     if (this.content.substr(0, 1) != "@") {
    // this.contentId == "";
    // let params = {
    //   url: "/saveComment",
    //   data: {
    //     name: this.name,
    //     email: this.email,
    //     content: this.content,
    //     id: this.$store.state.id
    //   }
    // };
    // base.postMethod(params, res => {
    //   if (res.status == 200) {
    //     layer.msg("留言成功");
    //     setTimeout(() => {
    //       this.name = "";
    //       this.content = "";
    //       this.email = "";
    //       this.comment();
    //     }, 500);
    //   } else {
    //     layer.msg("服务器繁忙，留言失败");
    //   }
    //       });
    //     } else {
    //       let params = {
    //         url: "/saveReply",
    //         data: {
    //           msgName: this.name,
    //           msgEmail: this.email,
    //           msgContent: this.content,
    //           id: this.$store.state.id,
    //           commentId: this.contentId
    //         }
    //       };
    //       base.postMethod(params, res => {
    //         if (res.status == 200) {
    //           layer.msg("回复成功");
    //           setTimeout(() => {
    //             this.name = "";
    //             this.content = "";
    //             this.email = "";
    //             this.comment();
    //           }, 500);
    //         } else {
    //           layer.msg("服务器繁忙，留言失败");
    //         }
    //       });
    //     }
    //   }
    // },
    // comment() {
    //   let params = {
    //     url: "/newComment"
    //   };
    //   base.getMethod(params, res => {
    //     if (res.status == 200) {
    //       this.comments = res.result;
    //     }
    //   });
    // },
    // reply(data) {
    //   let name = document.getElementsByClassName("name")[0];
    //   name.focus();
    //   this.content = "@ " + data.name;
    //   this.contentId = data.commentId;
    // }
  }
};
</script>

