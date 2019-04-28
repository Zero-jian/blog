<template>
    <div>
        <question :article="article"></question>
        <comment ref="remid">
          <button slot="form-btn" class="comment-btn" @click="msgCli">save the message</button>
        </comment>
        <scroll></scroll>
    </div>
</template>
<style scoped>
.imgScroll {
  width: 200px;
  position: fixed;
  bottom: 50px;
  right: 30px;
  cursor: pointer;
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
</style>

<script>
import scroll from "@/components/scroll.vue";
import comment from "@/components/comment.vue";
import base from "../../base/base.js";
import question from "@/components/question.vue";
import {mapState} from 'vuex';
export default {
  data() {
    return {
      article: "",
      scrollShow: false,
    };
  },
  components: {
    question,
    comment,
    scroll,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let id = this.$route.query.id;
      if(this.searchArticle.length) {
        //在this.searchArticle里面筛选文章
          this.searchArticle.forEach(item => {
            if(item.articleId == id) {
              this.article = item;
            }
          });
      } else {
        layer.msg("服务器方面，文章查询失败");
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
      }
      // let params = {
      //   url: "/write",
      //   data: {
      //     id: this.$route.query.id
      //   }
      // };
      // base.getMethod(params, res => {
      //   if (res.status == 200) {
      //     this.article = res.result;
      //   } else {
      //     layer.msg("服务器方面，文章查询失败");
      //     setTimeout(() => {
      //       this.$router.push({ path: "/" });
      //     }, 500);
      //   }
      // });
    },
    msgCli() {
      this.$refs.remid.articleMsg();
    }
  },
  computed: {
    ...mapState(['searchArticle'])
  }
};
</script>

