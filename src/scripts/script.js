import { ref, computed, onMounted, nextTick } from "vue";

export function useProducts() {
  const products = ref([]);
  let favoriteProducts = [];
  const detailsOpen = ref(false);
  const selectedProduct = ref(null);

  const urlToAPI = "https://fakestoreapi.com/products";

  async function fetchData() {
    try {
      const response = await fetch(urlToAPI);
      if (response.status !== 200) throw new Error("API Error");
      products.value = await response.json();

      if (localStorage.getItem("favorites")) {
        favoriteProducts = JSON.parse(localStorage.getItem("favorites"));
      }
    } catch (err) {
      console.error(err);
    }
  }

  function getProductByRandom() {
    const product =
      products.value[Math.floor(Math.random() * products.value.length)];
    product.favorite = favoriteProducts.includes(product.id);
    return product;
  }

  function selectProduct(product) {
    product.favorite = favoriteProducts.includes(product.id);
    selectedProduct.value = product;
  }

  function toggleInformation() {
    detailsOpen.value = !detailsOpen.value;
  }

  function setFavorites(id) {
    if (!favoriteProducts.includes(id)) {
      favoriteProducts.push(id);
      selectedProduct.value.favorite = true;
    } else {
      favoriteProducts.splice(favoriteProducts.indexOf(id), 1);
      selectedProduct.value.favorite = false;
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  }

  function buyArticleByTitle(title) {
    const cleanTitle = title.trim();
    window.open(
      "https://www.google.com/search?q=" + encodeURIComponent(cleanTitle),
      "_blank",
    );
  }

  const showProducts = computed(() => products.value);

  onMounted(async () => {
    await fetchData();
    selectedProduct.value = getProductByRandom();

    await nextTick();
    const elems = document.querySelectorAll(".carousel");
    if (window.M) M.Carousel.init(elems, {});
  });

  return {
    products,
    selectedProduct,
    showProducts,
    detailsOpen,
    toggleInformation,
    selectProduct,
    setFavorites,
    buyArticleByTitle,
  };
}
