<template>
  <div class="product-card">
    <div class="product-item" v-if="selectedProduct">
      <div class="flex">
        <div class="p-i-1">
          <img
            :src="selectedProduct.image"
            alt="Produkt"
            width="200"
            height="200"
          />
        </div>

        <div class="p-i-2">
          <h1>{{ selectedProduct.title }}</h1>

          {{ selectedProduct.rating.rate }} –
          {{ selectedProduct.rating.count }} Bewertungen

          <div class="review-w">
            <span
              class="review-b"
              :style="{ width: `${(selectedProduct.rating.rate * 165) / 5}px` }"
            ></span>
            <div class="review-f flex">
              <span v-for="i in 5" :key="i"></span>
            </div>
          </div>

          <em class="t-2 category">
            Kategorie: {{ selectedProduct.category }}
          </em>

          <div class="description">
            <div :class="['t-2', detailsOpen ? 'd-2' : 'd-1']">
              {{ selectedProduct.description }}
              <br />
              <button class="button r-m t-2" @click="toggleInformation">
                {{
                  detailsOpen ? "Details schließen" : "Mehr Details entdecken"
                }}
              </button>
            </div>
          </div>

          <b class="h-1 price"> {{ selectedProduct.price.toFixed(2) }} € </b>

          <div>lieferbar in 1–2 Werktagen</div>

          <button
            class="button t-1 b-r"
            @click="buyArticleByTitle(selectedProduct.title)"
          >
            Artikel kaufen
          </button>
          <button
            class="button t-1 b-g"
            v-if="selectedProduct.favorite == false"
            @click="setFavorites(selectedProduct.id)"
          >
            Artikel merken
          </button>
          <button
            class="button t-1 b-g"
            v-else
            @click="setFavorites(selectedProduct.id)"
          >
            Aus der Merkliste entfernen
          </button>
        </div>
      </div>
    </div>
    <br />
    <div class="product-items" v-if="showProducts.length">
      <h2 class="center">Andere Kunden kaufen auch:</h2>
      <div class="carousel">
        <ProductItem
          v-for="product in showProducts"
          :key="product.id"
          :product="product"
          @open="selectProduct(product)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItem from "./components/ProductItem.vue";
import { useProducts } from "./scripts/script.js";

const {
  products,
  selectedProduct,
  showProducts,
  detailsOpen,
  toggleInformation,
  setFavorites,
  selectProduct,
  buyArticleByTitle,
} = useProducts();
</script>
