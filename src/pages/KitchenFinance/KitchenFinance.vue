<template>
	<view class="content">
		<kitchenIndexTop :expense="billAmount" style="margin-top: 60rpx;" @update-date="handleUpdateDate"></kitchenIndexTop>
		<view class="context_container">
			<view class="nodata_container" v-show="!showBill">
				<image src="../../static/KitchenFinance/nodata.png" class="image_nodata"></image>
				<p class="text_nodata">当前月份没有账单...</p>
			</view>
			<view v-show="showBill" class="data_container">
				<kitchenBill v-for="(bill, index) in bills" :key="index" :bill="bill" :isFirst="index === 0"
					:isLast="index === bills.length - 1" :isOne="bills.length===1" :index="index"
					@edit-bill="handleEditBill"></kitchenBill>
			</view>
		</view>
		<view style="height: 240rpx; "></view>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" mode="bottom" :show="showPopup" :round="10"
			@close="close" @open="open">
			<view class="u-popup-slot">
				<view class="button_popup">
					<p style="margin-left: 30rpx;font-weight: bold;" @click="close(false)">取消</p>
					<p style="margin-right: 30rpx;font-weight: bold;" @click="close(true)" v-if="!isSave">添加</p>
					<p style="margin-right: 30rpx;font-weight: bold;" @click="close(true)" v-if="isSave">保存</p>
				</view>
				<view class="input_container">
					<view class="taginput_container">
						<view style="display: flex;flex-direction: row;align-items: center;margin-bottom: 15rpx;">
							<image src="../../static/KitchenFinance/tag.png"
								style="width:30rpx;height:30rpx;margin-right: 5rpx;"></image>
							<p style="font-size: 35rpx;font-weight: bold;margin-right: 15rpx;">标签</p>
							<up-input placeholder="输入标签" border="bottom" v-model="tagValue" fontSize="30rpx"></up-input>
						</view>
						<view class="tag_container">
							<view v-for="(tag,index) in customTags" :key="index" class="tag">
								<p style="font-size: 20rpx;">{{tag}}</p>
							</view>
						</view>
					</view>
					<view class="taginput_container">
						<view style="display: flex;flex-direction: row;align-items: center;margin-bottom: 15rpx;">
							<image src="../../static/KitchenFinance/comment.png"
								style="width:35rpx;height:35rpx;margin-right: 5rpx;"></image>
							<p style="font-size: 35rpx;font-weight: bold;margin-right: 15rpx;">备注</p>
						</view>
						<u--textarea v-model="commentValue" placeholder="请输入备注" height=20></u--textarea>
					</view>
				</view>
				<view style="width:100%;display: flex;flex-direction: row;justify-content: flex-start;">
					<p style="font-size: 55rpx;font-weight: bold;margin-top: 10rpx;">￥{{inputAmount}}</p>
				</view>
				<view class="input_number">
					<u-keyboard mode="number" :show="showKeyboard" :tooltip="showTitle" :overlay="showTitle"
						@change="change" @backspace="backspace"></u-keyboard>
				</view>

			</view>
		</u-popup>
		<circleButton backColor="#FFCF48" @click="addBill"></circleButton>
		<navigationBar></navigationBar>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import circleButton from '@/components/circleButton-component.vue'
	import navigationBar from "@/components/navigationBar-component.vue"
	import kitchenIndexTop from "@/components/kitchenIndexTop-component.vue"
	import kitchenBill from "@/components/kitchenBill-component.vue"
	export default {
		components: {
			circleButton,
			navigationBar,
			kitchenIndexTop,
			kitchenBill,
		},
		computed: {
			// 计算属性：年份
			showBill() {
				return (this.bills.length > 0);
			}
		},
		data() {
			return {
				userId:1,
				currentYear:new Date().getFullYear(),
				currentMonth:new Date().getMonth() + 1,
				billAmount:0,
				bills: [],
				customTags: ["日常采买", "节日囤货"],
				showPopup: false,
				showKeyboard: true,
				showTitle: false,
				inputAmount: '0',
				dataAmount: 0.00,
				tagValue: '',
				commentValue: '',
				isSave: false,
				currentIndex: -1,
				confirmSave: false,
				successToast: {
					type: 'success',
					title: '成功主题(带图标)',
					message: "添加账单成功",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				},
			}
		},
		watch: {
		    'bills.length': function(newLength, oldLength) {
		        this.billAmount = this.bills.reduce((total, bill) => total + bill.amount, 0);
		    },
			bills: {
			        handler: function (newBills, oldBills) {
			            this.billAmount = newBills.reduce((total, bill) => total + bill.amount, 0);
			        },
			        deep: true
			    }
		},
		methods: {
			handleUpdateDate(data) {
				console.log('Received year:', data.year);
				console.log('Received month:', data.month);
				console.log("The type of currentMonth is:", typeof this.currentMonth);
				// 获取对应账单列表
				this.currentYear=data.year;
				this.currentMonth=data.month;
				this.fetchBills();
			},
			addBill() {
				console.log("添加");
				/* uni.navigateTo({
					url:"/pages/KitchenFinance/AddBill"
				}) */
				uni.$u.sleep().then(() => {
					this.showPopup = !this.showPopup
				})
			},
			fetchBills(){
				uni.request({
					url: `/api/finance/getAllBill?userId=${this.userId}&year=${this.currentYear}&month=${this.currentMonth}`,
					method: 'GET',
					success: (res) => {
						console.log("Response object:", res.data);  // 查看完整的响应对象
						if (res.data.code === 200) {
							res.data.data = JSON.parse(res.data.data);
							this.bills = res.data.data.bills.map(item => ({
								id:item.bill_id,
								tag: item.tag,
								comment: item.bill_remark,
								amount: item.bill_amount,
								date: new Date(item.bill_createtime).toISOString().split('T')[0] // 转换时间戳为日期格式
							})).sort((a, b) => new Date(a.date) - new Date(b.date)); // 按日期排序
							this.billAmount=res.data.data.totalAmount;
						} else {
							console.error('Failed to fetch bills:', res.data.msg);
						}
					},
					fail: (error) => {
						console.error('Request failed:', error);
					}
				});
			},
			open() {
				// console.log('open');
			},
			close(e) {
				this.showPopup = false
				this.confirmSave = e;
				let index = this.currentIndex;
				// 处理保存
				if (this.isSave && this.inputAmount != '0' && this.confirmSave && this.tagValue != '') {
					console.log("编辑账单")
					let bill=this.bills[index];
					uni.request({
					    url: '/api/finance/editBill', // 你的服务器端点 URL
					    method: 'PUT',
					    data: {
							bill_id:bill.id,
					        bill_createtime: bill.date, 
					        bill_amount: parseFloat(this.inputAmount),
					        bill_remark: this.commentValue,
					        tag_id: 0,
					        user_id: this.userId,
					        tag: this.tagValue
					    },
					    header: {
					        'Content-Type': 'application/json' // 设置请求头
					    },
					    success:  (res) => {
							bill.amount = parseFloat(this.inputAmount);
							bill.tag = this.tagValue;
							bill.comment = this.commentValue;
							this.isSave=false;
							this.inputAmount = '0';
							this.tagValue = '';
							this.commentValue = '';
							this.currentIndex = -1; // 重置当前索引
					        
					    },
					    fail: (error) => {
					        // 请求失败的处理
					        console.error(error);
							this.isSave=false;
							this.inputAmount = '0';
							this.tagValue = '';
							this.commentValue = '';
							this.currentIndex = -1; // 重置当前索引
					    }
					});
				} else { //处理添加
					if (this.inputAmount != '0' && this.tagValue != '' && this.confirmSave) {
						console.log("amount", this.inputAmount);
						console.log("tag", this.tagValue);
						console.log("comment", this.commentValue);
						// 获取当前日期并格式化
						const currentDate = new Date();
						const formattedDate = currentDate.toISOString().split('T')[0]; // 格式为 YYYY-MM-DD
						const offset = 8; // 对于东八区，偏移量是+8小时
						const localDate = new Date(currentDate.getTime() + offset * 3600 * 1000);
						const isoString = localDate.toISOString().replace('Z', '+08:00'); // 替换'Z'为东八区的偏移量
						
						uni.request({
						    url: '/api/finance/addBill', // 你的服务器端点 URL
						    method: 'POST',
						    data: {
								bill_id:0,
						        bill_createtime: isoString, // 你的数据字段
						        bill_amount: parseFloat(this.inputAmount),
						        bill_remark: this.commentValue,
						        tag_id: 0,
						        user_id: this.userId,
						        tag: this.tagValue
						    },
						    header: {
						        'Content-Type': 'application/json' // 设置请求头
						    },
						    success:  (res) => {
								const billid=res.data.data;
								if(billid!=-1)
								{
									// 创建新的账单对象
									const newBill = {
										id:billid,
										tag: this.tagValue,
										comment: this.commentValue,
										amount: parseFloat(this.inputAmount), // 确保amount是数字类型
										date: formattedDate
									};	
									// 将新账单添加到bills数组
									this.bills.push(newBill);
									this.showToast(this.successToast);
								}
								this.isSave=false;
								this.inputAmount = '0';
								this.tagValue = '';
								this.commentValue = '';
								this.currentIndex = -1; // 重置当前索引
						        
						    },
						    fail: (error) => {
						        // 请求失败的处理
						        console.error(error);
								this.isSave=false;
								this.inputAmount = '0';
								this.tagValue = '';
								this.commentValue = '';
								this.currentIndex = -1; // 重置当前索引
						    }
						});

						
					}
					else{
						this.isSave=false;
						this.inputAmount = '0';
						this.tagValue = '';
						this.commentValue = '';
						this.currentIndex = -1; // 重置当前索引
					}
					
				}
				 
				//处理添加 刷新页面 top组件更新支付金额
			},
			change(e) {
				// console.log('change');
				if (this.inputAmount == '0') {
					this.backspace();
				}
				this.inputAmount += e;
				console.log(this.inputAmount);
			},
			backspace() {
				this.inputAmount = this.inputAmount.slice(0, -1);
			},
			handleEditBill(index) {
				this.isSave = true;
				this.currentIndex = index;
				console.log('Editing bill at index:', index);
				this.inputAmount = this.bills[index].amount.toString();
				this.tagValue = this.bills[index].tag;
				this.commentValue = this.bills[index].comment;
				uni.$u.sleep().then(() => {
					this.showPopup = !this.showPopup
				})
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url && uni.navigateTo({
							url: params.url
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		background: linear-gradient(to bottom, #FADF53 0%, #FFF1E0 100%);
	}

	.context_container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 85%;

	}

	.nodata_container {

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.data_container {
		margin-top: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
	}

	.image_nodata {

		width: 600rpx;
		height: 600rpx;
	}

	.text_nodata {
		font-size: 35rpx;
		color: #9E9E9E;
	}

	.u-popup-slot {
		width: 100%;
		height: 800rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20rpx;
	}

	.input_container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		width: 100%;
		padding: 0;
	}

	.tag_container {
		display: flex;
		flex-direction: row;
	}

	.taginput_container {
		display: flex;
		flex-direction: column;
		width: 38%;
		border-radius: 30rpx;
		padding: 30rpx;
		background-color: #f4f4f4;
	}

	.tag {
		margin-right: 20rpx;
		border-radius: 5rpx;
		background-color: #e0e4e6;
		padding: 10rpx;
	}

	.button_popup {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 15rpx;
	}
</style>