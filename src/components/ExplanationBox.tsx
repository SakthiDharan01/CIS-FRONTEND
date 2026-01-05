"use client";

import { useState } from "react";

export function ExplanationBox({ explanation, details }: { explanation?: string; details?: string[] }) {
  const [open, setOpen] = useState(false);
  if (!explanation && (!details || details.length === 0)) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">Explanation</div>
          {explanation && <p className="mt-1 text-sm text-slate-700">{explanation}</p>}
        </div>
        {details && details.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
          >
            {open ? "Hide details" : "Explain result"}
          </button>
        )}
      </div>
      {open && details && details.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
