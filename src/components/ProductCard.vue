<template>
    <div class="products">
        <div class="product-card" v-for="product in getProductSet" :key="product.id">
            <img :src="product.thumbnail" :alt="product.title"  @click="openProductModal(product)" loading="lazy"/>
            <h2 class="product-title" @click="openProductModal(product)">{{ product.title }}</h2>
            <p class="product-description" @click="openProductModal(product)">{{ getDescription(product.description) }}</p>
            <p class="product-price" @click="openProductModal(product)">${{ product.price }}</p>
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
    productDetails.value = product
    isModalOpen.value = true;
}
const addProductInCart = (product) => store.dispatch('addProductInCart', product)
const allProducts = computed(() => store.getters.getAllProducts)
const productCountIndex = ref(0);
const getProductSet = computed(() => {
    if(getProductsToRender.value.length<10){
        return getProductsToRender.value;
    } else {
        return getProductsToRender.value.slice(0,10);
    }
})
const filteredProducts = computed(() => store.getters.getAllFilteredProducts)
const getProductsToRender = computed(() => {
    if(filteredProducts.value.length > 0){
        return filteredProducts.value
    } else {
        return allProducts.value;
    }
})
const getDescription = ((description)=> {
    return description.substring(0,70) + '...';
})
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
