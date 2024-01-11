<!-- 名称    : leftSliding
	 说明    : 卡片向左滑动的组件
	 传入参数: 
	 传出参数: 
	 使用    :
	  <leftSliding>
		<template v-slot: left>
		</template>
		<template v-slot: right>
		</template>
	  </leftSliding>
	 具体使用可以参照components/leftSliding-component.vue
 -->

<template>
	<div class="slider">
		<div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="deleteSlider">
			<!-- 插槽中放具体项目中需要内容         -->
			<slot name="left"></slot>
		</div>
		<div class="remove" ref='remove'>
			<!-- <p>this is shanchu</p> -->
			<slot name="right"></slot>
		</div>
	</div>


</template>

<script type="text/ecmascript-6">
	export default {
		name: "leftSliding-component",
		data() {
			return {
				startX: 0, //触摸位置
				endX: 0, //结束位置
				moveX: 0, //滑动时的位置
				disX: 0, //移动距离
				deleteSlider: '', //滑动时的效果,使用v-bind:style="deleteSlider"
			};
		},
		methods: {
			touchStart(ev) {
				ev = ev || event
				//tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

				if (ev.touches.length == 1) {
					// 记录开始位置
					this.startX = ev.touches[0].clientX;
				}
			},
			touchMove(ev) {
				ev = ev || event;
				//获取删除按钮的宽度，此宽度为滑块左滑的最大距离
				let wd = this.$refs.remove.offsetWidth;
				if (ev.touches.length == 1) {
					// 滑动时距离浏览器左侧实时距离
					this.moveX = ev.touches[0].clientX

					//起始位置减去 实时的滑动的距离，得到手指实时偏移距离
					this.disX = this.startX - this.moveX;
					console.log('disx ', this.disX)
					// 如果是向右滑动或者不滑动，不改变滑块的位置
					if (this.disX < 0 || this.disX == 0) {
						this.deleteSlider = "transform:translateX(0px)";
						// 大于0，表示左滑了，此时滑块开始滑动 
					} else if (this.disX > 0) {
						//具体滑动距离我取的是 手指偏移距离*5。
						this.deleteSlider = "transform:translateX(-" + this.disX * 5 + "px)";

						// 最大也只能等于删除按钮宽度 
						if (this.disX * 5 >= wd) {
							this.deleteSlider = "transform:translateX(-" + wd + "px)";

						}
					}
				}
			},
			touchEnd(ev) {
				ev = ev || event;
				let wd = this.$refs.remove.offsetWidth;
				if (ev.changedTouches.length == 1) {
					let endX = ev.changedTouches[0].clientX;

					this.disX = this.startX - endX;
					console.log('disxend ', this.disX)
					//如果距离小于删除按钮一半,强行回到起点

					if ((this.disX * 5) < (wd / 2)) {

						this.deleteSlider = "transform:translateX(0px)";
					} else {
						//大于一半 滑动到最大值
						this.deleteSlider = "transform:translateX(-" + wd + "px)";
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.slider {
		width: 100%;
		height: 80px;
		position: relative;
		user-select: none;

		.content {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: white;
			z-index: 2;
			//    设置过渡动画
			transition: 0.3s;
			border-radius: 7px;
			padding-top: 5px;

		}

		.remove {
			position: absolute;
			width: 90px;
			height: 70px;
			// background: blue;
			right: 0;
			top: 0;
			// color: black;
			// text-align: center;
			// font-size: 10px;
			// line-height: 10px;
			z-index: 1;
		}
	}
</style>