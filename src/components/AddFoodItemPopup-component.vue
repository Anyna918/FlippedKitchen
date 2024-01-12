<template>
	<div class="overlay" v-if="visible"></div>

	<div class="add-food-popup" v-if="visible">
		<h2 class="popup-title">添加食材</h2>

		<div class="input-group">
			<label>食材名称</label>
			<input type="text" placeholder="请在此输入食材名称" v-model="newItem.name" />
		</div>
		<div class="input-group">
			<label>购买日期</label>
			<input type="date" v-model="newItem.purchaseDate" />
		</div>
		<div class="input-group">
			<label>保质期</label>
			<select v-model="newItem.dateOfUse">
				<option disabled value="">请选择食材保质期</option>
				<option>3天</option>
				<option>7天</option>
				<option>14天</option>
				<option>30天</option>
				<option>3个月</option>
				<option>6个月</option>
				<option>1年</option>
			</select>
		</div>

		<div class="input-group">
			<label>使用记录</label>
			<select v-model="newItem.useRecord">
				<option disabled value="">请选择使用记录</option>
				<option>充足</option>
				<option>即将用尽</option>
				<option>已经用尽</option>
			</select>
		</div>

		<div class="input-group">
			<label>数量</label>
			<input type="number" placeholder="请输入数量" v-model="newItem.amount" />
		</div>

		<div class="input-group">
			<label>备注</label>
			<input type="text" placeholder="请输入备注" v-model="newItem.remark" />
		</div>

		<div class="button-group">
			<button class="green-button" @click="addFoodItem">添加</button>
			<button class="green-button" @click="closePopup">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			visible: Boolean
		},
		data() {
			return {
				newItem: {
					name: '',
					purchaseDate: '',
					icon: '', // 文件上传后的路径或文件对象
					dateOfUse: '',
					useRecord: '',
					amount: '',
					remark: ''
				}
			};
		},
		methods: {
			addFoodItem() {
				this.$emit('add-item', this.newItem);
				this.closePopup();
			},
			closePopup() {
				this.$emit('update:visible', false);
				this.resetForm();
			},
			resetForm() {
				this.newItem = {
					name: '',
					purchaseDate: '',
					icon: '', // 文件上传后的路径或文件对象
					dateOfUse: '',
					useRecord: '',
					amount: '',
					remark: ''
				};
			}
		}
	};
</script>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		/* 半透明黑色 */
		z-index: 999;
		/* 确保在页面内容之下，弹窗之上 */
	}

	.add-food-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 300px;
		background-color: white;
		padding: 30px;
		border-radius: 15px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		border: 1px solid #ddd;
		/* 添加边框 */
	}

	.popup-title {
		text-align: center;
		margin-bottom: 20px;
		background-color: #f0f0f0;
		/* 标题背景色 */
		padding: 10px;
		/* 标题内边距 */
		border-radius: 10px;
		/* 标题圆角 */
		font-size: 20px;
		/* 标题字号 */
	}

	.input-group {
		margin-bottom: 15px;
	}

	.input-group label {
		display: block;
		margin-bottom: 10px;
		font-size: 16px;
		/* 增大标签字号 */
	}

	.button-group {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
	}

	.green-button {
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 5px;
		padding: 4px 16px;
		cursor: pointer;
		font-size: 14px;
	}

	.green-button:hover {
		background-color: #45a049;
	}
</style>