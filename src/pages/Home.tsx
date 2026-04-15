import { Link } from 'react-router-dom'
import { Shield, Zap, DollarSign, Eye, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Footer from '../components/Footer'

const features = [
  { icon: '🛡️', title: 'Real-Time Detection', desc: 'AI scans social platforms and ad networks 24/7, alerting you the moment your likeness appears without authorization.' },
  { icon: '⚡', title: 'One-Tap Actions', desc: 'Approve, monetize, or issue a takedown on any detected use — directly from your dashboard in seconds.' },
  { icon: '💰', title: 'CPM Earnings Tracking', desc: 'See exactly what you earn per platform, per deal. Full payment history with transparent CPM splits and zero hidden fees.' },
  { icon: '📋', title: 'Licensing Templates', desc: 'Create customizable licenses by platform and restriction level. Define your terms once, apply them everywhere.' },
  { icon: '⚖️', title: 'Dispute Resolution', desc: 'Single-pane enforcement for unlicensed commercial uses. Document, submit, and track disputes without leaving WEIR.' },
  { icon: '🎯', title: 'Deal Quality Scoring', desc: 'Automated fraud detection and quality scoring before you commit. Stop wasting time on low-value or suspicious deals.' }
]

const pricingPlans = [
  { name: 'Starter', price: 0, period: 'Free forever', features: ['5 active detections', 'Basic CPM tracking', '2 license templates', 'Email alerts'], cta: 'Start free', highlighted: false },
  { name: 'Creator', price: 29, period: 'per month', features: ['Unlimited detections', 'Full earnings dashboard', 'Unlimited templates', 'Dispute tools', 'Priority alerts', 'Compliance reports'], cta: 'Try it free', highlighted: true },
  { name: 'Pro', price: 79, period: 'per month', features: ['Everything in Creator', 'Multi-platform API', 'Custom fraud thresholds', 'Dedicated support', 'Team access', 'White-label reports'], cta: 'Get started', highlighted: false }
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '64px' }}>
          <Link to="/" className="text-white font-bold text-xl tracking-tight">WEIR</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/pricing" className="text-sm font-medium" style={{ color: 'rgba(241,245,249,0.75)' }}>Pricing</Link>
            <Link to="/login" className="text-sm font-medium" style={{ color: 'rgba(241,245,249,0.75)' }}>Login</Link>
            <Link to="/signup">
              <Button size="sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Start free</Button>
            </Link>
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <Link to="/login" className="text-sm text-white">Login</Link>
            <Link to="/signup"><Button size="sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Start free</Button></Link>
          </div>
        </div>
      </header>

      <section
        className="relative flex items-center overflow-hidden"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1699062139074-f7b6f776c4de?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRpdmUlMjBwcm9mZXNzaW9uYWwlMjByZXZpZXdpbmclMjBob2xvZ3JhcGhpYyUyMGRhdGF8ZW58MHwwfHx8MTc3NjI0MjU3Nnww&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100svh' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 35%, rgba(15,23,42,0.55) 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32" style={{ paddingTop: '120px' }}>
          <Badge className="mb-6 text-xs font-semibold" style={{ backgroundColor: 'rgba(96,165,250,0.15)', color: '#93C5FD', border: '1px solid rgba(96,165,250,0.3)' }}>AI-Powered NIL Protection</Badge>
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.15', maxWidth: '680px', letterSpacing: '-0.02em' }}>
            Your identity earns money everywhere. Make sure you get paid.
          </h1>
          <p className="mb-10 font-medium" style={{ color: 'rgba(241,245,249,0.80)', fontSize: '1.1875rem', lineHeight: '1.6', maxWidth: '520px' }}>
            WEIR monitors unauthorized uses of your name, image, and likeness in real time — then helps you monetize, license, or enforce in one tap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup">
              <Button size="lg" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 600, minHeight: '52px', paddingLeft: '32px', paddingRight: '32px' }}>
                Get your dashboard
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)', minHeight: '52px', paddingLeft: '32px', paddingRight: '32px' }}>
                See pricing
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-12">
            {['Athletes', 'Streamers', 'Influencers', 'Musicians'].map(t => (
              <span key={t} className="text-sm font-medium" style={{ color: 'rgba(241,245,249,0.60)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Everything you need to own your NIL</h2>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', maxWidth: '480px' }}>From detection to payment, WEIR handles the full lifecycle so you can focus on creating.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="card-hover rounded-xl p-6 border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-muted)' }} id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Transparent pricing. No surprises.</h2>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>Cancel any time. Two clicks, no questions asked.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map(plan => (
              <div key={plan.name} className="rounded-xl p-6 border flex flex-col" style={{ backgroundColor: plan.highlighted ? 'var(--color-primary)' : 'var(--color-bg-surface)', borderColor: plan.highlighted ? 'transparent' : 'var(--color-border)' }}>
                <div className="mb-4">
                  <p className="font-semibold mb-1" style={{ color: plan.highlighted ? '#fff' : 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold" style={{ fontSize: '2rem', color: plan.highlighted ? '#fff' : 'var(--color-text)' }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                    {plan.price > 0 && <span style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>/{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>
                      <span style={{ color: plan.highlighted ? '#fff' : 'var(--color-success)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button className="w-full" style={{ backgroundColor: plan.highlighted ? '#fff' : 'var(--color-primary)', color: plan.highlighted ? 'var(--color-primary)' : '#fff', fontWeight: 600 }}>{plan.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <div className="sr-only">
        <Eye aria-hidden="true" />
        <Shield aria-hidden="true" />
        <Zap aria-hidden="true" />
        <DollarSign aria-hidden="true" />
        <FileText aria-hidden="true" />
        <AlertTriangle aria-hidden="true" />
      </div>
    </div>
  )
}
