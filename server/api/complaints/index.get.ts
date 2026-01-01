import { db } from '../../utils/db'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const [rows] = await db.query(`
    SELECT c.*, u.name
    FROM complaints c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `)

  return rows
})
