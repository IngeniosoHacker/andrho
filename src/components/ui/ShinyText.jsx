// reactbits.dev "ShinyText" component
// A sleek metallic/stardust shimmer effect over typography

export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
  shimmerColor = 'rgba(0, 180, 255, 0.9)',
}) {
  const animationDuration = `${speed}s`

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(11, 16, 32, 0.35) 0%, rgba(11, 16, 32, 0.55) 30%, ${shimmerColor} 50%, rgba(11, 16, 32, 0.55) 70%, rgba(11, 16, 32, 0.35) 100%)`,
        backgroundSize: '200% 100%',
        animationDuration,
        WebkitBackgroundClip: 'text',
      }}
    >
      {text}
    </span>
  )
}
