const express = require('express');
const router = express.Router();
const server = require('../base/server');
const User = require('../model/user');
const config = require('../base/config');
const Message = require('../model/message');

//连接数据库操作
server.mongoodb();

//测试接口
router.get('/', (req, res, next) => {
  res.send('Hello world');
});

//登录接口
router.post('/login', (req, res, next) => {
  let user = req.body;
  let data = {
    checkOne: {
      Name: user.Name,
      Password: user.Password,
    }
  };
  server.UserfindOne(data, function (rest) {
    if (rest.status == 200) {
      //存储客服端cookie
      res.cookie('name', rest.result.Name, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
      res.cookie('power', rest.result.Power, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
      res.cookie('id', rest.result.Id, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
    }
    res.json(rest);
  });
});

//cookie接口
router.get('/status', (req, res, next) => {
  let status = req.query.status;
  let information = req.cookies;
  if (status == 'login') {
    if (information) {
      res.send(information);
    } else {
      res.send('cookies不存在');
    }
  } else {
    res.clearCookie('name');
    res.clearCookie('power');
    res.clearCookie('Id');
    res.send(config.cookie_del);
  }
});

//发布文章接口
router.post('/saveWrite', (req, res, next) => {
  let article = req.body;
  //调用server.js里面的保存方法
  server.labelSave(article, rest => {
    res.json(rest);
  });
});

//查询文章接口
router.get('/checkWrite', (req, res, next) => {
  var data = {};
  server.articleFind(data, rest => {
    res.json(rest);
  });
});

//根据权限查询文章
router.get('/checkWritePower',(req,res,next) =>{
  let data = req.query;
  server.articleFindPower(data,rest=>{
    res.json(rest);
  })
});

//创建标签接口
router.post('/createLabel', (req, res, next) => {
  let label = req.body;
  server.labelSave(label, rest => {
    res.json(rest);
  })
});

//渲染标签页面接口
router.get('/label', (req, res, next) => {
  let params = {};
  server.labelFind(params, rest => {
    res.json(rest);
  });
});

//更新标签接口
router.post('/updateLabel', (req, res, next) => {
  let label = req.body;
  server.labelUpdate(label, rest => {
    res.json(rest);
  });
});

//删除标签接口
router.post('/delLabel', (req, res, next) => {
  let label = req.body;
  server.labelDel(label, rest => {
    res.json(rest);
  });
});

//文章详情接口
router.get('/write', (req, res, next) => {
  let id = req.query.id;
  server.write(id, rest => {
    res.json(rest);
  })
});

//编辑文章接口
router.post('/editText', (req, res, next) => {
  let write = req.body;
  server.update(write, rest => {
    res.json(rest);
  });
});

//删除文章接口
router.post('/delWrite', (req, res, next) => {
  let id = req.body.id;
  server.delWrite(id, rest => {
    res.json(rest);
  });
});

//作者留言接口
router.post('/message', (req, res, next) => {
  let params = {};
  server.findMessage(params, rest => {
    res.json(rest);
  });
});

//编辑作者留言接口
router.post('/editMsg', (req, res, next) => {
  let params = req.body;
  server.editMessage(params, rest => {
    res.json(rest);
  });
});

//游客评论留言保存接口
router.post('/saveComment', (req, res, next) => {
  let params = req.body;
  server.saveComment(params, rest => {
    res.json(rest);
  });
})

//游客评论渲染接口
router.get('/newComment', (req, res, next) => {
  let params = {};
  server.newComment(params, rest => {
    res.json(rest);
  });
});

//回复游客评论接口
router.post('/saveReply', (req, res, next) => {
  let params = req.body;
  server.replyComment(params, rest => {
    res.json(rest);
  });
});

//文章编辑标签接口
router.post('/upLabel', (req, res, next) => {
  let params = req.body;
  server.updateLabel(params, rest => {
    res.json(rest);
  });
});

//搜索功能接口
router.post('/search', (req, res, next) => {
  let params = req.body;
  server.searchText(params, rest => {
    res.json(rest);
  });
});

//文章留言接口
router.post('/saveArticleComment', (req, res, next) => {
  let params = req.body;
  server.articleComment(params, rest => {
    res.json(rest);
  });
});

//文章留言渲染接口
router.get('/newArticleComment', (req, res, next) => {
  let params = req.query;
  server.checkArticleComment(params, rest => {
    res.json(rest);
  });
});
module.exports = router;
