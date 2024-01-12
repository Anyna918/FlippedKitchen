<template>
	<div class="overlay" v-if="visible"></div>
	
	<div class="detail-popup" v-if="visible">
		<div class="food-detail-card">
			<img :src="foodItem.icon" class="food-icon" />
			<div class="food-info">
				<h3>{{ foodItem.name }}</h3>
				<p class="food-use-record">
					<label>使用记录:</label>
					{{ foodItem.useRecord }}
				</p>
				<p class="food-dates">
					<label>购买日期:</label>
					{{ foodItem.purchaseDate }}
				</p>
				<p class="food-dates">
					<label>过期日期:</label>
					{{ foodItem.expiryDate }}
				</p>
				
				<p class="food-quantity">
					<label>数量:</label>
					{{ foodItem.amount }}
				</p>
				<p class="food-remark">
					<label>备注:</label>
					{{ foodItem.remark }}
				</p>
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
					expiryDate: '',
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
		/* align-items: center; */
	}

	.food-icon {
		max-width: 200px;
		/* Adjust as needed */
		border-radius: 10px;
	}

	.food-info {
		/* text-align: center; */
	}

	.food-dates,
	.food-use-record,
	.food-quantity,
	.food-remark {
		margin: 10px 0;
	}

	.food-actions {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	.action-icon {
		cursor: pointer;
		display: inline-block;
		width: 30px;
		/* Adjust as needed */
		height: 30px;
		/* Adjust as needed */
		background-size: cover;
	}
</style>