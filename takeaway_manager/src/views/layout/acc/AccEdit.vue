<template>
	<div class="acc-edit">
		<Card>
			<header slot="title">修改密码</header>
			<main slot="content">
				<el-form
					:model="editForm"
					status-icon
					:rules="rules"
					ref="editForm"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="原密码" prop="oldPwd">
						<el-input v-model="editForm.oldPwd"></el-input>
					</el-form-item>

					<el-form-item label="新密码" prop="newPwd">
						<el-input v-model="editForm.newPwd"></el-input>
					</el-form-item>

					<el-form-item label="确认密码" prop="confirmPwd">
						<el-input v-model="editForm.confirmPwd"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="add()">确定</el-button>
						<el-button @click="reset()">重置</el-button>
					</el-form-item>
				</el-form>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";

import { REG_PWD } from "@/utils/reg.js";

export default {
	components: {
		Card,
	},

	data() {
		// 验证原密码
		const checkOldPwd = (rules, value, callback) => {
			if (!value) {
				callback(new Error("原密码不能为空"));
			} else {
				callback();
			}
		};
		// 新密码
		const checkNewPwd = (rules, value, callback) => {
			if (!value) {
				callback(new Error("新密码不能为空"));
			} else if (!REG_PWD.test(value)) {
				callback(new Error("请输入6-12位密码"));
			} else {
				callback();
			}
		};
		// 确认新密码
		const checkConfirmPwd = (rules, value, callback) => {
			if (!value) {
				callback(new Error("确认密码不能为空"));
			} else if (value != this.editForm.newPwd) {
				callback(new Error("两次密码不一致"));
			} else {
				callback();
			}
		};

		return {
			editForm: {
				oldPwd: "",
				newPwd: "",
				confirmPwd: "",
			},
			rules: {
				oldPwd: {
					validator: checkOldPwd,
					trigger: "blur",
				},
				newPwd: {
					validator: checkNewPwd,
					trigger: "blur",
				},
				confirmPwd: {
					validator: checkConfirmPwd,
					trigger: "blur",
				},
			},
		};
	},
	methods: {
		// 添加
		add() {
			this.$refs.editForm.validate(async (valid) => {
				if (valid) {
					let res = await changePwd_api({
						newPwd: this.eiditForm.confirmPwd,
					});
					let { code } = res.data;
					// 判断 如果code=0 说明修改成功 重新登录并清空本地存储
					if (code == 0) {
						local.clear();
						// 跳转页面
						this.$router.push("/login");
					}
				}
			});
		},
		// 重置
		reset() {
			this.$refs.editForm.resetFields();
		},
	},
};
</script>

<style lang="less" scoped>
.acc-edit {
    /deep/ .el-input {
        width: 300px;
    }
}

</style>
