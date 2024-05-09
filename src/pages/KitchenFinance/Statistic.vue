<template>
	<view class="content">
		<view class="grid_container">
			<view class="grid_column" :class="{ 'active': isMonth === true }" @click="isMonth=true">
				<p class="grid_title">月账单</p>
			</view>
			<view class="grid_column" :class="{ 'active': isMonth === false }" @click="isMonth=false">
				<p class="grid_title">年账单</p>
			</view>
		</view>
		<kitchenStatisticTop :cnt="count" :expense="expense" style="margin-top: 35rpx;" @update-date="handleUpdateDate">
		</kitchenStatisticTop>
		<view class="image_header">
			<p class="text_header">支出对比</p>
			<image src="../../static/KitchenFinance/bar.png" class="image_icon"></image>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="mount" :opts="opts" :chartData="chartData" />
		</view>
		<view class="image_header" style="margin-top: 15rpx;">
			<p class="text_header">支出类型</p>
			<image src="../../static/KitchenFinance/pie.png" class="image_icon"></image>
		</view>
		<view class="charts-box" style="margin-top: 70rpx;">
			<qiun-data-charts type="pie" :opts="opts1" :chartData="pieData" />
		</view>
	</view>
</template>

<script>
	import kitchenIndexTop from "@/components/kitchenIndexTop-component.vue"
	import kitchenStatisticTop from "@/components/kitchenStatisticTop-component.vue"
	import * as echarts from 'echarts';
	export default {
		components: {
			kitchenIndexTop,
			kitchenStatisticTop
		},
		mounted() {
			//this.updatePieChartData();
		},
		data() {
			return {
				userId: 1,
				isMonth: true,
				year: '2024',
				month: '01',
				count: 0,
				expense:0,
				chartData: {
					/* series: [{
						data: [{
								name: "2024-01",
								value: 300
							},
							{
								name: "2024-02",
								value: 200
							}
							
						]
					}] */
				},
				pieData: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {
						show: false
					},
					xAxis: {
						disableGrid: true,
						/* rotateLabel:true,
						marginTop:10 */
					},
					yAxis: {
						disableGrid: true,
						disabled: true,
						data: [{
							min: 0
						}]
					},
					extra: {
						mount: {
							type: "mount",
							widthRatio: 1.5
						}
					}
				},
				opts1: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					enableScroll: false,
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF",
							linearType: "custom"
						}
					}
				}
			}
		},

		methods: {
			handleUpdateDate(data) {
				console.log('Received year:', data.year);
				console.log('Received month:', data.month);
				uni.request({
					url: `/api/finance/stats?userId=${this.userId}&year=${data.year}&month=${data.month}`,
					method: 'GET',
					success: (res) => {
						console.log("Response object:", res.data); // 查看完整的响应对象
						if (res.data.code === 200) {
							const obj = JSON.parse(res.data.data);
							console.log(obj.billAmounts);
							this.count = obj.billCount;
							this.expense=obj.billSum;
							this.chartData = {
								series: [{
									data: obj.billAmounts.map(item => ({
										name: `${item.year}-${item.month.toString().padStart(2, '0')}`, // 格式化月份为两位数
										value: item.totalAmount
									}))
								}]
							};
							//this.chartData = chartData;
							const pieData = {
								series: [{
									data: obj.multiBillTags.map(item => ({
										name: item.tag, // 格式化月份为两位数
										value: item.count
									}))
								}]
							};
							this.pieData = pieData;
						} else {
							console.error('Failed to fetch bills:', res.data.msg);
						}
					},
					fail: (error) => {
						console.error('Request failed:', error);
					}
				});
			},


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
		background: linear-gradient(to bottom, #FADF53 0%, #FFF1E0 100%);
	}

	.grid_container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 45%;
		margin-top: 60rpx;
	}

	.grid_column {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rpx 10rpx;
		border-bottom: 4rpx solid transparent;
		/* 默认透明 */
	}

	.grid_column.active {
		border-bottom: 4rpx solid black;
		/* 当元素激活时显示边框 */
	}

	.grid_title {
		font-size: 35rpx;
		font-weight: bold;
	}

	.image_header {
		margin-top: 45rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.text_header {
		margin-left: 25rpx;
		font-size: 35rpx;
		font-weight: bold;
	}


	.image_icon {
		margin-left: 10rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.charts-box {
		width: 90%;
		height: 400rpx;
	}
</style>