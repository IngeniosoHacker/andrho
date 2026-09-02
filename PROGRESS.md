# AndRho — estado del ecosistema (2026-09-02)

Contexto para retomar el trabajo en una próxima sesión. Esta sesión creó el
backend de cuentas (`andrho-api`) y migró el frontend oficial + login/dashboard
protegido a `andrho-tracker-dashboard`. **Nada de esto está pusheado a GitHub
todavía** — quedó listo en commits locales para que el usuario revise y
pushee él mismo.

## Mapa de repos (todos sibling, en `/Users/juanpa.muralles/Andrho/`)

| Repo | Rol | Estado tras esta sesión |
|---|---|---|
| `andrho` | Este repo. Landing original React "en construcción" (fuente de la que se copió el contenido). | Sin cambios. |
| `WebTracker` | Ingestión de analytics (Node/Express + Postgres + Redis). Tabla `sites`. | Sin cambios, solo leído. |
| `andrho-tracker-dashboard` | Dashboard de analytics (Node/Express). | **Modificado**, rama `feat/landing-and-auth` (no mergeada a `main`, no pusheada). |
| `andrho-api` | **Nuevo.** Backend de cuentas (Go/Gin/Postgres/Redis). | Repo nuevo, `git init` local, 1 commit en `main`, sin remoto. |

## Qué se construyó

### `andrho-api` (nuevo, Go + Gin + PostgreSQL + Redis)

Backend de cuentas: signup crea una cuenta y le asigna un `site_id` propio
(usado luego por el dashboard/tracker), login/refresh/logout con JWT.

- **Endpoints**: `POST /auth/signup`, `POST /auth/login`, `POST /auth/refresh`
  (rota el refresh token en cada uso), `POST /auth/logout`, `GET /auth/me`.
- **JWT** (HS256, secreto compartido `JWT_SECRET`): claims `sub, email,
  site_id, company_name, iat, exp`. El refresh token NO es JWT — es un string
  random opaco, se guarda solo su hash SHA-256 en Postgres.
- **DB propia** (`accounts`, `refresh_tokens`) + un segundo pool
  (`TRACKER_DATABASE_URL`) que solo hace `INSERT ... ON CONFLICT DO NOTHING`
  en la tabla `sites` del Postgres de `WebTracker` en cada signup, para que el
  tracker acepte datos de ese `site_id` de inmediato.
- **Redis**: solo rate-limit de login (`ratelimit:login:<ip>:<email>`, 10
  intentos/15min, fail-open si Redis no responde) — namespace que no choca con
  las keys de `WebTracker` (`queue:events`, `sessions:active`, ...).
- **`accounts.odoo_company_id`**: columna reservada, sin usar — fase Odoo.
- Verificado end-to-end con `curl` contra Postgres/Redis reales en Docker
  (signup → fila en `accounts` y en `sites`, login, `/auth/me`, refresh con
  rotación, logout idempotente, 409 en email duplicado, 401/403 según
  corresponda).
- **README.md** del propio repo ya trae: contrato JWT completo, todos los
  endpoints con ejemplos `curl`, decisiones de diseño, y una sección nueva
  **"Deploying on Railway"** que responde explícitamente si se puede reusar el
  mismo Postgres/Redis que ya usa `andrho-tracker-dashboard`/`WebTracker`:
  **sí a ambos** (Redis siempre seguro por el prefijo de sus keys; Postgres
  con dos opciones — misma DB tal cual, o una DB nueva en el mismo plugin para
  más aislamiento — ver el README para el paso a paso exacto de variables de
  Railway).

### `andrho-tracker-dashboard` (rama `feat/landing-and-auth`)

- **`web/`** (nuevo): sub-proyecto Vite+React 19+Tailwind v4 con una copia de
  la landing de `andrho`, editada para verse "oficial":
  - Quitado: título/meta "En construcción", el párrafo "En construcción" del
    Hero, el tagline "todavía en construcción" del Footer, y la sección
    **`LiveProgress`** completa (widget de progreso de GitHub — se consideró
    señal de "obra en progreso" aunque no dijera la palabra).
  - Mantenido tal cual: `Features`/`InfiniteMenu` (el menú 3D WebGL de
    producto — requisito explícito), `Waitlist`/`MissionForm` (sigue
    guardando en `localStorage`, sin cambios de comportamiento — es un
    lead-gen separado del signup real), `MissionGame`.
  - Build multi-página de Vite: `index.html` (landing), `login.html`,
    `signup.html`.
  - `login.jsx`/`signup.jsx` llaman a `andrho-api` (`VITE_ANDRHO_API_URL`),
    guardan `access_token`/`refresh_token` en `localStorage`, redirigen a
    `/dashboard/`.
