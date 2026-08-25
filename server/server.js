import 'dotenv/config'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import fs from 'node:fs'
import helmet from 'helmet'
import mariadb from 'mariadb'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rateLimit } from 'express-rate-limit'

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  const missing = ['DB_USER', 'DB_PASSWORD'].filter((key) => !process.env[key])
  if (missing.length) {
    console.error(`Missing required environment variable(s): ${missing.join(', ')}`)
    process.exit(1)
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT ?? 4000)

const pool = mariadb.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'shivora',
  connectionLimit: Number(process.env.DB_POOL_SIZE ?? 5),
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,
})

// Behind a reverse proxy / load balancer in production, so req.ip and req.protocol
// reflect the original client rather than the proxy.
if (isProduction) app.set('trust proxy', 1)

app.use(helmet({
  // The site loads Google Fonts via a remote CSS @import and several components set
  // per-element inline styles; a default CSP breaks both. A tighter, explicitly
  // allow-listed policy can replace this once the asset list is finalised.
  contentSecurityPolicy: false,
}))
app.use(compression())
app.use(morgan(isProduction ? 'combined' : 'dev'))

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
app.use(cors({ origin: allowedOrigins }))

app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_request, response) => response.json({ ok: true }))

app.get('/api/doctors', async (_request, response) => {
  try {
    const doctorRows = await pool.query('SELECT id, name, short_name AS shortName, role, book_department AS bookDept FROM doctors ORDER BY id')
    const scheduleRows = await pool.query('SELECT doctor_id AS doctorId, day_of_week AS dayOfWeek, start_minute AS startMinute, end_minute AS endMinute FROM doctor_schedules ORDER BY doctor_id, day_of_week, start_minute')

    const doctors = doctorRows.map((doctor) => {
      const schedule = {}
      for (const row of scheduleRows) {
        if (row.doctorId !== doctor.id) continue
        const day = row.dayOfWeek
        if (!schedule[day]) schedule[day] = []
        schedule[day].push([row.startMinute, row.endMinute])
      }
      return { ...doctor, schedule }
    })

    return response.json(doctors)
  } catch (error) {
    console.error('Fetching doctors failed:', error)
    return response.status(500).json({ error: 'Unable to load doctors' })
  }
})

const appointmentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many appointment requests. Please try again later or call us directly.' },
})

app.post('/api/appointments', appointmentLimiter, async (request, response) => {
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

// Optional single-process deployment: if a built frontend is sitting next to this
// server (npm run build ran first), serve it too, so the whole app is one process
// on one port. Skipped entirely when there's nothing to serve (e.g. local dev, or
// the frontend is hosted separately) -- API-only behavior is unaffected either way.
const clientDist = path.join(__dirname, '..', 'dist')
if (fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist))
  app.use((request, response, next) => {
    if (request.method !== 'GET' || request.path.startsWith('/api/')) return next()
    response.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use((error, _request, response, _next) => {
  if (error?.type === 'entity.parse.failed') {
    return response.status(400).json({ error: 'Invalid JSON body' })
  }
  console.error('Unhandled error:', error)
  return response.status(500).json({ error: 'Internal server error' })
})

const server = app.listen(port, () => console.log(`Shivora API listening on port ${port}`))

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`)
  server.close(() => {
    pool.end().finally(() => process.exit(0))
  })
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
