import { useState } from 'react'
import './App.css'
import { About } from './components/About'
import { Doctors } from './components/Doctors'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Services } from './components/Services'
import { WomenChild } from './components/WomenChild'
import type { Page } from './types'

function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'services' && <Services />}
      {page === 'doctors' && <Doctors />}
      {page === 'women-child' && <WomenChild />}
      {page === 'about' && <About />}
      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
