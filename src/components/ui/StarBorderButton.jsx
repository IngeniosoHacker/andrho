// reactbits.dev-style "StarBorder" button: an animated glowing border chases
// around the pill, wrapped around whatever solid button style is passed in.
export default function StarBorderButton({ as: Tag = 'button', className = '', children, ...props }) {
  return (
    <Tag
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] ${className}`}
      {...props}
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 90deg, transparent, var(--c-comet), transparent 30%)',
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--c-void)] px-6 py-3.5 font-semibold text-[var(--c-stardust)] transition-colors group-hover:text-[var(--c-comet)]">
        {children}
      </span>
    </Tag>
  )
}
