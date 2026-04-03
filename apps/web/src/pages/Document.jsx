export default function Document() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active document</h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            Empty
          </span>
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-line bg-sand p-6 text-sm">
          <p className="font-semibold">No document selected</p>
          <p className="mt-1 text-xs text-muted">
            Upload a PDF to unlock the table of contents and citations.
          </p>
          <button className="mt-4 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink">
            Upload document
          </button>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-muted">
            Table of contents
          </p>
          <div className="mt-3 rounded-2xl border border-line bg-white p-4 text-xs text-muted">
            Sections will appear here after indexing.
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
