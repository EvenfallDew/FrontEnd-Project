<template>
	<div class="card">
		<el-card class="box-card">
			<!-- 卡片头 -->
			<div slot="header" class="clearfix">
				<slot name="title"></slot>
			</div>
			<!-- 卡片内容 -->
			<div class="text">
				<slot name="content"></slot>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
/deep/ .el-card {
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 15px;

    color: #fff;
    background-color: rgba(0, 0, 0, .24);

    box-shadow: 0 .1rem .7rem rgba(0, 0, 0, .18);
}

/deep/ .el-card__body {
    color: #fff;
}

/deep/ .el-form-item__label {
    color: #fff;
}

// 表格样式
/deep/ .el-table,
.el-table__expanded-cell {
    color: #fff;
    background-color: transparent;
}

/deep/ .el-table th {
    background-color: transparent !important;
}

/deep/ .el-table tr {
    color: #fff;
    background-color: transparent !important;
}

/deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
    background-color: transparent;
}

/deep/ .el-table--enable-row-hover .el-table__body tr:hover
> td {
    background-color: #414d5a !important;
}

</style>
