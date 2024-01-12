<template>
	<view class="content">
		<view class="name_container">
			<p class="carname">我的购物车</p>
		</view>
		<view class="edit_container">
			<p class="edit">编辑</p>
		</view>
		<!-- <view class="shopping-container">
			<shoppingCard v-for="(item, index) in shoppinglist" :key="index" :item="item" :index="index"></shoppingCard>
		</view> -->
		<u-grid :col="2" style="margin-top:30rpx;width:92%">
			<u-grid-item v-for="(item, index) in shoppinglist" :key="index">
				<shoppingCard :item="item" :index="index"></shoppingCard>
			</u-grid-item>
		</u-grid>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" mode="bottom" :show="showPopup" :round="10"
			@close="close" @open="open">
			<view class="u-popup-slot">
				<view class="input_container">
					<view class="taginput_container">
						<p class="text_rem">购物清单名称：</p>
						<view style="display: flex;align-items: center;">
							<up-input placeholder="输入购物清单名称" border="bottom" v-model="nameValue"></up-input>
						</view>
					</view>
					<view class="taginput_container">
						<p class="text_rem">备注：</p>
						<view style="display: flex;align-items: center;">
							<up-input placeholder="输入备注" border="bottom" v-model="commentValue"></up-input>
						</view>
					</view>
					<view class="taginput_container">
						<p class="text_rem">提醒时间：</p>
						<view style="display: flex;align-items: center;width:60%;">
							<select v-model="remind" style="background-color: #F2F3F4;width: 100%;font-size: 32rpx;color:#c0c4ce">
								<option disabled value="">请选择提醒时间</option>
								<option>3天</option>
								<option>5天</option>
								<option>7天</option>
								<option>30天</option>
								<option>3个月</option>
								<option>6个月</option>
								<option>1年</option>
							</select>
						</view>
					</view>
					<view class="button_popup">
						<u-button custom-style="font-size:30rpx;font-weight:bold;width:45%;color:#000000"
							color="linear-gradient(to right, #E8E9C4, rgb(255, 178, 178))"
							@click="confirm">确认添加</u-button>
						<u-button custom-style="font-size:30rpx;font-weight:bold;width:45%;color:#000000"
							color="#f4f4f4" @click="close">取消添加</u-button>
					</view>
				</view>

			</view>
		</u-popup>
		<circleButton backColor="#E99BD3" @click="addShopping"></circleButton>
		<navigationBar></navigationBar>
	</view>
</template>

<script>
	import navigationBar from "@/components/navigationBar-component.vue"
	import circleButton from '@/components/circleButton-component.vue'
	import shoppingCard from '@/components/shoppingCard-component.vue'
	export default {
		components: {
			navigationBar,
			circleButton,
			shoppingCard
		},
		data() {
			return {
				shoppinglist: [{
						title: '清单名字',
						comment: '备注内容',
						remind: "3天"
					},
					{
						title: '清单名字',
						comment: '备注内容',
						remind: "3天"
					},
					{
						title: '清单名字',
						comment: '备注内容',
						remind: "3天"
					},
					{
						title: '清单名字',
						comment: '备注内容',
						remind: "3天"
					}
				],
				showPopup: false,
				nameValue: '',
				commentValue: '',
				remind: ''
			}
		},
		methods: {
			addShopping() {
				console.log("点击添加");
				uni.$u.sleep().then(() => {
					this.showPopup = !this.showPopup
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.showPopup = false;
				this.nameValue = '';
				this.commentValue = '';
				this.remind = '';
			},
			confirm() {
				const newItem = {
					title: this.nameValue,
					comment: this.commentValue,
					remind: this.remind
				};
				// 将新项添加到数组
				this.shoppinglist.push(newItem);
				this.close();
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		background: linear-gradient(to bottom, #E8E9C4 0%, rgba(255, 178, 178, 0.31) 100%);

	}

	.name_container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.carname {
		font-size: 40rpx;
		font-weight: bold;
		margin: 50rpx;
	}

	.shopping-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		justify-content: space-evenly;
		margin-top: 35rpx;
	}

	.edit_container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.edit {
		margin-right: 60rpx;
		border-bottom: 2rpx solid #0B6294;
		color: #0B6294;
	}

	.taginput_container {
		display: flex;
		flex-direction: row;
		width: 90%;
		border-radius: 30rpx;
		background-color: #f4f4f4;
		margin-bottom: 25rpx;
	}

	.u-popup-slot {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.text_rem {
		font-size: 35rpx;
		margin: 25rpx;
		margin-right: 0rpx;
		font-weight: bold;
	}

	.input_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		justify-content: space-between;
		margin: 35rpx;
	}

	.button_popup {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 25rpx;
		justify-content: space-around;
		width: 90%;
	}
</style>