export default defineNuxtRouteMiddleware((to) => {
  // JANGAN JAGA HALAMAN LOGIN
  if (to.path === '/login') return

  const user = useState('user')

  if (!user.value) {
    return navigateTo('/login')
  }
})
