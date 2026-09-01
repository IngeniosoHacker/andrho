import Reveal from '../ui/Reveal.jsx'
import AsteroidGame from '../ui/AsteroidGame.jsx'

// Standalone section — a color-scheme experiment framed as a mini-game.
// Lives before the repo/commit-stats section regardless of whether that one
// loads (see LiveProgress.jsx, which now just hides itself on failure
// instead of falling back to this). See AsteroidGame.jsx for the mechanics
// and src/lib/gameThemes.js for what's actually being tested.
export default function MissionGame() {
  return (
    <section id="minijuego" className="mx-auto max-w-4xl px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--c-comet)]">Modo desvío de emergencia</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Ayúdanos a elegir los colores de AndRho.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--c-mist)]">
          Defiende la nave de un enjambre de asteroides. El tema de la consola irá rotando durante la
          partida — así decidimos, con datos reales, la paleta final de la plataforma. Destruye
          suficientes y desbloquea un descuento por 1 año.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-16">
        <AsteroidGame />
      </Reveal>
    </section>
  )
}
