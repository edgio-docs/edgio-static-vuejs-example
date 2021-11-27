import Index from './components/Index.vue'
import Product from './components/Product.vue'
import ProductListing from './components/ProductListing.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/category/:slug', component: ProductListing },
    { path: '/product/:slug', component: Product },
  ],
})
