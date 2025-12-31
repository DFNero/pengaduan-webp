import type { LoginResponse } from '~/types/auth'

export const useAuth = () => {
  const user = useState<any>('user', () => null)

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })

    user.value = res
    return res
  }

  const register = async (name: string, email: string, password: string) => {
    return await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name, email, password }
    })
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
  }

  return { user, login, register, logout }
}
