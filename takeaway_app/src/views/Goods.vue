<template>
    <div>
        {{ this.list }}
    </div>
</template>

<script>
// 引入API
import { getGoods_api } from '@/api/apis'
export default {
    data() {
        return {
            list: [],
        }
    },
    methods: {
        // 封装获取商品的函数
        async getGoods() {
            let res = await getGoods_api()
            let { goodsList } = res.data
            this.list = goodsList
        },
    },
    created() {
        this.getGoods()
    },
}
</script>

<style lang="less" scoped></style>
