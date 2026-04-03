import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useSession } from '../lib/useSession'

export default function Upload() {
  const { session } = useSession()
  const [documents, setDocuments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!session) return

    const loadDocuments = async () => {
      const { data, error: loadError } = await supabase
        .from('documents')
        .select('id,title,status,created_at')
        .order('created_at', { ascending: false })

      if (loadError) {
        setError(loadError.message)
        return
      }

      setDocuments(data ?? [])
    }

    loadDocuments()
  }, [session])

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    setSuccess('')

    if (!session) {
      setError('Please sign in before uploading.')
      return
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.')
      return
    }

    const maxSizeMb = 40
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File is too large. Max ${maxSizeMb}MB.`)
      return
    }

    setUploading(true)

    const filePath = `${session.user.id}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: doc, error: insertError } = await supabase
      .from('documents')
      .insert({
        user_id: session.user.id,
        title: file.name,
        storage_path: filePath,
        status: 'uploaded',
      })
      .select('id,title,status,created_at')
      .single()

    if (insertError) {
      setError(insertError.message)
      setUploading(false)
      return
    }

    setDocuments((prev) => [doc, ...prev])
    setSuccess('Upload completed. Indexing will start shortly.')
    setUploading(false)
    event.target.value = ''
  }
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold">Upload your first document</h1>
        <p className="mt-2 text-sm text-muted">
          PDFs will be indexed and ready for chat in a few minutes.
        </p>
        {!session && (
          <div className="mt-4 rounded-2xl border border-line bg-sand px-4 py-3 text-xs text-muted">
            Please sign in to upload documents.
            <Link className="ml-2 font-semibold text-ink" to="/auth">
              Sign in
            </Link>
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-2xl border border-line bg-sand px-4 py-3 text-xs text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-2xl border border-line bg-accentSoft px-4 py-3 text-xs text-accent">
            {success}
          </div>
        )}
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-sand p-8 text-center">
          <p className="text-sm font-semibold">Drop a PDF here</p>
          <p className="mt-1 text-xs text-muted">
            or click to browse from your device
          </p>
          <div className="mt-4">
            <input
              id="upload-file"
              type="file"
              className="hidden"
              disabled={!session}
              accept="application/pdf"
              onChange={handleUpload}
            />
            <label
              htmlFor="upload-file"
              className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold text-white ${
                session
                  ? 'cursor-pointer bg-ink'
                  : 'cursor-not-allowed bg-ink/60'
              }`}
            >
              {uploading ? 'Uploading...' : 'Choose file'}
            </label>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-white p-4 text-sm">
          <p className="font-semibold">Recent uploads</p>
          {documents.length === 0 ? (
            <p className="mt-1 text-xs text-muted">
              Your documents will appear here with status and progress.
            </p>
          ) : (
            <div className="mt-3 space-y-2 text-xs text-muted">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border border-line bg-sand px-3 py-2"
                >
                  <span className="text-ink">{doc.title}</span>
                  <span className="text-xs text-muted">{doc.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Upload checklist</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li>PDF format, max 40MB</li>
          <li>Text layer recommended for best results</li>
          <li>We store files privately per user</li>
          <li>Indexing starts automatically</li>
        </ul>
      </aside>
    </section>
  )
}
