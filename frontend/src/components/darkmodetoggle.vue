<template>
  <button @click="toggleDark"
    class="absolute top-4 right-4 text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
    {{ isDark ? '☀ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
