export default defineNuxtRouteMiddleware(() => {
  const user = useState<any>('user')

  if (!user.value || user.value.role !== 'admin') {
    return navigateTo('/login')
  }
})
