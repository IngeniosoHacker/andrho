// Articles (andrho.com/articulos/): SEO content written from AndRho's point
// of view. Each article is data — blocks of text — so the React pages
// (src/articles.jsx, src/article.jsx) and the static HTML that vite.config.js
// injects for crawlers without JavaScript (articleHtml, articlesIndexHtml)
// always say the same thing.
//
// Two sources: ARTICLES below (built into static pages) and the articles
// uploaded from the dashboard (Web > Artículos), which andrho-api serves as
// Markdown and lib/remoteArticles.js turns into this same shape (fromApi).
// The site lists both; on the same slug, the built one wins.
//
// Adding a built article: add it to ARTICLES, copy articulos/software-libre.html
// to articulos/<slug>.html with the new data-slug, and list it in
// public/sitemap.xml (vite.config.js picks the page up from ARTICLES).
// Uploaded articles need none of that: nginx serves articulos/plantilla.html
// for any /articulos/<slug>.html that isn't built, and article.jsx loads the
// article from andrho-api by the slug in the URL.
//
// Blocks: { p }, { h2 }, { h3 }, { ul: [...] }, { ol: [...] }, { quote },
// { table: { head: [...], rows: [[...]] } }. Inline text supports **bold**
// and [links](url).
import { SITE } from './seo.js'
import { markdownToBlocks, readingMinutes } from './markdown.js'

