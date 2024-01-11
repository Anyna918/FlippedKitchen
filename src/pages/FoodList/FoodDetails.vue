<template>
	<!-- 食材名称 -->
	<h1 style="margin-top: 5px; margin-bottom: 5px;">{{food_name}}</h1>

	<!-- 食材图片 -->
	<u-scroll-list>
		<view v-for="(item, index) in photo_url" :key="index">
			<image :src="item"></image>
			<!-- <div>hello</div> -->
		</view>
	</u-scroll-list>

	<div class="tags_container">
		<div class="datails_calories_div">
			<p style="align-items: center;">{{calories}} KJ/100g</p>
		</div>


		<div style="position: relative; " v-for="(tag, index) in tags" :key="index">
			<image src="../../static/tag.png" class="tags_card"></image>
			<p class="tags_centered-text">{{tag}}</p>
			<!-- 			<image src="../../static/tag.png" class="tags_card"></image>
			<p class="tags_centered-text">shucai</p>
			<image src="../../static/tag.png" class="tags_card"></image>
			<p class="tags_centered-text">shucai</p> -->
		</div>
		
		

		<div class="container_tags_card" v-for="(tag, index) in tags" :key="index">
			<image src="../../static/tag.png" class="tags_card"></image>
			<p class="tags_words_card">{{tag}}</p>
		</div>


	</div>



	<!--  -->
</template>

<script>
	export default {
		data() {
			return {
				photo_url: [
					"https://cdn.uviewui.com/uview/goods/1.jpg",
					"https://cdn.uviewui.com/uview/goods/2.jpg",
					"https://cdn.uviewui.com/uview/goods/3.jpg",
					"https://cdn.uviewui.com/uview/goods/4.jpg",
					"https://cdn.uviewui.com/uview/goods/5.jpg"
				],
				food_name: '白菜',
				calories: 9999,
				tags: [
					'蔬菜',
					'维生素',
					'营养'
				]
			}
		},
		methods: {



		},
		onLoad(options) {
			// options 中包含了传递过来的参数
			let receivedParamValue = options.data;
			console.log(receivedParamValue); // 输出接收到的参数值
		}

	}
</script>

<style>
	.datails_calories_div {
		display: flex;
		border-radius: 30px;
		background-color: #F8F046;
		width: 81px;
		margin-left: 22px;
		height: 35px;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		font-size: 12px;
	}

	/* 包括卡路里在内的一行的div的样式 */
	.tags_container {
		display: flex;
		align-items: center;

	}

	/* 食物标签的样式 */
	.tags_card {
		width: 57px;
		height: 45px;
		margin-top: 3px;
		margin-left: 8px;
		object-fit: cover;
		/* 图片填充方式，保持比例并填满容器 */
		/*position: absolute; /* 图片绝对定位 */
	}

	/* 标签中的文字样式 */
	.tags_centered-text {
		position: absolute;
		/* 文本绝对定位 */
		top: 47%;
		/* 将文本上边缘置于容器的中间位置 */
		left: 50%;
		/* 将文本左边缘置于容器的中间位置 */
		transform: translate(-50%, -50%);
		/* 使用 transform 属性偏移文本的位置，使其在容器中垂直和水平方向上居中 */
		text-align: center;
		/* 文本水平居中 */
		z-index: 1;
		/* 设置层叠顺序，确保文本位于图片之上 */
		font-size: 10px;

	}
</style>