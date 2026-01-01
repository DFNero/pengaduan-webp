<script setup lang="ts">
const user = useState<any>('user')

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = null
  navigateTo('/login')
}
</script>

<template>
  <header class="h-16 bg-white border-b px-6 flex items-center justify-between">
    <h2 class="font-semibold text-lg">
      Admin Panel
    </h2>

    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-600">
        {{ user?.name }}
      </span>

      <button
        @click="logout"
        class="px-3 py-1 text-sm bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  </header>
</template>
