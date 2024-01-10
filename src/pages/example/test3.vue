<template>
  <div class="container">
    <img src="../../static/cabbage.jpeg" alt="Your Image" class="image" />
    <p class="centered-text">Your Text Here</p>
  </div>
</template>

<style>
.container {
  position: relative; /* 让容器成为定位上下文 */
  width: 300px; /* 容器宽度 */
  height: 200px; /* 容器高度 */
  border: 1px solid #ccc; /* 边框，可选 */
}

.image {
  width: 100%; /* 图片宽度充满容器 */
  height: 100%; /* 图片高度充满容器 */
  object-fit: cover; /* 图片填充方式，保持比例并填满容器 */
  position: absolute; /* 图片绝对定位 */
  top: 0;
  left: 0;
}

.centered-text {
  position: absolute; /* 文本绝对定位 */
  top: 50%; /* 将文本上边缘置于容器的中间位置 */
  left: 50%; /* 将文本左边缘置于容器的中间位置 */
  transform: translate(-50%, -50%); /* 使用 transform 属性偏移文本的位置，使其在容器中垂直和水平方向上居中 */
  text-align: center; /* 文本水平居中 */
  z-index: 1; /* 设置层叠顺序，确保文本位于图片之上 */
}
</style>
