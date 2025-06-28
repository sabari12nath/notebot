<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar @select="insertSubjectPrompt" />
    <div class="flex-1 relative">
      <DarkModeToggle />
      <ChatBox ref="chatBox" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import ChatBox from './components/ChatBox.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'

const insertSubjectPrompt = (subject) => {
  const chat = document.querySelector('input')
  if (chat) chat.value = `Explain important topics in ${subject}`
}
</script>
