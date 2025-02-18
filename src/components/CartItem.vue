<template>
    <div class="cart-item" v-for="product in products" :key="product.id">
        <img :src="product.thumbnail" :alt="product.title">
        <div class="item-details">
            <p class="item-title">{{ product.title }}</p>
        </div>
        <div class="cart-info">
            <p class="item-price">${{ product.price }}</p>
            <div class="quantity">
                <button @click="decreaseProductCount(product)">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increaseProductCount(product)">+</button>
            </div>
            <p class="total-price">${{ product.price * product.quantity }}</p>
        </div>
        <button class="remove-btn" @click="removeCartItem(product)">Remove</button>
    </div>
</template>

<script setup>
const props = defineProps(['products'])
import { useStore } from 'vuex'

const store = useStore()
const increaseProductCount = (product) => store.dispatch('increaseCartQuantity', product.id);
const decreaseProductCount = (product) => store.dispatch('decreaseCartQuantity', product.id);
const removeCartItem = (product) => store.dispatch('removeCartProduct', product.id);

</script>

<style scoped>
.cart {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.cart-item img {
    width: 80px;
    height: auto;
    border-radius: 5px;
}

.item-details {
    flex: 1;
    margin-left: 15px;
}

.item-title {
    font-size: 18px;
}

.cart-info {
    display: flex;
    justify-content: space-between;
    flex: 2;
    text-align: center;
}

.item-price,
.quantity,
.total-price {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
}

.quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.quantity button {
    background: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
}

.quantity button:hover {
    background: #ccc;
}

.remove-btn {
    background: #ff5733;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.remove-btn:hover {
    background: #e64a19;
}
</style>