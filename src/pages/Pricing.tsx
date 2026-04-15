import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Starter',
    price: 0,
    tagline: 'Get protected from day one',
    features: ['5 active detections per month', 'Basic CPM earnings tracking', '2 customizable license templates', 'Email detection alerts', 'Community support'],
    cta: 'Start free',
    highlighted: false
  },
  {
    name: 'Creator',
    price: 29,
    tagline: 'For creators serious about their NIL',
    features: ['Unlimited detections', 'Full CPM dashboard & payment history', 'Unlimited license templates', 'Dispute resolution tools', 'Priority real-time alerts', 'Compliance & NCAA reports', 'Deal quality scoring', 'Priority support'],
    cta: 'Try it free',
    highlighted: true
  },
  {
    name: 'Pro',
    price: 79,
    tagline: 'For high-volume or enterprise creators',
    features: ['Everything in Creator', 'Multi-platform API access', 'Custom fraud risk thresholds', 'Team member access (up to 5)', 'White-label compliance reports', 'Dedicated account manager', 'SLA-backed uptime'],
    cta: 'Get started',
    highlighted: false
  }
]

const faqs = [
  { q: 'What exactly does WEIR detect?', a: 'WEIR monitors your name, image, and likeness across major social platforms (TikTok, Instagram, YouTube, Twitch, Twitter/X, Facebook) and ad networks. AI models flag unauthorized commercial uses and score their quality before surfacing them to you.' },
  { q: 'How are CPM rates calculated?', a: 'CPM rates are based on platform-reported impression data and the deal terms you set in your license templates. Your earnings are shown net of the WEIR platform fee, which is always displayed upfront — never hidden.' },
  { q: 'What is the WEIR platform fee?', a: 'WEIR charges a flat 5% platform fee on monetized deals facilitated through the platform. For self-negotiated deals tracked through WEIR, there is no fee. All fees are shown before you confirm any action.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel in two clicks from your Settings page. No confirmation emails, no waiting periods, no questions asked. Your data is retained for 30 days so you can reactivate if you change your mind.' },
  { q: 'Does WEIR work for non-NCAA creators?', a: 'Absolutely. WEIR is built for athletes, streamers, influencers, and musicians — anyone whose identity has commercial value. NIL rights are not limited to college sports.' }
]

export default function Pricing() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <section className="py-20 md:py-28" style={{ paddingTop: '120px' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-display)' }}>Transparent pricing. Always.</h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)', maxWidth: '420px', margin: '0 auto' }}>No hidden fees. No auto-charge surprises. Cancel in two clicks, anytime.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {plans.map(plan => (
                <div key={plan.name} className="rounded-2xl p-8 border flex flex-col" style={{ backgroundColor: plan.highlighted ? 'var(--color-primary)' : 'var(--color-bg-surface)', borderColor: plan.highlighted ? 'transparent' : 'var(--color-border)' }}>
                  <div className="mb-6">
                    <p className="font-bold mb-1" style={{ fontSize: 'var(--text-title-3)', color: plan.highlighted ? '#fff' : 'var(--color-text)' }}>{plan.name}</p>
                    <p className="text-sm mb-4" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.75)' : 'var(--color-text-secondary)' }}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold" style={{ fontSize: '2.25rem', color: plan.highlighted ? '#fff' : 'var(--color-text)' }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                      {plan.price > 0 && <span style={{ color: plan.highlighted ? 'rgba(255,255,255,0.65)' : 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>/mo</span>}
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: plan.highlighted ? '#fff' : 'var(--color-success)' }} />
                        <span className="text-sm" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button className="w-full" style={{ backgroundColor: plan.highlighted ? '#fff' : 'var(--color-primary)', color: plan.highlighted ? 'var(--color-primary)' : '#fff', fontWeight: 600, minHeight: '48px' }}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="font-bold mb-8 text-center" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Frequently asked questions</h2>
              <div className="space-y-6">
                {faqs.map(faq => (
                  <div key={faq.q} className="border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{faq.q}</h3>
                    <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
