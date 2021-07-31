<template>
    <div class="acc-eidit">
        <Card>
            <header slot="title">修改密码</header>
            <main slot="content">
                <el-form :model="eiditForm" status-icon :rules="rules" ref="eiditForm" label-width="100px"
                    class="demo-ruleForm">

                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input v-model="eiditForm.oldPwd"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="eiditForm.newPwd"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="newPwd2">
                        <el-input v-model="eiditForm.newPwd2"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="add()">确定</el-button>
                        <el-button @click="reset()">重置</el-button>
                    </el-form-item>
                </el-form>
            </main>
        </Card>
    </div>
</template>

<script>
    import Card from "@/components/Card.vue";

    import {
        REG_PWD
    } from "@/utils/reg.js";

    export default {
        components: {
            Card,
        },

        data() {
            // 验证原密码
            const checkOldPwd = (rules, value, callback) => {
                if (!value) {
                    callback(new Error("原密码不能为空"))
                } else {
                    callback()
                }
            }
            // 新密码
            const checkNewPwd = (rules, value, callback) => {
                if (!value) {
                    callback(new Error("新密码不能为空"))
                } else if (!REG_PWD.test(value)) {
                    callback(new Error("请输入6-12位密码"))
                } else {
                    callback()
                }
            }
            // 确认新密码
            const checkNewPwd2 = (rules, value, callback) => {
                if (!value) {
                    callback(new Error("确认密码不能为空"))
                } else if (value != this.eiditForm.newPwd) {
                    callback(new Error("2次密码不一致"))
                } else {
                    callback()
                }
            }

            return {
                eiditForm: {
                    oldPwd: "",
                    newPwd: "",
                    newPwd2: "",
                },
                rules: {
                    oldPwd: {
                        validator: checkOldPwd,
                        trigger: "blur"
                    },
                    newPwd: {
                        validator: checkNewPwd,
                        trigger: "blur"
                    },
                    newPwd2: {
                        validator: checkNewPwd2,
                        trigger: "blur"
                    },
                },
            }
        },
        methods: {
            // 添加按钮
            add() {
                this.$refs.eiditForm.validate((valid) => {
                    if (valid) {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                        })
                    } else {
                        this.$message.error("参数错误")
                    }
                })
            },
            // 重置按钮
            reset() {
                this.$refs.eiditForm.resetFields()
            },
        },
    }
</script>

<style lang="less" scoped>
.acc-eidit {
    /deep/ .el-input {
        width: 300px;
    }
}

</style>