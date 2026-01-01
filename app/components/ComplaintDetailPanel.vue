<!-- app\components\ComplaintDetailPanel.vue -->

<script setup lang="ts">
import type { Complaint } from '~/types/complaint'

defineProps<{
  complaint: Complaint | null
}>()
</script>

<template>
  <div>
    <div v-if="!complaint">
      <p>Pilih pengaduan untuk melihat detail</p>
    </div>

    <div v-else>
      <h2>{{ complaint.title }}</h2>
      <p>{{ complaint.content }}</p>

      <button
        @click="window.open(`/api/complaints/${complaint.id}/export`, '_blank')"
      >
        Export Word
      </button>
    </div>
  </div>
</template>


