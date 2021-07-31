<template>
    <div class="container">
        <!-- 左边部分 -->
        <aside class="menu">
            <h2 class="title">外卖商家中心</h2>
            <LeftMenu></LeftMenu>
        </aside>
        <!-- 右边部分 -->
        <div class="content">
            <header>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </header>

            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '@/components/LeftMenu.vue';

    export default {
        components: {
            LeftMenu,
        }
    }
</script>

<style lang="less" scoped>
    .container {
        display: flex;

        width: 100%;
        height: 100%;

        background-color: #f0f2f5;

        .menu {
            width: 220px;
            height: 100%;

            background: #304156;

            .title {
                font: 20px/60px "微软雅黑";
                text-align: center;

                color: #fff;
            }
        }

        .content {
            display: flex;

            flex: 1;
            flex-direction: column;

            header {
                height: 60px;

                background-color: #fff;
            }

            main {
                padding: 20px;

                flex: 1;
            }
        }
    }
</style>