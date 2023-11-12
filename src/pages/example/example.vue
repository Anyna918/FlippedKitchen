<template>
	<view class="content">
		<p>这是一个示例页面</p>
		<button @click='goBack'>返回上个页面</button>
		<button @click="apiTest">接口测试</button>
	</view>
</template>

<script>
	import {testApi} from '@/api/test.js'
	export default {
		methods: {
			goBack(){
				uni.navigateBack();
			},
			apiTest(){
				return testApi.getTestInfo();
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>