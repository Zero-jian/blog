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
        }
      });
    },
    msgCli() {
      this.$refs.remid.remid();
    }
  }
};
</script>

