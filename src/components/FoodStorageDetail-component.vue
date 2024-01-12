<template>
  <div class="detail-popup" v-if="visible">
    <div class="food-detail-card">
      <img :src="foodItem.icon" class="food-icon" />
      <div class="food-info">
        <h3>{{ foodItem.name }}</h3>
        <p class="food-dates">{{ foodItem.purchaseDate }} - {{ foodItem.expiryDate }}</p>
        <p class="food-use-record">使用记录: {{ foodItem.useRecord }}</p>
        <p class="food-quantity">数量: {{ foodItem.amount }}</p>
        <p class="food-remark">备注: {{ foodItem.remark }}</p>
      </div>
      <div class="food-actions">
        <span @click="addToCart(foodItem.id)" class="action-icon add-to-cart"></span>
        <span @click="deleteItem(foodItem.id)" class="action-icon delete-item"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    foodItem: {
      type: Object,
      default: () => ({
        name: '',
        purchaseDate: '',
        expiryDate: '',
        icon: '',
        useRecord: '',
        amount: 0,
        remark: ''
      })
    }
  },
  methods: {
    addToCart(itemId) {
      // Logic to add the item to the cart
      this.$emit('add-to-cart', itemId);
      this.closePopup();
    },
    deleteItem(itemId) {
      // Logic to delete the item
      this.$emit('delete-item', itemId);
      this.closePopup();
    },
    closePopup() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style>
.detail-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 20px;
}

.food-detail-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.food-icon {
  max-width: 100px; /* Adjust as needed */
  border-radius: 10px;
}

.food-info {
  text-align: center;
}

.food-dates,
.food-use-record,
.food-quantity,
.food-remark {
  margin: 10px 0;
}

.food-actions {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.action-icon {
  cursor: pointer;
  display: inline-block;
  width: 30px; /* Adjust as needed */
  height: 30px; /* Adjust as needed */
  background-size: cover;
}

.add-to-cart {
  background-image: url('/path/to/add-icon.png'); /* Replace with your icons */
}

.delete-item {
  background-image: url('/path/to/delete-icon.png'); /* Replace with your icons */
}
</style>
