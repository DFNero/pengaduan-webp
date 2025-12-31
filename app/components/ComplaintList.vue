<template>
  <div class="flex gap-6">
    <ul class="w-1/3 border p-4 space-y-2">
      <li
        v-for="c in complaints"
        :key="c.id"
        @click="selected = c"
        class="cursor-pointer hover:bg-gray-100 p-2 rounded"
      >
        <p class="font-semibold">{{ c.title }}</p>
        <p class="text-sm text-gray-500">{{ c.name }}</p>
      </li>
    </ul>

    <div class="flex-1 border p-4" v-if="selected">
      <h2 class="text-xl font-bold">{{ selected.title }}</h2>
      <p class="mt-2">{{ selected.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

const { data: complaints } = await useFetch<Complaint[]>('/api/complaints')

const selected = ref<Complaint | null>(null)
</script>
