import type { Page } from '../types'

type HeaderProps = {
  page: Page
  onNavigate: (page: Page) => void
}

const menuItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Our Services' },
  { id: 'doctors', label: 'Our Doctors' },
  { id: 'women-child', label: 'Women & Child Care' },
  { id: 'about', label: 'About Us' },
]

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="notice">OPD hours: Monday to Saturday, 9am to 8pm <span>·</span> <a href="tel:+919508992318">+91 95089 92318</a></div>
      <div className="nav-wrap">
        <button className="brand" onClick={() => onNavigate('home')} aria-label="Go to Shivora home">
          <img className="brand-mark" src="/images/408458c6-00b7-46a2-8c9b-7bcfd99c505e.png" alt="" />
          <span>Shivora</span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          {menuItems.map((item) => (
            <button className={page === item.id ? 'nav-link active' : 'nav-link'} key={item.id} onClick={() => onNavigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
