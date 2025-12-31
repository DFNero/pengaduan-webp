import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const [rows]: any = await db.query(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  )

  if (!rows.length) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Email not found'
    })
  }

  const user = rows[0]

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Wrong password'
    })
  }

  // 🔑 BUAT JWT
  const config = useRuntimeConfig()

	const token = jwt.sign(
	  { id: user.id, role: user.role },
	  config.jwtSecret,
	  { expiresIn: '1d' }
	)


  // 🍪 SIMPAN DI COOKIE
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax'
  })

  // KIRIM DATA AMAN KE FRONTEND
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
})
