import { useState, useEffect, useCallback } from 'react'
import { AlertTriangle, CheckCircle, DollarSign, Eye, Loader2, RefreshCw, Plus, XCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { WeirDetection, WeirEarning } from '../types/index'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import { formatCurrency, formatDate } from '../lib/utils'

const SEED_DETECTIONS: WeirDetection[] = [
  { id: '1', user_id: 'demo', platform: 'TikTok', url: 'https://tiktok.com/example', content_type: 'ad', status: 'pending', quality_score: 87, fraud_risk: 'low', detected_at: new Date(Date.now() - 3600000).toISOString(), created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'Instagram', url: 'https://instagram.com/example', content_type: 'post', status: 'monetized', quality_score: 92, fraud_risk: 'low', detected_at: new Date(Date.now() - 86400000).toISOString(), created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', url: 'https://youtube.com/example', content_type: 'video', status: 'disputed', quality_score: 45, fraud_risk: 'high', detected_at: new Date(Date.now() - 172800000).toISOString(), created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'Twitch', url: 'https://twitch.com/example', content_type: 'video', status: 'approved', quality_score: 78, fraud_risk: 'low', detected_at: new Date(Date.now() - 259200000).toISOString(), created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Twitter', url: 'https://twitter.com/example', content_type: 'image', status: 'pending', quality_score: 61, fraud_risk: 'medium', detected_at: new Date(Date.now() - 345600000).toISOString(), created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'Facebook', url: 'https://facebook.com/example', content_type: 'ad', status: 'takedown', quality_score: 22, fraud_risk: 'high', detected_at: new Date(Date.now() - 432000000).toISOString(), created_at: new Date().toISOString(), deleted_at: null }
]

const SEED_EARNINGS: WeirEarning[] = [
  { id: 'e1', user_id: 'demo', platform: 'TikTok', detection_id: '1', amount: 420.50, cpm: 6.20, impressions: 67823, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null },
  { id: 'e2', user_id: 'demo', platform: 'Instagram', detection_id: '2', amount: 318.75, cpm: 8.40, impressions: 37946, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null },
  { id: 'e3', user_id: 'demo', platform: 'YouTube', detection_id: null, amount: 890.00, cpm: 12.30, impressions: 72358, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null }
]

const statusColors: Record<string, string> = {
  pending: 'var(--color-warning)',
  approved: 'var(--color-success)',
  disputed: 'var(--color-error)',
  monetized: 'var(--color-info)',
  takedown: 'var(--color-text-muted)'
}

const fraudColors: Record<string, string> = {
  low: 'var(--color-success)',
  medium: 'var(--color-warning)',
  high: 'var(--color-error)'
}

export default function Dashboard() {
  const [detections, setDetections] = useState<WeirDetection[]>([])
  const [earnings, setEarnings] = useState<WeirEarning[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    if (!isSupabaseConfigured) {
      await new Promise(r => setTimeout(r, 600))
      setDetections(SEED_DETECTIONS)
      setEarnings(SEED_EARNINGS)
      setLoading(false)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setLoading(false); return }
    const [dRes, eRes] = await Promise.all([
      supabase.from('weir_detections').select('*').eq('user_id', session.user.id).is('deleted_at', null).order('detected_at', { ascending: false }),
      supabase.from('weir_earnings').select('*').eq('user_id', session.user.id).is('deleted_at', null).order('created_at', { ascending: false }).limit(10)
    ])
    if (dRes.error || eRes.error) {
      setError('Failed to load your data. Please retry.')
    } else {
      setDetections((dRes.data ?? []) as WeirDetection[])
      setEarnings((eRes.data ?? []) as WeirEarning[])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, status: WeirDetection['status']) {
    setActionLoading(id + status)
    if (isSupabaseConfigured) {
      await supabase.from('weir_detections').update({ status }).eq('id', id)
    }
    setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d))
    setActionLoading(null)
  }

  const totalEarnings = earnings.reduce((s, e) => s + e.amount, 0)
  const pendingCount = detections.filter(d => d.status === 'pending').length
  const monetizedCount = detections.filter(d => d.status === 'monetized').length

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="text-center py-2 text-sm font-medium" style={{ backgroundColor: 'rgba(37,99,235,0.10)', color: 'var(--color-info)', borderBottom: '1px solid rgba(37,99,235,0.2)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Dashboard</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Real-time protection and earnings overview</p>
          </div>
          <Button onClick={load} variant="outline" size="sm" aria-label="Refresh dashboard">
            <RefreshCw size={16} className="mr-2" />Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        ) : error ? (
          <div className="rounded-xl p-8 text-center border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <XCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--color-error)' }} />
            <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{error}</p>
            <Button onClick={load} size="sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Retry</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card style={{ borderColor: 'var(--color-border)' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <DollarSign size={16} />Total Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{formatCurrency(totalEarnings)}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>This period</p>
                </CardContent>
              </Card>
              <Card style={{ borderColor: 'var(--color-border)' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <AlertTriangle size={16} />Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: pendingCount > 0 ? 'var(--color-warning)' : 'var(--color-text)' }}>{pendingCount}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Detections awaiting action</p>
                </CardContent>
              </Card>
              <Card style={{ borderColor: 'var(--color-border)' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={16} />Monetized Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-success)' }}>{monetizedCount}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Active licensed uses</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Recent Detections</h2>
                {detections.length === 0 ? (
                  <div className="rounded-xl p-12 text-center border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                    <Eye size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>No detections yet</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR will alert you the moment your likeness appears online.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {detections.map(d => (
                      <div key={d.id} className="rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{d.platform}</span>
                            <Badge style={{ backgroundColor: statusColors[d.status] + '22', color: statusColors[d.status], border: `1px solid ${statusColors[d.status]}44`, fontSize: '11px' }}>{d.status}</Badge>
                            <Badge style={{ backgroundColor: fraudColors[d.fraud_risk] + '22', color: fraudColors[d.fraud_risk], border: `1px solid ${fraudColors[d.fraud_risk]}44`, fontSize: '11px' }}>{d.fraud_risk} risk</Badge>
                          </div>
                          <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{d.content_type} · Quality {d.quality_score}/100 · {formatDate(d.detected_at)}</p>
                        </div>
                        {d.status === 'pending' && (
                          <div className="flex gap-2 flex-shrink-0">
                            <Button size="sm" disabled={actionLoading !== null} onClick={() => updateStatus(d.id, 'monetized')} style={{ backgroundColor: 'var(--color-success)', color: '#fff', minHeight: '36px' }}>
                              {actionLoading === d.id + 'monetized' ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                            </Button>
                            <Button size="sm" disabled={actionLoading !== null} onClick={() => updateStatus(d.id, 'approved')} style={{ backgroundColor: 'var(--color-info)', color: '#fff', minHeight: '36px' }}>
                              {actionLoading === d.id + 'approved' ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                            </Button>
                            <Button size="sm" disabled={actionLoading !== null} onClick={() => updateStatus(d.id, 'disputed')} style={{ backgroundColor: 'var(--color-error)', color: '#fff', minHeight: '36px' }}>
                              {actionLoading === d.id + 'disputed' ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Earnings by Platform</h2>
                {earnings.length === 0 ? (
                  <div className="rounded-xl p-8 text-center border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                    <DollarSign size={32} className="mx-auto mb-2" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No earnings recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {earnings.map(e => (
                      <div key={e.id} className="rounded-xl p-4 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{e.platform}</span>
                          <span className="font-bold" style={{ color: 'var(--color-success)', fontSize: 'var(--text-subhead)' }}>{formatCurrency(e.amount)}</span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>CPM {formatCurrency(e.cpm)} · {new Intl.NumberFormat(undefined).format(e.impressions)} impr.</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
