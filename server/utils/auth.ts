import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export function requireAuth(event: any) {
  const token = getCookie(event, 'token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  return token
}

export function getUserFromSession(event: any) {
  const token = requireAuth(event)
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: number
      role: 'user' | 'admin'
    }
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
}
