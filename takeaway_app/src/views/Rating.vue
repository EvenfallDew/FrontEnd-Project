<template>
    <div>
        评价组件
    </div>
</template>

<script>
// 引入API
import { getRating_api } from '@/api/apis'
export default {
    methods: {
        // 封装评价的函数
        async getRating() {
            let res = await getRating_api()
            console.log(res)
        },
    },
    created() {
        this.getRating()
    },
}
</script>

<style lang="less" scoped></style>
