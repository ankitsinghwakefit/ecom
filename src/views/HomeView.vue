<script setup>
import { onMounted,computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore()
const addProduct = () => store.dispatch('addProduct', { prod: { item: 'com' }})
const addProductInCart = () => store.dispatch('addProductInCart', { prod: { item: 'com' }})
const products = computed(() => store.getters.getAllProducts)
const getCart = computed(() => store.getters.getCart)
onMounted(async () => {
  try{
    let data = await axios.get('https://dummyjson.com/products');
    console.log(data.data);
  } catch (error) {
    let message = error.message;
    console.log(message);
}
})
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the Home page</p>
    <button @click="addProduct">addProduct</button>
    <button @click="addProductInCart">addProductInCart</button>
    <pre>products: {{ products }}</pre>
    <p>{{ getCart }}</p>
  </div>
</template>
