export default defineEventHandler((event) => {
  deleteCookie(event, 'user')
  return { message: 'Logout berhasil' }
})
