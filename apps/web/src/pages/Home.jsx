const pipelineSteps = [
  ['Upload', 'Secure storage in Supabase'],
  ['Parsing', 'Extract pages and sections'],
  ['Chunking', 'Split into semantic blocks'],
  ['Embedding', 'Generate vectors'],
  ['Search', 'Rank best matches'],
  ['Answer', 'LLM with citations'],
]

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accentSoft px-4 py-1 text-xs font-semibold text-accent">
            RAG ready workflow
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Turn any PDF into a chat-ready knowledge base in minutes.
          </h1>
          <p className="text-base text-muted md:text-lg">
            Upload manuals, contracts, or audits. LumeaScope builds a vector
            index, surfaces citations, and lets you ask questions with full
            traceability.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft">
              Upload document
            </button>
            <button className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">
              See how it works
            </button>
          </div>
        </div>
        <div className="relative space-y-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accentSoft opacity-70 blur-3xl" />
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Upload center
              </p>
              <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
                Waiting
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-line bg-sand p-6 text-sm">
              <p className="font-semibold">No file uploaded yet</p>
              <p className="mt-1 text-xs text-muted">
                Drag and drop a PDF to start your first analysis.
              </p>
              <button className="mt-4 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink">
                Choose file
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">How it works</h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            RAG pipeline
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {pipelineSteps.map((step) => (
            <div
              key={step[0]}
              className="flex items-center justify-between rounded-2xl border border-line bg-sand px-4 py-3 text-sm"
            >
              <span className="font-semibold">{step[0]}</span>
              <span className="text-xs text-muted">{step[1]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
