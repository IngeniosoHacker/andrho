import { useEffect, useState } from 'react'
import CountUp from '../ui/CountUp.jsx'
import Reveal from '../ui/Reveal.jsx'

const REPO = 'IngeniosoHacker/andrho'
const REPO_URL = `https://github.com/${REPO}`

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diffMs / 3_600_000)
  if (hours < 1) return 'hace minutos'
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

function CrewMember({ avatarUrl, login, fallbackName }) {
  return (
    <div className="flex items-center gap-3 pl-4 sm:pl-6">
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-9 w-9 rounded-full border border-[var(--c-line)]" />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c-line)] bg-[var(--c-panel-2)] text-xs">
          ?
        </span>
      )}
      <span className="text-[var(--c-stardust)]">{login ? `@${login}` : fallbackName || 'desconocido'}</span>
    </div>
  )
}

export default function LiveProgress() {
  const [lastCommit, setLastCommit] = useState(null)
  const [totalCommits, setTotalCommits] = useState(0)
  const [topContributor, setTopContributor] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [commitsRes, contributorsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`),
          fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`),
        ])
        if (!commitsRes.ok || !contributorsRes.ok) throw new Error('GitHub API unavailable')
        const commitsJson = await commitsRes.json()
        const contributorsJson = await contributorsRes.json()
        if (cancelled) return

        // /contributors is already sorted descending by commit count.
        const total = contributorsJson.reduce((sum, c) => sum + c.contributions, 0)

        setLastCommit(commitsJson[0])
        setTotalCommits(total)
        setTopContributor(contributorsJson[0] ?? null)
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="progreso" className="mx-auto max-w-4xl px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          No confíes en la palabra, confía en el commit.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--c-mist)]">
          El desarrollo de AndRho es público. Esta es la bitácora de a bordo, directo del repositorio.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-14">
        <div className="overflow-hidden rounded-2xl border border-[var(--c-line)] bg-black/60 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-[var(--c-line)] bg-[var(--c-nebula)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--c-plasma)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--c-solar)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--c-comet)]" />
            <span className="ml-2 font-mono text-xs text-[var(--c-mist)]">andrho@repo:~$ status --live</span>
          </div>

          <div className="space-y-7 p-6 font-mono text-sm sm:p-8">
            {status === 'loading' &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-lg bg-white/5" />
              ))}

            {status === 'error' && (
              <p className="text-[var(--c-mist)]">
                <span className="text-[var(--c-plasma)]">$</span> no se pudo contactar a la nave nodriza — el
                repositorio sigue siendo público en{' '}
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-[var(--c-comet)] hover:underline">
                  GitHub
                </a>
                .
              </p>
            )}

            {status === 'ready' && (
              <>
                <div>
                  <p className="text-[var(--c-comet)]">
                    <span className="text-[var(--c-mist)]">$</span> git log -1
                  </p>
                  <div className="mt-3">
                    <CrewMember
                      avatarUrl={lastCommit?.author?.avatar_url}
                      login={lastCommit?.author?.login}
                      fallbackName={lastCommit?.commit?.author?.name}
                    />
                    <p className="mt-2 pl-12 text-[var(--c-stardust)] sm:pl-[3.75rem]">
                      "{lastCommit?.commit?.message?.split('\n')[0]}"
                    </p>
                    <p className="pl-12 text-xs text-[var(--c-mist)] sm:pl-[3.75rem]">
                      {timeAgo(lastCommit?.commit?.author?.date)} · {lastCommit?.sha?.slice(0, 7)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[var(--c-comet)]">
                    <span className="text-[var(--c-mist)]">$</span> git rev-list --count HEAD
                  </p>
                  <p className="mt-3 pl-4 font-display text-3xl font-bold text-[var(--c-solar)] sm:pl-6">
                    <CountUp end={totalCommits} /> <span className="text-base font-normal text-[var(--c-mist)]">commits totales</span>
                  </p>
                </div>

                <div>
                  <p className="text-[var(--c-comet)]">
                    <span className="text-[var(--c-mist)]">$</span> git shortlog -sn | head -1
                  </p>
                  <div className="mt-3">
                    <CrewMember avatarUrl={topContributor?.avatar_url} login={topContributor?.login} />
                    <p className="mt-2 pl-12 text-xs text-[var(--c-mist)] sm:pl-[3.75rem]">
                      {topContributor?.contributions} commits — más que nadie en la tripulación
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10 flex justify-center">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--c-line)] px-6 py-3 font-medium transition-colors hover:border-[var(--c-comet)]/50 hover:text-[var(--c-comet)]"
        >
          Ver el repositorio en GitHub ↗
        </a>
      </Reveal>
    </section>
  )
}
