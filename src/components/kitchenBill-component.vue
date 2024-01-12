<template>
	<view :class="['content_bill', borderRadiusClass]">
		<view class="tag_container">
			<p class="text_tag">{{bill.tag}}</p>
			<p class="text_comment">{{bill.comment}}</p>
		</view>
		<view class="right_container">
		<view class="tag_container"  style="align-items: flex-end;">
			<p class="text_tag">-￥{{bill.amount.toFixed(2)}}</p>
			<p class="text_comment">{{bill.date}}</p>
		</view>
		<image src="../static/KitchenFinance/edit.png" class="image_edit" @click="editBill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "kitchenBill",
		props: {
			bill: {
				type: Object,
				default: () => ({}) // 默认值
			},
			isFirst: {
				type: Boolean,
				default: false
			},
			isLast: {
				type: Boolean,
				default: false
			},
			isOne: {
				type: Boolean,
				default: false
			},
			index:{
				type:Number,
				default:0
			}
		},
		computed: {
			borderRadiusClass() {
				if(this.isOne){
					return 'only-child';
				}
				if (this.isFirst) {
					return 'first-child';
				} else if (this.isLast) {
					return 'last-child';
				} 
				return '';
			}
		},
		data() {
			return {

			};
		},
		methods:{
			editBill(){
				this.$emit('edit-bill', this.index);
			}
		}
	}
</script>

<style>
	.content_bill {
		width: 100%;
		height: 120rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		box-shadow: 6rpx 6rpx 2rpx rgba(0, 0, 0, 0.3);
		margin-bottom: 8rpx;
		padding-left: 30rpx;
		padding-right: 1rpx;
	}

	.first-child {
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}

	.last-child {
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.only-child {
		border-radius: 40rpx;
		/* 全部圆角更大 */
	}
	.right_container{
		display:flex;
		flex-direction: row;
		align-items: center;
	}

	.tag_container {
		//margin-left:30rpx;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.text_tag {
		font-size: 38rpx;
		font-weight: bold;
	}

	.text_comment {
		font-size: 20rpx;
		font-weight: normal;
		color:#8A8A8A;
	}
	.image_edit{
		width:70rpx;
		height:70rpx;
	}
</style>