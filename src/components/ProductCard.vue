<template>
    <div class="products">
        <div v-if="products.length == 0">Please wait, we are loading products...</div>
        <div class="product-card" v-for="product in products" :key="product.id" @click="openProductModal(product)">
            <img :src="product.thumbnail" :alt="product.title" />
            <h2 class="product-title">{{ product.title }}</h2>
            <p class="product-price">${{ product.price }}</p>
            <button @click="addProductInCart(product)" class="btn">Add to Cart</button>
        </div>
        <ProductModal 
            v-if="isModalOpen"
            :product="productDetails"
            :isOpen="isModalOpen"
            @close="isModalOpen = false"
            />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ProductModal from './ProductModal.vue'

const store = useStore()
const isModalOpen = ref(false)
const productDetails = ref(null)
const openProductModal = (product) => {
    console.log("isModalOpen.value", isModalOpen.value)
    productDetails.value = product
    isModalOpen.value = true;

}
const addProductInCart = (product) => store.dispatch('addProductInCart', product)
const products = computed(() => store.getters.getAllProducts)
</script>

<style scoped>
.products {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 75%;
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

.content {
    display: flex;
    gap: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .products {
        width: 100%;
    }
}
</style>
