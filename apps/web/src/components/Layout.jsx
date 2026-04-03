import { NavLink, Outlet, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useSession } from '../lib/useSession'

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/document', label: 'Document' },
]

export default function Layout() {
  const { session } = useSession()
  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white">
              LS
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">LumeaScope</p>
              <p className="text-xs text-muted">Interactive PDF analyst</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-ink text-white'
                      : 'border border-line bg-white text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {session ? (
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/auth"
                className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white"
              >
                Sign in
              </Link>
            )}
          </nav>
        </header>

        <main className="mt-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
