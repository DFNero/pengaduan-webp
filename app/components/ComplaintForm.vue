<template>
  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="form.title"
      placeholder="Judul"
      class="border p-2 w-full"
    />

    <textarea
      v-model="form.content"
      placeholder="Isi pengaduan"
      class="border p-2 w-full"
    ></textarea>

    <button class="bg-black text-white px-4 py-2">
      Kirim
    </button>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  title: '',
  content: ''
})

const submit = async () => {
  await $fetch('/api/complaints', {
    method: 'POST',
    body: {
      title: form.title,
      content: form.content
    }
  })

  // reset form
  form.title = ''
  form.content = ''
}
</script>
