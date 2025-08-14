type Props = { letter: string; color: string; size?: number; id?: string }

function LetterAvatar({ letter, color, size = 56, id }: Props) {
  const char = (letter || '?').slice(0, 1).toUpperCase()
  const gradientId = id ? `grad-${id}` : `grad-${Math.random().toString(36).substr(2, 9)}`
  const radius = size / 2 - 1
  const fontSize = Math.round(size * 0.4)
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={radius} fill={`url(#${gradientId})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize={fontSize} fontWeight={800} fontFamily="ui-sans-serif, system-ui">
        {char}
      </text>
    </svg>
  )
}

export default LetterAvatar
