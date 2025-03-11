<template>
  <div class="container">
    <h1>Our Products</h1>
    <div class="search-box">
      <input
        type="text"
        v-model="searchKey"
        placeholder="Search for products..."
      />
      <button @click="getSearchProducts">Search</button>
    </div>
    <div class="content">
      <div v-if="isErrorMsg">
        Error while fetching products, please check your Internet connection...
      </div>
      <div v-if="productsForRender.length == 0 && !isErrorMsg">
        {{ productLoadingMsg }}
      </div>
      <ProductCard :products="productsForRender" />
      <FilterCard @cleanFilteredProducts="cleanFilteredProducts" />
    </div>
    <div class="load-more-container" v-if="productsForRender.length > 0">
      <button
        class="load-more-btn"
        @click="loadMoreProducts"
        :disabled="isLoadMoreDisabled"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
import ProductCard from "@/components/ProductCard.vue";
import FilterCard from "@/components/FilterCard.vue";

const searchKey = defineModel();
const addProducts = (products) => store.dispatch("addProduct", products);
const addProductCategories = (categories) =>
  store.dispatch("addProductCategories", categories);
const isErrorMsg = ref("");
const productLoadingMsg = ref("Please wait we are loading the product...");
const isLoadMoreDisabled = ref(false);
const filteredProducts = computed(() => store.getters.getAllFilteredProducts);
const allProducts = computed(() => store.getters.getAllProducts);
const isResetPeginationIndex = computed(
  () => store.getters.getResetPeginationIndex
);
const resetPeginationIndex = (value) =>
  store.dispatch("resetPeginationIndex", value);
const productCountIndex = ref(0);
const buttonLabel = computed(() => {
  return isLoadMoreDisabled.value ? "No more product" : "Load more Products";
});
const searchResults = reactive([]);
const cleanFilteredProducts = () => {
  searchResults.value = [];
};
const productsForRender = computed(() => {
  return searchResults.value?.length ? searchResults.value : getProductSet();
});
const getProductSet = () => {
  if (!getProductsToRender.value.length) {
    return [];
  } else if (getProductsToRender.value.length < 10) {
    isLoadMoreDisabled.value = true;
    return getProductsToRender.value;
  } else {
    if (isResetPeginationIndex.value) {
      productCountIndex.value = 0;
    }
    let updatedIndex =
      productCountIndex.value === 0 ? 10 : productCountIndex.value * 10;
    updatedIndex = updatedIndex + productCountIndex.value * 10;
    resetPeginationIndex(false);
    if (updatedIndex > getProductsToRender.value.length) {
      isLoadMoreDisabled.value = true;
      return getProductsToRender.value;
    }
    isLoadMoreDisabled.value = false;
    return getProductsToRender.value.slice(0, updatedIndex);
  }
};
const getProductsToRender = computed(() => {
  if (filteredProducts.value.length > 0) {
    return filteredProducts.value;
  } else {
    return allProducts.value;
  }
});
const loadMoreProducts = () => {
  productCountIndex.value += 1;
  getProductSet();
};
const getSearchProducts = () => {
  if (searchKey.value.length < 2) {
    return;
  }
  searchResults.value = getProductsToRender.value.filter((product) => {
    return product.title.toLowerCase().includes(searchKey.value.toLowerCase());
  });
  searchKey.value = "";
};
const getProductCategories = (products) => {
  const categories = [];
  products.forEach((product) => {
    product?.tags?.forEach((tag) => {
      if (categories.indexOf(tag) >= 0) {
        return;
      } else {
        categories.push(tag);
      }
    });
  });
  addProductCategories(categories);
};

onMounted(async () => {
  if (getProductSet().length > 0) {
    return;
  }
  fetch("https://dummyjson.com/products")
    .then((data) => data.json())
    .then((productsData) => {
      addProducts(productsData.products);
      getProductCategories(productsData.products);
      isErrorMsg.value = "";
    })
    .catch((error) => {
      const message = error.message;
      isErrorMsg.value = message;
    });
});
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

.load-more-btn:disabled {
  padding: 12px 20px;
  background: #eee;
  cursor: not-allowed;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  transition: 0.3s ease;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
  }
}
</style>
