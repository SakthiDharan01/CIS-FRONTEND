"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ConfidenceMeter } from "../../components/ConfidenceMeter";
import { ExplanationBox } from "../../components/ExplanationBox";
import { VerdictBadge, normalizeVerdict } from "../../components/VerdictBadge";

const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";

type ApiResponse = {
  verdict?: string;
  confidence?: number;
  explanation?: string;
  breakdown?: {
    layer_breakdown?: { details?: string[] }[];
  };
  error?: string;
};

type Tab = "image" | "video" | "audio" | "url";

export default function VerifyPage() {
  const [tab, setTab] = useState<Tab>("image");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const details = useMemo(() => {
    if (!result?.breakdown?.layer_breakdown) return [] as string[];
    return result.breakdown.layer_breakdown.flatMap((l) => l.details || []);
  }, [result]);

  const verdictKey = normalizeVerdict(result?.verdict);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!apiBase) {
      setError("Please set NEXT_PUBLIC_API_BASE to your backend URL.");
      return;
    }

    if (tab === "url" && !url) {
      setError("Please enter a website URL.");
      return;
    }

    if (tab !== "url" && !file) {
      setError("Please select a file to upload.");
      return;
    }

    const form = new FormData();
    if (tab === "url") {
      form.append("url", url);
    } else if (file) {
      form.append("file", file);
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/verify`, {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) {
        setError(data?.error || "Verification failed.");
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err?.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">LAVS</Link>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/verify" className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white shadow hover:bg-slate-800">Verify</Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20">
        <section className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">AI Deepfake & Manipulated Content Verification</p>
              <h1 className="mt-1 text-3xl font-semibold text-slate-900">Upload or paste a link to verify authenticity</h1>
              <p className="mt-2 text-sm text-slate-600">Designed for clarity, safety, and non-technical users.</p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
              Verdicts are risk assessments, not absolute truths.
            </div>
          </div>

          <form className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "image", label: "Upload Image" },
                    { key: "video", label: "Upload Video" },
                    { key: "audio", label: "Upload Audio" },
                    { key: "url", label: "Website URL" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setTab(t.key);
                      setError(null);
                      setResult(null);
                      setFile(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
                      tab === t.key
                        ? "bg-slate-900 text-white ring-slate-900"
                        : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === "url" ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="url">Website URL</label>
                  <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                  <p className="text-xs text-slate-600">We check domain signals, SSL, and content consistency.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="file">Upload file</label>
                  <label
                    htmlFor="file"
                    className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-slate-700 hover:border-slate-300"
                  >
                    <div className="text-3xl">⬆️</div>
                    <div className="text-sm font-semibold">Drag & drop or click to choose a file</div>
                    <div className="text-xs text-slate-500">Images: JPG/PNG · Videos: MP4/MOV · Audio: WAV/MP3</div>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      accept={tab === "image" ? "image/*" : tab === "video" ? "video/*" : tab === "audio" ? "audio/*" : undefined}
                    />
                    {file && <p className="text-xs text-slate-700">Selected: {file.name}</p>}
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!apiBase)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" aria-hidden />
                    Analyzing content authenticity…
                  </>
                ) : (
                  "Verify Content"
                )}
              </button>

              {!apiBase && (
                <p className="text-xs text-amber-700">
                  Set <code className="font-mono">NEXT_PUBLIC_API_BASE</code> to your backend URL (e.g., https://your-backend.onrender.com).
                </p>
              )}
              {error && <p className="text-sm text-red-700">{error}</p>}
            </div>

            <div className="space-y-4 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="text-sm font-semibold text-slate-800">Result</div>
              {loading && (
                <p className="text-sm text-slate-700">Analyzing content authenticity…</p>
              )}
              {!loading && result && (
                <div className="space-y-4">
                  <VerdictBadge verdict={verdictKey} />
                  <ConfidenceMeter confidence={result.confidence} />
                  <ExplanationBox explanation={result.explanation} details={details} />
                </div>
              )}
              {!loading && !result && (
                <p className="text-sm text-slate-700">Submit a file or URL to see the verdict.</p>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
