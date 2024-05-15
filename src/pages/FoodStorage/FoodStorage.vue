<template>
	<div class="background">
	<navigationBar></navigationBar>
		<div class="u-grid-wrapper">
			<!-- <u-grid :col="2" :gutter="12"> -->
			<u-grid :col="2" :gutter="12">
				<u-grid-item v-for="item in foodItems" :key="item.id">
					<div class="custom-card">
						<image :src="item.icon" class="card-icon"></image>
						<div class="card-body">
							<h3 class="item-name">{{ item.name }}</h3>
							<p class="item-date">{{ item.productionDate }}  保质期:{{ item.dateOfUse }}天</p>
							<p class="item-useRecord">{{ item.useRecord }}</p>							
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
		<!-- <button @click="showAddFoodPopup = true">添加食材</button> -->
		<circleButton backColor="#CFF4CD" @click="showAddFoodPopup = true"></circleButton>
		
		<AddFoodItemPopup :visible.sync="showAddFoodPopup" @add-item="handleAddItem" />
	</div>
</template>

<script>
	import FoodStorageDetail from '@/components/FoodStorageDetail-component.vue';
	import ShoppingCartPopup from '@/components/ShoppingCartPopup-component.vue';
	import AddFoodItemPopup from '@/components/AddFoodItemPopup-component.vue';
	import navigationBar from "@/components/navigationBar-component.vue";
	import circleButton from '@/components/circleButton-component.vue'

	export default {
		components: {
			FoodStorageDetail,
			ShoppingCartPopup,
			AddFoodItemPopup,
			navigationBar,
			circleButton,
		},
		onLoad() {
		    // this.userId = 1; // 实际使用中应替换为动态获取的用户ID
		    this.fetchFoodStorageItems(); // 调用函数加载数据
		},

		data() {
			return {
				foodItems: [],
				userId:1,
				// foodItems: [{
				// 		id: 1,
				// 		name: "面包",
				// 		purchaseDate: "2024.01.14",
				// 		icon: "../../static/FoodIcon/bread.png",
				// 		inCart: [],
				// 		dateOfUse: 3, // 保质期
				// 		useRecord: "充足", // 使用记录
				// 		remark: "快点吃完哦", // 食材备注
				// 		amount: 5 // 数量
				// 	},
				// 	{
				// 		id: 2,
				// 		name: "葡萄",
				// 		purchaseDate: "2024.01.05",
				// 		icon: "../../static/FoodIcon/grape.png",
				// 		inCart: [],
				// 		dateOfUse: 7, // 保质期
				// 		useRecord: "即将用尽", // 使用记录
				// 		remark: "阿巴阿巴", // 食材备注
				// 		amount: 2 // 数量
				// 	},
				// 	{
				// 		id: 3,
				// 		name: "玉米",
				// 		purchaseDate: "2024.01.01",
				// 		icon: "../../static/FoodIcon/popcorn.png",
				// 		inCart: [],
				// 		dateOfUse: 7, // 保质期
				// 		useRecord: "充足", // 使用记录
				// 		remark: "这是玉米哦", // 食材备注
				// 		amount: 10 // 数量
				// 	},
				// 	{
				// 		id: 4,
				// 		name: "草莓",
				// 		purchaseDate: "2024.01.11",
				// 		icon: "../../static/FoodIcon/strawberry.png",
				// 		inCart: [],
				// 		dateOfUse: 3, // 保质期
				// 		useRecord: "即将用尽", // 使用记录
				// 		remark: "这是草莓哦", // 食材备注
				// 		amount: 2 // 数量
				// 	},
				// 	{
				// 		id: 5,
				// 		name: "西瓜",
				// 		purchaseDate: "2024.01.11",
				// 		icon: "../../static/FoodIcon/watermelon.png",
				// 		inCart: [],
				// 		dateOfUse: 3, // 保质期
				// 		useRecord: "已经用尽", // 使用记录
				// 		remark: "和草莓一起买的哦", // 食材备注
				// 		amount: 1 // 数量
				// 	},
				// ],
				selectedItem: null,
				detailVisible: false,
				shoppingLists: [{
						id: 1,
						name: "本周清单",
						foods: []
					},
					{
						id: 2,
						name: "本月清单",
						foods: []
					},
					{
						id: 3,
						name: "日常采买",
						foods: []
					},
				], // 购物清单数据
				cartPopupVisible: false, // 控制购物车弹窗显示
				currentItem: null, // 当前选择的食材项
				showAddFoodPopup: false,
			};
		},
		
		methods: {
			fetchFoodStorageItems() {
			    uni.request({
			        url: `/api/foodstorage/getAllFoodStorage?userId=${this.userId}`, // 修改URL和参数以适应你的API
			        method: 'GET',
			        success: (res) => {
			            console.log("Response object:", res.data); // 查看完整的响应对象
			            if (res.data.code === 200) {
			                try {
			                    // 首先确保res.data.data是一个合法的JSON字符串
			                    const dataObject = JSON.parse(res.data.data);
			                    if (Array.isArray(dataObject.foodStorages)) {
			                        this.foodItems = dataObject.foodStorages.map(item => ({
			                            id: item.storageId,
			                            amount: item.amount,
			                            // useRecord: item.userecord,
			                            useRecord: item.userecord === '1' ? '充足' :
			                                       item.userecord === '2' ? '即将用尽' :
			                                       item.userecord === '3' ? '已经用尽' : null,

										dateOfUse: item.dateofuse,
			                            
										productionDate:new Date(item.productiondate).toISOString().split('T')[0],
										remark: item.remark,
			                            name: item.storageId=== 1 ? '面包' :
												item.storageId === 2 ? '葡萄' :
											   item.storageId=== 3 ? '玉米' :
											   	item.storageId === 4 ? '草莓' :
											   item.storageId === 5 ? '西瓜' : 
											   item.storageId === 6 ? '牛奶' :null,
			                            icon: item.storageId=== 1 ? "../../static/FoodIcon/bread.png" :
												item.storageId === 2 ? "../../static/FoodIcon/grape.png" :
											   item.storageId=== 3 ? "../../static/FoodIcon/popcorn.png" :
											   	item.storageId === 4 ? "../../static/FoodIcon/strawberry.png" :
											   item.storageId === 5 ? "../../static/FoodIcon/watermelon.png" : null,
			                            inCart: []
			                        })).sort((a, b) => new Date(a.productiondate) - new Date(b.productiondate)); // 按生产日期排序
			                    } else {
			                        console.error('Expected foodItems to be an array but received:', dataObject.foodStorages);
			                    }
			                } catch (e) {
			                    console.error('Error parsing data:', e);
			                }
			            } else {
			                console.error('Failed to fetch food storage items:', res.data.msg);
			            }
			        },

			        fail: (error) => {
			            console.error('Request failed:', error);
			        }
			    });
			},

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
	.background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		background: linear-gradient(to bottom, #CFF4CD 0%, #EFF2F4 100%);
	}
	
	.u-grid-wrapper {
		padding: 12px;
		  height: 90%; /* 或您期望的固定高度 */

		  overflow-y: scroll; /* 允许垂直滚动 */

	}

	.custom-card {
		border-radius: 10px;
		border: 1px solid #eaeaea;
		padding: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		background-color: #ECF8EF;
		margin-bottom: 15px;
		margin-top: 15px;
		
		position: relative;
	}

	.card-icon {
		width: 50px;
		height: 50px;
		border-radius: 15%; 
	}

	.card-body {
		padding-top: 10px;
		padding-bottom: 10px;
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
	.item-useRecord {
	  background-color: #CFF488; /* 绿色背景 */
	  border-radius: 30px; /* 圆角 */
	  padding: 5px 10px; /* 内边距：垂直方向 5px, 水平方向 10px */
	  font-size: 0.8em; /* 较小的字号 */
	  display: inline-block; /* 让元素的大小适应内容 */
	  margin: 0; /* 移除默认的 margin */
margin-top: 15px;
	}

</style>