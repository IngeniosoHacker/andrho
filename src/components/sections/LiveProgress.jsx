import { useEffect, useState } from 'react'
import CountUp from '../ui/CountUp.jsx'
import Reveal from '../ui/Reveal.jsx'

const REPO = 'IngeniosoHacker/andrho'
const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 1200

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Conventional-commit messages here read "type(scope): subject" — keep only
// the subject, i.e. whatever comes after the first "):".
function commitSubject(message) {
  if (!message) return ''
  const firstLine = message.split('\n')[0]
  const idx = firstLine.indexOf('):')
  if (idx === -1) return firstLine
  return firstLine.slice(idx + 2).trim()
}

function ProfileBlock({ label, avatarUrl, login }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--c-mist)]">{label}</span>
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-16 w-16 rounded-full border border-[var(--c-line)] sm:h-20 sm:w-20" />
      ) : (
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--c-line)] bg-[var(--c-panel-2)] text-lg sm:h-20 sm:w-20">
          ?
        </span>
      )}
      <span className="font-medium text-[var(--c-stardust)]">{login ? `@${login}` : 'desconocido'}</span>
    </div>
  )
}

export default function LiveProgress() {
  const [lastCommit, setLastCommit] = useState(null)
  const [totalCommits, setTotalCommits] = useState(0)
  const [avgPerWeek, setAvgPerWeek] = useState(0)
  const [topContributor, setTopContributor] = useState(null)
  const [contributors, setContributors] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    async function attemptLoad() {
      const [repoRes, commitsRes, contributorsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${REPO}`),
        fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`),
        fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`),
      ])
      if (!repoRes.ok || !commitsRes.ok || !contributorsRes.ok) throw new Error('GitHub API unavailable')
      const repoJson = await repoRes.json()
      const commitsJson = await commitsRes.json()
      const contributorsJson = await contributorsRes.json()

      // /contributors is already sorted descending by commit count.
      const total = contributorsJson.reduce((sum, c) => sum + c.contributions, 0)
      const weeksSinceCreation = Math.max(
        1,
        (Date.now() - new Date(repoJson.created_at).getTime()) / (7 * 24 * 3_600_000),
      )

      setLastCommit(commitsJson[0])
      setTotalCommits(total)
      setAvgPerWeek(total / weeksSinceCreation)
      setTopContributor(contributorsJson[0] ?? null)
      setContributors(contributorsJson)
    }

    async function load() {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          await attemptLoad()
          if (!cancelled) setStatus('ready')
          return
        } catch {
          if (cancelled) return
          if (attempt < MAX_ATTEMPTS) await wait(RETRY_DELAY_MS * attempt)
        }
      }
      // GitHub's API stayed unreachable after 3 tries (usually the
      // unauthenticated rate limit) — just hide the section, see below.
      if (!cancelled) setStatus('error')
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // GitHub's unauthenticated API is capped at 60 req/hr per IP and shared
  // across every visitor behind the same network — it trips more than a
  // real backend would. When it does, just hide this section entirely
  // rather than show an error; the color-scheme mini-game lives on its own
  // in MissionGame.jsx regardless of whether this loads.
  if (status === 'error') return null

  return (
    <section id="progreso" className="mx-auto max-w-4xl px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          No confíes en la palabra, confía en el commit.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--c-mist)]">
          El desarrollo de AndRho es público. Este es el estado real del repositorio, en vivo.
        </p>
      </Reveal>

      {status === 'loading' && (
        <Reveal delay={120} className="mt-16 flex justify-center">
          <div className="h-40 w-full max-w-2xl animate-pulse rounded-3xl bg-white/5" />
        </Reveal>
      )}

      {status === 'ready' && (
        <>
          <Reveal delay={120} className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-3">
            <ProfileBlock label="Último commit" avatarUrl={lastCommit?.author?.avatar_url} login={lastCommit?.author?.login} />

            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-[var(--c-solar)] sm:text-6xl">
                  <CountUp end={totalCommits} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--c-mist)]">Commits totales</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-semibold text-[var(--c-comet)] sm:text-3xl">
                  {avgPerWeek.toFixed(1)}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--c-mist)]">Commits / semana (prom.)</p>
              </div>
            </div>

            <ProfileBlock label="Más commits" avatarUrl={topContributor?.avatar_url} login={topContributor?.login} />
          </Reveal>

          <Reveal delay={180} className="mx-auto mt-10 max-w-xl text-center">
            <p className="text-lg text-[var(--c-stardust)]">"{commitSubject(lastCommit?.commit?.message)}"</p>
          </Reveal>

          <Reveal delay={240} className="relative mx-auto mt-16 max-w-[18rem] sm:max-w-[24rem]">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4">
              {contributors.map((c) => (
                <img
                  key={c.login}
                  src={c.avatar_url}
                  alt={c.login}
                  title={`@${c.login} · ${c.contributions} commits`}
                  className="h-12 w-12 shrink-0 snap-center rounded-full border border-[var(--c-line)] sm:h-16 sm:w-16"
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--c-void)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--c-void)] to-transparent" />
          </Reveal>
        </>
      )}
    </section>
  )
}
