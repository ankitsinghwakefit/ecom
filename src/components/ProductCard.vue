<template>
    <nav class="navbar">
        <h2>ShopNow</h2>
        <RouterLink to="/">Products</RouterLink>
        <RouterLink to="/cart">Cart - {{ getCartProductsCount }}</RouterLink>
    </nav>
<div class="container">
        <h1>Our Products</h1>
        <div class="search-box">
            <input type="text" placeholder="Search for products...">
            <button>Search</button>
        </div>
        <div class="products">
            <div class="product-card" v-for="product in products" :key="product.id">
                <img :src="product.thumbnail" :alt="product.title" />
                <h2 class="product-title">{{ product.title }}</h2>
                <p class="product-price">${{ product.price }}</p>
                <button @click="addProductInCart(product)" class="btn">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const addProductInCart = (product) => store.dispatch('addProductInCart', product)
const products = computed(() => store.getters.getAllProducts)
const getCartProductsCount = computed(() => store.getters.getCartProducts.length);
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
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: white;
            padding: 15px 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .navbar h2 {
            color: #333;
        }
        .cart-icon {
            width: 30px;
            cursor: pointer;
        }
        .search-box {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        .search-box input {
            width: 60%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px 0 0 5px;
            font-size: 16px;
        }
        .search-box button {
            padding: 10px 15px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
            font-size: 16px;
        }
        .search-box button:hover {
            background-color: #218838;
        }
        .products {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        .product-card {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s;
            flex: 1 1 250px;
            max-width: 300px;
        }
        .product-card:hover {
            transform: scale(1.05);
        }
        .product-card img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        .product-title {
            font-size: 18px;
            margin: 10px 0;
        }
        .product-price {
            font-size: 16px;
            color: #ff5733;
            font-weight: bold;
        }
        .btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 15px;
            background: #ff5733;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #e64a19;
        }
</style>
