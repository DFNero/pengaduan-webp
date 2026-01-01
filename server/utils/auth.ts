import { getCookie, createError, H3Event } from 'h3'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: number
  role: 'user' | 'admin'
}

export function requireAuth(event: H3Event): JwtPayload {
  const token = getCookie(event, 'token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const config = useRuntimeConfig()

  if (!config.jwtSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'JWT secret not configured',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwtSecret
    ) as JwtPayload

    return decoded
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    })
  }
}
