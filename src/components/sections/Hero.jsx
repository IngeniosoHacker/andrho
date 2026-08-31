import ParticleField from '../ui/ParticleField.jsx'
import TextType from '../ui/TextType.jsx'
import StarBorderButton from '../ui/StarBorderButton.jsx'
import ScrambleLogo from '../ui/ScrambleLogo.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-starfield pt-40 pb-28 lg:pt-52 lg:pb-40">
      <ParticleField density={70} />
      <div className="absolute inset-0 grid-overlay opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div
        className="glow-orb -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 bg-[var(--c-plasma)]/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h1 className="font-display text-7xl font-bold leading-none tracking-tight sm:text-8xl lg:text-9xl">
          <ScrambleLogo />
        </h1>

        <p className="mt-10 font-display text-3xl font-semibold tracking-tight text-[var(--c-stardust)] sm:text-4xl">
          En construcción
        </p>

        <div className="mt-6 min-h-[3.5rem] font-mono text-sm text-[var(--c-mist)] sm:text-base">
          <TextType
            text={[
              '> montando AndRho Core...',
              '> entrenando a los agentes de IA...',
              '> conectando ERP, WhatsApp y web-tracker...',
              '> reservando tu asiento en la tripulación...',
            ]}
          />
        </div>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--c-mist)]">
          Estamos construyendo el centro de control que unifica tu ERP, tus canales digitales y tu
          equipo — y lo traduce en decisiones, no en más pestañas. Todavía no está listo, pero tu
          asiento sí puede estarlo.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <StarBorderButton as="a" href="#waitlist">
            Reservar mi asiento →
          </StarBorderButton>
          <a
            href="#proyecto"
            className="rounded-full border border-[var(--c-line)] px-6 py-3.5 font-medium transition-colors hover:border-[var(--c-comet)]/50 hover:text-[var(--c-comet)]"
          >
            Sobre el proyecto ↓
          </a>
        </div>

        <p className="mt-10 font-mono text-xs text-[var(--c-mist)]">
          Sin fecha inventada. Sin humo. Con progreso público en GitHub.
        </p>
      </div>
    </section>
  )
}
