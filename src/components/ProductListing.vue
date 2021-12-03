<template>
  <div v-if="products" class="flex flex-col items-center">
    <div class="mt-10 grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <router-link v-for="product in products" :key="product.href" :to="product.href">
        <div class="relative flex flex-col items-center">
          <div
            class="pb-2/3 bg-contain bg-center bg-no-repeat h-48 w-48"
            :style="{ backgroundImage: `url(${product.picture})` }"
          />
          <p class="text-center lowercase font-bold">{{ product.name }}</p>
          <Rating :value="product.rating" />
          <p class="text-center">{{ product.price }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Rating from './Rating.vue'
import { getCategory } from '../lib/cms'
import { prefetch } from '@layer0/prefetch/window'

export default {
  components: {
    Rating,
  },
  data() {
    return {
      products: null,
    }
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => this.fetchData(),
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      const response = await getCategory(this.$route.params.slug)
      this.products = await response.products
      this.products.forEach((item) => {
        prefetch(`/api${item.href}`)
      })
    },
  },
}
</script>