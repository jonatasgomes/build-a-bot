import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.cost, 0);
  });
  return { cart, cartTotal };
});