<template>
    <aside class="filters">
        <h3>Filter Products</h3>
        <div class="filter-group">
            <h4>Category</h4>
            <label v-for="categorie in getCategories" :key="categorie.slug"><input type="radio" name="category"
                    @change="toggleCategory(categorie.slug)"> {{ categorie.name }}</label>
        </div>

        <div class="filter-group">
            <h4>Price Range</h4>
            <label><input type="radio" name="price" @change="selectPriceRange('asc')">Low to High</label>
            <label><input type="radio" name="price" @change="selectPriceRange('desc')">High to Low</label>
        </div>

        <div class="filter-group">
            <h4>Sort by Name</h4>
            <label><input type="radio" name="title" @change="selectNameSort('title')">By Name</label>
        </div>

        <button class="apply-filter" @click="getSearchProducts">Apply Filter</button>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
const store = useStore()

// I have used selectedCategories as string as dummyjson.com does not provide any endpoint to search multiple categories
// it only supports single category at a time otherwise multiple categories can be stored in an array
const selectedCategories = ref('');
const selectedPriceRange = ref('asc');
const selectedNameSort = ref('');
const getCategories = computed(() => store.getters.getProductCategories);
const toggleCategory = (category) => {
    selectedCategories.value = category;
};
const selectPriceRange = (range) => {
    selectedPriceRange.value = range;
};
const selectNameSort = (name) => {
    selectedNameSort.value = name;
}
const getSearchProducts = async () => {
    if (selectedCategories.value.length > 0) {
        if(selectedNameSort.value){
            const searchProducts = await axios.get(`https://dummyjson.com/products/category/${selectedCategories.value}?sortBy=${selectedNameSort.value}&order=${selectedPriceRange.value}`)
            store.dispatch('addProduct', searchProducts.data.products);
            return;
        }
        const searchProducts = await axios.get(`https://dummyjson.com/products/category/${selectedCategories.value}?sortByorder=${selectedPriceRange.value}`)
        store.dispatch('addProduct', searchProducts.data.products);
    } else {
        return;
    }
}
</script>

<style scoped>
.filters {
    width: 25%;
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

.filters h3 {
    margin-bottom: 10px;
}

.filter-group {
    margin-bottom: 15px;
}

.filter-group h4 {
    margin-bottom: 5px;
}

.filter-group label {
    display: block;
    margin: 5px 0;
}

.apply-filter {
    background: #28a745;
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
}

.apply-filter:hover {
    background: #218838;
}

@media (max-width: 768px) {
    .filters {
        width: 100%;
    }
}
</style>