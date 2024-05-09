<template>
	<view class="content_intop">
		<view class="select_container">
			<view class="date_container">
				<p class="text_year">{{year}}年{{month}}月</p>
				<u-icon name="arrow-down-fill" color="#000000" size="30rpx" @click="showSelecter"
					style="margin-left: 8rpx;"></u-icon>
			</view>		
			<p style="margin-right:120rpx;font-size: 25rpx;color:#8A8A8A;">共计账{{cnt}}笔，合计</p>
			
		</view>
		<view class="expense_container">			
			<p style="font-size: 55rpx;font-weight: bold;">￥{{expense.toFixed(2)}}</p>
		</view>
		<u-datetime-picker :show="show" mode="year-month" v-model="pickerValue" :maxDate="maxValue" ref="picker"
			closeOnClickOverlay @confirm="confirm" @cancel="cancel" @change="change"
			@close="close"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		name: "kitchenStatisticTop",
		data() {
			return {
				show: false,
				pickerValue: Number(new Date()), // 当前时间的时间戳
				maxValue: Number(new Date()), // 当前时间的时间戳作为最大值
			};
		},
		props: {
			cnt: {
				type: Number,
				default: 0
			},
			expense: {
				type: Number,
				default: 0
			},
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
			gotoStatistic() {
				uni.navigateTo({
					url: '/pages/KitchenFinance/Statistic'
				})
			}
		}
	}
</script>

<style>
	.content_intop {
		width: 100%;
		/* margin-top: 50rpx;
		margin-left: 150rpx; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.expense_container{
		display: flex;
		flex-direction: column;
		margin-right: 40rpx;
	}
	.date_container{
		display: flex;
		flex-direction: row;
	}
	
	.select_container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width:100%;
	}

	.text_year {
		font-size: 37rpx;
		letter-spacing: 1rpx;
		font-weight: bold;
		margin-left:25rpx;
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