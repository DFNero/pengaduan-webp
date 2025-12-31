<script setup lang="ts">
const { login } = useAuth()
const email = ref('')
const password = ref('')

const submit = async () => {
  try {
    const res = await login(email.value, password.value)
    navigateTo(res.role === 'admin' ? '/admin' : '/user')
  } catch (e: any) {
    alert(e.data?.message || 'Login gagal')
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="submit">Login</button>
  </div>
</template>
