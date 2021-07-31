<template>
    <div class="user">
        <Card>
            <header slot="title">管理员信息</header>
            <main slot="content">
                <p class="item">管理员ID</p>
                <hr>
                <p class="item">账号</p>
                <hr>
                <p class="item">用户组</p>
                <hr>
                <p class="item">创建时间</p>
                <hr>
                <p class="item">管理员头像</p>
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
                userData: [{

                }]
            }
        }

    }
</script>

<style lang="less" scoped>
.user {
    main {
        .item {
            margin: 18px 0;

            line-height: 20px;
        }

        hr {
            border-color: #ebeef5;
            border-top: 1px;
        }
    }
}

</style>