// server\api\complaints\export.get.ts

import { requireAuth } from '../../utils/auth'
import { db } from '../../utils/db'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const [rows] = await db.query(`
    SELECT 
      c.id,
      c.title,
      c.content,
      u.name AS user_name,
      c.created_at
    FROM complaints c
    JOIN users u ON u.id = c.user_id
    ORDER BY c.created_at DESC
  `)

  const complaints = rows as any[]

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'LAPORAN PENGADUAN',
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph(''),

          ...complaints.flatMap((c, i) => [
            new Paragraph({
              children: [
                new TextRun({ text: `#${i + 1} ${c.title}`, bold: true }),
              ],
            }),
            new Paragraph(`Nama Pelapor: ${c.user_name}`),
            new Paragraph(`Tanggal: ${new Date(c.created_at).toLocaleString()}`),
            new Paragraph('Isi Pengaduan:'),
            new Paragraph(c.content),
            new Paragraph(''),
            new Paragraph('--------------------------------'),
            new Paragraph(''),
          ]),
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
    'attachment; filename="laporan-pengaduan.docx"'
  )

  return buffer
})
