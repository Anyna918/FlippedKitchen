<template>
	<h1>this is test for uview </h1>
	<u-action-sheet :list="list" v-model="show"></u-action-sheet>
	<text class="u-line-1">是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛</text>
	<button class="u-reset-button" @click="jump()">点击登录</button>
	<br>
	<view class="u-border-bottom item">
		夫人之相与，俯仰一世，或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外
	</view>
	<br>
	<br>
	<view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.name" border="none"></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()"
				ref="item1">
				<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
					border="none"></u--input>
				<template #right>
					<u-icon name="arrow-right"></u-icon>
				</template>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错"
			@close="showSex = false" @select="sexSelect">
		</u-action-sheet>
	</view>
	
	<br>
	<br>
	<navigationBar></navigationBar>


</template>

<script>
	import {
		ref
	} from 'vue';
	import navigationBar from "@/components/navigationBar-component.vue"
	import uActionSheet from "uview-plus/components/u-action-sheet/u-action-sheet.vue";
	export default {
		components: {
			uActionSheet,
			navigationBar
		},
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true,
				showSex: false,
				model1: {
					userInfo: {
						name: 'uview-plus UI',
						sex: '',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			}
		},
		methods: {
				sexSelect(e) {
					this.model1.userInfo.sex = e.name
					this.$refs.form1.validateField('userInfo.sex')
				},
				jump(){
					uni.navigateTo({
						url: "/pages/FoodList/FoodListTest"
					})
				},
			},
	}
</script>

<style lang="scss" scoped>
	.box {
		color: $u-main-color;
	}

	.count {
		border-color: $u-light-color;
	}

	.item {
		color: $u-primary;
	}
</style>