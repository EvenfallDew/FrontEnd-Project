import axios from "axios";

import base from "@/utils/base";

// 设置默认地址
axios.defaults.baseURL = base.url;
// 超时时间
axios.timeout = 3000;

// 暴露封装的axios
export default axios;
