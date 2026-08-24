import { useState } from 'react'
import './App.css'
import { About } from './components/About'
import { BookAppointment } from './components/BookAppointment'
import { Doctors } from './components/Doctors'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Services } from './components/Services'
import { WomenChild } from './components/WomenChild'
import type { Page } from './types'

function App() {
  const [page, setPage] = useState<Page>('home')
  const [bookingDepartment, setBookingDepartment] = useState<string | undefined>()

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openBooking = (department?: string) => {
    setBookingDepartment(department)
    navigate('book')
  }

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} onBook={() => openBooking()} />
      {page === 'home' && <Home onBook={() => openBooking()} onNavigate={navigate} />}
      {page === 'services' && <Services onBook={openBooking} />}
      {page === 'doctors' && <Doctors onBook={openBooking} />}
      {page === 'women-child' && <WomenChild onBook={() => openBooking()} />}
      {page === 'about' && <About onBook={() => openBooking()} />}
      {page === 'book' && <BookAppointment initialDepartment={bookingDepartment} />}
      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
