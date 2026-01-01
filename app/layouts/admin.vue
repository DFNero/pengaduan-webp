<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar />

    <div class="flex-1 flex flex-col">
      <Header />

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '~/components/AdminSidebar.vue'
import Header from '~/components/Header.vue'
</script>
