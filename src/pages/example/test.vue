<template>
	<h1>hello</h1>
	<div class="bottom-navigation">
		 <div class="nav-item" @click="selectTab('home')" :class="{ 'active': currentTab === 'home' }">
		      <!-- 替换成你的首页图标 -->
		      <i class="fas fa-home"></i>
		</div>
		<div class="nav-item" @click="selectTab('products')" :class="{ 'active': currentTab === 'products' }">
		  <!-- 替换成你的产品页图标 -->
		  <i class="fas fa-box"></i>
		</div>
		<div class="nav-item" @click="selectTab('profile')" :class="{ 'active': currentTab === 'profile' }">
		  <!-- 替换成你的个人资料页图标 -->
		  <i class="fas fa-user"></i>
		</div>
	</div>
</template>

<script>
	
export default{
	// name: 'NavigationBar',
	data() {
		return {
			currentTab: 'home'
		};
	},
	methods: {
		selectTab(tab) {
			this.currentTab = tab;
			console.log(this.currentTab);
		}
	}
	
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