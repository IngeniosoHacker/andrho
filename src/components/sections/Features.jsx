import GradientText from '../ui/GradientText.jsx'
import Reveal from '../ui/Reveal.jsx'
import TiltedCard from '../ui/TiltedCard.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'

// High-level, customer-facing description of what AndRho does. Deliberately
// stays at the "what" level — the underlying statistical/AI methods are
// documented internally (see PRODUCT.md) and are not exposed here.
const FEATURES = [
  {
    title: 'Conexión total',
    body: 'Une tu ERP, tus canales digitales y tus comunicaciones en un solo lugar, sin duplicar procesos ni pagar por media docena de herramientas que hacen lo mismo.',
  },
  {
    title: 'Inteligencia aplicada',
    body: 'Un motor de análisis interpreta lo que ocurre en tu operación y lo traduce en explicaciones claras — no en reportes que solo entiende quien los construyó.',
  },
  {
    title: 'Decisiones, no reportes',
    body: 'Cada hallazgo llega como una sugerencia concreta: se acepta, se rechaza o se comenta. La plataforma propone, tu equipo decide.',
  },
  {
    title: 'Comunicación organizada',
    body: 'Lo que llega por WhatsApp o Telegram se convierte en un ticket, no en un mensaje perdido entre trescientos no leídos.',
  },
  {
    title: 'Memoria institucional',
    body: 'Cada decisión queda registrada: qué se aceptó, qué se rechazó y por qué. Tu historial no depende de la memoria de nadie.',
  },
  {
    title: 'Red entre negocios',
    body: 'Cuando la necesidad de un cliente coincide con la capacidad de otro dentro de la red AndRho, la plataforma sugiere la conexión.',
  },
]

export default function Features() {
  return (
    <section id="proyecto" className="relative mx-auto max-w-6xl px-6 py-28 lg:px-10 lg:py-40">
      <div
        className="glow-orb -right-32 top-24 h-96 w-96 bg-[var(--c-comet)]/10"
        aria-hidden="true"
      />

      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Una plataforma. <GradientText>Toda tu operación.</GradientText>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--c-mist)]">
          AndRho combina ciencia de datos, inteligencia artificial e infraestructura en la nube en
          un solo panel administrativo. No sustituye tu ERP ni tu CRM: los conecta, los entiende, y
          convierte lo que encuentra en decisiones que cualquier persona del equipo puede usar.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 90}>
            <TiltedCard className="h-full">
              <SpotlightCard className="h-full p-8">
                <h3 className="font-display text-xl font-semibold text-[var(--c-stardust)]">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--c-mist)]">{feature.body}</p>
              </SpotlightCard>
            </TiltedCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
