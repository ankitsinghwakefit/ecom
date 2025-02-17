import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    products: [],
    cart: [],
    productCategories: [],
    limit: 30,
    productsApiCallCount: 1,
  }),
  getters: {
    getAllProducts: state => state.products,
    getCartProducts: state => state.cart,
    getCartTotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    getProductCategories: state => state.productCategories,
  },
  actions: {
    addProduct({ commit }, data) {
      commit('ADD_PRODUCT', data)
    },
    addProductInCart({ commit }, data) {
      commit('ADD_PRODUCT_IN_CART', data)
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
    ADD_PRODUCT(state, data) {
      state.products = data
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
