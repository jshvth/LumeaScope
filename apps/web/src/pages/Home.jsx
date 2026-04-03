import { Link } from 'react-router-dom'

const pipelineSteps = [
  'Upload',
  'Parse',
  'Chunk',
  'Embed',
  'Retrieve',
  'Answer',
]

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] border border-line bg-white p-8 shadow-card md:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accentSoft opacity-70 blur-[130px]" />
        <div className="absolute left-10 top-6 h-24 w-24 rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-sand px-4 py-1 text-xs font-semibold text-muted">
              LumeaScope • AI document intelligence
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Find the exact clause in seconds,
              <span className="text-accent"> with citations.</span>
            </h1>
            <p className="max-w-xl text-base text-muted md:text-lg">
              Turn dense PDFs into a chat-ready knowledge base. Ask questions,
              get precise answers, and jump to the source instantly.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/upload"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-soft"
              >
                Upload your first PDF
              </Link>
              <span className="text-xs text-muted">
                Works with manuals, contracts, audits
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-line bg-sand p-5">
              <div className="rounded-2xl border border-line bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Answer preview
                </p>
                <p className="mt-3 text-sm">
                  Warranty coverage lasts 24 months from installation, with
                  on-site service for critical components.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-line bg-sand px-3 py-1 text-[11px] text-muted">
                    Page 42 • Warranty policy
                  </span>
                  <span className="rounded-full border border-line bg-sand px-3 py-1 text-[11px] text-muted">
                    Page 44 • Coverage scope
                  </span>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-line bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Confidence
                </p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">High relevance</span>
                  <span className="text-xs text-muted">Top‑K = 6</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-line">
                  <div className="h-2 w-4/5 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-3 text-xs">
          {pipelineSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-[11px] font-semibold">
                {index + 1}
              </span>
              <span className="font-semibold">{step}</span>
              {index < pipelineSteps.length - 1 && (
                <span className="h-px w-6 bg-line" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
