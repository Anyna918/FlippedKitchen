<template>	
	    <div class="overlay" v-if="visible"></div>

  <view v-if="visible" class="cart-popup">
	  <h2 class="popup-title">加入购物车</h2>
	  
    <view class="cart-list">
      <checkbox-group @change="onChecklistChange">
        <label v-for="list in shoppingLists" :key="list.id">
          <checkbox :value="list.id">{{ list.name }}</checkbox>
        </label>
      </checkbox-group>
    </view>
    <view class="action-buttons">
      <button @click="confirmAddition">完成</button>
      <button @click="confirmAddition">取消</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    shoppingLists: Array
  },
  data() {
    return {
      selectedLists: []
    };
  },
  methods: {
    onChecklistChange(event) {
      this.selectedLists = event.detail.value;
    },
    confirmAddition() {
      this.$emit('add-to-cart', this.selectedLists);
      this.closePopup();
    },
    closePopup() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style>
	.overlay {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
	  z-index: 999; /* 确保在页面内容之下，弹窗之上 */
	}
.cart-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup-title {
  text-align: center;
  margin-bottom: 20px;
  background-color: #f0f0f0; /* 标题背景色 */
  padding: 10px; /* 标题内边距 */
  border-radius: 10px; /* 标题圆角 */
  font-size: 20px; /* 标题字号 */
}

.cart-list {
  margin-bottom: 20px;
}

.cart-list label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cart-list checkbox {
  border-radius: 50%; /* 圆形复选框 */
  margin-right: 10px; /* 与文本的间距 */
}

.action-buttons {
  display: flex;
  justify-content: space-around;
}

.action-buttons button {
  background-color: #CFF499;
  border: none;
  border-radius: 5px;
  padding: 4px 16px;
  cursor: pointer;
  font-size: 14px;
}

</style>
