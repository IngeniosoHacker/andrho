import { useMemo, useState } from 'react'
import Stepper from '../ui/form/Stepper.jsx'
import Field from '../ui/form/Field.jsx'
import { TextInput, TextareaField, ChipMultiSelect, RadioCards, RatingScale } from '../ui/form/inputs.jsx'
import {
  SECTORS,
  COMPANY_SIZES,
  SALES_METHODS,
  MANAGEMENT_TOOLS,
  saveSubmission,
} from '../../lib/waitlist.js'
import { makeTileImage } from '../../lib/tileImage.js'

const STEPS = ['Contacto', 'Tu empresa', 'Presencia digital', 'Gestión actual']

// One generated "planet" per step (same generator that textures the
// InfiniteMenu sphere in Features.jsx) -- on-brand imagery for the wizard's
// image panel with no new asset files to source or maintain.
const STEP_VISUALS = STEPS.map((label, i) => makeTileImage({ label, index: i }))

const INITIAL_STATE = {
  name: '',
  company: '',
  email: '',
  sectors: [],
  companySize: '',
  salesMethod: '',
  hasWebsite: '',
  websiteUrl: '',
  restaurantExpiry: '',
  management: '',
  satisfaction: 0,
  satisfactionReason: '',
  improvement: '',
}

