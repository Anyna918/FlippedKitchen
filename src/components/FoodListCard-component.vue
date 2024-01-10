<template>

	<leftSliding>
		<template v-slot:left>
			<div class="container_card" slot="left">
				<image :src="ImageSrc" alt="Food Image" class="picture_card"></image>
				<div>
					<!-- style="margin-bottom: 20px; margin-left: 30px;" -->
					<p style="font-weight: bold;">{{FoodName}}</p>
					<div class="container_tags_card"  v-for="(tag, index) in tags" :key="index">
						<image src="../static/tag.jpg" class="tags_card"></image>
						<p class="tags_words_card">{{tag}}</p>
						
<!-- 						<image src="../static/tag.jpg" class="tags_card"></image>
						<p class="tags_words_card">{{tags[1]}}</p>
						<image src="../static/tag.jpg" class="tags_card"></image>
						<p class="tags_words_card">{{tags[2]}}</p> -->
					</div>
					<p style="color: gray; font-size: 12px">{{Details}}</p>

				</div>
			</div>
		</template>

		<template v-slot:right>

			<button style="height: 40px; text-align: center; color: aqua; background-color: antiquewhite;" 
			@click="">this is a button</button>

		</template>

	</leftSliding>




</template>

<script>
	import leftSliding from "@/components/leftSliding-component.vue"
	export default {
		name: 'FoodListCard',
		components: {
			leftSliding
		},
		data() {
			return {
				ImageSrc: '',
				tags: [],
				Details: '',


			}
		},
		//传入参数 卡片名称
		props: {
			FoodName: String,
		},

		emits: ['FoodName'],
		methods: {
			sendMessage() {
				// console.log(this.keyword);
				this.$emit('FoodName', this.keyword)
			},
			getDetails() {
				this.ImageSrc = "../../static/cabbage.jpeg";
				this.tags.push('蔬菜');
				this.tags.push('营养');
				this.tags.push('维生素');
				this.Details = '清爽蔬菜, 营养丰富'


			}
		},
		created() {
			this.getDetails();
		}
	}
</script>

<style>
	.container_card {
		display: flex;
		align-items: center;
		margin-left: 5%;
		/* margin-right: 6%; */
		margin-bottom: 7px;
		height: 70px;

		/* background-color: aqua; */
		border-radius: 15px;
		/* padding: 5px; */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */

		/* 纵向居中对齐 */
	}

	.container_tags_card {
		display: flex;
		align-items: center;
	}

	.picture_card {
		/* margin-left: 5px; */
		width: 60px;
		height: 60px;
		border-radius: 10px;
		margin-right: 4%;
		margin-left: 3%;
	}

	.tags_card {
		width: 25px;
		height: 20px;
		/* margin-top: 3px; */
		margin-right: 1px;
		object-fit: cover;
	}

	.tags_words_card {
		margin-right: 5px;
	}
</style>