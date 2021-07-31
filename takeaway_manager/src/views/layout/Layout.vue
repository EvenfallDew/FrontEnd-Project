<template>
    <div class="container">
        <!-- 左边部分 -->
        <aside>
            <h2 class="title">外卖商家中心</h2>
            <LeftMenu></LeftMenu>
        </aside>
        <!-- 右边部分 -->
        <div class="content">
            <header>
                <!-- 导航地址 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 头像相关 -->
                <div class="acc-box">
                    <!-- 下拉 -->
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            欢迎你<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 头像 -->
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
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
    min-width: 1200px;
    height: 100%;

    background-color: #f0f2f5;

    aside {
        width: 200px;
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

        min-width: 1000px;

        flex: 1;
        flex-direction: column;

        header {
            display: flex;

            padding: 0 20px;
            height: 60px;

            background-color: #fff;

            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

            justify-content: space-between;
            align-items: center;

            .acc-box {
                display: flex;

                justify-content: space-between;
                align-items: center;
            }
        }

        main {
            overflow-y: auto;

            padding: 20px;
            height: 800px;

            flex: 1;
        }
    }
}

</style>