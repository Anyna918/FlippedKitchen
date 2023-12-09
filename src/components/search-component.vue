<!-- 名称    : search
	 说明    : 搜索框的组件
	 传入参数: 显示在搜索框带搜索的提示 placeholder
	 传出参数: 返回用户输入的值 SearchMessage
	 具体使用可以参照page/FoodList/FoodListTest.vue 
 -->
<template>

	<div class="container_search">
		<u-search :placeholder="placeholder" v-model="keyword" shape="round" :show-action="true"
			actionText="搜索" :animation="true" @search="sendMessage()" @custom="sendMessage"></u-search>
		<!-- 暂时未处理好语音输入的图标 -->
		<image src="../static/Speaker.png" alt="Image Description" class="search-image" @click="getSpeakREC()"></image>

	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				keyword: '',
				// placeholder: '搜索',
			}
		},
		// props: ['placeholder']
		props: {
			placeholder: String,
		},
		emits: ['SearchMessage'],
		methods: {
			sendMessage() {
				// console.log(this.keyword);
				this.$emit('SearchMessage', this.keyword)
			},
			getSpeakREC() {
				console.log('this is SpeakREC API')
			}

		}
	}
</script>

<style>
	.container_search {
		display: flex;
		align-items: center;
		margin-left: 3%;
		margin-right: 3%;
		/* 纵向居中对齐 */
	}

	.search-image {
		margin-left: 10px;
		width: 20px;
		height: 20px;
		/* 设置图片和搜索框之间的间距 */
		/* 可以根据需要调整其他样式 */
	}

	.search-image:hover {
		transform: scale(1.1);
		/* 示例：放大 10% */
		cursor: pointer;
		/* 鼠标悬停时显示指针 */
	}
</style>