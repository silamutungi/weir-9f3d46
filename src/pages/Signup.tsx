import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      navigate('/dashboard')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Account created!</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Taking you to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
          <h1 className="font-bold mt-4 mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Protect your likeness</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Free to start. No credit card required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="displayName">Creator name</Label>
            <Input id="displayName" type="text" placeholder="Your public name" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
          </div>

          {error && (
            <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#fff', minHeight: '48px', fontWeight: 600 }}>
            {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Creating account...</> : 'Start free'}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
