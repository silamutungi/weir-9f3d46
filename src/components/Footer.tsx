import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>WEIR</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Protect your identity. License your likeness. Get paid.</p>
        </div>
        <nav className="flex gap-6" aria-label="Footer navigation">
          <Link to="/pricing" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <Link to="/login" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Login</Link>
          <Link to="/signup" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
        </nav>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
