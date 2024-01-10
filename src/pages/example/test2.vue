<template>
	<u-scroll-list>
		<view v-for="(item, index) in list" :key="index">
			<image :src="item"></image>
			<!-- <div>hello</div> -->
		</view>
	</u-scroll-list>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					"https://cdn.uviewui.com/uview/goods/1.jpg",
					"https://cdn.uviewui.com/uview/goods/2.jpg",
					"https://cdn.uviewui.com/uview/goods/3.jpg",
					"https://cdn.uviewui.com/uview/goods/4.jpg",
					"https://cdn.uviewui.com/uview/goods/5.jpg"
				]
			}
		}
	}
</script>