export default function MissionForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INITIAL_STATE)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const isRestaurant = form.sectors.includes('restaurantes')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return form.name.trim() && form.company.trim() && form.email.trim()
      case 1:
        return form.sectors.length > 0 && form.companySize && form.salesMethod
      case 2:
        return form.hasWebsite && (form.hasWebsite === 'no' || form.websiteUrl.trim())
      case 3:
        return form.management && form.satisfaction > 0
      default:
        return true
    }
  }, [step, form])

  async function handleFormSubmit(e) {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      await saveSubmission(form)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message || 'No se pudo enviar tu misión. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="mission-form" className="flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center lg:px-10">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Asiento reservado, {form.name.split(' ')[0]}.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--c-mist)]">
          Gracias por sumarte a la tripulación de <strong className="text-[var(--c-stardust)]">{form.company}</strong>.
          Te escribiremos a <strong className="text-[var(--c-stardust)]">{form.email}</strong> apenas abramos las
          primeras cuentas.
        </p>
        <p className="mt-4 max-w-2xl text-[var(--c-mist)]">
          {form.hasWebsite === 'no'
            ? 'Como todavía no tienes página web, te compartiremos el script de tracking de AndRho para que empieces a capturar datos desde el día uno.'
            : 'Como ya tienes página web, te enviaremos las instrucciones para instalar el plugin de AndRho en tu sitio.'}
        </p>
        <a
          href="#top"
          className="mt-9 inline-block rounded-full border border-[var(--c-line)] px-6 py-3 font-medium transition-colors hover:border-[var(--c-comet)]/50 hover:text-[var(--c-comet)]"
        >
          Volver al inicio ↑
        </a>
      </section>
    )
  }

  return (
    <section id="mission-form" className="border-t border-[var(--c-line)] bg-[var(--c-nebula)]">
      <form onSubmit={handleFormSubmit} className="flex min-h-screen flex-col">
        <div className="grid flex-1 lg:grid-cols-2">
          {/* Image panel — desktop only, a distinct generated "planet" per step */}
          <div className="relative hidden overflow-hidden lg:block">
            <img key={step} src={STEP_VISUALS[step]} alt="" className="h-full w-full animate-fade-in object-cover" />
          </div>

          {/* Question panel */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
            <div className="mx-auto w-full max-w-md">
              <img
                key={step}
                src={STEP_VISUALS[step]}
                alt=""
                className="mb-8 h-40 w-full animate-fade-in rounded-2xl object-cover lg:hidden"
              />

              <Stepper steps={STEPS} current={step} />

              {step === 0 && (
                <>
                  <Field label="Tu nombre" required>
                    <TextInput
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Ada Lovelace"
                    />
                  </Field>
                  <Field label="Nombre de tu empresa" required className="mt-6">
                    <TextInput
                      required
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      placeholder="Nova Textiles"
                    />
                  </Field>
                  <Field label="Correo" required hint="Solo lo usaremos para avisarte cuando AndRho esté listo." className="mt-6">
                    <TextInput
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="tucorreo@empresa.com"
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="¿De qué es tu empresa?" required hint="Selección múltiple.">
                    <ChipMultiSelect options={SECTORS} value={form.sectors} onChange={(v) => update('sectors', v)} />
                  </Field>
                  <Field label="Tamaño de tu empresa" required className="mt-6">
                    <RadioCards options={COMPANY_SIZES} value={form.companySize} onChange={(v) => update('companySize', v)} />
                  </Field>
                  <Field label="Metodología de venta" required className="mt-6">
                    <RadioCards options={SALES_METHODS} value={form.salesMethod} onChange={(v) => update('salesMethod', v)} />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field label="¿Tienes página web?" required>
                    <RadioCards
                      options={[
                        { value: 'si', label: 'Sí, ya tengo' },
                        { value: 'no', label: 'No, todavía no' },
                      ]}
                      value={form.hasWebsite}
                      onChange={(v) => update('hasWebsite', v)}
                    />
                  </Field>

                  {form.hasWebsite === 'si' && (
                    <Field label="¿Cuál es tu sitio?" required hint="Te enviaremos instrucciones para instalar el plugin de AndRho ahí." className="mt-6">
                      <TextInput
                        type="url"
                        required
                        value={form.websiteUrl}
                        onChange={(e) => update('websiteUrl', e.target.value)}
                        placeholder="https://tuempresa.com"
                      />
                    </Field>
                  )}
                  {form.hasWebsite === 'no' && (
                    <p className="mt-6 rounded-lg border border-[var(--c-line)] bg-[var(--c-panel)] px-4 py-3 text-sm text-[var(--c-mist)]">
                      Sin problema — te compartiremos el script del AndRho Web-tracker para que empieces a
                      capturar datos apenas tengas un sitio.
                    </p>
                  )}

                  {isRestaurant && (
                    <Field label="¿Organizas tus productos por fecha de vencimiento?" hint="Pregunta específica para restaurantes." className="mt-6">
                      <RadioCards
                        options={[
                          { value: 'si', label: 'Sí' },
                          { value: 'no', label: 'No' },
                        ]}
                        value={form.restaurantExpiry}
                        onChange={(v) => update('restaurantExpiry', v)}
                      />
                    </Field>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="¿Usas software o papel para administrar?" required>
                    <RadioCards options={MANAGEMENT_TOOLS} value={form.management} onChange={(v) => update('management', v)} columns={1} />
                  </Field>
                  <Field label="¿Qué tan satisfecho estás con tu software/proceso actual?" required hint="1 = nada satisfecho · 5 = muy satisfecho" className="mt-6">
                    <RatingScale value={form.satisfaction} onChange={(v) => update('satisfaction', v)} />
                  </Field>
                  <Field label="¿Por qué?" className="mt-6">
                    <TextareaField
                      value={form.satisfactionReason}
                      onChange={(e) => update('satisfactionReason', e.target.value)}
                      placeholder="Cuéntanos qué funciona o qué no..."
                    />
                  </Field>
                  <Field label="¿Qué te gustaría mejorar?" className="mt-6">
                    <TextareaField
                      value={form.improvement}
                      onChange={(e) => update('improvement', e.target.value)}
                      placeholder="Si pudieras arreglar una sola cosa, ¿cuál sería?"
                    />
                  </Field>
                </>
              )}

              {submitError && (
                <p className="mt-6 rounded-lg border border-[var(--c-plasma)]/30 bg-[var(--c-plasma)]/5 px-4 py-3 text-sm text-[var(--c-plasma-dim)]">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom nav bar — forward/back, pinned across the full width */}
        <div className="flex items-center justify-between border-t border-[var(--c-line)] bg-[var(--c-nebula)] px-6 py-5 sm:px-12 lg:px-16">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`font-mono text-xs uppercase tracking-widest text-[var(--c-mist)] transition-colors hover:text-[var(--c-stardust)] ${step === 0 ? 'invisible' : ''}`}
          >
            ← Atrás
          </button>
          <button
            type="submit"
            disabled={!canAdvance || submitting}
            className="btn-solar rounded-full px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? 'Enviando…' : step < STEPS.length - 1 ? 'Siguiente →' : 'Completar misión'}
          </button>
        </div>
      </form>
    </section>
  )
}
