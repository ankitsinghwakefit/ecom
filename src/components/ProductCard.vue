<template>
<div class="container">
        <h1>Our Products</h1>
        <div class="products">
            <div class="product-card" v-for="product in products" :key="product.id">
                <img :src="product.thumbnail" alt="Product Image" />
                <h2 class="product-title">{{ product.title }}</h2>
                <p class="product-price">${{ product.price }}</p>
                <a href="#" class="btn">Add to Cart</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted,computed } from 'vue'
import { useStore } from 'vuex'

// const getProductImage = computed((product)=>{
//     return product.images[0];
// })

const store = useStore()
const addProductInCart = (products) => store.dispatch('addProductInCart', products)
const products = computed(() => store.getters.getAllProducts)
const getCart = computed(() => store.getters.getCart)
// defineProps({
//   msg: {
//     type: String,
//     required: true,
//   },
// })
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
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .product-card {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s;
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
