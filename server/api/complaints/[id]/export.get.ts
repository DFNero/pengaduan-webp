// server\api\complaints\[id]\export.get.ts

import { requireAuth } from '../../../utils/auth'
import { db } from '../../../utils/db'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from 'docx'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing complaint ID',
    })
  }

  const [rows] = await db.query(
    `
    SELECT c.id, c.title, c.content, c.created_at, u.name
    FROM complaints c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = ?
    `,
    [id]
  )

  const complaint = (rows as any[])[0]

  if (!complaint) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Complaint not found',
    })
  }

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'LAPORAN PENGADUAN',
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 300 },
          }),

          new Paragraph(`ID: ${complaint.id}`),
          new Paragraph(`Nama Pelapor: ${complaint.name}`),
          new Paragraph(`Tanggal: ${complaint.created_at}`),

          new Paragraph({ text: 'Judul:', spacing: { before: 300 } }),
          new Paragraph({
            children: [new TextRun({ text: complaint.title, bold: true })],
          }),

          new Paragraph({ text: 'Isi Pengaduan:', spacing: { before: 300 } }),
          new Paragraph(complaint.content),
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)

  setHeader(
    event,
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
  setHeader(
    event,
    'Content-Disposition',
    `attachment; filename="pengaduan-${complaint.id}.docx"`
  )

  return buffer
})
