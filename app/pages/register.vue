<script setup lang="ts">
const { register } = useAuth()
const name = ref('')
const email = ref('')
const password = ref('')

const submit = async () => {
  try {
    await register(name.value, email.value, password.value)
    alert('Register berhasil')
    navigateTo('/login')
  } catch (e: any) {
    alert(e.data?.message || 'Register gagal')
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <input v-model="name" placeholder="Nama" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="submit">Daftar</button>
  </div>
</template>
