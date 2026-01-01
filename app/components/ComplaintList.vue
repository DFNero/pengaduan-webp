<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

const emit = defineEmits<{
  (e: 'select', complaint: Complaint): void
}>()

const { data: complaints } = await useFetch<Complaint[]>('/api/complaints')
</script>

<template>
  <div class="bg-white border rounded p-4">
    <h2>Complaints</h2>

    <ul>
      <li
        v-for="c in complaints"
        :key="c.id"
        @click="emit('select', c)"
        class="cursor-pointer hover:bg-gray-100 p-2"
      >
        <h3>{{ c.title }}</h3>
        <p>{{ c.content }}</p>
      </li>
    </ul>
  </div>
</template>
