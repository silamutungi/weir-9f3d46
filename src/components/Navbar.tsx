import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Settings', to: '/settings' }
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '64px' }}>
        <Link to="/dashboard" className="font-bold text-xl" style={{ color: 'var(--color-primary)' }}>WEIR</Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-sm font-medium transition-colors" style={{ color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
              {link.label}
            </Link>
          ))}
          <Button onClick={handleLogout} variant="outline" size="sm" aria-label="Log out" style={{ minHeight: '36px' }}>
            <LogOut size={14} className="mr-1" />Log out
          </Button>
        </nav>

        <button className="md:hidden flex items-center justify-center" style={{ width: '44px', height: '44px' }} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} style={{ color: 'var(--color-text)' }} /> : <Menu size={20} style={{ color: 'var(--color-text)' }} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <nav className="px-6 py-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium" style={{ color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text)', backgroundColor: location.pathname === link.to ? 'rgba(37,99,235,0.08)' : 'transparent' }}>
                {link.label === 'Settings' && <Settings size={16} aria-hidden="true" />}
                {link.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full" style={{ color: 'var(--color-error)' }}>
              <LogOut size={16} aria-hidden="true" />Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
