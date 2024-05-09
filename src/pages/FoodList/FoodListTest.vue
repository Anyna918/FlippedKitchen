<template>
	<h1 class="title">食材列表</h1>
	<u-tabs :list="list_navigation" @click="click_navigation"></u-tabs>
	<!-- <h1>this is abandon</h1> -->
	<search :placeholder="SearchPlaceholder" @SearchMessage="searchMessage"></search>
	<navigationBar></navigationBar>
	<!-- <FoodListCard :FoodName="FoodListCardName" style="margin-top: 15px;"></FoodListCard> -->
	<!--  style="margin-top: 15px;" -->
	<!-- <FoodListCard FoodName="香肠"></FoodListCard> -->

	<div v-for="(food, index) in food_name" :key="index">
		<FoodListCard :FoodName="food" :Synopsis="synopsis[index]"></FoodListCard>
	</div>



</template>

<script>
	// import {Vue} from 'vue';

	// import {navigationbar} from '@/components/example-navigationBar.vue';
	import {
		FoodList
	} from '@/api/FoodList-api.js'; // 假设 API 文件的路径为 '@/api'
	// import { navigationBar } from '@/components/navigationBar.vue'
	import navigationBar from "@/components/navigationBar-component.vue"
	import search from "@/components/search-component.vue"
	import FoodListCard from "@/components/FoodListCard-component.vue"

	import leftSliding from "@/components/leftSliding-component.vue"

	export default {
		components: {
			navigationBar,
			search,
			FoodListCard,
			leftSliding,
		},
		data() {
			return {
				value3: '',
				list_navigation: [{
						name: "所有"
					},
					{
						name: "蔬菜"
					},
					{
						name: "肉类"
					},
					{
						name: "水果"
					},
					{
						name: "海鲜"
					},
					{
						name: "调料"
					},
					{
						name: "主食"
					},
					{
						name: "其他"
					},
				],
				name_navigation: '所有',
				index_navigation: 0,
				food_name: [],
				synopsis: [],
			}
		},
		methods: {
			//将参数传给search的placeholer, 用于显示默认状态
			setSearchData() {
				this.SearchPlaceholder = '搜索食材';
				this.FoodListCardName = '白菜';
			},
			//点击搜索调用的函数, 搜索食材点击后的效果
			searchMessage(message) {
				console.log(message) // 'Hello World!'
				this.getSearchData(message);
			},
			//从后端获取导航栏的值, 暂时不用
			getNavigation() {
				//模仿传入数据
				let jsonObject = {
					code: 200,
					msg: '',
					data: [
						"关注",
						"推荐",
						"音乐",
						"电影",
						"科技",
						"美食",
						"文化",
						"财经",
						"手工"
					]
				};
				//变成json
				let jsonString2 = JSON.stringify(jsonObject);
				//解析json
				let result = JSON.parse(jsonString2);
				// 从对象中获取 data 属性的值
				let data = result.data;
				console.log('this is data', data);
				this.list_navigation = data.map(item => {
					return {
						name: item
					};
				});
			},
			//导航栏点击, 用于获取顶部导航栏状态
			click_navigation(item) {
				console.log('item', item);
				this.name_navigation = item.name;
				this.index_navigation = item.index;
				console.log(this.name_navigation, this.index_navigation);
				if(this.name_navigation == '所有')
					this.name_navigation = 'all';
				this.getData(this.name_navigation);
			},
			
			//从后端获取数据
			async getData(type) {
				const params = {
					// 添加你需要的查询参数
					type: type,
				};

				FoodList.getFoodList(params)
					.then(response => {
						// 处理返回的数据
						console.log('success');
						console.log('Response:', response.data);
						console.log('Response:', response.code);
						const foodlist = JSON.parse(response.data);
						this.food_name = foodlist.map(food => food.foodName);
						this.synopsis = foodlist.map(food => food.synopsis);
					})
					.catch(error => {
						// 处理请求错误
						console.error('Error:', error);
					});
			},
			
				
			async getSearchData(searchDescription) {
				const params = {
					// 添加你需要的查询参数
					foodName: searchDescription,
				};
				
				FoodList.getListBySearch(params)
					.then(response => {
						// 处理返回的数据
						console.log('success');
						console.log('Response:', response.data);
						console.log('Response:', response.code);
						const foodlist = JSON.parse(response.data);
						this.food_name = foodlist.map(food => food.foodName);
						this.synopsis = foodlist.map(food => food.synopsis);
					})
					.catch(error => {
						// 处理请求错误
						console.error('Error:', error);
					});
				
				
				
			}
		},


		onLoad() {
			this.setSearchData();
			this.getData('all');
			// this.getNavigation();
		},

	}
</script>

<style>
	body {
		background: linear-gradient(to bottom, #88BFFF 0%, #FFFFFF 100%);
	}

	.title {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
</style>