// 账号模块  专门管理账号
import request from '@/utils/request';
// 引入qs
import Qs from 'qs';

// 登录接口
export const login_api = (data) => {
    return request({
        method: 'post', // 请求方式
        url: '/users/checkLogin', // 请求地址
        data: Qs.stringify(data) // 参数
    });
}

// 添加账号

// 获取账号列表

// 删除账号

// 批量删除账号

// 修改账号

// 检测旧密码正确

// 修改密码

// 获取个人信息

// 头像上传

// 修改头像

// 获取身份角色