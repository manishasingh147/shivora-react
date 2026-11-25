import { useNavigate } from 'react-router'
import { pagePaths, type Page } from '../types'

const BOOKING_TEL = 'tel:+919508992318'

const trustPoints = [
  { no: '01', title: 'Doctors You Can Trust', desc: 'Gold medalists and senior specialists, not trainees' },
  { no: '02', title: 'Trusted Diagnostics', desc: 'Accurate results, most reports ready same-day' },
  { no: '03', title: 'Advanced Ultrasound', desc: 'High-resolution imaging, reviewed on-site by our specialists' },
  { no: '04', title: 'Care That Knows You', desc: 'Unhurried attention, every visit, every patient' },
]

const serviceCards = [
  { no: '01', title: 'Shivora OPD', desc: 'Senior specialists across Obs & Gynae, Orthopaedics, Paediatrics, Geriatric and General Medicine — unhurried consultations, walk-in or booked.', cta: 'See specialties', image: '/images/OPD.jpeg', bg: 'var(--sage)', fg: 'var(--green)' },
  { no: '02', title: 'Shivora Lab', desc: 'An experienced in-house team running the full range of blood tests, with most reports back the same day.', cta: 'See test list', image: '/images/Lab.jpeg', bg: '#E8C86A', fg: '#3A2E0B' },
  { no: '03', title: 'Shivora Scan', desc: 'High-resolution ultrasound for obstetric, pelvic and musculoskeletal imaging — scanned and read on-site.', cta: 'See scans', image: '/images/Scan.jpeg', bg: '#A9C4E0', fg: '#12283D' },
  { no: '04', title: 'Shivora Pharma', desc: 'Prescribed medicines and generic alternatives dispensed at the counter, so one visit is enough.', cta: 'Learn more', image: '/images/Pharma.jpeg', bg: '#E0A98D', fg: '#3D1C0E' },
]

const doctorTeasers = [
  { name: 'Dr. Apeksha Sahu', role: 'Obstetrician & Gynaecologist', summary: 'A gold medalist through her training, known across the region for infertility and high-risk pregnancy care. Her consultations are unhurried and evidence-based.' },
  { name: 'Dr. Rishi Raj', role: 'Orthopaedic Surgeon', summary: 'A gold medalist and former Senior Resident at AIIMS New Delhi. He brings tertiary-care orthopaedic training to joint, trauma and sports medicine cases.' },
]

