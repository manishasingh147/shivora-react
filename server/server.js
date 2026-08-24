import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mariadb from 'mariadb'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const pool = mariadb.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'shivora',
  connectionLimit: 5,
})

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_request, response) => response.json({ ok: true }))

app.post('/api/appointments', async (request, response) => {
  const { name, phone, department, datetime, message = '' } = request.body ?? {}
  if (!name || !phone || !department || !datetime) {
    return response.status(400).json({ error: 'name, phone, department and datetime are required' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO appointments (name, phone, department, preferred_datetime, message) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), phone.trim(), department.trim(), datetime.trim(), message.trim()],
    )
    return response.status(201).json({ id: Number(result.insertId), message: 'Appointment request saved' })
  } catch (error) {
    console.error('Appointment insert failed:', error)
    return response.status(500).json({ error: 'Unable to save appointment request' })
  }
})

app.listen(port, () => console.log(`Shivora API listening on http://localhost:${port}`))
