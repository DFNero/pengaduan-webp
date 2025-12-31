import { db } from '../../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  const hashed = await bcrypt.hash(password, 10)

  await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed]
  )

  return { message: 'Register berhasil' }
})
