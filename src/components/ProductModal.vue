<template>
    <div v-if="isOpen" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <div class="modal-body">
          <img :src="product.image" :alt="product.title" class="product-img" />
          <div class="product-details">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p><strong>Price:</strong> ${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    product: Object,
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style>
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease-in-out;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .product-img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  }
  
  .product-details {
    margin-top: 15px;
  }
  
  .product-details h2 {
    font-size: 22px;
  }
  
  .product-details p {
    font-size: 16px;
    margin: 5px 0;
  }
  
  @keyframes fadeIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @media (max-width: 500px) {
    .modal-content {
      width: 90%;
    }
  }
  </style>
  