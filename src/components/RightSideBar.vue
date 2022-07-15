<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-col" :key="item" v-for="(item, value, index) in listingItems">
      <h2 class="text-white text-lg font-medium" :class="{ 'mt-10': index > 0 }">
        {{ value }}
      </h2>
      <router-link :key="subItem.name" :to="subItem.route" v-for="subItem in item">
        <h3 class="text-md mt-2 font-light text-[#FFFFFF75]">{{ subItem.name }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      listingItems: {
        Relevance: [
          {
            name: 'Trending',
            route: '/commerce/trending',
          },
          {
            name: 'Latest Arrivals',
            route: '/commerce/latest-arrivals',
          },
          {
            name: 'Price: Low to High',
            route: '/commerce/price-low-to-high',
          },
          {
            name: 'Price: High to Low',
            route: '/commerce/price-high-to-low',
          },
        ],
      },
    }
  },
}
</script>
