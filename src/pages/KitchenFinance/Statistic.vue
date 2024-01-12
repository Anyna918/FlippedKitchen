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
			this.initBarChart(); // 初始化图表
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
				year: '2024',
				month: '01',
				barChart: null, // 用于保存 ECharts 实例的引用
			}
		},
		watch: {
			// 监视 year 和 month 的变化
			year(newYear, oldYear) {
				if (newYear !== oldYear) {
					this.updateChartData();
				}
			},
			month(newMonth, oldMonth) {
				if (newMonth !== oldMonth) {
					this.updateChartData();
				}
			}
		},
		methods: {
			handleUpdateDate(data) {
				console.log('Received year:', data.year);
				console.log('Received month:', data.month);
				this.year = data.year.toString();
				this.month = data.month.toString();
			},
			initBarChart() {
				if (this.barChart === null) { // 只有当实例不存在时才初始化
					const barDom = document.getElementById('barChart');
					this.barChart = echarts.init(barDom);
				}
				this.updateChartData();
			},
			updateChartData() {
				// 根据当前的 year 和 month 获取新数据
				const newData = this.getNewData(this.year, this.month);
				// 更新图表
				this.updateBarChart(newData);
			},
			getNewData(year, month) {
				// 根据当前的年份和月份获取数据
				// 这里您可以根据实际情况获取和返回数据
				// 示例代码，需要根据实际情况调整
				return year === "2024" && month === "01" ? {
					"2024-01": 300,
					"2024-02": 200,
					"2024-03": 350,
					"2024-04": 250,
					"2024-05": 400
				} : {
					"2024-06": 450,
					"2024-07": 320,
					"2024-08": 280,
					"2024-09": 500,
					"2024-10": 370
				};
			},
			updateBarChart(newData) {
				const months = Object.keys(newData);
				const totals = Object.values(newData);


				const option = {
					xAxis: {
						type: 'category',
						data: months
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: totals,
						type: 'bar'
					}]
				};

				this.barChart.setOption(option);
			},
			/* initBarChart() {
				// 示例数据：过去五个月的花销总额
				const monthlyExpenses = [{
						month: '01',
						total: 300
					},
					{
						month: '02',
						total: 200
					},
					{
						month: '03',
						total: 350
					},
					{
						month: '04',
						total: 250
					},
					{
						month: '05',
						total: 400
					}
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
			} */

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