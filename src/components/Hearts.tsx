export function Hearts({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-2xl">
      {[0,1,2].map(i => (
        <span key={i} className={i < count ? '' : 'opacity-25 grayscale'}>❤️</span>
      ))}
    </div>
  )
}
