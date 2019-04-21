const axios = require('axios');
//浏览器公共方法
var base = {
    cookie_del: 'cookie删除成功',
    //封装get请求方法
    getMethod(params, callback) {
        if (!params.data) {
            params.data = '';
        }
        axios.get(params.url, {
            params: params.data
        }).then(response => {
            callback && callback(response.data);
        }).catch(err => {
            callback && callback(err);
        })
    },
    //封装post请求方法
    postMethod(params, callback) {
        if (!params.data) {
            params.data = '';
        }
        axios.post(params.url, params.data).then(response => {
            callback && callback(response.data);
        }).catch(err => {
            callback && callback(err);
        })
    },
}

export default base;