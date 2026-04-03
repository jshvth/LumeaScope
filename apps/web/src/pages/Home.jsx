import { Link } from 'react-router-dom'

const pipelineSteps = [
  { title: 'Upload', detail: 'Store the PDF securely' },
  { title: 'Parsing', detail: 'Extract pages and sections' },
  { title: 'Chunking', detail: 'Split into semantic blocks' },
  { title: 'Embedding', detail: 'Turn text into vectors' },
  { title: 'Search', detail: 'Retrieve the best matches' },
  { title: 'Answer', detail: 'LLM responds with citations' },
]

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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
            <Link
              to="/upload"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft"
            >
              Upload document
            </Link>
          </div>
        </div>
        <div className="relative space-y-6">
          <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-accentSoft opacity-70 blur-3xl" />
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Product snapshot
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-line bg-sand px-4 py-3 text-sm">
                <p className="font-semibold">Instant indexing</p>
                <p className="text-xs text-muted">
                  PDFs are chunked, embedded, and searchable within minutes.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-sand px-4 py-3 text-sm">
                <p className="font-semibold">Cited answers</p>
                <p className="text-xs text-muted">
                  Every response includes traceable sources and page context.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-sand px-4 py-3 text-sm">
                <p className="font-semibold">Enterprise ready</p>
                <p className="text-xs text-muted">
                  Supabase Auth, Storage, and pgvector out of the box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-7 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">How it works</h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            RAG pipeline
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          {pipelineSteps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-center gap-3 rounded-full border border-line bg-sand px-3 py-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-sand text-[11px] font-semibold">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold">{step.title}</span>
                <span className="text-[10px] text-muted">{step.detail}</span>
              </div>
              {index < pipelineSteps.length - 1 && (
                <span className="text-muted">→</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
