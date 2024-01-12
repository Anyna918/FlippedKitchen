<template>
	<leftSliding>
		<template v-slot:left>
			<view :class="['content_bill', borderRadiusClass]">
				<view class="tag_container">
					<p class="text_tag">{{bill.tag}}</p>
					<p class="text_comment">{{bill.comment}}</p>
				</view>
				<view class="right_container">
					<view class="tag_container" style="align-items: flex-end;">
						<p class="text_tag">-￥{{bill.amount.toFixed(2)}}</p>
						<p class="text_comment">{{bill.date}}</p>
					</view>
					<image src="../../static/KitchenFinance/edit.png" class="image_edit" @click="editBill"></image>
				</view>
			</view>
		</template>
		<template v-slot:right>
			<p>ddd</p>
		</template>
	</leftSliding>
</template>

<script>
	import leftSliding from "@/components/leftSliding-component.vue"
	export default {
		components: {
			leftSliding
		},
		data() {
			return {
				content: '白菜，学名为Brassica rapa subsp. pekinensis，是一种叶菜类蔬菜，属于十字花科，是我国传统的重要蔬菜之一。白菜原产于中国，具有悠久的栽培历史，广泛分布于亚洲各地。白菜的特点是其肥厚的叶片和紧密的叶头。叶片多层叠加，质地脆嫩，味道清甜。由于其丰富的营养价值和适应性强的生长环境，白菜在中国和世界各地都是一种重要的蔬菜。白菜有多个品种，其中包括大白菜、小白菜、结球白菜等。这些品种在口感、用途和生长周期上有所不同，满足了人们对不同口味和用途的需求。在烹饪上，白菜可以生食、炒制、煮汤等多种方式处理，被广泛用于中餐、韩餐、日餐等亚洲菜系。由于其低热量、高纤维以及丰富的维生素和矿物质含量，白菜也受到了健康饮食的青睐.总体而言，白菜不仅是一种美味可口的蔬菜，还是一种富含营养、易于栽培的重要农产品，对人们的日常饮食和健康生活起着积极的作用.',
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				}
			}
		}
	}
</script>