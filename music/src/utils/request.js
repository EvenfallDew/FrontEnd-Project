/*
    axios 第一层封装
    超时
    默认地址
    请求拦截器
    响应拦截器
*/

// 1. 引入axios
import axios from "axios";
// 引入element-ui的方式  Message === this.$message
// 引入local工具
import local from "@/utils/local";
// 引入路由文件
import router from "@/router";

// 请求默认地址
axios.defaults.baseURL = "https://autumnfish.cn/";

// 暴露当前文件
export default axios;
