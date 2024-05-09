<template>
	<view class="content_in">
		<view style="display:flex;flex-direction: row;">
			<view class="date_container">
				<p class="text_year">{{year}}年</p>
				<view class="select_container">
					<p class="text_month">{{month}}月</p>
					<u-icon name="arrow-down-fill" color="#000000" size="35rpx" @click="showSelecter"
						style="margin-right: 25rpx;"></u-icon>
					<u-datetime-picker :show="show" mode="year-month" v-model="pickerValue" :maxDate="maxValue" ref="picker"
						closeOnClickOverlay @confirm="confirm" @cancel="cancel" @change="change"
						@close="close"></u-datetime-picker>
					<u-line direction="col" color="#8A8A8A" :hairline=false length="70rpx"></u-line>
				</view>
			</view>
			<view class="date_container">
				<view class="select_container" style="margin-left: 0rpx;">
					<p class="text_year">支出</p>
					<image src="../static/KitchenFinance/expense.png" class="image_icon"></image>
				</view>
				<p class="text_month" style="text-shadow:none;letter-spacing: normal;">{{expense.toFixed(2)}}</p>
			</view>
		</view>
		<view style="margin-right: 0rpx;">
			<!-- <image src="../static/KitchenFinance/statistic.png" class="image_statistic"></image> -->
			<u-button custom-style="font-size:30rpx;font-weight:bold" size="small"
				color="linear-gradient(to right, #6600CC, #d2b4de)" shape="circle" @click="gotoStatistic">统计</u-button>

		</view>
	</view>
</template>

<script>
	export default {
		name: "kitchenIndexTop",
		data() {
			return {
				show: false,
				pickerValue: Number(new Date()), // 当前时间的时间戳
				maxValue: Number(new Date()), // 当前时间的时间戳作为最大值
			};
		},
		props: {
			expense: {
				type: Number,
				default: 0
			}
		},
		computed: {
			// 计算属性：年份
			year() {
				const date = new Date(this.pickerValue);
				return date.getFullYear();
			},
			// 计算属性：月份
			month() {
				const date = new Date(this.pickerValue);
				let month = date.getMonth() + 1; // +1 是因为 getMonth() 返回的月份是 0-11
				return uni.$u.padZero(month); // 格式化为两位数的字符串
			}
		},
		watch: {
			pickerValue(newVal, oldVal) {
				// 当 pickerValue 改变时，通知父组件
				this.$emit('update-date', {
					year: this.year,
					month: this.month
				});
			}
		},
		mounted() {
			this.$emit('update-date', {
				year: this.year,
				month: this.month
			});
		},
		methods: {
			buttonClick() {
				console.log("点击")
				this.show = true;
			},
			change(e) {
				console.log('change', e);
			},
			close() {
				// console.log('close');
				this[`show`] = false;

			},
			confirm(e) {
				// console.log('confirm', e);
				this[`show`] = false;
			},
			cancel() {
				// console.log('cancel');
				this[`show`] = false;
				//this.pickerValue = Number(new Date());
			},
			showSelecter() {
				this.show = true;
				this.$refs.picker.innerValue = this.pickerValue;
			},
			gotoStatistic(){
				uni.navigateTo({
					url:'/pages/KitchenFinance/Statistic'
				})
			}
		}
	}
</script>

<style>
	.content_in {
		width: 90%;
		/* margin-top: 50rpx;
		margin-left: 150rpx; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.date_container {
		display: flex;
		flex-direction: column;
		margin-right: 25rpx;
	}

	.select_container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25rpx;
	}

	.text_year {
		font-size: 40rpx;
		letter-spacing: 1rpx;
		font-weight: bold;
	}

	.text_month {
		font-size: 55rpx;
		letter-spacing: 1rpx;
		font-weight: bold;
		margin-right: 8rpx;
		text-shadow: 2rpx 4rpx 2rpx rgba(0, 0, 0, 0.2);
		/* X偏移, Y偏移, 模糊半径, 颜色 */
	}

	.image_icon {
		margin-left: 5rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.image_statistic {
		width: 50rpx;
		height: 50rpx;
		border: 4rpx solid black;
		border-radius: 10rpx;
	}
</style>