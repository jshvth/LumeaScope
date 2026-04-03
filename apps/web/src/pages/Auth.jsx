import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('loading')

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (signInError) {
      setError(signInError.message)
      setStatus('error')
      return
    }

    setStatus('sent')
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold">Magic link sign in</h1>
        <p className="mt-2 text-sm text-muted">
          We will email you a secure link. Clicking it signs you into the same
          account every time.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="mt-2 w-full rounded-2xl border border-line bg-sand px-4 py-3 text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending link...' : 'Send magic link'}
          </button>
          {status === 'sent' && (
            <p className="rounded-2xl border border-line bg-accentSoft px-4 py-3 text-xs text-accent">
              Check your inbox. The sign-in link is valid for a short time.
            </p>
          )}
          {error && (
            <p className="rounded-2xl border border-line bg-sand px-4 py-3 text-xs text-red-600">
              {error}
            </p>
          )}
        </form>
      </div>
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Why magic link?</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li>No password required</li>
          <li>Same account every time with the same email</li>
          <li>Safer for demos and internal pilots</li>
        </ul>
        <div className="mt-6 rounded-2xl border border-line bg-sand p-4 text-xs text-muted">
          Make sure your Supabase project allows this site URL under Auth → URL
          Configuration.
        </div>
      </aside>
    </section>
  )
}
