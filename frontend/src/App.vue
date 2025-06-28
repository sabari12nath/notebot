<template>
  <div class="min-h-screen bg-gray-900 p-6 text-white">
    <h1 class="text-3xl font-bold mb-4">RoastBot 🤖🔥</h1>

    <div class="flex gap-2 mb-4">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Ask something... if you dare 💀"
        class="flex-1 p-3 text-black rounded-lg outline-none"
      />
      <button
        @click="sendMessage"
        class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg font-bold"
      >
        Roast & Help
      </button>
    </div>

    <div v-if="botReply" class="bg-gray-800 p-4 rounded-lg shadow">
      <p class="whitespace-pre-line">{{ botReply }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userInput = ref('')
const botReply = ref('')

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  const res = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userInput.value })
  })

  const data = await res.json()
  botReply.value = data.reply
  userInput.value = ''
}
</script>
