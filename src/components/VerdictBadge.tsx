type Verdict = "real" | "suspicious" | "likely fake" | string | undefined;

const styles: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  real: { bg: "bg-emerald-100", text: "text-emerald-900", label: "Real", icon: "🟢" },
  suspicious: { bg: "bg-amber-100", text: "text-amber-900", label: "Suspicious", icon: "🟡" },
  "likely fake": { bg: "bg-red-100", text: "text-red-900", label: "Likely Fake", icon: "🔴" },
};

export function normalizeVerdict(verdict?: string) {
  if (!verdict) return "suspicious";
  const v = verdict.toLowerCase();
  if (v.includes("real")) return "real";
  if (v.includes("fake")) return "likely fake";
  return "suspicious";
}

export function VerdictBadge({ verdict }: { verdict?: Verdict }) {
  const key = normalizeVerdict(verdict);
  const style = styles[key] || styles.suspicious;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${style.bg} ${style.text}`}>
      <span>{style.icon}</span>
      <span>{style.label}</span>
    </span>
  );
}
