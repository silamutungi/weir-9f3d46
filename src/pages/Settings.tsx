import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [creatorType, setCreatorType] = useState('influencer')
  const [cpmTarget, setCpmTarget] = useState('5.00')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    if (!isSupabaseConfigured) {
      setDisplayName('Demo Creator')
      setCreatorType('influencer')
      setCpmTarget('5.00')
      setLoading(false)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setLoading(false); return }
    const { data } = await supabase.from('weir_profiles').select('*').eq('user_id', session.user.id).maybeSingle()
    if (data) {
      setDisplayName(data.display_name)
      setCreatorType(data.creator_type)
      setCpmTarget(String(data.monthly_cpm_target))
    } else {
      setDisplayName(session.user.email?.split('@')[0] ?? '')
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise(r => setTimeout(r, 800))
      setSuccess(true)
      setSaving(false)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setSaving(false); return }
    const payload = { user_id: session.user.id, display_name: displayName, creator_type: creatorType as 'influencer', monthly_cpm_target: parseFloat(cpmTarget) || 0, platforms: [] }
    const { error: upsertError } = await supabase.from('weir_profiles').upsert(payload, { onConflict: 'user_id' })
    setSaving(false)
    if (upsertError) { setError('Save failed. Please try again.') } else { setSuccess(true) }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Settings</h1>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        ) : (
          <div className="space-y-6">
            <Card style={{ borderColor: 'var(--color-border)' }}>
              <CardHeader>
                <CardTitle style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Creator name</Label>
                    <Input id="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creatorType">Creator type</Label>
                    <select id="creatorType" value={creatorType} onChange={e => setCreatorType(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text)', minHeight: '44px' }}>
                      <option value="athlete">Athlete</option>
                      <option value="streamer">Streamer</option>
                      <option value="influencer">Influencer</option>
                      <option value="musician">Musician</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpmTarget">Monthly CPM target ($)</Label>
                    <Input id="cpmTarget" type="number" step="0.01" min="0" value={cpmTarget} onChange={e => setCpmTarget(e.target.value)} />
                  </div>

                  {error && (
                    <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
                      <AlertCircle size={16} aria-hidden="true" />{error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)', color: 'var(--color-success)' }}>
                      <CheckCircle size={16} aria-hidden="true" />Profile saved successfully.
                    </div>
                  )}

                  <Button type="submit" disabled={saving} style={{ backgroundColor: 'var(--color-primary)', color: '#fff', minHeight: '48px', fontWeight: 600 }}>
                    {saving ? <><Loader2 size={16} className="animate-spin mr-2" />Saving...</> : 'Save changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card style={{ borderColor: 'rgba(220,38,38,0.3)' }}>
              <CardHeader>
                <CardTitle style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-error)' }}>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Cancel your subscription at any time. Your data is retained for 30 days before permanent deletion.</p>
                <Button variant="outline" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)', minHeight: '44px' }}>Cancel subscription</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