export const ARTICLES = [
  {
    slug: 'software-libre',
    title: 'Software libre en tu empresa: lo que el software privativo dice y lo que no te cuenta',
    description:
      '"Es inseguro", "nadie da soporte", "lo gratis sale caro". Respondemos uno por uno los argumentos que se usan contra el software libre en las empresas, y por qué AndRho está construido sobre él.',
    date: '2026-10-10',
    author: 'Equipo AndRho',
    readingMinutes: 8,
    tags: ['Software libre', 'Pymes', 'Tecnología'],
    body: [
      {
        p: 'Si alguna vez evaluaste un sistema para tu empresa, seguro escuchaste alguno de estos argumentos: que el software libre es inseguro, que nadie responde si algo falla, que es cosa de programadores o que "lo gratis sale caro". Casi siempre vienen de quien vende licencias.',
      },
      {
        p: 'AndRho está construido de punta a punta sobre **software libre**, así que estas preguntas nos las hacen seguido. Aquí van las objeciones más comunes, una por una, con lo que tienen de cierto y lo que dejan fuera.',
      },
      { h2: 'Primero: qué es (y qué no es) el software libre' },
      {
        p: 'Software libre no significa "gratis". Significa que quien lo usa tiene cuatro libertades: **usarlo** para lo que quiera, **estudiar** cómo funciona, **modificarlo** y **compartirlo**. El software privativo es lo contrario: compras, o cada vez más alquilas, un permiso para usar un programa que no puedes revisar, cambiar ni llevarte a otro lado.',
      },
      {
        p: 'Y una aclaración que evita muchos malentendidos: que el **código** de un programa sea libre no hace públicos **tus datos**. Tus ventas, tus clientes y tu inventario son tan privados en un sistema libre como en uno privativo.',
      },
      { h2: '"El software libre es inseguro porque cualquiera ve el código"' },
      {
        p: 'Es el argumento más repetido y el que menos se sostiene. En seguridad hay un principio aceptado desde hace más de un siglo: un sistema debe ser seguro aunque su funcionamiento sea conocido. Esconder el código no elimina los fallos; solo hace que menos gente pueda encontrarlos y corregirlos.',
      },
      {
        p: 'Los fallos existen en ambos mundos. La diferencia es qué pasa cuando aparecen. En 2014 se descubrió Heartbleed, un fallo grave en OpenSSL: el parche salió en días, todo el mundo pudo revisarlo, y el caso llevó a las grandes empresas tecnológicas a financiar la seguridad de proyectos libres críticos. En el software privativo dependes de que el fabricante reconozca el problema, decida arreglarlo y te avise.',
      },
      {
        p: 'Hay un dato que lo resume: Linux, software libre, mueve la mayoría de los servidores de internet y todas las supercomputadoras de la lista TOP500. Los bancos, las bolsas de valores y las nubes más grandes del mundo no lo eligieron por ser inseguro.',
      },
      { h2: '"Si algo falla, nadie responde"' },
      {
        p: 'Libre no significa estar solo. Igual que con un sistema privativo, alguien tiene que instalarlo, mantenerlo y responder cuando hay un problema, y por eso hay empresas enteras dedicadas a dar soporte a software libre, con contratos y tiempos de respuesta.',
      },
      {
        p: 'Vale la pena leer la letra pequeña del otro lado: casi todas las licencias privativas limitan al mínimo la responsabilidad del fabricante si el programa falla. Tener a quién llamar no es lo mismo que tener a alguien obligado a resolver. La diferencia real es esta: con software libre, si tu proveedor de soporte no te convence, **cambias de proveedor sin cambiar de sistema ni perder tus datos**. Con software privativo, el fabricante y el soporte suelen ser la misma empresa, y no hay a dónde ir.',
      },
      { h2: '"Lo gratis sale caro"' },
      {
        p: 'Tiene algo de razón: implementar cualquier sistema cuesta. Hay que instalarlo, migrar los datos, capacitar al equipo y mantenerlo, sea libre o privativo. Quien te diga que el software libre no cuesta nada te está vendiendo otra cosa.',
      },
      {
        p: 'Lo que cambia es **qué pagas**. Con software libre pagas por servicio: que alguien lo instale, lo adapte y lo cuide. Con software privativo pagas eso **más** el permiso de usarlo, y ese permiso tiene costos que no salen en la primera cotización:',
      },
      {
        ul: [
          '**Precios que no controlas.** El proveedor puede subir la licencia, cobrar por usuario o pasar de pago único a suscripción. Solo te queda aceptar o empezar de cero.',
          '**Una multa por crecer.** Con licencias por usuario, cada persona que contratas cuesta más software. Tu crecimiento se convierte en la ganancia de tu proveedor.',
          '**El costo de salir.** Tus datos quedan en formatos cerrados, y exportarlos completos es difícil o se cobra aparte. Cuanto más tiempo pasa, más caro es irse.',
        ],
      },
      {
        p: 'Un detalle histórico: a mediados de los 2000, varios estudios que concluían que el software libre "salía más caro" fueron financiados por un fabricante de software privativo como parte de su publicidad. Cuando leas una comparación de costos, revisa quién la pagó.',
      },
      { h2: '"El software libre es para programadores"' },
      {
        p: 'Quien usa un sistema no ve su licencia. Si usas un celular Android, el navegador Firefox o un sitio hecho con WordPress, ya usas software libre todos los días sin notarlo. Que algo sea fácil o difícil de usar depende de cómo está diseñado, no de si su código es abierto.',
      },
      {
        p: 'Lo que sí cambia es lo que pasa detrás: como el código se puede modificar, el sistema se puede ajustar a cómo trabaja tu negocio. Eso es lo que hace AndRho: **adaptarse a tu operación**, en lugar de obligarte a cambiarla para que encaje en un programa pensado para otra empresa.',
      },
      { h2: '"Un proyecto libre puede desaparecer"' },
      {
        p: 'Cualquier software puede desaparecer. La pregunta es qué pasa contigo cuando sucede. Si un fabricante privativo cierra, vende el producto o lo descontinúa, nadie más puede seguirlo: el código es suyo.',
      },
      {
        p: 'Con software libre, el código sigue ahí y otros pueden continuarlo. Pasó en 2010, cuando la comunidad de OpenOffice creó LibreOffice tras la compra de Sun por Oracle. Y pasó en 2024, cuando Redis cambió su licencia a una que ya no era libre: en semanas, empresas como AWS y Google impulsaron **Valkey**, una continuación libre bajo la Linux Foundation, y en 2025 Redis volvió a ofrecer una licencia libre (AGPLv3). Un cambio de rumbo de una empresa no pudo dejar a sus usuarios sin salida.',
      },
      { h2: '"Si mi sistema es libre, la competencia puede copiarlo"' },
      {
        p: 'Tu ventaja nunca fue el código de tu sistema administrativo: fueron tus clientes, tu producto, tu forma de trabajar y tus datos. Ninguna de esas cosas se vuelve pública por usar software libre. Lo que sí ganas es que tus datos viven en formatos estándar: en AndRho viven en **PostgreSQL**, una base de datos libre que cualquier programador sabe leer. Si un día decides irte, tu información se va contigo, completa.',
      },
      { h2: 'Seamos honestos' },
      {
        p: 'No todo el software privativo es malo, y hay herramientas muy específicas que todavía no tienen una alternativa libre a la altura. Nuestra recomendación es simple: el **núcleo de tu negocio** —tus datos, tu ERP, tu operación— debería estar sobre software libre. Es lo que más te costaría perder y lo que más caro sería migrar.',
      },
      { h2: 'Las tecnologías libres sobre las que está construido AndRho' },
      {
        table: {
          head: ['Tecnología', 'Para qué la usamos', 'Licencia'],
          rows: [
            ['Linux', 'El sistema operativo de nuestros servidores', 'GPLv2'],
            ['PostgreSQL', 'La base de datos donde viven tus datos', 'PostgreSQL (libre)'],
            ['Redis', 'Caché y límites de uso', 'AGPLv3 (desde Redis 8)'],
            ['Go y Gin', 'El backend: cuentas, recomendaciones, lista de espera', 'BSD y MIT'],
            ['React y Vite', 'La interfaz que ves en el navegador', 'MIT'],
            ['Tailwind CSS', 'El diseño visual', 'MIT'],
            ['nginx', 'El servidor web que entrega el sitio', 'BSD'],
            ['Odoo Community', 'El ERP que integramos para tu operación', 'LGPLv3'],
          ],
        },
      },
      { h2: 'Cinco preguntas antes de contratar cualquier software' },
      {
        ol: [
          '¿Puedo exportar todos mis datos, completos, en un formato estándar?',
          '¿Qué le pasa a mi operación si el proveedor desaparece o cambia de dueño?',
          '¿Cuánto me va a costar cuando mi equipo sea el doble de grande?',
          'Si el soporte no me convence, ¿puedo cambiar de proveedor sin cambiar de sistema?',
          '¿Quién pagó el estudio que me muestran para convencerme?',
        ],
      },
      {
        p: 'Si las respuestas te dejan incómodo, no estás comprando software: estás alquilando tu propio sistema.',
      },
      { h2: 'Preguntas frecuentes' },
      { h3: '¿El software libre es seguro para una empresa?' },
      {
        p: 'Sí. Su seguridad no depende de esconder el código sino de que muchos puedan revisarlo y corregirlo. Linux, software libre, mueve la mayoría de los servidores de internet, incluidos los de bancos y grandes nubes.',
      },
      { h3: '¿Quién da soporte al software libre?' },
      {
        p: 'Empresas de servicio, con contrato, igual que con el software privativo. La diferencia es que puedes cambiar de proveedor de soporte sin cambiar de sistema ni perder tus datos.',
      },
      { h3: '¿El software libre es gratis?' },
      {
        p: 'La licencia sí; implementarlo y mantenerlo no. Con software libre pagas por servicio; con privativo pagas el servicio más el permiso de uso, que suele subir con cada usuario.',
      },
      { h3: '¿Si uso software libre mis datos son públicos?' },
      {
        p: 'No. El código del programa es abierto; tus datos son tan privados como en cualquier otro sistema.',
      },
      { h2: 'Así trabajamos en AndRho' },
      {
        p: 'AndRho todavía está en desarrollo y lo construimos a la vista: puedes ver [el avance en vivo](/#progreso). Si quieres un sistema que se adapte a tu negocio, que te diga qué está pasando con tus datos y que nunca te encierre, [únete a la lista de espera](/waitlist.html).',
      },
    ],
  },
]

