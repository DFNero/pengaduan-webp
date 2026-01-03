<!-- app\components\ComplaintExportList.vue -->

<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

const { data: complaints } = await useFetch<Complaint[]>('/api/complaints')

const exportWord = async (id: number) => {
  const res = await fetch(`/api/complaints/${id}/export`, {
    credentials: 'include',
  })

  if (!res.ok) {
    alert('Export gagal')
    return
  }

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `pengaduan-${id}.docx`
  a.click()

  URL.revokeObjectURL(url)
}

const exportAll = async () => {
  const res = await fetch('/api/complaints/export', {
    credentials: 'include',
  })

  if (!res.ok) {
    alert('Export gagal')
    return
  }

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'laporan-pengaduan.docx'
  a.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <div>
    <button @click="exportAll">Export Semua</button>

    <ul class="space-y-2 mt-4">
      <li v-for="c in complaints" :key="c.id">
        <h3>{{ c.title }}</h3>
        <button @click="exportWord(c.id)">Export Word</button>
      </li>
    </ul>
  </div>
</template>
