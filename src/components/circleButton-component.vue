<template>
	<view>
		<u-button class="button-add" shape="circle" :style="{ 'background-color': backColor }"></u-button>
	</view>
</template>

<script>
	export default {
		name:"circleButton",
		props: {
		    backColor: {
		      type: String,
		      default: '#FFFFFF' // 默认值
		    }
		  },
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.button-add {
		position: fixed;
		left: 50%; 
		transform: translateX(-50%); 
		bottom:80rpx;
		border-radius: 50%;
		border:none;
		width:100rpx;
		height:100rpx;
		background-image: url('../static/KitchenFinance/button-add.png');
		background-size: cover;
		z-index: 1;
	}

</style>