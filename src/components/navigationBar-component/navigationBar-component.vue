<template>
	<h1>hello</h1>
	<view>{{currentTab	}}</view>
	<div class = bottom-navigation>
		 <div class="nav-item" @click="selectTab('冰箱')" :class="{ 'active': currentTab === '冰箱' }">
			  <image src="@/static/Refrigerator.png" style="width: 30px; height: 30px"></image>
			  <p>冰箱</p>
		</div>
		<div class="nav-item" @click="selectTab('食材')" :class="{ 'active': currentTab === '食材' }">
		  <image src="@/static/Ingrediants.png" style="width: 30px; height: 30px"></image>
		  <p>食材</p>
		</div>
		<div class="nav-item" @click="selectTab('购物')" :class="{ 'active': currentTab === '购物' }">
		  <image src="@/static/ShoppingList.png" style="width: 30px; height: 30px"></image>
		  <p>购物</p>
		</div>
		<div class="nav-item" @click="selectTab('财务')" :class="{ 'active': currentTab === '财务' }">
		  <image src="@/static/Finance.png" style="width: 30px; height: 30px"></image>
		  <p>财务</p>
		</div>
	</div>
</template>

<script>
	
export default{
	name: "navigationBar",
	props:{  //传递数据
		name:String,//应用名称
		color:String,//主题颜色
		privacy_url:String,//隐私政策链接
		user_url:String,//用户协议链接
	},
	//组件生命周期
	created:function(e){
	
	},
	data() {
		return {
			currentTab: '冰箱'
		};
	},
	methods: {
		selectTab(tab) {
			this.currentTab = tab;
			console.log(this.currentTab);
		}
	},

	
}
</script>

<style>
	.bottom-navigation {
	  display: flex;
	  justify-content: space-around;
	  align-items: center;
	  position: fixed;
	  bottom: 0;
	  width: 100%;
	  background-color: #f0f0f0;
	  border-top: 1px solid #ccc;
	}
	
	.nav-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  color: #333;
	  padding: 10px;
	  font-size: 20px;
	  cursor: pointer;
	}
	
	.nav-item.active {
	  color: #007bff; /* 激活状态的颜色 */
	}
</style>