<template>
    <div>
        <Card class="goods-type">
            <header slot="title">
                商品分类
                <el-button style="float: right;" type="primary">添加分类</el-button>
            </header>

            <main slot="content">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" width="50" label="序号">
                    </el-table-column>

                    <el-table-column type="text" label="分类名称">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-table-column>

                    <el-table-column type="text" label="是否启用">
                        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </el-table-column>

                    <el-table-column width="150" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                <el-pagination :current-page="curPage" :page-size="pageSize" @size-change="handleSizeChange()"
                    @current-change="handleCurrentChange()" :total="total" :page-sizes="[1, 5, 10, 20]"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }],
                value: true,
                curPage: 1, // 当前分页器要显示第几页数据
                pageSize: 1, // 每页显示几条数据
                total: 20, // 总条数
                input: "",
            }
        },
    }
</script>

<style lang="less" scoped>
.goods-type {
    header {
        .el-button--primary {
            padding: 5px 10px;
        }
    }

    main {
        // 分页器
        .el-pagination {
            margin-top: 20px;
        }
    }
}

</style>