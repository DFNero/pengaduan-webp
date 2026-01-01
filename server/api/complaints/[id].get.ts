import { requireAuth } from '../../utils/auth'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({ statusCode: 403 })
  }

  const id = event.context.params?.id

  const [rows] = await db.query(
    'SELECT * FROM complaints WHERE id = ?',
    [id]
  )

  const data = (rows as any[])[0]

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found'
    })
  }

  return data
})
