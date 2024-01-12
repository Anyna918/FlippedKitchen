<template>
	<div class="overlay" v-if="visible"></div>
	<div class="detail-popup" v-if="visible">
		<div class="food-detail-card">
			<img :src="foodItem.icon" class="food-icon" />
			<div class="food-name">
				<h2 style="text-align: center;margin-bottom: 20px;">{{ foodItem.name }}</h2>
			</div>
			<div class="food-info" style="margin-top: 10px;">
				<label>购买日期</label>
				<p>{{foodItem.purchaseDate}}</p>
			</div>
			<div class="food-info">
				<label>保质期</label>
				<p>{{foodItem.dateOfUse}}天</p>
			</div>
			<div class="food-info">
			    <label>使用记录</label>
			    <div class="use-record-buttons">
			      <button :class="{'active': foodItem.useRecord === '充足'}" 
			              @click="setUseRecord('充足')">充足</button>
			      <button :class="{'active': foodItem.useRecord === '即将用尽'}" 
			              @click="setUseRecord('即将用尽')">即将用尽</button>
			      <button :class="{'active': foodItem.useRecord === '已经用尽'}" 
			              @click="setUseRecord('已经用尽')">已经用尽</button>
			    </div>
			</div>
			<div class="food-info">
				<label for="amount">数量</label>
				<input type="text" id="amount" v-model="foodItem.amount" style="background-color: #f0f0f0; 
					border-radius: 10px; 
					border: 1px solid #282C35; 
					padding: 5px; 
					font-size: 14px;
					margin-bottom: 15px; ">
			</div>
			<div class="food-info">
				<label for="remark">食材备注</label>
				<input type="text" id="remark" v-model="foodItem.remark" style="background-color: #f0f0f0; 
					border-radius: 10px; 
					border: 1px solid #282C35; 
					padding: 5px; 
					font-size: 14px;
					margin-bottom: 15px; ">
			</div>
			<view class="action-buttons">
				<button @click="closePopup">完成</button>
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			foodItem: {
				type: Object,
				default: () => ({
					name: '',
					purchaseDate: '',
					dateOfUse: '',
					icon: '',
					useRecord: '',
					amount: '',
					remark: ''
				})
			}
		},
		methods: {
			addToCart(itemId) {
				// Logic to add the item to the cart
				this.$emit('add-to-cart', itemId);
				this.closePopup();
			},
			deleteItem(itemId) {
				// Logic to delete the item
				this.$emit('delete-item', itemId);
				this.closePopup();
			},
			closePopup() {
				this.$emit('update:visible', false);
				this.$emit('close', this.foodItem); // 将值传回父组件
			},
			setUseRecord(status) {
			      this.foodItem.useRecord = status;
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

	.detail-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 300px;
		background: #fff;
		border-radius: 15px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		padding: 20px;
	}

	.food-detail-card {
		display: flex;
		flex-direction: column;
	}

	.food-icon {
		display: block; /* 使图片成为块级元素 */
		  margin: auto; /* 实现水平居中 */
		max-width: 100px;
		border-radius: 15px;
		margin-bottom: 20px;
		
	}

	.food-info label {
		font-size: 18px;
		/* 字体大小稍小 */

		display: block;
		/* 使label占据整行 */
		margin-bottom: 10px;
		/* 与下方内容的间隔 */
	}


	.food-info p {
		background-color: #f0f0f0;
		/* 圆角框的背景色 */
		border-radius: 10px;
		/* 圆角效果 */
		padding: 5px;
		/* 内边距 */
		font-size: 14px;
		/* 字体大小稍小 */
		margin-bottom: 15px;
		/* 段落之间的间隔 */
	}

	.action-buttons button {
		background-color: #CFF499;
		border: none;
		border-radius: 5px;
		padding: 4px 16px;
		cursor: pointer;
		font-size: 14px;
		margin-top: 20px;
	}

	.action-buttons {
		text-align: center;
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		/* 按钮容器居中对齐 */
	}
	.use-record-buttons {
	  text-align: center;
	  display: flex;
	  justify-content: space-around;
	  margin-top: 20px;
	  margin-bottom: 20px;
	  
	}
	.use-record-buttons button {
	  background-color: white;
	  border: none;
	  border-radius: 50px;
	  padding: 4px 16px;
	  cursor: pointer;
	  font-size: 14px;
	  border: 1px solid #282C35;
	  
	}
	
	.use-record-buttons button.active {
	  background-color: #CFF4CD;
	}
</style>