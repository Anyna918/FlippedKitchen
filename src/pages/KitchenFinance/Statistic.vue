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
		<view class="image_header">
			<p class="text_header">支出对比</p>
			<image src="../../static/KitchenFinance/bar.png" class="image_icon"></image>
		</view>
		<view id="barChart" style="width: 100%; height: 400rpx;"></view>
		<view class="image_header" style="margin-top: 15rpx;">
			<p class="text_header">支出类型</p>
			<image src="../../static/KitchenFinance/pie.png" class="image_icon"></image>
		</view>
		<view id="pieChart" style="width: 100%; height: 400rpx;margin-top:35rpx;margin-right: 20rpx;"></view>
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
			this.initPieChart(); // 初始化饼图
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
					this.updatePieChartData();
				}
			},
			month(newMonth, oldMonth) {
				if (newMonth !== oldMonth) {
					this.updateChartData();
					this.updatePieChartData();
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
			initPieChart() {
				if (!this.pieChart) { // 只有当实例不存在时才初始化
					const pieDom = document.getElementById('pieChart');
					this.pieChart = echarts.init(pieDom);
				}
				this.updatePieChartData();
			},
			updateChartData() {
				// 根据当前的 year 和 month 获取新数据
				const newData = this.getNewData(this.year, this.month);
				// 更新图表
				this.updateBarChart(newData);
			},
			updatePieChartData() {
				// 使用 getNewPieData 方法获取新的饼图数据
				const newData = this.getNewPieData(this.year, this.month);

				// 准备饼图数据
				const pieData = Object.keys(newData).map(tag => ({
					name: tag,
					value: newData[tag]
				}));
				const option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)' // 显示提示框内容，包括系列名、数据名、数据值和百分比
					},
					legend: {
						orient: 'vertical',
						top: 'bottom',
						left: 'right',
						formatter: function(name) {
							// 计算总和
							let total = 0;
							pieData.forEach(item => {
								total += item.value;
							});

							// 找到当前数据项
							let target;
							for (let i = 0; i < pieData.length; i++) {
								if (pieData[i].name === name) {
									target = pieData[i].value;
									break;
								}
							}

							// 计算百分比
							const percent = ((target / total) * 100);
							return `${name}: ${percent}%`;
						}
					},
					series: [{
						name: '支出类型',
						type: 'pie',
						radius: ['0%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 40,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: pieData
					}]
				};

				// 使用配置项和数据显示图表
				this.pieChart.setOption(option);
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
			getNewPieData(year, month) {
				// 根据年份和月份获取饼图数据
				// 这里您可以根据实际情况获取和返回数据
				// 示例代码，需要根据实际情况调整
				return year === "2024" && month === "01" ? {
					'餐饮': 15,
					'交通': 10,
					'娱乐': 8,
					'购物': 12,
					'其他': 5
				} : {
					'餐饮': 18,
					'交通': 7,
					'娱乐': 14,
					'购物': 9,
					'其他': 6
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
						data: totals.map((value, index) => {
							// 为每个条形指定颜色和显示值
							const color = index === totals.length - 1 ? '#6750AA' :
							'#D2B4DE'; // 最后一个条形红色，其他绿色
							return {
								value: value,
								itemStyle: {
									color: color
								},
								label: {
									show: true,
									position: 'top',
									formatter: '{c}' // 显示具体数值
								}
							};
						}),
						type: 'bar'
					}]
				};

				this.barChart.setOption(option);
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
</style>