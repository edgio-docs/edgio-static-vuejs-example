<template>
  <slot> </slot>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, useSlots } from 'vue'
import { prefetch as doPrefetch } from '@layer0/prefetch/window/index.js'

const slots = useSlots()
const props = defineProps(['url'])
let observer = undefined

const attachObserver = () => {
  if (typeof window !== undefined) {
    // console.log([1])
    if (props.url) {
      // console.log([2])
      observer = new IntersectionObserver((entries) => {
        // console.log([3])
        if (entries[0].isIntersecting) {
          // console.log([4])
          doPrefetch(props.url)
          observer.disconnect()
        }
      })
      // console.log(observer, slots.default())
      if (observer && slots.default() && slots.default()[0] && slots.default()[0].el) {
        // console.log([5])
        observer.observe(slots.default()[0].el)
      }
    }
  }
}

nextTick(() => {
  attachObserver()
})

onMounted(() => {
  attachObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
