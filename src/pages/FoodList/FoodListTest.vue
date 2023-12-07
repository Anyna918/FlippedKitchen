<template>
	<h1>this is FoodList test</h1>
	<h1>this is abandon</h1>
	<view>
		<navigationBar-component></navigationBar-component>
	</view>
	<button @click="sendGet()">this is a button</button>
	




</template>

<script>
	// import {Vue} from 'vue';

	// import {navigationbar} from '@/components/example-navigationBar.vue';
	import {
		testUser
	} from '@/api/test-api.js'; // 假设 API 文件的路径为 '@/api'
	// import { navigationBar } from '@/components/navigationBar.vue'


	export default {

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
			}
		},
	}
</script>

<style>
</style>