import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useSession } from '../lib/useSession'

export default function Document() {
  const { session } = useSession()
  const [searchParams] = useSearchParams()
  const [activeDoc, setActiveDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) return

    const loadDocument = async () => {
      setLoading(true)
      setError('')
      const docId = searchParams.get('id')

      let query = supabase
        .from('documents')
        .select('id,title,status,created_at,toc_json')
        .eq('user_id', session.user.id)

      if (docId) {
        query = query.eq('id', docId)
      } else {
        query = query.order('created_at', { ascending: false }).limit(1)
      }

      const { data, error: loadError } = await query

      if (loadError) {
        setError(loadError.message)
        setActiveDoc(null)
      } else {
        setActiveDoc(docId ? data?.[0] ?? null : data?.[0] ?? null)
      }

      setLoading(false)
    }

    loadDocument()
  }, [session, searchParams])
  return (
    <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active document</h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            {loading ? 'Loading' : activeDoc ? activeDoc.status : 'Empty'}
          </span>
        </div>
        {error && (
          <div className="mt-4 rounded-2xl border border-line bg-sand px-4 py-3 text-xs text-red-600">
            {error}
          </div>
        )}
        {!activeDoc ? (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-sand p-6 text-sm">
            <p className="font-semibold">No document selected</p>
            <p className="mt-1 text-xs text-muted">
              Upload a PDF to unlock the table of contents and citations.
            </p>
            {session ? (
              <Link
                to="/upload"
                className="mt-4 inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink"
              >
                Upload document
              </Link>
            ) : (
              <Link
                to="/auth"
                className="mt-4 inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink"
              >
                Sign in first
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-line bg-sand p-5 text-sm">
            <p className="font-semibold text-ink">{activeDoc.title}</p>
            <p className="mt-1 text-xs text-muted">
              Status: {activeDoc.status}
            </p>
          </div>
        )}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-muted">
            Table of contents
          </p>
          <div className="mt-3 rounded-2xl border border-line bg-white p-4 text-xs text-muted">
            {activeDoc ? 'Sections will appear here after indexing.' : 'No table of contents yet.'}
          </div>
        </div>
      </aside>

      <main className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Chat with your document</h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            Waiting for upload
          </span>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-line bg-sand p-8 text-center text-sm">
          <p className="font-semibold">No messages yet</p>
          <p className="mt-2 text-xs text-muted">
            Once a document is indexed, you can ask questions and receive cited
            answers.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-sand px-4 py-3">
          <input
            className="flex-1 bg-transparent text-sm text-ink outline-none"
            placeholder="Ask the document anything..."
            disabled
          />
          <button className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white opacity-60">
            Send
          </button>
        </div>
      </main>
    </section>
  )
}