- **`public/` → `public/dashboard/`**: el dashboard de analytics de siempre,
  movido bajo `/dashboard`. Se le quitó por completo el gate viejo de
  `site_id` sin password (localStorage `wtd_sites`/`wtd_active_site`,
  `addSiteFlow`, sidebar multi-sitio). Ahora: al cargar, valida sesión contra
  `GET /auth/me` (con retry vía `/auth/refresh`), si falla redirige a
  `/login.html`; cada cuenta ve **un solo `site_id`** (el suyo, del JWT) en
  vez de poder cambiar entre varios. Todas las llamadas a `/api/sites/:siteId/*`
  mandan `Authorization: Bearer <access_token>`. Botón de cerrar sesión.
- **Backend (`src/`)**: nuevo `src/middleware/auth.js` (verifica el JWT con el
  mismo `JWT_SECRET`), aplicado a todas las rutas `/api/sites/:siteId/*` +
  chequeo `siteId de la URL === siteId de la cuenta` (403 si no matchea —
  esto cierra el hueco de seguridad que el README viejo ya documentaba:
  cualquiera podía consultar cualquier `site_id`). Se eliminaron `GET
  /api/sites` (listaba todos los clientes sin auth) y `GET
  /api/sites/:siteId/verify` (era el gate viejo).
- Verificado con Postgres real en Docker + JWTs firmados a mano con el mismo
  secreto (401 sin token, 403 con `site_id` ajeno, 200 con el correcto);
  build de `web/` confirmado sin "en construcción" y sin `LiveProgress`.
- **Contrato verificado campo por campo** contra `andrho-api` (no solo por
  reporte de agente, se leyó el código real de ambos lados): nombres de JSON
  (`access_token`, `refresh_token`, `email`, `company_name`, `site_id`,
  `{"error": "..."}`) y claims JWT coinciden exactamente.

## Pendiente / próximos pasos

1. **Revisar y pushear ambos repos** — `andrho-api` (repo nuevo, sin remoto
   todavía) y la rama `feat/landing-and-auth` de `andrho-tracker-dashboard`
   (no mergeada a `main`).
2. **Railway**: crear el servicio de `andrho-api` en el mismo proyecto que
   `WebTracker`/`andrho-tracker-dashboard`, siguiendo la sección "Deploying on
   Railway" de su README (reusar Postgres/Redis existentes, generar dominio
   público, setear `JWT_SECRET` — **el mismo valor** también en las variables
   de `andrho-tracker-dashboard**, `ALLOWED_ORIGINS`, `VITE_ANDRHO_API_URL` /
   `ANDRHO_API_URL`).
3. **Decidir** (no bloqueante, documentado como opción en el README): si
   `andrho-api` usa la misma base de datos Postgres tal cual, o una base
   lógica separada dentro del mismo plugin, para más aislamiento del schema de
   cuentas vs. analytics.
4. **Onboarding post-signup** (no construido): mostrarle al cliente recién
   registrado el snippet `<script data-site-id="...">` para pegar en su
   propio sitio — hoy el `site_id` se genera pero no se le enseña al usuario
   dónde usarlo.
5. **Fase Odoo** (explícitamente fuera de esta sesión): `accounts.odoo_company_id`
   ya existe en el schema, nada más está implementado.
6. Antes de producción: `ALLOWED_ORIGINS=*` es el default de dev en
   `andrho-api` — hay que fijarlo al dominio real de `andrho-tracker-dashboard`.

## Dónde mirar primero en la próxima sesión

- Plan original completo (decisiones ya confirmadas con el usuario):
  `~/.claude/plans/delightful-plotting-thacker.md`.
- `andrho-api/README.md` — contrato JWT + endpoints + Railway.
- `andrho-tracker-dashboard` rama `feat/landing-and-auth` — `git log`/`git diff main` para ver todo el cambio.
