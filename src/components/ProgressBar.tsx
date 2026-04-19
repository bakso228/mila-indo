export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, total)) * 100))
  return (
    <div className="w-full h-4 rounded-full bg-white/70 overflow-hidden border-2 border-white">
      <div className="h-full bg-teal transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
    </div>
  )
}
