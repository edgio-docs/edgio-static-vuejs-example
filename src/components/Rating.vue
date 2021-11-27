<template>
  <div class="flex items-center mt-1">
    <svg
      v-for="i in 5"
      :key="i"
      :class="getStyle(i)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        v-if="Math.round(value) >= i + 1"
        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
      />
      <path
        v-else
        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: ['value'],
  methods: {
    getStyle: function (i) {
      return `w-4 h-4 fill-current ${
        Math.round(this.value) >= i + 1 ? 'text-yellow-600' : 'text-gray-400'
      }`
    },
  },
}
</script>