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
		<kitchenStatisticTop style="margin-top: 35rpx;" @update-date="handleUpdateDate"></kitchenStatisticTop>
		<view id="barChart" style="width: 600rpx; height: 400rpx;"></view>
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
			this.initBarChart();
		},
		data() {
			return {
				isMonth: true,
				bills: [{
						tag: '餐饮',
						comment: '午餐',
						amount: 35.00,
						date: '2024-01-15'
					},
					{
						tag: '交通',
						comment: '地铁费',
						amount: 10.00,
						date: '2024-01-16'
					},
					{
						tag: '购物',
						comment: '书籍购买',
						amount: 80.00,
						date: '2024-01-17'
					}
				],
			}
		},
		methods: {
			handleUpdateDate(data) {
				console.log('Received year:', data.year);
				console.log('Received month:', data.month);
				// 进行进一步的处理
			},
			initBarChart() {
				// 示例数据：过去五个月的花销总额
				const monthlyExpenses = [
				    { month: '01', total: 300 },
				    { month: '02', total: 200 },
				    { month: '03', total: 350 },
				    { month: '04', total: 250 },
				    { month: '05', total: 400 }
				];

				// 基于准备好的 DOM，初始化 echarts 实例
				const barDom = document.getElementById('barChart');
				const barChart = echarts.init(barDom);

				// 指定图表的配置项和数据
				const option = {
					xAxis: {
						type: 'category',
						data: monthlyExpenses.map(item => item.month)
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: monthlyExpenses.map(item => item.total),
						type: 'bar'
					}]
				};

				// 使用刚指定的配置项和数据显示图表
				barChart.setOption(option);
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
</style>