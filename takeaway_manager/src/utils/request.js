// 1. 引入axios
import axios from 'axios';
// 引入element-ui的方式  Message === this.$message
import {
    Message
} from 'element-ui';
// 引入local工具
import local from '@/utils/local';

// 请求默认地址
axios.defaults.baseURL = 'http://127.0.0.1:5000/';

// 请求超时
axios.defaults.timeout = 3000;

// 请求 拦截器  携带请求头 token
axios.interceptors.request.use((config) => {
    // 取出本地存储
    let tk = local.get('tk')
    if (tk) {
        // 如果token在本地存储还在，就携带在请求头中
        config.headers.Authorization = tk;
    }
    return config;
}, (error) => {
    // 失败回调
    return Promise.reject(error);
});


// 响应 拦截器
axios.interceptors.response.use((response) => {
    let {
        code,
        msg
    } = response.data;
    // 判断 如果msg存在 才走弹窗 否则不走弹窗
    if (msg) {
        if (code == 0) {
            // 成功弹窗
            Message({
                type: "success",
                message: msg
            })
        } else {
            // 错误弹窗
            Message.error(msg);
        }
    }
    return response;
}, (error) => {
    // 失败回调
    return Promise.reject(error);
});

// 暴露当前文件
export default axios