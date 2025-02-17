<template>
  <ProductCard />
</template>

<script setup>
import { onMounted,computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
import ProductCard from '@/components/ProductCard.vue';

const store = useStore()
const addProduct = (products) => store.dispatch('addProduct', products)
const addProductInCart = (products) => store.dispatch('addProductInCart', products)
const products = computed(() => store.getters.getAllProducts)
const getCart = computed(() => store.getters.getCart)
const limit = computed(()=> store.getters.getLimit)
onMounted(async () => {
  try{
    let data = await axios.get('https://dummyjson.com/products?limit=20');
    console.log(data.data.products);
    addProduct(data.data.products);
    console.log(products);
  } catch (error) {
    let message = error.message;
    console.log(message);
}
})
</script>
