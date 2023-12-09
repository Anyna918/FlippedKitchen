<template>
	<h1>this is FoodList test</h1> <br>
	<!-- <h1>this is abandon</h1> -->
	<search :placeholder="SearchPlaceholder" @SearchMessage="searchMessage"></search>
	<navigationBar></navigationBar>
	<FoodListCard :FoodName="FoodListCardName" style="margin-top: 15px;"></FoodListCard>
	<FoodListCard :FoodName="FoodListCardName"></FoodListCard>



	<!-- <button @click="sendGet()">this is a button</button> -->

	



</template>

<script>
	// import {Vue} from 'vue';

	// import {navigationbar} from '@/components/example-navigationBar.vue';
	import {
		testUser
	} from '@/api/test-api.js'; // 假设 API 文件的路径为 '@/api'
	// import { navigationBar } from '@/components/navigationBar.vue'
	import navigationBar from "@/components/navigationBar-component.vue"
	import search from "@/components/search-component.vue"
	import FoodListCard from "@/components/FoodListCard-component.vue"

	export default {
		components: {
			navigationBar,
			search,
			FoodListCard,


		},
		data() {
			return {
				value3: '',


			}
		},
		methods: {
			goToexa() {
				uni.navigateTo({
					url: '/pages/example/example',
				})
			},
			sendGet() {
				testUser.getTestInfo()
					.then(response => {
						// 处理返回的数据
						console.log('success');
						console.log('Response:', response.data);
						console.log('Response:', response.code);
						console.log('Response:', response.msg);
					})
					.catch(error => {
						// 处理请求错误
						console.error('Error:', error);
					});
			},
			//将参数传给search的placeholer
			setSearchData() {
				this.SearchPlaceholder = '搜索食材';
				this.FoodListCardName = '白菜';
			},
			searchMessage(message) {
				console.log(message) // 'Hello World!'
			}
		},

		onLoad() {
			this.setSearchData();
		},

	}
</script>

<style>
</style>