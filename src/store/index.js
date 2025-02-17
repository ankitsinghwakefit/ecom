import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    products: [],
    cart: []
  }),
  getters: {
    getAllProducts: state => state.products,
    getCart: state => state.cart
  },
  actions: {
    addProduct({ commit }, data) {
      commit('ADD_PRODUCT', data)
    },
    addProductInCart({ commit }, data) {
      commit('ADD_PRODUCT_IN_CART', data)
    }
  },
  mutations: {
    ADD_PRODUCT(state, data) {
      state.products = data
    },
    ADD_PRODUCT_IN_CART(state, data) {
      state.cart = data
    },
    REMOVE_PRODUCT_FROM_CART(state) {
      state.cart = [];
    }
  }
})
