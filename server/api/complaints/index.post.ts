import { db } from '../../utils/db'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const body = await readBody(event)

  await db.query(
    'INSERT INTO complaints (user_id, title, content) VALUES (?, ?, ?)',
    [user.id, body.title, body.content]
  )

  return { success: true }
})
