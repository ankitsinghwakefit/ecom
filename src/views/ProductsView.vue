<template>
  <div class="container">
    <h1>Our Products</h1>
    <div class="search-box">
      <input type="text" v-model="searchKey" placeholder="Search for products...">
      <button @click="getSearchProducts">Search</button>
    </div>
    <div class="content">
      <div v-if="isErrorMsg">Error while fetching products, please check your Internet connection...</div>
      <div v-if="products.length == 0 && !isErrorMsg">{{ productLoadingMsg }}</div>
      <ProductCard />
      <FilterCard />
    </div>
    <div class="load-more-container" v-if="products.length>0">
      <button class="load-more-btn" @click="fetchMoreProducts">Load more Products..</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
const store = useStore()
import ProductCard from '@/components/ProductCard.vue';
import FilterCard from '@/components/FilterCard.vue';

const searchKey = defineModel()
const addProducts = (products) => store.dispatch('addProduct', products)
const addProductCategories = (categories) => store.dispatch('addProductCategories', categories)
const isErrorMsg = ref('')
const productLoadingMsg = ref('Please wait we are loading the product...');
const productLimit = ref(10);
const skipProduct = ref(10);
const products = computed(() => store.getters.getAllProducts)
const fetchMoreProducts = async () => {
  try {
    const searchProducts = await axios.get(`https://dummyjson.com/products?limit=${productLimit.value}&skip=${skipProduct.value}`);
    store.dispatch('addMoreProduct', searchProducts.data.products);
    skipProduct.value = skipProduct.value + productLimit.value;
    isErrorMsg.value = ''
  } catch (error) {
    const message = error.message;
    isErrorMsg.value = message;
  }
}
const getSearchProducts = async () => {
  try {
    if (searchKey.value.length > 3) {
      const searchProducts = await axios.get(`https://dummyjson.com/products/search?q=${searchKey.value}`)
      if(searchProducts.data.products.length == 0){
        productLoadingMsg.value = 'No products found with this search key...'
      }
      store.dispatch('addProduct', searchProducts.data.products);
      isErrorMsg.value = ''
    } else {
      return;
    }
  } catch (error) {
    const message = error.message;
    isErrorMsg.value = message;
  }
}
onMounted(async () => {
  try {
    // below condition will not fetch data again if coming to products page from cart page
    if(products.value.length > 0){
      console.log('products already loaded');
      return;
    }
    const storeProducts = await axios.get('https://dummyjson.com/products?limit=10');
    const productsCategories = await axios.get('https://dummyjson.com/products/categories')
    addProducts(storeProducts.data.products);
    addProductCategories(productsCategories.data)
    isErrorMsg.value = ''
  } catch (error) {
    const message = error.message;
    isErrorMsg.value = message;
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

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.load-more-btn {
  padding: 12px 20px;
  background: #ff5733;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease;
}

.load-more-btn:hover {
  background: #e64a19;
}


@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
  }
}
</style>