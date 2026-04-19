type Props = { n: number; size?: number; emoji?: string }

// Renders `n` emoji in a tidy grid. Key for a 5yo learning numbers: see 3 apples, hear "tiga".
// Sized so the whole grid fits within `size` × `size`.
export function NumberPicture({ n, size = 120, emoji = '🍎' }: Props) {
  const items = Array.from({ length: n })
  // Choose cols so that rows*cols >= n and ratio is visually balanced
  const cols = n <= 3 ? n : n === 4 ? 2 : n === 5 ? 5 : n === 6 ? 3 : n <= 8 ? 4 : 5
  const rows = Math.ceil(n / cols)
  // Leave a small gap; compute emoji size to fit snugly
  const gap = 2
  const available = size - (cols - 1) * gap
  const cellByW = available / cols
  const availableH = size - (rows - 1) * gap
  const cellByH = availableH / rows
  const fontSize = Math.floor(Math.min(cellByW, cellByH) * 0.9)
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {items.map((_, i) => (
        <span key={i} style={{ fontSize, lineHeight: 1, userSelect: 'none' }}>{emoji}</span>
      ))}
    </div>
  )
}