export const articleUrl = (a) => a.path || `/articulos/${a.slug}.html`
export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug)

// An andrho-api article (GET /public/sites/:siteId/articles[/:slug]) in the
// shape above. List responses carry no body, so `body` is [] there.
export function fromApi(a) {
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    date: (a.published_at || a.created_at || '').slice(0, 10),
    author: a.author || 'Equipo AndRho',
    readingMinutes: readingMinutes(a.word_count),
    tags: a.tags || [],
    keywords: a.keywords || [],
    path: a.path || '',
    body: a.body ? markdownToBlocks(a.body).blocks : [],
  }
}

// Built articles plus uploaded ones, newest first; a built article wins
// over an uploaded one with the same slug.
export function mergeArticles(remote) {
  const bySlug = new Map((remote || []).map((a) => [a.slug, a]))
  for (const a of ARTICLES) bySlug.set(a.slug, a)
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

// Inline markup → tokens: { text } | { bold } | { link, href }.
export function inline(text) {
  const tokens = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) tokens.push({ text: text.slice(last, m.index) })
    if (m[1] !== undefined) tokens.push({ bold: m[1] })
    // Links come from uploaded Markdown too: web, relative, anchors and mail only.
    else tokens.push({ link: m[2], href: /^(https?:\/\/|\/|#|mailto:)/i.test(m[3]) ? m[3] : '#' })
    last = re.lastIndex
  }
  if (last < text.length) tokens.push({ text: text.slice(last) })
  return tokens
}

// — Static HTML for crawlers (see vite.config.js) —————————————————————

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const inlineHtml = (text) =>
  inline(text)
    .map((t) => (t.bold ? `<strong>${esc(t.bold)}</strong>` : t.link ? `<a href="${esc(t.href)}">${esc(t.link)}</a>` : esc(t.text)))
    .join('')

function blockHtml(b) {
  if (b.p) return `<p>${inlineHtml(b.p)}</p>`
  if (b.h2) return `<h2>${esc(b.h2)}</h2>`
  if (b.h3) return `<h3>${esc(b.h3)}</h3>`
  if (b.quote) return `<blockquote>${inlineHtml(b.quote)}</blockquote>`
  if (b.ul) return `<ul>${b.ul.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</ul>`
  if (b.ol) return `<ol>${b.ol.map((i) => `<li>${inlineHtml(i)}</li>`).join('')}</ol>`
  if (b.table)
    return `<table><thead><tr>${b.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.table.rows
      .map((r) => `<tr>${r.map((c) => `<td>${inlineHtml(c)}</td>`).join('')}</tr>`)
      .join('')}</tbody></table>`
  return ''
}

function headTags({ title, description, url, type, jsonLd }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${SITE.ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${SITE.ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n')
}

const INDEX_TITLE = 'Artículos de AndRho | Tecnología, datos y software libre para pymes'
const INDEX_DESCRIPTION =
  'Guías y opinión del equipo de AndRho sobre tecnología para pymes en Guatemala: datos, software libre, ERP y marketing.'

// "## Preguntas frecuentes" followed by "### question" + paragraphs becomes
// a FAQPage in the article's JSON-LD: search engines and AI assistants quote
// question/answer pairs directly.
const plain = (text) => inline(text).map((t) => t.bold ?? t.link ?? t.text).join('')
export function articleFaq(blocks) {
  const start = blocks.findIndex((b) => b.h2 && /preguntas frecuentes/i.test(b.h2))
  if (start < 0) return []
  const faq = []
  for (const b of blocks.slice(start + 1)) {
    if (b.h2) break
    if (b.h3) faq.push({ q: b.h3, a: [] })
    else if (faq.length && b.p) faq[faq.length - 1].a.push(plain(b.p))
  }
  return faq.filter((f) => f.a.length)
}

export function articleHead(a) {
  const url = `${SITE.url}${articleUrl(a)}`
  const faq = articleFaq(a.body)
  return headTags({
    title: `${a.title} | AndRho`,
    description: a.description,
    url,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          inLanguage: 'es-GT',
          keywords: [...(a.keywords || []), ...a.tags].join(', '),
          mainEntityOfPage: url,
          image: SITE.ogImage,
          author: { '@type': 'Organization', name: a.author, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/images/logo/andrho-mark.png` } },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE.url}/` },
            { '@type': 'ListItem', position: 2, name: 'Artículos', item: `${SITE.url}/articulos/` },
            { '@type': 'ListItem', position: 3, name: a.title, item: url },
          ],
        },
        ...(faq.length
          ? [
              {
                '@type': 'FAQPage',
                mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })),
              },
            ]
          : []),
      ],
    },
  })
}

