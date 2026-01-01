import { requireAuth } from '../../utils/auth'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const id = event.context.params?.id
  const body = await readBody(event)

  await db.query(
    'UPDATE complaints SET response = ? WHERE id = ?',
    [body.response, id]
  )

  return { success: true }
})
