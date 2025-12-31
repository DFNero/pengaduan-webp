import { db } from '../../utils/db';
import { getUserFromSession } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { title, content } = body

  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'Data tidak lengkap' })
  }

  await db.query(
    'INSERT INTO complaints (user_id, title, content) VALUES (?, ?, ?)',
    [user.id, title, content]
  )

  return { message: 'Pengaduan berhasil dikirim' }
})
