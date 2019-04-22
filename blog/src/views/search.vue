<template>
  <div class="search">
    <div class="main">
      <input type="text" placeholder="输入关键字搜索..." class="search-input" v-model="searchText" @keyup.enter="search">
      <img v-lazy="'../../static/yihuo.png'" alt="" class="search-img">
      <p class="search-title">没有搜索到文章~~</p>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        searchText: null,
        searchResult: null
      };
    },
    methods: {
      search() {
        if (!this.searchText) {
          layer.msg("搜索内容不能为空,搜索内容为all可搜索全部文章");
        } else {
          if (this.searchText == "all") {
            this.article = this.articles;
            layer.msg("搜索全部文章成功");
          } else {
            let reg = eval("/" + data + "/ig");
            // let reg = \"/\" + data + \"/gi\";
            this.article = [];
            //判断是否存在管理员权限，以下情况是不存在
            this.articles.forEach(item => {
              if (reg.exec(item.title)) {
                this.article.push(item);
              }
            });
            //判断搜索文章数组的长度，查看文章是否存在
            if (!this.article.length) {
              this.article = this.articles;
              layer.msg("搜索的文章不存在");
            } else {
              layer.msg("搜索成功");
            }
          }
        }
        setTimeout(() => {
          this.$refs.cleanSearch.cleanSearch();
        }, 500);
      },
      s
    },
    components: {

    },
    computed: {
      ...mapState(['searchArticle']),
    }
  };

</script>
<style>
  .search {
    max-width: 100%;
  }

  .search-input {
    width: 100%;
    margin-top: 30px;
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

</style>
