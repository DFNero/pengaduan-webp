<!-- app/pages/admin/export.vue -->
<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { data: complaints } = await useFetch<Complaint[]>('/api/complaints')

const exportAll = () => {
  window.open('/api/complaints/export', '_blank')
}

const exportOne = (id: number) => {
  window.open(`/api/complaints/${id}/export`, '_blank')
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-bold">Export Complaints</h1>

    <button @click="exportAll">
      Export Semua Pengaduan
    </button>

    <ul>
      <li v-for="c in complaints" :key="c.id">
        <span>{{ c.title }}</span>

        <button @click="exportOne(c.id)">
          Export DOCX
        </button>
      </li>
    </ul>
  </div>
</template>
