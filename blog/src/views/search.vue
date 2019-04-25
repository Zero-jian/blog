<template>
  <div class="search" :style="{marginTop: status ? '200px' : '0px'}">
    <div class="main">
      <input type="text" placeholder="输入关键字搜索..." class="search-input" v-model="searchText" @keyup.enter="search">
      <div class="no" v-show="!article.length">
        <img v-lazy="'../../static/yihuo.png'" alt="" class="search-img">
        <p class="search-title">没有搜索到文章~~</p>
      </div>
      <div class="content" v-show="article.length">
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
  </div>
</template>
<style scoped>
.bottom {
  margin-top: 175px;
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

  .title {
    color: #0366d6;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }

  .question {
    width: 100%;
    border: 1px solid rgba(27, 31, 35, 0.15);
    text-align: left;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
  }

  .search {
    transition: all 0.3s ease;
    max-width: 100%;
  }

  .search-input {
    width: 100%;
    /* margin-top: 30px; */
    margin: 30px 0;
    text-indent: 10px;
    height: 32px;
    border: 1px solid #a9a9a9;
    background: #fff;
    border-radius: 5px;
    outline: none;
  }

  .search-img {
    width: 320px;
  }

  .search-title {
    margin-top: -45px;
    font-size: 15px;
    color: #a5a5a5;
  }

  .main {
    max-width: 1012px;
    padding: 0 20px;
    margin: 0 auto;
  }

  .time {
    height: 20px;
  }

</style>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        searchText: null,
        article: [],
      };
    },
    methods: {
      init() {
        let data = this.searchArticle;
        if (!data.length) {
          layer.msg("页面加载失败,请稍后重试");
          setTimeout(() => {
            this.$route.push({
              path: '/'
            });
          }, 500);
        }
      },
      search() {
        let data = this.searchArticle,
          search = this.searchText;
        this.article = [];
        if (!search) {
          layer.msg("搜索内容不能为空,搜索内容为all可搜索全部文章");
        } else if (search === "all") {
          this.article = data;
          layer.msg("搜索全部文章成功");
        } else {
          let reg = new RegExp(search, "ig");
          //遍历判断符合
          data.forEach(item => {
            if (reg.exec(item.title)) {
              this.article.push(item);
            }
          });
          //判断是否搜索成功
          this.existence();
        }
        setTimeout(() => {
          this.searchText = "";
        }, 500);
      },
      existence() {
        if (this.article.length) {
          layer.msg("搜索成功");
        } else {
          layer.msg("搜索的文章不存在");
        }
      },
      detailed(item) {
        this.$router.push({
          name: "detailed",
          query: {
            id: item.articleId
          }
        });
      },
    },
    components: {

    },
    computed: {
      ...mapState(['searchArticle' ]),
      time() {
        return this.$store.state.time;
      },
      status() {
        return this.$store.state.status;
      }
    },
    mounted() {
      this.init();
      this.$store.commit('getTime');
    }
  };

</script>
