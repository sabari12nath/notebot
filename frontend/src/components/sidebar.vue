<template>
  <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 w-52 h-full border-r">
    <h2 class="font-bold text-lg mb-4">KTU Subjects</h2>
    <ul class="space-y-2">
      <li v-for="subject in subjects" :key="subject" @click="$emit('select', subject)"
          class="cursor-pointer hover:text-blue-500 transition">
        📘 {{ subject }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const subjects = ["M1", "M2", "FM", "SOM", "CE Lab", "Surveying", "RM", "TD", "FM2"];
</script>
