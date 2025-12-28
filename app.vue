<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Initialize dark mode from localStorage
onMounted(() => {
  const colorMode = localStorage.getItem("color-mode")
  if (colorMode === "dark" || (!colorMode && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
})
</script>
