<template>
	<div class="acc-add">
		<Card>
			<header slot="title">账号添加</header>
			<main slot="content">
				<el-form
					class="demo-ruleForm"
					ref="addForm"
					label-width="100px"
					status-icon
					:rules="rules"
					:model="addForm"
				>
					<el-form-item label="账号" prop="acc">
						<el-input v-model="addForm.acc"></el-input>
					</el-form-item>

					<el-form-item label="密码" prop="pwd">
						<el-input v-model="addForm.pwd"></el-input>
					</el-form-item>

					<el-form-item label="用户组" prop="group">
						<el-select placeholder="请选择用户组" v-model="addForm.group">
							<el-option label="超级管理员" value="超级管理员"></el-option>
							<el-option label="普通管理员" value="普通管理员"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" size="medium" round @click="add()">添加</el-button>
						<el-button type="info" size="medium" round @click="reset()">重置</el-button>
					</el-form-item>
				</el-form>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { REG_ACC, REG_PWD } from "@/utils/reg.js";
import { addList_api } from "@/api/acc";

export default {
	components: {
		Card,
	},

	data() {
		// 验证账号
		const checkAcc = (rules, value, callback) => {
			if (!value) {
				callback(new Error("账号不能为空"));
			} else if (!REG_ACC.test(value)) {
				callback(new Error("请输入5-12位账号"));
			} else {
				callback();
			}
		};
		// 验证密码
		const checkPwd = (rules, value, callback) => {
			if (!value) {
				callback(new Error("密码不能为空"));
			} else if (!REG_PWD.test(value)) {
				callback(new Error("请输入5-12位密码"));
			} else {
				callback();
			}
		};

		return {
			rules: {
				acc: {
					required: true,
					validator: checkAcc,
					trigger: "blur",
				},
				pwd: {
					required: true,
					validator: checkPwd,
					trigger: "blur",
				},
				group: {
					required: true,
					message: "请选择用户组",
					trigger: "blur",
				},
			},
			addForm: {
				acc: "",
				pwd: "",
				group: "",
			},
		};
	},

	methods: {
		// 添加
		add() {
			// 按钮验证
			this.$refs.addForm.validate(async (valid) => {
				if (valid) {
					let res = await addList_api({
						account: this.addForm.acc,
						password: this.addForm.pwd,
						userGroup: this.addForm.group,
					});
					// 添加成功
					if (res.data.code == 0) {
						// 跳转列表页
						this.$router.push("/acc/acc-list");
					}
				}
			});
		},
		// 重置
		reset() {
			this.$refs.addForm.resetFields();
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/common.less"></style>
