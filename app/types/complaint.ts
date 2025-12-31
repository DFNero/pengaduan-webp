export interface Complaint {
  id: number
  title: string
  content: string
  status: 'baru' | 'diproses' | 'selesai'
  created_at: string
  name: string // dari join users
}
