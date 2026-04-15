import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      navigate('/dashboard')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Invalid email or password. Please try again.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
          <h1 className="font-bold mt-4 mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Sign in to your creator dashboard</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="rounded-lg px-4 py-3 mb-6 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)', color: 'var(--color-info)' }}>
            <AlertCircle size={16} />
            Demo mode — click Sign in to explore the dashboard.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>

          {error && (
            <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#fff', minHeight: '48px', fontWeight: 600 }}>
            {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Signing in...</> : 'Sign in'}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          No account? <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Start free</Link>
        </p>
      </div>
    </div>
  )
}
