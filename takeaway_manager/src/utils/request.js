/*
    axios 第一层封装
    超时
    默认地址
    请求拦截器
    响应拦截器
*/

// 1. 引入axios
import axios from 'axios';
// 引入element-ui的方式  Message === this.$message
import {
    Message
} from 'element-ui';

// 请求默认地址
axios.defaults.baseURL = 'http://127.0.0.1:5000/';

// 请求超时
axios.defaults.timeout = 3000;

// 请求拦截器  携带请求头 token
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    // 失败回调
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    let {
        code,
        msg
    } = response.data;
    if (code == 0) {
        // 成功弹窗
        Message({
            type: "success",
            message: msg
        })
    } else {
        Message.error(msg);
    }
    return response;
}, (error) => {
    // 失败回调
    return Promise.reject(error);
});

// 暴露当前文件
export default axios