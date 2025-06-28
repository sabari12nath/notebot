<template>
  <div class="flex flex-col justify-between h-full p-4 w-full">
    <div class="overflow-y-auto space-y-3 mb-4">
      <div v-for="(msg, i) in messages" :key="i" :class="msg.type === 'user' ? 'text-right' : 'text-left'">
        <div :class="msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'"
             class="inline-block px-4 py-2 rounded-xl max-w-[80%]">
          {{ msg.text }}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <input
        v-model="input"
        @keydown.enter="sendMessage"
        type="text"
        class="flex-grow border border-gray-300 rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
        placeholder="Ask something..."
      />
      <button @click="sendMessage"
        class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
        ➤
      </button>
    </div>
    <div class="mt-2 text-sm text-right">
      <button @click="exportChat" class="text-blue-500 hover:underline">Export PDF</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import jsPDF from 'jspdf'

const input = ref('')
const messages = ref([])

const sendMessage = async () => {
  if (!input.value.trim()) return
  messages.value.push({ text: input.value, type: 'user' })

  try {
    const res = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input.value }),
    })
    const data = await res.json()
    messages.value.push({ text: data.response || "No response.", type: 'bot' })
  } catch {
    messages.value.push({ text: "⚠️ Backend connection failed", type: 'bot' })
  }

  input.value = ''
}

const exportChat = () => {
  const doc = new jsPDF()
  messages.value.forEach((msg, idx) => {
    doc.text(`${msg.type === 'user' ? 'You' : 'Bot'}: ${msg.text}`, 10, 10 + idx * 10)
  })
  doc.save('roastbot-chat.pdf')
}
</script>
