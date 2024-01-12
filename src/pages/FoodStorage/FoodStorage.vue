<template>
	<navigationBar></navigationBar>
	<div>
		<div class="u-grid-wrapper">
			<u-grid :col="2" :gutter="12"> <!-- 三列布局，带有间隙 -->
				<u-grid-item v-for="item in foodItems" :key="item.id">
					<div class="custom-card">
						<image :src="item.icon" class="card-icon"></image>
						<div class="card-body">
							<h3 class="item-name">{{ item.name }}</h3>
							<p class="item-date">{{ item.purchaseDate }}-{{ item.expiryDate }}</p>
						</div>
						<div class="card-footer">
							<u-icon name="edit-pen" size="20" @click="editItem(item)"></u-icon>
							<u-icon name="trash" size="20" @click="deleteItem(item.id)"></u-icon>
							<u-icon name="shopping-cart" size="20" @click="openCartPopup(item)"></u-icon>
						</div>

					</div>
				</u-grid-item>
			</u-grid>
			<FoodStorageDetail :visible.sync="detailVisible" :food-item="selectedItem" @close="handleClose" />
			<ShoppingCartPopup :visible.sync="cartPopupVisible" :shoppingLists="shoppingLists"
				@add-to-cart="addToCart" />
		</div>
		<button @click="showAddFoodPopup = true">添加食材</button>

		<AddFoodItemPopup :visible.sync="showAddFoodPopup" @add-item="handleAddItem" />
	</div>
</template>

<script>
	import FoodStorageDetail from '@/components/FoodStorageDetail-component.vue';
	import ShoppingCartPopup from '@/components/ShoppingCartPopup-component.vue';
	import AddFoodItemPopup from '@/components/AddFoodItemPopup-component.vue';
	import navigationBar from "@/components/navigationBar-component.vue"

	export default {
		components: {
			FoodStorageDetail,
			ShoppingCartPopup,
			AddFoodItemPopup,
			navigationBar,
		},
		data() {
			return {
				foodItems: [{
						id: 1,
						name: "苹果",
						purchaseDate: "2024.01.01",
						expiryDate: "2024.01.10",
						icon: "/src/static/logo.png",
						inCart: [],
						dateOfUse: 10, // 保质期
						useRecord: "充足", // 使用记录
						remark: "苹果应保持干燥", // 食材备注
						amount: 5 // 数量
					},
					{
						id: 2,
						name: "西红柿",
						purchaseDate: "2024.01.01",
						expiryDate: "2024.01.10",
						icon: "/src/static/logo.png",
						inCart: [],
						dateOfUse: 10, // 保质期
						useRecord: "", // 使用记录
						remark: "阿巴阿巴", // 食材备注
						amount: 5 // 数量
					},
				],
				selectedItem: null,
				detailVisible: false,
				shoppingLists: [{
						id: 1,
						name: "购物清单1",
						foods: []
					},
					{
						id: 2,
						name: "购物清单2",
						foods: []
					},
					{
						id: 3,
						name: "购物清单3",
						foods: []
					},
				], // 购物清单数据
				cartPopupVisible: false, // 控制购物车弹窗显示
				currentItem: null, // 当前选择的食材项
				showAddFoodPopup: false,
			};
		},
		methods: {
			editItem(item) {
				this.selectedItem = item;
				this.detailVisible = true;
			},
			handleClose(updatedItem) {
				this.detailVisible = false; // 关闭弹窗

				console.log('Popup closed, received item:', updatedItem);

				// 这里处理关闭后的逻辑，例如更新食材列表
				if (updatedItem) {
					const index = this.foodItems.findIndex(item => item.id === updatedItem.id);
					if (index !== -1) {
						// 更新食材列表中的条目
						this.$set(this.foodItems, index, updatedItem);
					} else {
						// 如果是添加新的食材，则推入数组中
						this.foodItems.push(updatedItem);
					}
				}
			},
			deleteItem(id) {
				// 删除食材的逻辑
				uni.showModal({
					title: '确认删除',
					content: '您确定要删除这个食材吗？',
					success: res => {
						if (res.confirm) {
							// 用户确认删除
							this.foodItems = this.foodItems.filter(item => item.id !== id);
							// 这里你可以添加一个调用后端API的逻辑来同步服务器上的数据
							// 例如:
							// this.deleteItemFromServer(itemId);
						}
					}
				});
			},
			handleAddItem(newItem) {
				// 创建一个新的对象，包含id和newItem的所有属性
				const newFoodItem = {
					...newItem,
					id: this.getNextId()
				};
				this.foodItems.push(newFoodItem); // 添加到foodItems数组
				console.log('新添加的食材:', newItem);
				this.showAddFoodPopup = false;
			},
			getNextId() {
				// 返回新的唯一id（这里是简化的示例，需要根据实际情况调整）
				return this.foodItems.length + 1;
			},
			openCartPopup(item) {
				this.currentItem = item;
				this.cartPopupVisible = true;
			},
			addToCart(selectedListIds) {
				// 逻辑来添加食材到选中的购物清单
				console.log(this.foodItems);
				console.log(this.shoppingLists);

				if (!this.currentItem) {
					console.error('未选择食材');
					return;
				}
				// 更新食材的inCart属性
				this.currentItem.inCart = selectedListIds.length > 0 ? selectedListIds[0] : null;

				// 更新购物清单中的食材列表
				this.shoppingLists.forEach(list => {
					if (selectedListIds.includes(list.id)) {
						// 添加食材到清单（如果尚未存在）
						if (!list.foods.includes(this.currentItem.id)) {
							list.foods.push(this.currentItem.id);
						}
					} else {
						// 从清单中移除食材（如果存在）
						const index = list.foods.indexOf(this.currentItem.id);
						if (index !== -1) {
							list.foods.splice(index, 1);
						}
					}
				});
				console.log('Adding item to shopping lists:', this.currentItem, selectedListIds);
				this.cartPopupVisible = false;
				// 更新购物清单中的食材列表
				this.shoppingLists.forEach(list => {
					if (selectedListIds.includes(list.id)) {
						if (!list.foods.includes(this.currentItem.id)) {
							list.foods.push(this.currentItem.id);
						}
					} else {
						const index = list.foods.indexOf(this.currentItem.id);
						if (index !== -1) {
							list.foods.splice(index, 1);
						}
					}
				});

				// 更新 foodItems 数组
				const itemIndex = this.foodItems.findIndex(item => item.id === this.currentItem.id);
				if (itemIndex !== -1) {
					// 使用 Vue.set 确保 Vue 可以检测到数组中对象的更改
					this.$set(this.foodItems, itemIndex, {
						...this.foodItems[itemIndex],
						inCart: selectedListIds.length > 0 ? selectedListIds : null
					});
				}
				console.log('Updated foodItems:', this.foodItems);
				console.log('Updated shoppingLists:', this.shoppingLists);
			}
		}
	}
</script>

<style lang="scss">
	.u-grid-wrapper {
		padding: 12px;
	}

	.custom-card {
		border-radius: 10px;
		border: 1px solid #eaeaea;
		padding: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		margin-bottom: 10px;
		position: relative;
	}

	.card-icon {
		width: 30px;
		height: 30px;
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.card-body {
		padding-top: 50px;
	}

	.item-name {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.item-date {
		font-size: 14px;
	}

	.card-footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top: 10px;
	}
</style>