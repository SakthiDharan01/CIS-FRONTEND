"use client";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-semibold tracking-tight">LAVS</div>
        <div className="text-sm text-slate-600">Layered Authenticity Verification</div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <section className="grid gap-10 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 lg:grid-cols-2 lg:p-10">
          <div className="flex flex-col gap-4">
            <p className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Multi-modal · Explainable · Forensic
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 lg:text-4xl">
              Verify images, videos, audio, or URLs with layered evidence—not a single classifier.
            </h1>
            <p className="text-base leading-7 text-slate-600">
              LAVS combines origin forensics, pattern integrity, behavioral deviation, and adaptive aggregation to spot deepfakes and manipulated content. Upload a file or paste a link to start.
            </p>
            <ul className="grid gap-2 text-sm text-slate-700">
              <li>• Origin & metadata coherence</li>
              <li>• Pixel/temporal/spectral integrity checks</li>
              <li>• Behavioral deviation from human patterns</li>
              <li>• Adaptive confidence aggregation with clear verdicts</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 shadow-inner ring-1 ring-slate-200">
            <p className="mb-4 text-sm font-semibold text-slate-700">Quick check</p>
            <form
              className="flex flex-col gap-4"
              action={apiBase ? `${apiBase}/analyze` : "/api-not-configured"}
              method="POST"
              encType="multipart/form-data"
              target="_blank"
            >
              <div>
                <label className="text-sm font-medium text-slate-800">Upload media (image / video / audio)</label>
                <input
                  type="file"
                  name="file"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                <span className="h-px flex-1 bg-slate-200" />
                or
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">Paste a URL</label>
                <input
                  type="url"
                  name="url"
                  placeholder="https://example.com/content"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none"
                disabled={!apiBase}
              >
                {apiBase ? "Run Verification" : "Set NEXT_PUBLIC_API_BASE"}
              </button>

              {!apiBase && (
                <p className="text-xs text-amber-600">
                  Configure <code className="font-mono">NEXT_PUBLIC_API_BASE</code> to point to your backend (e.g., https://your-backend.onrender.com).
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 lg:grid-cols-3">
          {[
            {
              title: "Origin Forensics",
              text: "Creation/modify timestamps, EXIF/tool fingerprints, codec & SSL/WHOIS sanity checks.",
            },
            {
              title: "Pattern Integrity",
              text: "Pixel co-occurrence, temporal variance, spectral stability to spot synthetic smoothing.",
            },
            {
              title: "Behavioral Deviation",
              text: "Flags over-consistency and low entropy across layers—hallmarks of AI generation.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-800 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
