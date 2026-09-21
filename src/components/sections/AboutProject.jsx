import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import TiltedCard from '../ui/TiltedCard.jsx'
import GradientText from '../ui/GradientText.jsx'

// Origin-story section — the "why AndRho exists" chapter from PRODUCT.md's
// Design > "About the project" idea, told as a short Star-Wars-crawl-style
// sequence of chapters rather than a literal 3D crawl.
const CHAPTERS = [
  {
    tag: 'Episodio I',
    title: 'Diez pestañas para un solo negocio',
    body: 'ERP, CRM, hojas de cálculo, WhatsApp, Slack, un dashboard que nadie revisa. Cada solución promete simplificar y termina sumando una suscripción más.',
  },
  {
    tag: 'Episodio II',
    title: 'Los datos existen, la lectura no',
    body: 'La información para decidir mejor ya está ahí, repartida en sistemas que no se hablan entre sí. Armar ese departamento de datos cuesta caro, y por eso casi nadie lo tiene.',
  },
  {
    tag: 'Episodio III',
    title: 'Una tripulación, un centro de control',
    body: 'AndRho conecta lo que ya usas, lo traduce con estadística e IA, y devuelve decisiones en lenguaje humano — sin pedirte que contrates un equipo de analistas.',
  },
]

export default function AboutProject() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--c-comet)]">Sobre el proyecto</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <GradientText>Por qué existe AndRho.</GradientText>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--c-mist)]">
          No nació como otra herramienta más para la pila. Nació como la respuesta a una pregunta
          simple: ¿por qué una empresa pequeña necesita un departamento entero solo para entender
          sus propios datos?
        </p>
      </Reveal>

      <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-3">
        {CHAPTERS.map((chapter, i) => (
          <Reveal key={chapter.title} delay={i * 90}>
            <TiltedCard>
              <SpotlightCard className="p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--c-solar)]">{chapter.tag}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{chapter.title}</h3>
                <p className="mt-2 text-sm text-[var(--c-mist)]">{chapter.body}</p>
              </SpotlightCard>
            </TiltedCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="mx-auto max-w-xl font-mono text-xs text-[var(--c-mist)]">
          Sin fecha inventada, sin humo — la misma nave que ves en construcción aquí es la que se
          está armando en el repositorio público.
        </p>
      </Reveal>
    </section>
  )
}
