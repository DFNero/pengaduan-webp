<template>
  <aside class="w-64 bg-white border-r min-h-screen p-6">
    <h1 class="text-xl font-bold mb-8">
      Pengaduan
    </h1>

    <nav class="space-y-3">
      <NuxtLink
        to="/admin"
        class="block px-3 py-2 rounded hover:bg-gray-100"
        active-class="bg-gray-200 font-semibold"
      >
        📋 Complaints
      </NuxtLink>

      <NuxtLink
        to="/admin/export"
        class="block px-3 py-2 rounded hover:bg-gray-100"
        active-class="bg-gray-200 font-semibold"
      >
        📤 Export
      </NuxtLink>
    </nav>
  </aside>
</template>
