<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Halaman Pengaduan</h1>
    <ComplaintForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
