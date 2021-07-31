<template>
    <div class="login">
        <main>
            <!-- 标题 -->
            <h2 class="title">外卖管理系统登录</h2>
            <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="acc">
                    <el-input prefix-icon="iconfont icon-login-acc" size="medium" v-model="loginForm.acc"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input :type="isShow?'text':'password'"
                        :suffix-icon="isShow?'iconfont icon-login-eye-open':'iconfont icon-login-eye-close'"
                        v-model="loginForm.pwd" @click.native="changeType" prefix-icon="iconfont icon-login-psw"
                        size="medium">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 控制眼睛的状态
                isShow: false,
                // 表单数据
                loginForm: {
                    acc: "",
                    pwd: ""
                },
                // 验证规则
                rules: {
                    // 验证账号
                    acc: [{
                            required: true,
                            message: '不能为空',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 6,
                            message: '长度在 3 到 6 个字符',
                            trigger: 'blur'
                        }
                    ],
                    pwd: [{
                            required: true,
                            message: "密码不能为空",
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 6,
                            message: "长度在 3 到 6 个字符",
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            // 点击登录按钮
            submitForm() {
                // ui框架自带的方法 validate((valid)=>{ valid就是验证结果 });
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$router.push("/layout");
                    } else {
                        this.$message.error('账号或密码错误');
                    }
                });
            },
            // 点击眼睛触发的事件
            changeType(e) {
                if (e.target.className.includes('eye')) {
                    this.isShow = !this.isShow
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.login {
    display: flex;

    width: 100%;
    height: 100%;

    background: #2d3a4b;

    justify-content: center;
    align-items: center;

    main {
        width: 600px;

        text-align: center;

        .title {
            margin-bottom: 20px;

            font-size: 30px;

            color: #fff;
        }

        // 修改UI框架的样式
        /deep/ .el-form-item__label {
            color: #fff;
        }

        /deep/ .el-form-item__content {
            margin-right: 100px;
        }

        .el-button--primary {
            width: 100%;
        }
    }
}

</style>