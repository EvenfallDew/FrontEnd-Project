<template>
    <div class="acc-add">
        <Card>
            <span slot="title">账号添加</span>
            <div slot="content">
                <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="acc">
                        <el-input v-model="addForm.acc"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pwd">
                        <el-input v-model="addForm.pwd"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" prop="group">
                        <el-select v-model="addForm.group" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="add()">添加</el-button>
                        <el-button @click="reset()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </Card>
    </div>
</template>

<script>
    import Card from "@/components/Card.vue";

    import {
        REG_ACC,
        REG_PWD
    } from "@/utils/reg.js";

    export default {
        components: {
            Card,
        },

        data() {
            // 验证函数，一定要在return之前写。
            // 在这个验证函数中要传递3个参数，rules验证规则 value值 callback回调函数
            const checkAcc = (rules, value, callback) => {
                if (!value) {
                    callback(new Error("账号不能为空"))
                } else if (!REG_ACC.test(value)) {
                    callback(new Error("请输入6-12位"))
                } else {
                    callback()
                }
            }
            // 验证密码
            const checkPwd = (rules, value, callback) => {
                if (!value) {
                    callback(new Error("密码不能为空"))
                } else if (!REG_PWD.test(value)) {
                    callback(new Error("请输入6-12位密码"))
                } else {
                    callback()
                }
            }
            return {
                rules: {
                    acc: {
                        required: true,
                        validator: checkAcc,
                        trigger: "blur"
                    },
                    pwd: {
                        required: true,
                        validator: checkPwd,
                        trigger: "blur"
                    },
                    group: {
                        required: true,
                        message: "用户组不能为空",
                        trigger: "blur",
                    },
                },
                addForm: {
                    acc: "",
                    pwd: "",
                    group: "",
                },
            }
        },

        methods: {
            // 添加
            add() {
                // validate 按钮验证  valid验证结果
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        console.log("ajax 添加")
                        this.$message({
                            type: "success",
                            message: "添加成功",
                        })
                    } else {
                        this.$message.error("添加失败")
                    }
                })
            },
            // 重置
            reset() {
                this.$refs.addForm.resetFields()
            },
        },
    }
</script>

<style lang="less" scoped>
.acc-add {
    /deep/ .el-input {
        width: 300px;
    }
}

</style>