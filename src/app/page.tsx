import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div className="text-xl font-semibold tracking-tight">LAVS</div>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="#how" className="hover:text-slate-900">How It Works</Link>
          <Link href="#features" className="hover:text-slate-900">Features</Link>
          <Link href="/verify" className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white shadow hover:bg-slate-800">Verify Content</Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-10 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 lg:grid-cols-2 lg:p-12">
          <div className="flex flex-col gap-4">
            <p className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              AI Deepfake & Manipulated Content Verification
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 lg:text-4xl">
              Verify images, videos, voices, and websites to detect AI-generated or manipulated content.
            </h1>
            <p className="text-base leading-7 text-slate-700">
              Built on a Layered Authenticity Verification System (LAVS) to give clear, human-friendly verdicts—ideal for everyone, including elderly and non-technical users.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/verify" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800">
                Verify Content
              </Link>
              <Link href="#how" className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                How It Works
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6 shadow-inner ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Why this matters</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• AI deepfakes and scam content are rising.</li>
              <li>• It’s hard to spot fake videos, voices, and websites.</li>
              <li>• Elderly and non-technical users are especially vulnerable.</li>
            </ul>
          </div>
        </section>

        <section id="problem" className="grid gap-4 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">The Problem</h2>
            <p className="mt-3 text-slate-700">Deepfakes and AI-generated scams make it easy to fool people. Many users are not tech-savvy and need a clear, safe way to verify content.</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-700">
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• Fake videos and voices spread quickly.</div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• Scam websites impersonate trusted brands.</div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• Elderly and non-technical users are targeted.</div>
          </div>
        </section>

        <section id="solution" className="grid gap-6 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-slate-900">Our Solution</h2>
            <p className="mt-2 text-slate-700">Upload media or paste a link. The system checks authenticity across multiple layers and shows a clear verdict.</p>
          </div>
          <div className="lg:col-span-2 grid gap-3 text-sm text-slate-700">
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• Upload or paste a URL.</div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• System analyzes using multiple verification layers.</div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">• You get a simple verdict with confidence and explanation.</div>
          </div>
        </section>

        <section id="how" className="grid gap-4 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-slate-900">How It Works</h2>
          </div>
          {["Upload or enter URL", "System analyzes authenticity", "Verdict: Real / Suspicious / Likely Fake"].map((step, idx) => (
            <div key={step} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="mb-2 text-xs font-semibold text-slate-500">Step {idx + 1}</div>
              <div className="text-sm font-semibold text-slate-900">{step}</div>
            </div>
          ))}
        </section>

        <section id="features" className="grid gap-4 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 lg:grid-cols-3">
          {[ 
            "Supports Image, Video, Audio, Website URLs",
            "Confidence score with simple explanation",
            "Designed for non-technical users",
            "Fraud and misinformation prevention",
            "Layered verification (LAVS)",
            "Clear, color-coded verdicts",
          ].map((f) => (
            <div key={f} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-800 ring-1 ring-slate-100">
              {f}
            </div>
          ))}
        </section>

        <section className="flex flex-col items-start gap-4 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Ready to check content?</h3>
          <Link href="/verify" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800">
            Start Verification
          </Link>
        </section>
      </main>
    </div>
  );
}
