export default function Upload() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold">Upload your first document</h1>
        <p className="mt-2 text-sm text-muted">
          PDFs will be indexed and ready for chat in a few minutes.
        </p>
        <div className="mt-6 rounded-3xl border border-dashed border-line bg-sand p-8 text-center">
          <p className="text-sm font-semibold">Drop a PDF here</p>
          <p className="mt-1 text-xs text-muted">
            or click to browse from your device
          </p>
          <button className="mt-4 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
            Choose file
          </button>
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-white p-4 text-sm">
          <p className="font-semibold">Nothing uploaded yet</p>
          <p className="mt-1 text-xs text-muted">
            Your documents will appear here with status and progress.
          </p>
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
