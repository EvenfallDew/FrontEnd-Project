<template>
	<div class="acc-edit">
		<Card>
			<header slot="title">修改密码</header>
			<main slot="content">
				<el-form
					class="demo-ruleForm"
					ref="editForm"
					label-width="100px"
					status-icon
					:model="editForm"
					:rules="rules"
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
						<el-button type="primary" size="medium" round @click="edit()">确定</el-button>
						<el-button type="info" size="medium" round @click="reset()">重置</el-button>
					</el-form-item>
				</el-form>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import local from "@/utils/local";
import { REG_PWD } from "@/utils/reg.js";
import { checkOldPwd_api, changePwd_api } from "@/api/acc";

export default {
	components: {
		Card,
	},

	data() {
		// 验证原密码
		const checkOldPwd = async (rules, value, callback) => {
			if (!value) {
				callback(new Error("原密码不能为空"));
			} else {
				let res = await checkOldPwd_api({
					oldPwd: value,
				});
				let { code, msg } = res.data;
				if (code == "00") {
					callback();
				} else {
					callback(new Error(msg));
				}
			}
		};
		// 新密码
		const checkNewPwd = (rules, value, callback) => {
			if (!value) {
				callback(new Error("新密码不能为空"));
			} else if (!REG_PWD.test(value)) {
				callback(new Error("请输入5-12位密码"));
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
		edit() {
			this.$refs.editForm.validate(async (valid) => {
				if (valid) {
					let res = await changePwd_api({
						newPwd: this.editForm.confirmPwd,
					});
					let { code } = res.data;
					// 修改成功
					if (code == 0) {
						// 清空本地存储
						local.clear();
						// 跳转登录页面
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
