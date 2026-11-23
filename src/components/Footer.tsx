import type { Page } from '../types'

type FooterProps = { onNavigate: (page: Page) => void }

const menu: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Our Services' },
  { id: 'doctors', label: 'Our Doctors' },
  { id: 'women-child', label: 'Women & Child Care' },
  { id: 'about', label: 'About Us' },
]

const services = ['Shivora OPD', 'Shivora Lab', 'Shivora Scan', 'Shivora Pharma']

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div>
          <div className="ft-brand">
            <img className="ft-logo" src="/images/408458c6-00b7-46a2-8c9b-7bcfd99c505e.png" alt="Shivora logo" />
            <div className="ft-name">Shivora Healthcare</div>
          </div>
          <div className="ft-tagline">Comprehensive Healthcare for Women and Child</div>
          <div className="ft-about">OPD consultations, Shivora Lab blood tests, Shivora Scan and Shivora Pharma, under one roof.</div>
        </div>
        <div>
          <div className="ft-label">MENU</div>
          <div className="ft-list">
            {menu.map((m) => <button key={m.id} onClick={() => onNavigate(m.id)}>{m.label}</button>)}
          </div>
        </div>
        <div>
          <div className="ft-label">SERVICES</div>
          <div className="ft-list ft-list-dim">
            {services.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>
        <div>
          <div className="ft-label">VISIT US</div>
          <div className="ft-list ft-list-dim">
            <span>Shop No 6, 7, 8, Ground Floor, Vasundhara Mega Mart, Argora Bypass Road, Ranchi</span>
            <a href="tel:+919508992318">+91 95089 92318</a>
            <a href="mailto:care@shivorahealthcare.com">care@shivorahealthcare.com</a>
            <a href="https://www.shivorahealthcare.com">www.shivorahealthcare.com</a>
          </div>
        </div>
      </div>
      <div className="ft-bottom">© 2026 Shivora Healthcare. All rights reserved.</div>
    </footer>
  )
}
