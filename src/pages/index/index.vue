<template>
  <view class="content">
    <image class="logo" src="/src/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
	<button @click="goToExample">页面跳转</button>
	
	<view>{{counter.doubleCount}}</view>
  </view>
</template>

<script>
import { ref } from 'vue'
import { useCounterStore } from '@/store/user'
export default {
	data(){
		return{
			
		}
	},
  setup(){
	const counter = useCounterStore();
	const title = ref("hello");
	const show=ref(false);
	return{
		title,
		counter,
		show
	}
  },
  
  onLoad() {},
  methods: {
	  goToExample(){
		  uni.navigateTo({
		  	url: '/pages/FoodStorage/FoodStorage'
		  })
	  },
	  
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.u-picker {
  border: 1px solid red; /* 临时样式，用于检测 */
}
</style>
