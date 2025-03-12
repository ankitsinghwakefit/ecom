<template>
  <aside class="filters">
    <h3>Filter Products</h3>
    <div class="filter-group">
      <h4>Category</h4>
      <label v-for="categorie in getCategories" :key="categorie"
        ><input
          type="checkbox"
          name="category"
          @change="toggleCategory(categorie)"
        />
        {{ categorie }}</label
      >
    </div>

    <div class="filter-group">
      <h4>Price Range</h4>
      <label
        ><input
          type="radio"
          name="price"
          @change="handlePriceSortType('asc')"
        />Low to High</label
      >
      <label
        ><input
          type="radio"
          name="price"
          @change="handlePriceSortType('desc')"
        />High to Low</label
      >
    </div>

    <button class="apply-filter" @click="getSearchProducts">
      Apply Filter
    </button>
    <button class="apply-filter" @click="clearSearchProducts">
      Clear Filter
    </button>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const emit = defineEmits(["cleanFilteredProducts"]);

const addFilteredProducts = (filteredProducts) =>
  store.dispatch("addFilteredProduct", filteredProducts);
const resetPeginationIndex = (value) =>
  store.dispatch("resetPeginationIndex", value);
const selectedCategories = ref([]);
const priceSortOrder = ref("asc");
const getCategories = computed(() => store.getters.getProductCategories);
const getAllProducts = computed(() => store.getters.getAllProducts);

const toggleCategory = (category) => {
  let categoryIndex = selectedCategories.value.indexOf(category);
  if (categoryIndex > -1) {
    selectedCategories.value.splice(categoryIndex, 1);
  } else {
    selectedCategories.value.push(category);
  }
};
const handlePriceSortType = (range) => {
  priceSortOrder.value = range;
};

const getSearchProducts = async () => {
  if (selectedCategories.value.length > 0) {
    const filteredProductList = getAllProducts.value.filter((product) => {
      return product.tags.some((tag) => selectedCategories.value.includes(tag));
    });
    if (priceSortOrder.value) {
      filteredProductList.sort((productOne, productTwo) => {
        return priceSortOrder.value === "asc"
          ?  productOne.price - productTwo.price
          : productTwo.price - productOne.price;
      });
    }
    resetPeginationIndex(true);
    emit("cleanFilteredProducts");
    addFilteredProducts(filteredProductList);
  } else {
    return;
  }
};

const clearSearchProducts = () => {
  addFilteredProducts([]);
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
  margin-bottom: 10px;
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
