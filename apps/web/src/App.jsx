const pipelineSteps = [
  ['Upload', 'Secure storage in Supabase'],
  ['Parsing', 'Extract pages and sections'],
  ['Chunking', 'Split into semantic blocks'],
  ['Embedding', 'Generate vectors'],
  ['Search', 'Rank best matches'],
  ['Answer', 'LLM with citations'],
]

const tocItems = [
  '1. Safety guidelines',
  '2. Installation',
  '3. Calibration',
  '4. Warranty policy',
  '5. Maintenance schedule',
  '6. Appendix',
]

export default function App() {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-6 py-10">
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
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="rounded-full border border-line px-3 py-1">
              Berlin • Demo
            </span>
            <button className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-soft">
              Request demo
            </button>
          </div>
        </header>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
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
                View live demo
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-widest text-muted">
                  Avg answer
                </p>
                <p className="mt-2 text-2xl font-semibold">2.3s</p>
                <p className="text-xs text-muted">with citations</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-widest text-muted">
                  Retrieval
                </p>
                <p className="mt-2 text-2xl font-semibold">Top 6</p>
                <p className="text-xs text-muted">semantic chunks</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
                <p className="text-xs uppercase tracking-widest text-muted">
                  Sources
                </p>
                <p className="mt-2 text-2xl font-semibold">100%</p>
                <p className="text-xs text-muted">traceable</p>
              </div>
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
                  Ready
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-line bg-sand p-5">
                <p className="text-sm font-semibold">Drop a PDF here</p>
                <p className="mt-1 text-xs text-muted">
                  or click to browse. Max 40MB.
                </p>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs">
                  <span className="font-semibold">Hydraulic_System.pdf</span>
                  <span className="text-muted">26.4MB</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>Indexing</span>
                    <span>64%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-line">
                    <div className="h-2 w-2/3 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Document pipeline
                </p>
                <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
                  Live
                </span>
              </div>
              <div className="mt-6 space-y-4">
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
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active document</h2>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
                Indexed
              </span>
            </div>
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl bg-sand p-4">
                <p className="text-sm font-semibold">
                  Hydraulic System Manual
                </p>
                <p className="text-xs text-muted">118 pages • 2 min ago</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-white p-3 text-xs">
                  <p className="text-muted">Chunks</p>
                  <p className="mt-1 text-lg font-semibold">842</p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-3 text-xs">
                  <p className="text-muted">Sources used</p>
                  <p className="mt-1 text-lg font-semibold">6</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Table of contents
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  {tocItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2"
                    >
                      <span>{item}</span>
                      <span className="text-xs text-muted">Page</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
                Upload another file
              </button>
            </div>
          </aside>

          <main className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Chat with your document</h2>
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded-full border border-line px-3 py-1">
                  Top K: 6
                </span>
                <span className="rounded-full border border-line px-3 py-1">
                  Latency ~2.3s
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-ink text-xs font-semibold text-white">
                  U
                </div>
                <div className="max-w-xl rounded-2xl border border-line bg-sand px-4 py-3 text-sm">
                  What does section 4 say about the warranty period?
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-xs font-semibold text-white">
                  LS
                </div>
                <div className="space-y-3">
                  <div className="max-w-xl rounded-2xl border border-line bg-white px-4 py-3 text-sm">
                    Section 4 states that warranty coverage lasts 24 months from
                    installation, with on-site service included for critical
                    components. Exclusions apply to wear parts and improper
                    calibration.
                  </div>
                  <div className="rounded-2xl border border-line bg-sand px-4 py-3 text-xs">
                    <p className="font-semibold text-ink">Sources</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
                        Page 42 • Warranty policy
                      </span>
                      <span className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
                        Page 44 • Coverage scope
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-sand px-4 py-3">
              <input
                className="flex-1 bg-transparent text-sm text-ink outline-none"
                placeholder="Ask the document anything..."
              />
              <button className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">
                Send
              </button>
            </div>
          </main>
        </section>
      </div>
    </div>
  )
}
