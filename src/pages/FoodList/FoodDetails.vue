<template>


	<u-swiper :list="photo_url" :autoplay="false" circular height="500rpx" indicator="true" indicatorActiveColor="#1828f7"
		style="margin: 50rpx; "></u-swiper>

	<!-- 图片之下的第一行 包括名称和收藏、更多-->
	<div class="tags_container">
		<!-- 食材名称 -->
		<h1 style="margin-top: 5px; margin-bottom: 5px;">{{food_name}}</h1>
		<image src="../../static/more.png" @click="clickMore()"
			style="width: 30px; height: 30px; position: absolute; right: 0;"></image>
		<div style="position: absolute; right: 0; margin-top: 60px;" v-if="showmore">
			<p>123</p>
			<p>123</p>
		</div>
	</div>



	<!-- 图片之下的第二行，包括标签和卡路里 -->
	<div class="tags_container">
		<div class="datails_calories_div">
			<p style="align-items: center;">{{calories}} KJ/100g</p>
		</div>


		<div style="position: relative; " v-for="(tag, index) in tags" :key="index">
			<image src="../../static/tag.png" class="tags_card"></image>
			<p class="tags_centered_text">{{tag}}</p>
		</div>

	</div>

	<!-- 图片之下的第三行，包括详细信息 -->
	<div class="details_words_container">
		<u-read-more ref="uReadMore" :shadowStyle="shadowStyle" :showHeight="200" :toggle="true">
			<rich-text :nodes="details"></rich-text>
		</u-read-more>
	</div>




	<!--  -->
</template>

<script>
	export default {
		data() {
			return {
				photo_url: [
					"../../static/cabbage.jpeg",
					"../../static/logo.png",
					"../../static/ShoppingList-1.png",
					"../../static/cabbage.jpeg",
				],
				food_name: '白菜',
				calories: 9999,
				tags: [
					'蔬菜',
					'维生素',
					'营养'
				],
				showmore: 0,
				details: '白菜，是一种叶菜类蔬菜，属于十字花科，是我国传统的重要蔬菜之一。白菜原产于中国，具有悠久的栽培历史，广泛分布于亚洲各地。白菜的特点是其肥厚的叶片和紧密的叶头。叶片多层叠加，质地脆嫩，味道清甜。由于其丰富的营养价值和适应性强的生长环境，白菜在中国和世界各地都是一种重要的蔬菜。白菜有多个品种，其中包括大白菜、小白菜、结球白菜等。这些品种在口感、用途和生长周期上有所不同，满足了人们对不同口味和用途的需求。在烹饪上，白菜可以生食、炒制、煮汤等多种方式处理，被广泛用于中餐、韩餐、日餐等亚洲菜系。由于其低热量、高纤维以及丰富的维生素和矿物质含量，白菜也受到了健康饮食的青睐.总体而言，白菜不仅是一种美味可口的蔬菜，还是一种富含营养、易于栽培的重要农产品，对人们的日常饮食和健康生活起着积极的作用.',
				// 学名为Brassica rapa subsp. pekinensis，
				shadowStyle: {
					backgroundImage: "background: linear-gradient(to bottom, #d5fdc3 0%, #FFFFFF 100%);",

					paddingTop: "100px",
					marginTop: "-100px",
				},
			}
		},
		methods: {
			clickMore() {
				this.showmore = !this.showmore;
			}


		},
		onLoad(options) {
			// options 中包含了传递过来的参数
			let receivedParamValue = options.data;
			console.log(receivedParamValue); // 输出接收到的参数值
		}
	}
</script>

<style>
	body {
		background: linear-gradient(to bottom, #C1FDAC 0%, #FFFFFF 100%);
	}

	.datails_calories_div {
		display: flex;
		border-radius: 30px;
		background-color: #F8F046;
		width: 81px;
		margin-left: 22px;
		margin-right: 11px;
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
		width: 70px;
		height: 58px;
		margin-top: 3px;
		margin-left: 8px;
		object-fit: cover;
		/* 图片填充方式，保持比例并填满容器 */
		/*position: absolute; /* 图片绝对定位 */
	}

	/* 标签中的文字样式 */
	.tags_centered_text {
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
		font-size: 12px;
	}

	.details_words_container {
		margin: 10rpx;
		padding: 50rpx;
		border-radius: 30rpx;
		/*border: 2rpx solid; /* 边框宽度、边框样式、边框颜色 */
		background-color: rgba(221, 254, 209, 1.5);
		



	}
</style>