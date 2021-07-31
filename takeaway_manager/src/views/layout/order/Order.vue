<template>
    <div class="order">
        <Card>
            <header slot="title">订单管理</header>
            <main slot="content">
                <!-- 查询 -->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="订单号">
                        <el-input v-model="formInline.user" placeholder="订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formInline.user" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select v-model="formInline.region" placeholder="订单状态">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择时间">
                        <el-date-picker v-model="formInline.time" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">查询</el-button>
                    </el-form-item>
                </el-form>

                <!-- 表格 -->
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed prop="num" label="订单号" width="100">
                    </el-table-column>
                    <el-table-column prop="date" label="下单时间" width="100">
                    </el-table-column>
                    <el-table-column prop="tel" label="手机号" width="120">
                    </el-table-column>
                    <el-table-column prop="name" label="收货人" width="100">
                    </el-table-column>
                    <el-table-column prop="address" label="配送地址" width="300">
                    </el-table-column>
                    <el-table-column prop="time" label="送达时间" width="100">
                    </el-table-column>
                    <el-table-column prop="remark" label="用户备注" width="100">
                    </el-table-column>
                    <el-table-column prop="price" label="订单金额" width="100">
                    </el-table-column>
                    <el-table-column prop="state" label="订单状态" width="100">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
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

        methods: {
            // 查询
            onSubmit() {
                console.log('查询');
            },
            // 查看
            handleClick(row) {
                console.log(row);
            },
            // 每页显示条数
            handleSizeChange() {
                console.log('每页显示条数改变');
            },
            // 页数改变
            handleCurrentChange() {
                console.log('页数改变');
            },
        },

        data() {
            return {
                // 查询
                formInline: {
                    num: '',
                    name: '',
                    tel: '',
                    state: '',
                    region: '',
                    time: '',
                },
                // 时间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                // 表格
                tableData: [{
                    num: '12345678',
                    date: "19:32:00",
                    tel: '18888888888',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    time: "19:32:00",
                    remark: "微辣",
                    price: "108",
                    state: "已受理",
                }],
                // 分页器
                curPage: 1, // 当前分页器要显示第几页数据
                pageSize: 1, // 每页显示几条数据
                total: 20, // 总条数
            }
        },

    }
</script>

<style lang="less" scoped>
.order {
    .el-table {
        margin-top: 40px;
    }

    // 分页器
    .el-pagination {
        margin-top: 20px;
    }
}

</style>