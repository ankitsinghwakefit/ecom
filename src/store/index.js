import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    products: [],
    cart: [],
    filteredProducts: [],
    productCategories: [],
    resetPeginationIndex: false
  }),
  getters: {
    getAllProducts: state => state.products,
    getCartProducts: state => state.cart,
    getAllFilteredProducts : state => state.filteredProducts,
    getCartTotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    getProductCategories: state => state.productCategories,
    getResetPeginationIndex: state => state.resetPeginationIndex,
  },
  actions: {
    addProduct({ commit }, productsData) {
      commit('ADD_PRODUCT', productsData)
    },
    addFilteredProduct({ commit }, products) {
      commit('ADD_FILTERED_PRODUCT', products)
    },
    resetPeginationIndex({ commit }, value) {
      commit('SET_PEGINATION_INDEX', value)
    },
    addMoreProduct({ commit }, productsData) {
      commit('ADD_MORE_PRODUCT', productsData)
    },
    addProductInCart({ commit }, product) {
      commit('ADD_PRODUCT_IN_CART', product)
    },
    increaseCartQuantity({ commit }, productId) {
      commit('INCREASE_CART_QUANTITY', productId)
    },
    decreaseCartQuantity({ commit }, productId) {
      commit('DECREASE_CART_QUANTITY', productId)
    },
    removeCartProduct({ commit }, productId) {
      commit('REMOVE_PRODUCT_FROM_CART', productId)
    },
    addProductCategories({ commit }, categories) {
      commit('ADD_PRODUCT_CATEGORIES', categories)
    }
  },
  mutations: {
    ADD_PRODUCT(state, productsData) {
      state.products = productsData
    },
    ADD_FILTERED_PRODUCT(state, productsData) {
      state.filteredProducts = productsData
    },
    SET_PEGINATION_INDEX(state, value) {
      state.resetPeginationIndex = value;
    },
    ADD_MORE_PRODUCT(state,data){
      state.products = [...state.products, ...data]
    },
    ADD_PRODUCT_IN_CART(state, product) {
      const item = state.cart.find((prod) => prod.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_PRODUCT_FROM_CART(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    INCREASE_CART_QUANTITY(state, productId) {
      const item = state.cart.find((p) => p.id === productId);
      if (item) item.quantity += 1;
    },
    DECREASE_CART_QUANTITY(state, productId) {
      const item = state.cart.find((p) => p.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((p) => p.id !== productId);
      }
    },
    ADD_PRODUCT_CATEGORIES(state, categories) {
      state.productCategories = categories
    }
  }
})
