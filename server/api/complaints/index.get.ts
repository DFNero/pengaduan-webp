import { db } from '../../utils/db';
import { getUserFromSession } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event)
  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const [rows] = await db.query(`
    SELECT complaints.*, users.name
    FROM complaints
    JOIN users ON users.id = complaints.user_id
    ORDER BY complaints.created_at DESC
  `)

  return rows
})
