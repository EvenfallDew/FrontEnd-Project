<template>
    <div class="acc-eidit">
        <Card>
            <!-- 卡头 -->
            <header slot="title">账号列表</header>
            <!-- 卡内容 -->
            <main slot="content">
                <el-table ref="accData" :data="accData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="sel">
                    <!-- 选择框 -->
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!-- 账号 -->
                    <el-table-column label="账号" width="180">
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <!-- 用户组 -->
                    <el-table-column label="用户组" width="220">
                        <template slot-scope="scope">
                            {{ scope.row.group }}
                        </template>
                    </el-table-column>
                    <!-- 创建时间 -->
                    <el-table-column label="创建时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.date }}
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column prop="name" label="操作" width="220">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                <el-pagination :current-page="curPage" :page-size="pageSize" @size-change="handleSizeChange()"
                    @current-change="handleCurrentChange()" :total="total" :page-sizes="[1, 5, 10, 20]"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>

                <!-- 操作按钮 -->
                <div class="operate-btn">
                    <el-button type="danger" @click="delAll()">批量删除</el-button>
                    <el-button type="primary" @click="cancel()">取消选择</el-button>
                </div>

                <!-- 弹窗 -->
                <div class="dialog">
                    <el-dialog title="修改信息" :visible.sync="isshow">
                        <el-form :model="eiditForm">
                            <el-form-item label="账号" label-width="80px">
                                <el-input v-model="eiditForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户组" label-width="80px">
                                <el-select v-model="eiditForm.group" placeholder="请选择用户组">
                                    <el-option label="超级管理员" value="超级管理员"></el-option>
                                    <el-option label="普通管理员" value="普通管理员"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="isshow = false">取 消</el-button>
                            <el-button type="primary" @click="dialogOk">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </main>
        </Card>
    </div>
</template>

<script>
    import Card from '@/components/Card.vue';

    export default {
        components: {
            Card,
        },

        data() {
            return {
                isshow: false, // 控制弹窗显示或者隐藏
                eiditForm: {
                    name: '',
                    group: '',
                }, //  编辑弹窗的数据
                curPage: 1, // 当前分页器要显示第几页数据
                pageSize: 1, // 每页显示几条数据
                total: 20, // 总条数
                accData: [{
                        id: 1,
                        name: 'zs1',
                        group: '超级管理员',
                        date: '2021-7-30'
                    },
                    {
                        id: 2,
                        name: 'zs2',
                        group: '超级管理员',
                        date: '2021-7-31'
                    },
                    {
                        id: 3,
                        name: 'zs3',
                        group: '普通管理员',
                        date: '2021-7-32'
                    },
                    {
                        id: 4,
                        name: 'zs4',
                        group: '超级管理员',
                        date: '2021-7-33'
                    },
                    {
                        id: 5,
                        name: 'zs5',
                        group: '普通管理员',
                        date: '2021-7-34'
                    },
                ],
                ids: [], // 批量删除需要的数组
            }
        },
        // 准备函数
        methods: {
            // 弹窗的确定按钮
            dialogOk() {
                console.log('确定后要发ajax请求', this.eiditForm)
                this.isshow = false
            },
            // 编辑按钮
            edit(row) {
                console.log('编辑', row)
                // 先打开弹窗  把值赋值给 eiditForm
                this.isshow = true
                this.eiditForm = {
                    ...row
                } // 浅拷贝一份
            },
            // 删除按钮
            del(id) {
                console.log('点击删除获取到id', id)
            },
            // 批量删除
            delAll() {
                console.log(this.ids)
            },
            // 取消选择
            cancel() {
                // 清空
                this.$refs.accData.clearSelection()
            },
            // 条数发生变化触发的函数
            handleSizeChange(val) {
                console.log('条数改变', val)
            },
            // 页数改变触发的函数
            handleCurrentChange(val) {
                console.log('页数改变', val)
            },
            // 多选触发的方法
            sel(val) {
                console.log(val)
                // map遍历生成一个新的数组，保存在ids数组中
                this.ids = val.map((item) => item.id)
            },
        },
    }
</script>

<style lang="less" scoped>
.acc-eidit {
    // 分页器
    .el-pagination {
        margin-top: 20px;
    }

    // 操作按钮
    .operate-btn {
        margin-top: 20px;
    }

    // 弹窗
    .dialog {
        /deep/ .el-input__inner {
            width: 240px;
        }
    }
}

</style>