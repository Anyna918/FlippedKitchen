<template>
	<view class="content">
		<kitchenIndexTop style="margin-top: 60rpx;"></kitchenIndexTop>

		
		
		<circleButton backColor="#FFCF48"></circleButton>
		<navigationBar></navigationBar>
	</view>
</template>

<script>
	import circleButton from '@/components/circleButton-component.vue'
	import navigationBar from "@/components/navigationBar-component.vue"
	import kitchenIndexTop from "@/components/kitchenIndexTop-component.vue"
	export default {
		components: {
			circleButton,
			navigationBar,
			kitchenIndexTop
		},
		data() {
			return {

				
			}
		},
		methods: {
			buttonClick() {
				console.log("点击")
				this.show = true;
			},
			
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		background: linear-gradient(to bottom, #FADF53 0%, #FFF1E0 100%);
	}
</style>