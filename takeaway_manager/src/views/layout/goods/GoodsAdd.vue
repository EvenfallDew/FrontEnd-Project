<template>
    <div class="goods-add">
        <Card>
            <header slot="title">商品添加</header>
            <main slot="content">
                <el-form :model="addForm" status-icon ref="addForm" label-width="100px" class="demo-ruleForm">
                    <!-- 商品名称 -->
                    <el-form-item label="商品名称" prop="acc">
                        <el-input v-model="addForm.acc" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <!-- 商品分类 -->
                    <el-form-item label="商品分类" prop="group">
                        <el-select v-model="addForm.group" placeholder="请选择分类">
                            <el-option label="类别1" value="类别1"></el-option>
                            <el-option label="类别2" value="类别2"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 商品价格 -->
                    <el-form-item label="商品价格" prop="group">
                        <el-input-number v-model="num" :precision="2" :step="0.1" :min="0"></el-input-number>
                    </el-form-item>
                    <!-- 商品描述 -->
                    <el-form-item label="商品描述" prop="desc">
                        <el-input type=" textarea" v-model="addForm.desc">
                        </el-input>
                    </el-form-item>
                    <!-- 操作 -->
                    <el-form-item>
                        <el-button type="primary" @click="add()">添加商品</el-button>
                        <el-button @click="cancel()">重置内容</el-button>
                    </el-form-item>
                </el-form>
            </main>
        </Card>
    </div>
</template>

<script>
    import Card from "@/components/Card.vue";

    export default {
        components: {
            Card,
        },

        data() {
            return {

                addForm: {
                    acc: "",
                    pwd: "",
                    group: "",
                },
                num: 1,
            }
        },

        methods: {
            // 添加按钮
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
            // 重置按钮
            cancel() {
                // 重置表单
                this.$refs.addForm.resetFields()
            },
        },
    }
</script>

<style lang="less" scoped>
.goods-add {
    /deep/ .el-input {
        width: 300px;
    }

    /deep/ .el-textarea__inner {
        width: 300px;
    }

    /deep/ .el-input-number {
        width: 300px;
    }
}

</style>