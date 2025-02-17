<template>
  <div class="container">
        <h1>Shopping Cart</h1>
        <div class="cart">
            <CartItem :products="cartProducts" />
            <div class="cart-summary">Total: ${{cartTotal}}</div>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue';
import CartItem from './CartItem.vue';
import { useStore } from 'vuex'

const store = useStore()
const cartProducts = computed(() => store.getters.getCartProducts);
const cartTotal = computed(() => store.getters.getCartTotal);
</script>

<style scoped>
 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            background-color: #f8f8f8;
        }
        .container {
            width: 90%;
            margin: auto;
            padding: 20px 0;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
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
        .item-price, .quantity, .total-price {
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
        .cart-summary {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
        }
        .checkout-btn {
            display: block;
            width: 100%;
            text-align: center;
            padding: 10px;
            background: #28a745;
            color: white;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .checkout-btn:hover {
            background: #218838;
        }
</style>
