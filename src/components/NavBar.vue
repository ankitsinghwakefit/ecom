<template>
    <header>
        <div>
            <nav class="navbar">
                <h1>VENIA</h1>
                <RouterLink to="/">Products</RouterLink>
                <div class="dropdown">
                    <button class="dropbtn">Categories</button>
                    <div class="dropdown-content">
                        <button v-for="categories in getCategories" :key="categories.slug"
                            @click="getCategProducts(categories.url)">{{ categories.name }}</button>
                    </div>
                </div>
                <div class="cart-container">
                    <router-link to="/cart">
                        🛒 <span v-if="cartProductsCount > 0">({{ cartProductsCount }})</span>
                    </router-link>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import axios from 'axios';
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const cartProductsCount = computed(() => store.getters.getCartProducts.length);
const getCategories = computed(() => store.getters.getProductCategories);
const getCategProducts = async (url) => {
    const products = await axios.get(url);
    store.dispatch('addProduct', products.data.products)
}
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
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

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #ff5733;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
    overflow: hidden;
    flex-direction: column;
    max-height: 250px;
    overflow-y: auto;
}

.dropdown-content button {
    background: none;
    border: none;
    color: black;
    padding: 10px 15px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 16px;
}

.dropdown-content button:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: flex;
}

@media (min-width: 1024px) {
    nav {
        text-align: center;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>