<template>
    <div class="card">
        <el-card class="box-card">
            <!-- 卡头 -->
            <div slot="header" class="clearfix">
                <slot name="title"></slot>
            </div>
            <!-- 卡内容 -->
            <div class="text item">
                <slot name="content"></slot>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="less" scoped>

</style>