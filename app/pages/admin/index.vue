<!-- app/pages/admin/index.vue -->
<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const selectedComplaint = ref<Complaint | null>(null)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <ComplaintList @select="selectedComplaint = $event" />
    <ComplaintDetailPanel :complaint="selectedComplaint" />
  </div>
</template>
