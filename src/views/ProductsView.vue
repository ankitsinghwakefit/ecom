<template>
  <div class="container">
    <h1>Our Products</h1>
    <div class="search-box">
      <input type="text" v-model="searchKey" placeholder="Search for products...">
      <button @click="getSearchProducts">Search</button>
    </div>
    <div class="content">
      <ProductCard />
      <FilterCard />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
const store = useStore()
import ProductCard from '@/components/ProductCard.vue';
import FilterCard from '@/components/FilterCard.vue';

const searchKey = defineModel()
const addProducts = (products) => store.dispatch('addProduct', products)
const addProductCategories = (categories) => store.dispatch('addProductCategories', categories)
const getSearchProducts = async () => {
  if (searchKey.value.length > 3) {
    const searchProducts = await axios.get(`https://dummyjson.com/products/search?q=${searchKey.value}`)
    store.dispatch('addProduct', searchProducts.data.products);
  } else {
    return;
  }
}
onMounted(async () => {
  try {
    const products = await axios.get('https://dummyjson.com/products?limit=20');
    const productsCategories = await axios.get('https://dummyjson.com/products/categories')
    addProducts(products.data.products);
    addProductCategories(productsCategories.data)
  } catch (error) {
    const message = error.message;
    console.log(message);
  }
})
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

.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
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

.content {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
  }
}
</style>