export function articleHtml(a) {
  return `
<article class="seo-fallback">
  <p><a href="/">AndRho</a> › <a href="/articulos/">Artículos</a></p>
  <h1>${esc(a.title)}</h1>
  <p>${esc(a.author)} · <time datetime="${a.date}">${formatDate(a.date)}</time> · ${a.readingMinutes} min de lectura</p>
  ${a.body.map(blockHtml).join('\n  ')}
</article>`
}

// The index's head and body are wrapped in <!--articles:*:start/end-->
// markers so src/server.js can re-render them with the uploaded articles.
export function articlesIndexHead(list = ARTICLES) {
  return `<!--articles:head:start-->\n${headTags({
    title: INDEX_TITLE,
    description: INDEX_DESCRIPTION,
    url: `${SITE.url}/articulos/`,
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Artículos de AndRho',
      url: `${SITE.url}/articulos/`,
      inLanguage: 'es-GT',
      blogPost: list.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${SITE.url}${articleUrl(a)}`, datePublished: a.date })),
    },
  })}\n<!--articles:head:end-->`
}

export function articlesIndexHtml(list = ARTICLES) {
  return `<!--articles:body:start-->
<main class="seo-fallback">
  <h1>Artículos</h1>
  <p>${esc(INDEX_DESCRIPTION)}</p>
  <ul>
    ${list.map((a) => `<li><a href="${articleUrl(a)}">${esc(a.title)}</a> — ${esc(a.description)}</li>`).join('\n    ')}
  </ul>
</main>
<!--articles:body:end-->`
}
