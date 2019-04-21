<template>
  <div>
    <blog-nav></blog-nav>
    <div class="main">
      <div class="labels" :class="{bottom:status}">
        <div class="labl" style="background:rgb(97, 183, 190); display:flex;" @click="all">
          <div class="icon">
            <span class="icon iconfont">&#xe63d;</span>
          </div>
          <div class="text">All</div>
          <div class="nums">{{article.length}}</div>
        </div>
        <div class="labl" :style="{background:item.color}" v-for="(item,index) in labels"
          @click="overstrain(item.label)" style="display:flex;">
          <div class="icon">
            <span class="icon iconfont">&#xe63d;</span>
          </div>
          <div class="text">{{item.label}}</div>
          <div class="nums">{{item.number}}</div>
        </div>
      </div>
      <div class="questions">
        <div class="question" v-for="(item,index) in articleSpecial" :name="index">
          <div class="title" @click="detailed(item)">{{item.title}}</div>
          <div class="description">{{item.descript}}</div>
          <div class="time">
            <div class="lab">
              <div class="bg" :style="{background:item.color}"></div>
              <span>{{item.label}}</span>
            </div>
            <div class="age">Updated {{item.time - time}} days ago</div>
          </div>
        </div>
      </div>
    </div>
    <blog-mask v-show="!article.length"></blog-mask>
  </div>
</template>
<style scoped>
.main {
  max-width: 1012px;
  margin: 0 auto;
  padding: 0 10px;
}

.labels {
  margin-top: 10px;
  float: left;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgba(27, 31, 35, 0.15);
}

.bottom {
  margin-top: 175px;
}

.labl {
  min-width: 80px;
  background: #c79f9f;
  float: left;
  margin-left: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  -ms-flex-pack: distribute;
  height: 32px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkist-border-radius: 5px;
  line-height: 32px;
  padding: 0 10px;
  color: #fff;
  cursor: pointer;
}

.text {
  margin: 0 8px;
}

.questions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #666;
  float: left;
  width: 100%;
  margin-top: 10px;
}

.question {
  width: 100%;
  width: 100%;
  text-align: left;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-bottom: 1px solid rgba(27, 31, 35, 0.15);
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
  background: #000;
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
</style>

<script>
import blogNav from "@/components/header.vue";
import blogMask from "@/components/mask.vue";
import base from "../../base/base.js";
export default {
  data: function() {
    return {
      //article为文章全部，articleSpecial为筛选文章,label为文章标签，labels为标签数组,trans为筛选标签的数组
      article: [],
      labels: [],
      articleSpecial: []
    };
  },
  components: {
    blogMask,
    blogNav
  },
  computed: {
    status: function() {
      return this.$store.state.status;
    },
    time() {
      return this.$store.state.time;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化调用
    init() {
      let params = {};
      this.$store.state.power
        ? (params.url = "/checkWrite")
        : (params.url = "/checkWritePower");
      base.getMethod(params, res => {
        if (res.status == 200) {
          this.article = this.articleSpecial = res.result;
          this.deweight(this.article);
        } else {
          layer.msg("页面加载失败,请稍后重试");
        }
      });
      this.$store.commit("getTime");
    },
    //数据去重
    deweight(label) {
      let data = [];
      for (let i = 0, len = label.length; i < len; i++) {
        if (data.indexOf(label[i].label) == -1) {
          data.push(label[i].label);
          this.labels.push({
            color: label[i].color,
            label: label[i].label,
            number: 1
          });
        } else {
          this.labels.forEach(item => {
            if (item.label === label[i].label) {
              item.number++;
            }
          });
        }
      }
    },
    //标签过滤文章
    overstrain(label) {
      this.articleSpecial = [];
      this.article.forEach(item => {
        if (item.label === label) {
          this.articleSpecial.push(item);
        }
      });
    },
    //显示全部文章
    all() {
      this.articleSpecial = this.article;
    },
    //详情页面
    detailed(item) {
      this.$router.push({
        name: "detailed",
        query: {
          id: item.articleId
        }
      });
    }
  }
};
</script>
