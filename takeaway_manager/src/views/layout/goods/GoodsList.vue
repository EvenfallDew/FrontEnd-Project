<template>
    <div class="goods-list">
        <Card>
            <header slot="title">商品列表</header>
            <main slot="content">
                <el-table :data="tableData" style="width: 100%">
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
                    <el-table-column label="操作" prop="desc">
                    </el-table-column>
                </el-table>
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
                }]
            }
        }
    }
</script>

<style lang="less" scoped>
.goods-list {
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;

        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
}

</style>