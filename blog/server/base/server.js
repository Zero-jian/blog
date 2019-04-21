const mongoose = require('mongoose');
const User = require('../model/user');
const data = require('./config');
const Article = require('../model/article');
const Label = require('../model/label');
const Message = require('../model/message');
const Comment = require('../model/comment');
//node.js模块
const server = {
  //连接数据库方法
  mongoodb() {
    mongoose.connect(data.mongodb);
    mongoose.connection.on('connected', () => {
      console.log(data.connect_ok);
    });

    mongoose.connection.on('error', (err) => {
      console.log(data.connect_no + err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(data.disconnect);
    });
  },

  // User用户表 findOne查询封装,callback为回调函数
  UserfindOne(params, callback) {
    if (!params.checkOne) {
      params.checkOne = {};
    }
    if (!params.checkTwo) {
      params.checkTwo = {};
    }
    User.findOne(params.checkOne, params.checkTwo, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: ''
        }
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: 'doc is ok',
            result: doc
          }
        } else {
          var result = {
            status: data.status_no,
            msg: 'doc is err',
            result: ''
          }
        }
      }
      callback && callback(result);
    });
  },

  //article文章存储封装
  articleSave(params, callback) {
    params.time = this.getTime();
    params.articleId = 'ML' + this.getTimeAll();
    let article = new Article(params);
    article.save((err) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err' + err,
          result: ''
        }
      } else {
        var result = {
          status: data.status_ok,
          msg: 'article save is ok',
          result: ''
        }
      }
      callback(result);
    });
  },

  //获取当前时间
  getTime() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let time = year * 365 + month * 30 + day;
    return time;
  },

  //获取完整时间段方法
  getTimeNumber() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let time = year.toString() + '-' + month.toString() + '-' + day.toString();
    return time;
  },

  //通过时间戳来自动生成ID
  getTimeAll() {
    let time = (new Date()).getTime();
    return time;
  },

  //Article文章表 find查询全部数据
  articleFind(params, callback) {
    if (!params.checkOne) {
      params.checkOne = {};
    }
    if (!params.checkTwo) {
      params.checkTwo = {};
    }
    Article.find(params.checkOne, params.checkTwo, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: ''
        }
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: 'doc is ok',
            result: doc
          }
        } else {
          var result = {
            status: data.status_no,
            msg: 'doc is err',
            result: ''
          }
        }
      }
      callback && callback(result);
    })
  },

  //Article文章表，根据用户权限查询文章数据
  articleFindPower(params, callback) {
    Article.find({
      $nor: [
        {
          power: true
        }
      ]
    },(err,doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: ''
        }
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: 'doc is ok',
            result: doc
          }
        } else {
          var result = {
            status: data.status_no,
            msg: 'doc is err',
            result: ''
          }
        }
      }
      callback && callback(result);
    })
  },

  //标签创建，首先要遍历看标签是否存在，不进行操作，不存在就进行插入
  labelSave(params, callback) {
    Label.find({
      label: params.label
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: '',
        }
        callback && callback(result);
      } else {
        if (doc.length) {
          if (params.status == 'write') {
            params.color = doc[0].color;
            this.articleSave(params, res => {
              if (res.status == 200) {
                doc[0].number++;
                doc[0].save(err2 => {
                  if (err2) {
                    res.label = '文章标签的数量增加失败';
                  } else {
                    res.label = '文章标签数量增加成功';
                  }
                  callback && callback(res);
                });
              }
            });
          } else {
            var result = {
              status: data.status_no,
              msg: '标签已经存在',
              result: '',
            }
            callback && callback(result);
          }
        } else {
          //标签是从发布文章哪里进行创建的
          if (params.status == 'write') {
            params.number = 1;
          } else {
            params.number = 0;
          }
          var label = new Label(params);
          label.save(err1 => {
            if (err1) {
              var result = {
                status: data.status_err,
                msg: 'err' + err1,
                result: '',
              }
            } else {
              //发布文章的时候查看标签是否存在
              if (params.status == 'write') {
                this.articleSave(params, res => {
                  callback && callback(res);
                });
              } else {
                var result = {
                  status: data.status_ok,
                  msg: '标签创建成功',
                  result: '',
                }
                callback && callback(result);
              }
            }
          });
        }
      }
    });
  },

  //查询标签接口
  labelFind(params, callback) {
    Label.find({}, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '查询成功',
          result: doc,
        }
        callback && callback(result);
      }
    });
  },

  //标签更新操作
  labelUpdate(params, callback) {
    Label.update({
      label: params.labelOld
    }, {
      $set: {
        label: params.label,
        color: params.color
      }
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: '',
        }
        callback && callback(result);
      } else {
        // var result = {
        //     status:data.status_ok,
        //     msg:'更新成功',
        //     result:''
        // }
        this.articleLabel(params, res => {
          callback && callback(res);
        });
      }
    });
  },

  //文章标签颜色更改
  articleLabel(params, callback) {
    Article.update({
      label: params.labelOld
    }, {
      $set: {
        label: params.label,
        color: params.color,
      }
    }, {
      multi: true
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_ok,
          msg: '文章标签更新出现错误err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '更新成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //标签删除操作
  labelDel(params, callback) {
    Label.remove({
      label: params.label
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_no,
          msg: 'err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '删除成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //查询文章详情接口
  write(params, callback) {
    Article.findOne({
      'articleId': params
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_no,
          msg: 'err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: '文章查询成功',
            result: doc
          }
          callback && callback(result);
        } else {
          var result = {
            status: data.status_no,
            msg: '文章不存在',
            result: ''
          }
          callback && callback(result);
        }
      }
    });
  },

  //编辑文章接口
  update(params, callback) {
    Article.updateOne({
      'articleId': params.id
    }, {
      $set: {
        'title': params.title,
        'descript': params.descript,
        'answer': params.answer,
      }
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: 'err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        if (doc) {
          console.log(doc);
          var result = {
            status: data.status_ok,
            msg: '更新文章成功',
            result: doc
          }
          callback && callback(result);
        } else {
          var result = {
            status: data.status_no,
            msg: '更新文章查找失败',
            result: ''
          }
          callback && callback(result);
        }
      }
    });
  },

  //删除文章接口
  delWrite(params, callback) {
    Article.findOne({
      'articleId': params
    }, (err, doc) => {
      if (err) {
        var result = {
          status: status_err,
          msg: '删除文章查询失败err:' + err,
          result: ''
        }
      } else {
        if (doc) {
          //查到到文章后进行标签数量-1操作
          Label.findOne({
            'label': doc.label
          }, (err1, doc1) => {
            if (err1) {
              var result = {
                status: status_err,
                msg: '标签查询失败err:' + err1,
                result: ''
              }
            } else {
              if (doc1) {
                if (doc1.number > 0) {
                  doc1.number--;
                }
                doc1.save(() => {
                  console.log('标签文章数量-1保存成功');
                });
              }
            }
          });

          //删除此条数据
          doc.remove(err2 => {
            if (err2) {
              console.log('删除失败err:' + err2);
            } else {
              console.log('删除成功');
            }
          })
          var result = {
            status: data.status_ok,
            msg: '操作成功',
            result: ''
          }
          callback && callback(result);
        }
      }
    })
  },

  //渲染留言页面接口
  findMessage(params, callback) {
    Message.findOne({}, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '留言页面渲染出现问题err:' + err,
          result: '',
        }
        callback && callback(result);
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: '留言页面加载成功',
            result: doc,
          }
          callback && callback(result);
        } else {
          var result = {
            status: data.status_no,
            msg: '留言数据不存在',
            result: '',
          }
          callback && callback(result);
        }
      }
    });
  },

  //编辑留言接口
  editMessage(params, callback) {
    Message.updateOne({
      'userId': params.id
    }, {
      $set: {
        'title': params.title,
        'answer': params.answer
      }
    }, (err) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '留言编辑失败 err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '留言编辑成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //游客评论留言接口
  saveComment(params, callback) {
    params.time = this.getTimeNumber();
    params.commentId = this.getTimeAll();
    if (params.id == 888888) {
      params.image = data.url + '/logo.jpg';
      params.name = params.name + '(作者)';
    } else {
      params.image = data.url + '/user.png';
    }
    let comment = new Comment(params);
    comment.save(err => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '评论留言保存失败',
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '评论留言保存成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //渲染评论留言接口
  newComment(params, callback) {
    Comment.find({}, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '留言渲染出现错误err:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        if (doc) {
          var result = {
            status: data.status_ok,
            msg: '留言查询成功',
            result: doc
          }
          callback && callback(result);
        } else {
          var result = {
            status: data.status_no,
            msg: '',
            result: ''
          }
          callback && callback(result);
        }
      }
    });
  },

  //回复游客回复接口
  replyComment(params, callback) {
    if (params.id == 888888) {
      params.msgImage = data.url + '/logo.jpg';
    } else {
      params.msgImage = data.url + '/user.png';
    }
    Comment.update({
      'commentId': params.commentId
    }, {
      $push: {
        msg: {
          msgName: params.msgName,
          msgEmail: params.msgEmail,
          msgContent: params.msgContent,
          msgTime: this.getTimeNumber(),
          msgImage: params.msgImage
        }
      }
    }, (err1) => {
      if (err1) {
        var result = {
          status: data.status_err,
          msg: '插入数组数据失败err:' + err1,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '插入数据数组成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //编辑文章标签接口
  updateLabel(params, callback) {
    //首先进行文章标签的编辑
    Article.updateOne({
      'articleId': params.articleId
    }, {
      $set: {
        'label': params.label,
        'color': params.color,
      }
    }, (err) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '编辑文章标签接口:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        //将标签表里面的数量属性-1
        Label.findOne({
          'label': params.label
        }, (err1, doc1) => {
          if (err1) {
            var result = {
              status: data.status_err,
              msg: '将标签表里面的数量属性-1失败 err1:' + err1,
              result: ''
            }
            callback && callback(result);
          } else {
            doc1.number++;
            doc1.save(err2 => {
              if (err2) {
                var result = {
                  status: data.status_err,
                  msg: '标签属性改变保存失败' + err2,
                  result: ''
                }
                callback && callback(result);
              } else {
                Label.findOne({
                  'label': params.oldLabel
                }, (err3, doc3) => {
                  if (err3) {
                    var result = {
                      status: data.status_err,
                      msg: '旧标签数据查询失败 err:' + err3,
                      result: ''
                    }
                    callback && callback(result);
                  } else {
                    if (doc3.number > 0) {
                      doc3.number--;
                      doc3.save(err4 => {
                        if (err4) {
                          var result = {
                            status: data.status_err,
                            msg: '旧标签保存出错' + err4,
                            result: ''
                          }
                          callback && callback(result);
                        } else {
                          var result = {
                            status: data.status_ok,
                            msg: '全部操作OK',
                            result: ''
                          }
                          callback && callback(result);
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  //搜索文章接口
  searchText(params, callback) {
    let text = params.search;
    Article.find({
      'title': {
        $regex: text,
        $options: "is"
      }
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '搜索文章失败:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        if (doc.length) {
          var result = {
            status: data.status_ok,
            msg: '搜索文章成功',
            result: doc
          }
          callback && callback(result);
        } else {
          var result = {
            status: data.status_no,
            msg: '文章不存在',
            result: ''
          }
          callback && callback(result);
        }
      }
    });
  },

  //文章留言接口
  articleComment(params, callback) {
    params.time = this.getTimeNumber();
    params.commentId = this.getTimeAll();
    if (params.id == 888888) {
      params.image = data.url + '/logo.jpg';
      params.name = params.name + '(作者)';
    } else {
      params.image = data.url + '/user.png';
    }
    Article.update({
      'articleId': params.articleId
    }, {
      $push: {
        message: {
          name: params.name,
          email: params.email,
          content: params.content,
          time: params.time,
          image: params.image,
          commentId: params.commentId,
        }
      }
    }, err => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '插入评论进文章表失败:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '插入评论成功',
          result: ''
        }
        callback && callback(result);
      }
    });
  },

  //文章渲染接口
  checkArticleComment(params, callback) {
    Article.findOne({
      articleId: params.id
    }, (err, doc) => {
      if (err) {
        var result = {
          status: data.status_err,
          msg: '渲染文章评论出错:' + err,
          result: ''
        }
        callback && callback(result);
      } else {
        var result = {
          status: data.status_ok,
          msg: '渲染文章评论成功',
          result: doc.message
        }
        callback && callback(result);
      }
    });
  }
}

module.exports = server;
