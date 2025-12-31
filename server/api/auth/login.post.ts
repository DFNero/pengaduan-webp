import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const [rows]: any = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  if (!rows.length) {
    throw createError({ statusCode: 401, message: 'Email tidak ditemukan' })
  }

  const user = rows[0]
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw createError({ statusCode: 401, message: 'Password salah' })
  }

  setCookie(event, 'user', JSON.stringify({
    id: user.id,
    name: user.name,
    role: user.role,
  }), {
    httpOnly: true,
    path: '/',
  })

  return { message: 'Login berhasil', role: user.role }
})