export function Home() {
  const navigate = useNavigate()
  const onNavigate = (page: Page) => navigate(pagePaths[page])

  return (
    <main className="home">
      {/* hero */}
      <section className="home-wrap home-hero">
        <div>
          <p className="home-eyebrow">COMPREHENSIVE HEALTHCARE FOR WOMEN AND CHILD</p>
          <h1 className="home-hero-title">Jharkhand's most complete polyclinic for women and child care.</h1>
          <p className="home-hero-lede">Led by <b>Dr. Apeksha Sahu</b>, one of the region's most respected gynaecologists, Shivora sets a new standard in women's and children's healthcare in Ranchi — backed by senior specialists in Orthopaedics, Geriatric and General Medicine, and our own lab, ultrasound and pharmacy under one roof.</p>
          <div className="home-actions">
            <a className="home-pill home-pill-sage" href={BOOKING_TEL}>Book an appointment</a>
            <button className="home-pill home-pill-outline" onClick={() => onNavigate('women-child')}>Women &amp; Child Care</button>
          </div>
        </div>
        <div className="home-figure home-figure-portrait">
          <img src="/images/78c91ade-8069-49c8-a4f3-88ad70d354f8.webp" alt="Dr. Apeksha with a patient" />
        </div>
      </section>

      {/* trust strip */}
      <section className="home-trust">
        <div className="home-wrap home-trust-grid">
          {trustPoints.map((t) => (
            <div className="home-trust-item" key={t.no}>
              <div className="home-trust-no">{t.no}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* women & child spotlight */}
      <section className="home-spotlight">
        <div className="home-wrap home-spotlight-grid">
          <div className="home-figure home-figure-portrait">
            <img src="/images/a014a6aa-2c1e-4253-b261-f28bc1f7451d.webp" alt="Dr. Apeksha Sahu with mother & child" />
          </div>
          <div>
            <p className="home-eyebrow">OUR FOCUS</p>
            <h2 className="home-h2">Comprehensive care for women, and their children</h2>
            <p className="home-body">From adolescence through menopause, and from a newborn's first check-up through childhood — Shivora is built around the two people who need coordinated, unhurried care the most.</p>
            <p className="home-body home-body-last">Led by Dr. Apeksha Sahu, our women's health programme covers infertility, high-risk pregnancy, laparoscopic surgery and hormonal care, alongside dedicated paediatric consultations for your child.</p>
            <button className="home-pill home-pill-green" onClick={() => onNavigate('women-child')}>Explore Women &amp; Child Care</button>
          </div>
        </div>
      </section>

      {/* services overview */}
      <section className="home-wrap home-services">
        <div className="home-section-head">
          <div>
            <p className="home-eyebrow">OUR FACILITIES</p>
            <h2 className="home-h2">Four units. One address.</h2>
          </div>
          <button className="home-link" onClick={() => onNavigate('services')}>View all services →</button>
        </div>
        <div className="home-card-grid">
          {serviceCards.map((s) => (
            <button className="home-card" key={s.no} style={{ background: s.bg, color: s.fg }} onClick={() => onNavigate('services')}>
              <div className="home-card-img"><img src={s.image} alt={s.title} /></div>
              <div className="home-card-body">
                <div className="home-card-no">{s.no}</div>
                <div className="home-card-title">{s.title}</div>
                <div className="home-card-desc">{s.desc}</div>
                <div className="home-card-cta">{s.cta} →</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* doctors teaser */}
      <section className="home-doctors">
        <div className="home-wrap home-doctors-inner">
          <div className="home-section-head">
            <div>
              <p className="home-eyebrow">OUR SPECIALISTS</p>
              <h2 className="home-h2 home-h2-sm">Care led by our consulting doctors</h2>
            </div>
            <button className="home-link" onClick={() => onNavigate('doctors')}>Meet all doctors →</button>
          </div>
          <div className="home-doctor-grid">
            {doctorTeasers.map((d) => (
              <div className="home-doctor" key={d.name}>
                <div className="home-placeholder home-doctor-img"><span>Doctor portrait</span></div>
                <div className="home-doctor-body">
                  <div className="home-doctor-name">{d.name}</div>
                  <div className="home-doctor-role">{d.role}</div>
                  <div className="home-doctor-summary">{d.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* built for jharkhand */}
      <section className="home-wrap home-jharkhand">
        <div>
          <p className="home-eyebrow">BUILT FOR JHARKHAND</p>
          <h2 className="home-h2 home-h2-xs">Doctors who trained elsewhere, and chose to practise here.</h2>
          <p className="home-body home-body-sm">Our consultants have practised at institutions such as AIIMS New Delhi, R.G. Kar and Max Hospitals, across India and abroad. They have returned to their roots to offer the same standard of care here, close to home.</p>
          <p className="home-body home-body-sm home-body-last">Shivora was set up by Saurav Singh, who grew up in Jharkhand, to give those doctors the facilities and support to do that work well.</p>
          <button className="home-link" onClick={() => onNavigate('about')}>Read our story →</button>
        </div>
        <div className="home-placeholder home-jharkhand-img"><span>Founders / clinic exterior</span></div>
      </section>

      {/* CTA */}
      {/* <section className="home-cta">
        <h2>Ready to take the first step?</h2>
        <a className="home-pill home-pill-sage home-pill-lg" href={BOOKING_TEL}>Book your appointment</a>
      </section> */}
    </main>
  )
}
