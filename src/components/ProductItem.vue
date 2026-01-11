<template>
  <div class="carousel-item" @click="$emit('open')">
    <img :src="product.image" alt="Produkt" width="200" height="200" />
    <b class="t-2">{{ product.title }}</b>
    <br />
    <b class="t-2 price"> {{ product.price.toFixed(2) }} € </b>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>
