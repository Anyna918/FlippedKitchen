<template>
	<view class="content_card">
		<view class="card">
			<view class="top_container">
				<image src="../static/ShoppingList/car.png" class="image_car"></image>
				<view class="right_container">
					<view class="remind_container">
						<p class="text_remind">{{item.remind}}</p>
					</view>
					<view class="icon_container">
						<image src="../static/ShoppingList/share.png" class="image_icon"></image>
						<image src="../static/ShoppingList/remind.png" class="image_icon"></image>
					</view>
				</view>
			</view>
			<p class="text_title">{{item.title}}</p>
			<p class="text_comment">{{item.comment}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		name: "shoppingCard",
		props: {
			item: {
				type: Object,
				default: () => ({}) // 默认值
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.content_card {
		width: 70%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 45rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		padding: 20rpx;
		box-shadow: 4rpx 4rpx 2rpx rgba(0, 0, 0, 0.3);
	}
	
	

	.card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}

	.text_title {
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 15rpx;
	}

	.text_comment {
		font-size: 20rpx;
		color: #8A8A8A;
	}

	.top_container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 75rpx;
	}

	.image_car {
		width: 100rpx;
		height: 100rpx;
	}
	
	.remind_container{
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height:100%;
	}
	
	.text_remind{
		font-size: 25rpx;
		font-weight: bold;
	}
	
	.right_container{
		display: flex;
		flex-direction: row;
	}
	
	.icon_container{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height:100%;
		margin-left: 15rpx;
	}
	
	.image_icon{
		width:45rpx;
		height:45rpx;
	}
</style>