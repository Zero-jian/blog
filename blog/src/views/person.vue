<template>
  <div class="main">
    <div class="person" :style="{marginTop: status ? '200px' : '0px'}">
      <p class="title">我的简历</p>
      <img v-lazy="'/static/person.jpg'" alt="" class="person-img">
      <div class="person-information" v-for="(item,index) in person">
        <p class="info-title">{{item.title}}</p>
        <p class="info-work">{{item.work}}</p>
        <p class="infor-data" v-for="(info,index) in item.info">
          <span class="info-data-left">{{info.left}}</span>
          <span class="info-data-right">{{info.right}}</span>
        </p>
      </div>
      <div class="person-information" v-for="(item,index) in work">
        <p class="info-title">{{item.work}}</p>
        <p class="info-work">{{item.title}}</p>
        <p class="info-data" v-for="(info,index) in item.info">
          <span class="info-data-left">{{info.left}}</span>
          <span class="info-data-right">{{info.right}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        person: [{
            title: "个人信息",
            info: [{
                left: "姓名：",
                right: "胡国健"
              },
              {
                left: "性别：",
                right: "男"
              },
              {
                left: "学历：",
                right: "大专"
              },
              {
                left: "年龄：",
                right: "22"
              },
              {
                left: "工作时间：",
                right: "2018-06 -- 至今"
              },
              {
                left: "邮箱：",
                right: "1157773406@qq.com"
              },
              {
                left: "github：",
                right: "https://github.com/Zero-jian/newBlog"
              }
            ]
          },
          {
            title: "工作经历",
            work: "广东世纪丰源有限公司",
            info: [
              {
                left: "工作时间：",
                right: "2018-06 -- 至今"
              },
              {
                left: "部门：",
                right: "软件部"
              },
              {
                left: "职位：",
                right: "前端开发"
              },
              {
                left: "内容：",
                right: "H5项目开发"
              }
            ]
          },
        ],
        work: [{
          work: "项目经历",
          title: "个人博客网站",
          info: [{
              left: "时间：",
              right: "2018.11 -- 至今(长期维护)"
            },
            {
              left: "说明：",
              right: "前后端独立开发( Express + Vue + MongoDB )"
            },
            {
              left: "项目链接：",
              right: "http://39.96.59.11/#/(本网站)"
            },
            {
              left: "项目描述：",
              right: "该网站是自身独立开发的，采用了Vue+Express+MongoDB的技术栈，目的在于能够更好的练手以及记录自己的成长，项目源码（https://github.com/Zero-jian/blog）"
            }
          ]
        },
        {
          title: "webpack4手动搭建Vue-cli实现todoList",
          info: [{
              left: "时间：",
              right: "2019.04.20 -- 2019.04.22"
            },
            {
              left: "说明：",
              right: "手动搭建Vue-cli"
            },
            {
              left: "项目链接：",
              right: "http://39.96.59.11/todolist/index.html#/todo"
            },
            {
              left: "项目描述：",
              right: "用webpack4搭建Vue-cli目的是为了让自己更加熟悉webpack4，至于todoLi相信很多人也写过，纯属练手项目"
            }
          ]
        }]
      }
    },
    computed: {
      status() {
        return this.$store.state.status;
      }
    }
  }

</script>
<style scoped>
  .main {
    max-width: 1012px;
    margin: 30px auto;
    padding: 0 20px;
  }

  .person {
    transition: all 0.3s ease;
    padding: 20px 30px;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 5px
  }

  .person-img {
    height: 150px;
    display: block;
    margin-top: 20px;
  }

  .title {
    font-size: 28px;
  }

  .person-information {
    margin-top: 40px;
    text-align: left;
  }

  .info-title {
    color:#65b0eb ;
    font-size: 25px;
    border-bottom: 1px solid rgba(27, 31, 35, 0.15);
    line-height: 2;
  }

  .info-data {
    word-wrap: break-word;
    text-indent: 15px;
  }

  .info-data-left {
    font-size: 18px;
  }

  .info-data-right {
    font-size: 16px;
  }

  .info-work {
    font-size: 22px;
  }

  .info-data-right {
    line-height: 35px;
  }

.bottom {
  transition: all 0.3s ease;
  margin-top: 200px;
}
</style>
