<template>
	<!-- <h1>hello</h1> -->
	<!-- <view>{{currentTab	}}</view> -->
	<div class="bottom-navigation">
		<div class="nav-item" @click="selectTab('冰箱')" :class="{ 'active': currentTab === '冰箱' }">
			<image src="@/static/Fridge.png" class="image_navigationVar" :style="{filter: imageFilterFridge}"></image>
			<p>冰箱</p>
		</div>
		<div class="nav-item" @click="selectTab('食材')" :class="{ 'active': currentTab === '食材' }">
			<image src="@/static/Ingrediants.png" class="image_navigationVar" :style="{filter: imageFilterFood}">
			</image>
			<p>食材</p>
		</div>
		<div class="nav-item" @click="selectTab('购物')" :class="{ 'active': currentTab === '购物' }">
			<image src="@/static/ShoppingList.png" class="image_navigationVar" :style="{filter: imageFilterShopping}">
			</image>
			<p>购物</p>
		</div>
		<div class="nav-item" @click="selectTab('财务')" :class="{ 'active': currentTab === '财务' }">
			<image src="@/static/Finance.png" class="image_navigationVar" :style="{filter: imageFilterFiance}"></image>
			<p>财务</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "navigationBar",
		props: { //传递数据
			name: String, //应用名称
			color: String, //主题颜色
			privacy_url: String, //隐私政策链接
			user_url: String, //用户协议链接
		},
		//组件生命周期
		created: function(e) {

		},
		data() {
			return {
				currentTab: '冰箱'
			};
		},
		methods: {
			selectTab(tab) {
				this.currentTab = tab;
				console.log(this.currentTab);
				if (this.currentTab === '财务') {
					uni.navigateTo({
						url: '/pages/KitchenFinance/KitchenFinance'
					});
				} else if (this.currentTab === '食材') {
					uni.navigateTo({
						url: '/pages/FoodList/FoodListTest'
					});
				} else if (this.currentTab === '冰箱') {
					uni.navigateTo({
						url: '/pages/FoodStorage/FoodStorage'
					});
				}



			}
		},
		computed: {
			imageFilterFridge() {
				return this.currentTab === '冰箱' ? 'invert(50%) drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))' : 'none';
			},
			imageFilterFood() {
				return this.currentTab === '食材' ? 'invert(50%) drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))' : 'none';
			},
			imageFilterShopping() {
				return this.currentTab === '购物' ? 'invert(50%) drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))' : 'none';
			},
			imageFilterFiance() {
				return this.currentTab === '财务' ? 'invert(50%) drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))' : 'none';
			},

		},
		mounted() {
			// 获取当前页面的完整 URL
			const currentUrl = window.location.href;
			console.log('Current URL:', currentUrl);
			const pathParts = currentUrl.split('/');
			const pagesIndex = pathParts.indexOf('pages');
			if (pagesIndex !== -1 && pagesIndex < pathParts.length) {
				if (pathParts.at(pagesIndex + 1) === 'FoodList')
					this.currentTab = '食材'
				else if (pathParts.at(pagesIndex + 1) === 'KitchenFinance')
					this.currentTab = '财务'
				else if (pathParts.at(pagesIndex + 1) === 'FoodStorage')
					this.currentTab = '冰箱'
			}
		}
	}
</script>

<style>
	.bottom-navigation {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #010101;
		//border-top: 1rpx solid #ccc;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		z-index: 1;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #333;
		padding: 10rpx;
		font-size: 20rpx;
		cursor: pointer;
	}

	.nav-item.active {
		color: #FFFFFF;
		/* 激活状态的颜色 */
	}

	.image_navigationVar {
		width: 45rpx;
		height: 45rpx
	}
</style>