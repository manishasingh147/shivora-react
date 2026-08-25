import { useEffect, useMemo, useState } from 'react'

type BookAppointmentProps = { initialDepartment?: string }

type Doctor = { name: string; shortName: string; role: string; bookDept: string }

// [start, end) in minutes from midnight, keyed by day-of-week (0=Sun ... 6=Sat)
type Schedule = Record<number, [number, number][]>

type ApiDoctor = Doctor & { id: number; schedule: Schedule }

type Slot = { key: string; doctorName: string; dateKey: string; mins: number }

// Empty string = same-origin ('/api/...'), which is correct when the API serves
// the built frontend itself in production. Dev overrides this in .env.development.
const API_URL = import.meta.env.VITE_API_URL ?? ''

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const DOWLONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function dkey(d: Date) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}

function t12(m: number) {
  const h = Math.floor(m / 60)
  const mm = String(m % 60).padStart(2, '0')
  const ap = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${mm} ${ap}`
}

// Deterministically seeds a slot as pre-booked so the grid isn't all-available.
function seedBooked(key: string) {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 100003
  return h % 5 === 0
}

export function BookAppointment({ initialDepartment }: BookAppointmentProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [schedules, setSchedules] = useState<Record<string, Schedule>>({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [booked, setBooked] = useState<Record<string, boolean>>({})
  const [slot, setSlot] = useState<Slot | null>(null)
  const [slotForm, setSlotForm] = useState({ name: '', phone: '' })
  const [slotConfirmed, setSlotConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/api/doctors`)
      .then((response) => {
        if (!response.ok) throw new Error('Request failed')
        return response.json() as Promise<ApiDoctor[]>
      })
      .then((data) => {
        if (cancelled) return
        setDoctors(data.map(({ name, shortName, role, bookDept }) => ({ name, shortName, role, bookDept })))
        setSchedules(Object.fromEntries(data.map((d) => [d.name, d.schedule])))
      })
      .catch(() => { if (!cancelled) setLoadError('We could not load doctor availability. Please refresh the page or call us directly.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Default doctor: the one matching the department the visitor came from, once loaded, else the first.
  const defaultDoctorName = useMemo(() => {
    const match = initialDepartment && doctors.find((d) => d.bookDept === initialDepartment)
    return (match || doctors[0])?.name
  }, [doctors, initialDepartment])

  const days = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      return d
    })
  }, [])

  const activeKey = selectedDateKey ?? dkey(days[0])
  const activeDate = days.find((d) => dkey(d) === activeKey) ?? days[0]
  const activeDoctorName = selectedDoctor ?? defaultDoctorName
  const activeDoc = doctors.find((d) => d.name === activeDoctorName) ?? doctors[0]

  const activeDateLabel = `${DOWLONG[activeDate.getDay()]}, ${activeDate.getDate()} ${MON[activeDate.getMonth()]} ${activeDate.getFullYear()}`

  const sessions = activeDoc
    ? ((schedules[activeDoc.name] ?? {})[activeDate.getDay()] ?? []).map(([start, end]) => ({
        label: start < 720 ? 'MORNING OPD' : 'EVENING OPD',
        range: `${t12(start)} – ${t12(end)}`,
        slots: Array.from({ length: Math.floor((end - start) / 15) }, (_, i) => {
          const mins = start + i * 15
          const key = `${activeDoc.name}|${activeKey}|${mins}`
          const isBooked = booked[key] ?? seedBooked(key)
          return { key, mins, isBooked }
        }),
      }))
    : []

  const openSlot = (doctorName: string, dateKey: string, mins: number, key: string) => {
    setSlot({ key, doctorName, dateKey, mins })
    setSlotConfirmed(false)
    setSlotForm({ name: '', phone: '' })
    setSubmitError('')
  }
  const closeSlot = () => {
    setSlot(null)
    setSlotConfirmed(false)
  }

  const slotDateLabel = slot
    ? (() => {
        const [y, m, d] = slot.dateKey.split('-').map(Number)
        const date = new Date(y, m - 1, d)
        return `${DOWLONG[date.getDay()]}, ${d} ${MON[m - 1]}`
      })()
    : ''
  const slotFilled = !!(slotForm.name.trim() && slotForm.phone.trim())

  const confirmSlot = async () => {
    if (!slotFilled || !slot || submitting) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: slotForm.name,
          phone: slotForm.phone,
          department: doctors.find((d) => d.name === slot.doctorName)?.bookDept ?? slot.doctorName,
          datetime: `${slotDateLabel}, ${t12(slot.mins)}`,
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setBooked((current) => ({ ...current, [slot.key]: true }))
      setSlotConfirmed(true)
    } catch {
      setSubmitError('We could not confirm your slot. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <section className="book-hero">
        <p className="eyebrow light">Book an appointment</p>
        <h1>Pick a day, a doctor, and a time</h1>
        <p>Each consultation is a 15-minute slot. Bring prior reports if you have them.</p>
      </section>

      {loading ? (
        <p className="book-status">Loading availability…</p>
      ) : loadError || !activeDoc ? (
        <p className="book-status">{loadError || 'No doctors are available for booking right now.'}</p>
      ) : (
        <>
          <div className="date-strip">
            <div className="date-strip-inner">
              {days.map((d) => {
                const key = dkey(d)
                const active = key === activeKey
                return (
                  <button className={active ? 'date-chip active' : 'date-chip'} key={key} onClick={() => setSelectedDateKey(key)}>
                    <div className="date-chip-dow">{DOW[d.getDay()]}</div>
                    <div className="date-chip-dd">{String(d.getDate()).padStart(2, '0')}</div>
                    <div className="date-chip-mon">{MON[d.getMonth()]}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="book-layout">
            <div className="book-doctors">
              <p className="book-doctors-label">Choose a doctor</p>
              {doctors.map((doc) => {
                const active = doc.name === activeDoctorName
                const sched = schedules[doc.name] ?? {}
                const availToday = (sched[activeDate.getDay()] ?? []).length > 0
                const availLabel = availToday
                  ? `Available ${DOWLONG[activeDate.getDay()]} · ${(sched[activeDate.getDay()] ?? []).map((s) => `${t12(s[0])}–${t12(s[1])}`).join(', ')}`
                  : `Not at the polyclinic on ${DOWLONG[activeDate.getDay()]}`
                return (
                  <button className={active ? 'doctor-pick active' : 'doctor-pick'} key={doc.name} onClick={() => setSelectedDoctor(doc.name)}>
                    <div className="doctor-pick-avatar">{doc.shortName}</div>
                    <div className="doctor-pick-info">
                      <h3>{doc.name}</h3>
                      <div className="doctor-pick-role">{doc.role}</div>
                      <div className="doctor-pick-avail" style={{ color: availToday ? 'var(--sage-deep)' : '#b3673f' }}>{availLabel}</div>
                    </div>
                  </button>
                )
              })}
              <p className="book-doctors-note">Can't find a suitable time? Call <a href="tel:+919508992318">+91 95089 92318</a> and our front desk will fit you in.</p>
            </div>

            <div className="book-slots">
              <div className="book-slots-head">
                <div>
                  <h3>{activeDoc.name}</h3>
                  <p>{activeDateLabel}</p>
                </div>
                <div className="book-legend">
                  <span><span className="legend-dot available"></span>Available</span>
                  <span><span className="legend-dot booked"></span>Booked</span>
                </div>
              </div>

              {sessions.length > 0 ? (
                <div className="session-block">
                  {sessions.map((session) => (
                    <div key={session.label}>
                      <div className="session-head">
                        <div className="session-label">{session.label}</div>
                        <div className="session-range">{session.range}</div>
                      </div>
                      <div className="slot-grid">
                        {session.slots.map((s) => (
                          <button
                            className={s.isBooked ? 'slot-btn booked' : 'slot-btn'}
                            disabled={s.isBooked}
                            key={s.key}
                            onClick={() => openSlot(activeDoc.name, activeKey, s.mins, s.key)}
                          >
                            {t12(s.mins)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-sessions">
                  <h3>No OPD on this day</h3>
                  <p>{activeDoc.shortName} does not sit at the polyclinic on {DOWLONG[activeDate.getDay()]}s. Try another date from the strip above.</p>
                </div>
              )}
            </div>
          </div>

          {slot && (
            <div className="modal-backdrop" onClick={closeSlot}>
              <div className="modal slot-modal" onClick={(event) => event.stopPropagation()}>
                <button className="close-button" onClick={closeSlot} aria-label="Close">×</button>
                {slotConfirmed ? (
                  <div className="success-state">
                    <span className="success-mark">✓</span>
                    <h2>Appointment confirmed</h2>
                    <p>{slotForm.name} with {slot.doctorName} at {t12(slot.mins)}, {slotDateLabel}.</p>
                    <p className="slot-note">A confirmation SMS will be sent to {slotForm.phone}. Please arrive 10 minutes early.</p>
                    <button className="button" onClick={closeSlot}>Done</button>
                  </div>
                ) : (
                  <>
                    <p className="eyebrow">Confirm your slot</p>
                    <h2>{t12(slot.mins)}</h2>
                    <p className="slot-sub">{slot.doctorName} · {slotDateLabel}</p>
                    <form onSubmit={(event) => { event.preventDefault(); confirmSlot() }}>
                      <label>Patient name<input required value={slotForm.name} onChange={(event) => setSlotForm((s) => ({ ...s, name: event.target.value }))} /></label>
                      <label>Phone number<input required type="tel" value={slotForm.phone} onChange={(event) => setSlotForm((s) => ({ ...s, phone: event.target.value }))} /></label>
                      {submitError && <p className="form-error">{submitError}</p>}
                      <button className="button submit-button" disabled={!slotFilled || submitting}>{submitting ? 'Confirming...' : 'Confirm appointment'}</button>
                      <p className="slot-footnote">15-minute consultation · pay at the desk</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
