import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import './App.css'
import { About } from './components/About'
import { Doctors } from './components/Doctors'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { Services } from './components/Services'
import { WomenChild } from './components/WomenChild'
import { pagePaths } from './types'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={pagePaths.home} element={<Home />} />
        <Route path={pagePaths.services} element={<Services />} />
        <Route path={pagePaths.doctors} element={<Doctors />} />
        <Route path={pagePaths['women-child']} element={<WomenChild />} />
        <Route path={pagePaths.about} element={<About />} />
        <Route path="*" element={<Navigate to={pagePaths.home} replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
