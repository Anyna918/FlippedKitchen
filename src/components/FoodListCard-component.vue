<template>

	<leftSliding>
		<template v-slot:left>
			<div class="container_card" slot="left" @click="cardClick()">
				<image :src="ImageSrc" alt="Food Image" class="picture_card"></image>
				<div>
					<!-- style="margin-bottom: 20px; margin-left: 30px;" -->
					<p style="font-weight: bold;">{{FoodName}}</p>

					<div class="tags_container">
						<div class="container_tags_card" v-for="(tag, index) in tags" :key="index">
							<image src="../static/tag.jpg" class="tags_card"></image>
							<p class="tags_words_card">{{tag}}</p>

							<!-- 						<image src="../static/tag.jpg" class="tags_card"></image>
						<p class="tags_words_card">{{tags[1]}}</p>
						<image src="../static/tag.jpg" class="tags_card"></image>
						<p class="tags_words_card">{{tags[2]}}</p> -->
						</div>
					</div>
					<p style="color: gray; font-size: 12px">{{synopsis}}</p>

				</div>
			</div>
		</template>

		<template v-slot:right>
			<button @click="toggleButtonColor_1"
				:class="{ 'card_button': true, 'card_button_changed_color': colorChanged_1 }">加入购物车</button>
			<button @click="toggleButtonColor_2"
				:class="{ 'card_button': true, 'card_button_changed_color': colorChanged_2 }">加入存储</button>
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
				synopsis: '',
				colorChanged_1: false, // 初始状态
				colorChanged_2: false, // 初始状态


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
				this.synopsis = '清爽蔬菜, 营养丰富'
			},
			cardClick() {
				uni.navigateTo({
					url: '/pages/FoodList/FoodDetails?data=' + this.FoodName,

				})
			},
			toggleButtonColor_1() {
				this.colorChanged_1 = !this.colorChanged_1; // 切换状态
			},
			toggleButtonColor_2() {
				this.colorChanged_2 = !this.colorChanged_2; // 切换状态
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
		margin-left: 3%;
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

	.tags_container {
		display: flex;
		align-items: center;

	}

	.card_button {
		height: 40px;
		color: aqua;
		background-color: antiquewhite;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card_button_changed_color {
		color: #F9F871;
		background-color: #9827cb;
	}
</style>