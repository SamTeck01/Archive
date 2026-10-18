import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { CursorBubble, LightboxProvider, ScrollChrome, Toast } from './components/extras'
import { SavedProvider } from './hooks/useSaved'
import { useReveal } from './hooks/useReveal'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Info from './pages/Info'
import Saved from './pages/Saved'
import NotFound from './pages/NotFound'

// HashRouter keeps "#/..." for routes, so section anchors are written as "/#photography"
// and scrolled to here.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 30)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Page() {
  const { pathname } = useLocation()
  useReveal()
  return (
    <main id="main" tabIndex={-1} key={pathname} className="animate-page outline-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/info/:page" element={<Info />} />
        <Route path="/:category/:slug" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <SavedProvider>
      <LightboxProvider>
        <ScrollManager />
        <a href="#main" onClick={(e) => (e.preventDefault(), document.querySelector('main')?.focus())} className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-amber focus:px-3 focus:py-2">
          Skip to content
        </a>
        <ScrollChrome />
        <Header />
        <Page />
        <Footer />
        <Toast />
        <CursorBubble />
      </LightboxProvider>
    </SavedProvider>
  )
}
