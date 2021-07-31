<template>
    <div class="goods-list">
        <Card>
            <header slot="title">商品列表</header>
            <main slot="content">
                <el-table :data="tableData" style="width: 100%">
                    <!-- 拓展 -->
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品ID">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="商品名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="所属分类">
                                    <span>{{ props.row.category }}</span>
                                </el-form-item>
                                <el-form-item label="商品价格">
                                    <span>{{ props.row.price }}</span>
                                </el-form-item>
                                <el-form-item label="商品图片">
                                    <span>{{ props.row.img }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.date }}</span>
                                </el-form-item>
                                <el-form-item label="商品评价">
                                    <span>{{ props.row.comment }}</span>
                                </el-form-item>
                                <el-form-item label="商品销量">
                                    <span>{{ props.row.count }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <span>{{ props.row.desc }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <!-- 表头 -->
                    <el-table-column label="商品名称" prop="name">
                    </el-table-column>
                    <el-table-column label="所属分类" prop="category">
                    </el-table-column>
                    <el-table-column label="商品价格" prop="price">
                    </el-table-column>
                    <el-table-column label="商品图片" prop="img">
                    </el-table-column>
                    <el-table-column label="商品描述" prop="desc">
                    </el-table-column>
                    <el-table-column label="操作" prop="desc" min-width="100px">
                        <el-button type="primary" @click="eidit()">编辑</el-button>
                        <el-button type="danger" @click="del()">删除</el-button>
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
                    id: '41',
                    name: '田园蔬菜粥',
                    category: '特色粥品',
                    price: '16',
                    img: '图',
                    date: '2020-05-02',
                    comment: "100",
                    count: "288",
                    desc: "荷兰优质淡奶"
                }, {
                    id: '51',
                    name: '田园蔬菜粥',
                    category: '特色粥品',
                    price: '16',
                    img: '图',
                    date: '2020-05-02',
                    comment: "100",
                    count: "288",
                    desc: "奶香浓而不腻"
                }],

                curPage: 1, // 当前分页器要显示第几页数据
                pageSize: 1, // 每页显示几条数据
                total: 20, // 总条数
            }
        },

        methods: {
            // 每页显示条数
            handleSizeChange() {
                console.log('每页显示条数改变');
            },
            // 页数改变
            handleCurrentChange() {
                console.log('页数改变');
            },
            // 编辑操作
            eidit() {
                console.log('编辑');
            },
            // 删除操作
            del() {
                console.log('删除');
            },
        }
    }
</script>

<style lang="less" scoped>
.goods-list {
    // 表格
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    // 分页器
    .el-pagination {
        margin-top: 20px;
    }
}

</style>