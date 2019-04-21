<template>
  <div>
    <blog-nav></blog-nav>
    <div class="main">
      <p class="top" :class="{bottom:status}" v-show="article.length">Rencent Articles</p>
      <div class="questions">
        <div class="question" v-for="(item,index) in article">
          <div class="title" @click="detailed(item)" :name="index">{{item.title}}</div>
          <div class="description">{{item.descript}}</div>
          <div class="time">
            <div class="lab">
              <div class="bg" :style="{background:item.color}"></div>
              <span>{{item.label}}</span>
            </div>
            <div class="age">Updated {{time - item.time}} days ago</div>
          </div>
        </div>
      </div>
    </div>
    <blog-mask v-show="!article.length"></blog-mask>
  </div>
</template>
<style scoped>
.bottom {
  margin-top: 175px;
}

.main {
  max-width: 1012px;
  margin: 0 auto;
  padding: 0 10px;
}

.top {
  height: 35px;
  line-height: 35px;
  text-align: left;
  text-indent: 10px;
}

.questions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #666;
  margin-top: -10px;
}

.question {
  width: 49%;
  border: 1px solid rgba(27, 31, 35, 0.15);
  text-align: left;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}

.title {
  color: #0366d6;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.lab {
  float: left;
}

.bg {
  width: 12px;
  height: 12px;
  float: left;
  border-radius: 50%;
  margin-top: 4px;
}

.age {
  float: left;
}

.lab span {
  margin: 0 25px 0 5px;
}

.description {
  margin: 8px 0;
}

@media screen and (max-width: 780px) {
  .question {
    width: 100%;
  }
}
</style>

<script>
import blogNav from "@/components/header.vue";
import { mapState } from "vuex";
import blogMask from "@/components/mask.vue";
import base from "../../base/base.js";
export default {
  data: function() {
    return {
      //这是初次加载数据
      article: [],
      title: []
    };
  },
  components: {
    blogMask,
    blogNav
  },
  computed: {
    status: function() {
      return this.status;
    },
    time() {
      return this.time;
    },
    ...mapState(["status", "time", "power"])
  },
  methods: {
    detailed: function(item) {
      this.$router.push({
        name: "detailed",
        query: {
          id: item.articleId
        }
      });
    },
    init() {
      let params = {};
      this.power
        ? (params.url = "/checkWrite")
        : (params.url = "/checkWritePower");
      base.getMethod(params, res => {
        if (res.status == 200) {
          this.article = res.result;
        } else {
          layer.msg("页面加载失败,请稍后重试");
        }
      });
      this.$store.commit("getTime");
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    article: function() {
      const data = this.article;
      data.forEach(item => {
        this.title.push(item.title);
      });
    },
    power: function() {
      this.init();
    }
  }
};
</script>
