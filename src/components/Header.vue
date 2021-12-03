<template>
  <div class="bg-white pt-2 flex flex-col items-center">
    <router-link to="/">
      <img
        width="200"
        height="55.59"
        alt="Layer0 Logo"
        title="Layer0 Logo"
        src="/layer0-icon.svg"
      />
      <div class="text-center text-gray-700">Vue 3 Example</div>
    </router-link>
    <div
      v-if="categories.length > 0"
      class="flex flex-col items-center w-full border-b-[1px] border-[#eaeaea]"
    >
      <div class="py-4 w-2/3 md:flex flex flex-row justify-between">
        <router-link v-for="item in categories" :key="item.categoryName" :to="item.href">
          {{ item.categoryName }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories } from '../lib/cms'
import { prefetch } from '@layer0/prefetch/window'

export default {
  name: 'Header',
  data() {
    return {
      categories: [],
    }
  },
  async created() {
    const res = await getCategories()
    this.categories = res.categories
    this.categories.forEach((item) => {
      prefetch(`/api${item.href}`)
    })
  },
}
</script>