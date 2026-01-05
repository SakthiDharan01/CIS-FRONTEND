export function ConfidenceMeter({ confidence }: { confidence?: number }) {
  if (confidence === undefined || confidence === null || Number.isNaN(confidence)) return null;
  const clamped = Math.max(0, Math.min(100, confidence));
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-800">
        <span>Confidence</span>
        <span>{clamped}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
