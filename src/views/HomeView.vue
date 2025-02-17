<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const addProduct = () => store.dispatch('addProduct', { prod: { item: 'com' }})
const addProductInCart = () => store.dispatch('addProductInCart', { prod: { item: 'com' }})
const products = computed(() => store.getters.getAllProducts)
const getCart = computed(() => store.getters.getCart)
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
