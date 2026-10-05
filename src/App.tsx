import { useEffect, useRef, useState, type ReactNode } from 'react'

/* IntersectionObserver reveal. No scroll listeners anywhere on this page. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

type Flavour = {
  name: string
  it: string
  body: string
  fill: string
  meta: string
}

const FLAVOURS: Flavour[] = [
  {
    name: 'Stracciatella',
    it: 'Classica alla fetta',
    body: 'The chocolate is shaved from one block every morning, so you get thin shards rather than a chip in every spoonful.',
    fill: 'gel-fill-cream',
    meta: 'milk',
  },
  {
    name: 'Pistacchio di Bronte',
    it: 'Sicilia',
    body: 'Bronte nuts roasted the day they arrive, ground while still warm, and folded through the base at four in the afternoon.',
    fill: 'gel-fill-blush',
    meta: 'milk',
  },
  {
    name: 'Fiordilatte',
    it: 'Latte intero',
    body: 'Whole milk from a single dairy outside Modena, thickened with nothing but its own cream.',
    fill: 'gel-fill-cream',
    meta: 'milk',
  },
  {
    name: 'Fragola Ribera',
    it: 'Sorbetto',
    body: 'Dairy free, as sorbetto has to be. Strawberries from Ribera, squeezed the same afternoon.',
    fill: 'gel-fill-berry',
    meta: 'no dairy',
  },
  {
    name: 'Nocciola del Piemonte',
    it: 'Piemonte IGP',
    body: 'Hazelnuts toasted in the shop, ground coarse, and left slightly grainy on purpose.',
    fill: 'gel-fill-blush',
    meta: 'milk',
  },
  {
    name: 'Crema Rosa',
    it: 'Sorbetto',
    body: 'Lychee, a little rose, and enough lime to keep it from being a sweet. Our best seller in July.',
    fill: 'gel-fill-berry',
    meta: 'no dairy',
  },
]

const MAKERS = [
  {
    name: 'Chiara Bonacini',
    role: 'Head gelataia',
    body: 'Trained in Varallo, worked seven summers on the Adriatic coast before coming back to Bologna. Signs off every batch before it reaches the counter, and refuses to serve anything she would not hand her own daughter.',
    img: 'https://picsum.photos/seed/dessert-bar-cafe-interior-back-room/1400/620',
    alt: 'Parlour front on a red brick wall, wooden shutters closed for the season',
    wide: true,
    stat: '18',
    statLabel: 'litres churned a day',
  },
  {
    name: 'Domenico Saitta',
    role: 'Pastry and cialde',
    body: 'Bakes the wafer cones at five and the cantucci at two, on the same oven the stracciatella block came out of. Will not buy cones in, on the grounds that they go soft by eleven.',
    img: 'https://picsum.photos/seed/gelato-cafe-interior-morning-light/900/640',
    alt: 'A cup left on the red counter at the end of a shift',
    stat: '5.30',
    statLabel: 'daily bake starts',
  },
  {
    name: 'Nabil Rahmani',
    role: 'Fruit and sorbetto',
    body: 'Buys the strawberries and the lychees himself on Monday mornings in the market behind Porta San Paolo. Runs the two dairy free bases nobody else here wants to take on.',
    img: 'https://picsum.photos/seed/sorbet-gelato-scoops-market-morning/900/640',
    alt: 'Stone fruit laid out on a board at the Monday market',
    stat: '2',
    statLabel: 'sorbetto bases on rotation',
  },
]

const HOURS = [
  { k: 'Tuesday to Friday', v: '09:30 to 23:00' },
  { k: 'Saturday', v: '09:00 to 00:30' },
  { k: 'Sunday', v: '10:00 to 22:30' },
  { k: 'Monday', v: 'Closed, machines off' },
]

const PARTY = [
  { v: '2', label: 'couple' },
  { v: '4', label: 'small group' },
  { v: '6', label: 'tasting table' },
]

function QuoteMark() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
      <path
        d="M0 26V14.6C0 6.2 4.4 1 12.4 0l1.4 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H0zm20.2 0V14.6C20.2 6.2 24.6 1 32.6 0L34 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H20.2z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 11L11 2M11 2H4.2M11 2v6.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [size, setSize] = useState('')
  const [first, setFirst] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!size) {
      setError('Pick a table size so we know how many cups to bring out.')
      return
    }
    if (name.trim().length < 2) {
      setError('Add the name the tasting should sit under.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('We need a working email to confirm the booking.')
      return
    }
    if (!first) {
      setError('Choose a first flavour so Chiara can pull it forward.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <>
      <header className="gel-panel sticky top-0 z-30 border-x-0 border-t-0">
        <div className="shell flex h-18 max-h-20 items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="gel-dome gel-sm gel-fill-berry jelly" aria-hidden="true" />
            <span className="font-display text-[1.4rem] font-semibold tracking-[-0.03em] text-ink">
              Sorbet
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <a href="#flavours" className="link-underline text-sm text-ink-soft hover:text-ink">
              Flavours
            </a>
            <a href="#makers" className="link-underline text-sm text-ink-soft hover:text-ink">
              Makers
            </a>
            <a href="#visit" className="link-underline text-sm text-ink-soft hover:text-ink">
              Visit
            </a>
          </nav>
          <a href="#book" className="btn btn-primary !py-2 !text-sm">
            Book a tasting
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: split. Copy left, parlour photo with gel domes right. */}
        <section className="shell flex min-h-[100dvh] items-center pt-24 pb-14">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <Reveal className="min-w-0">
              <p className="micro mb-6">Gelato and sorbetto, churned in the back room</p>
              <h1 className="text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.02] text-ink">
                Churned slow, served by the scoop.
              </h1>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-ink-soft">
                Stracciatella cut from the pan, pistacchio di Bronte ground this week, and
                sorbetto if you skip dairy.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <a href="#book" className="btn btn-primary">
                  Book a tasting
                  <span className="btn-icon">
                    <ArrowGlyph />
                  </span>
                </a>
                <a href="#flavours" className="btn btn-ghost">
                  See the flavours
                </a>
              </div>
            </Reveal>

            <Reveal delay={140} className="min-w-0">
              <figure className="gel-panel overflow-hidden p-4 pb-7">
                <img
                  src="https://picsum.photos/seed/gelateria-marble-table-italy-street/900/560"
                  alt="Raspberries and strawberries in a white bowl, ready to go into the base"
                  width={900}
                  height={560}
                  className="h-52 w-full object-cover sm:h-64"
                  loading="eager"
                />
                <div className="mt-6 flex items-end justify-center gap-5">
                  <span className="gel-dome gel-lg gel-fill-cream jelly" aria-hidden="true" />
                  <span className="gel-dome gel-lg gel-fill-berry jelly" aria-hidden="true" />
                  <span className="gel-dome gel-lg gel-fill-blush jelly" aria-hidden="true" />
                </div>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Flavours: horizontal scroll-snap row, six cards, one gel dome each. */}
        <section id="flavours" className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[17ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
              Six on the board, and more once the fruit arrives.
            </h2>
          </Reveal>

          <div className="mt-12 -mx-5 flex snap-row gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
            {FLAVOURS.map((f, i) => (
              <Reveal key={f.name} delay={i * 60} className="shrink-0 snap-start">
                <article
                  className={`gel-panel jelly flex h-full w-[16.5rem] flex-col gap-5 p-6 sm:w-[18.5rem]`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`gel-dome gel-md ${f.fill} jelly shrink-0`}
                      aria-hidden="true"
                    />
                    <span className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft">
                      {f.meta}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[1.3125rem] leading-tight text-ink">{f.name}</h3>
                    <p className="mt-1.5 font-mono text-[0.8125rem] text-berry">{f.it}</p>
                  </div>
                  <p className="flex-1 text-[0.9375rem] leading-[1.65] text-ink-soft">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Makers: 2+1 asymmetric grid, exactly three items, third spans. */}
        <section id="makers" className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="max-w-[18ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
              Three people who turn up before the shutters go down.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {MAKERS.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className={m.wide ? 'md:col-span-2' : ''}>
                <article
                  className={`gel-panel jelly flex h-full flex-col overflow-hidden ${
                    m.wide ? 'md:flex-row' : ''
                  }`}
                >
                  <img
                    src={m.img}
                    alt={m.alt}
                    width={m.wide ? 1400 : 900}
                    height={m.wide ? 620 : 640}
                    loading="lazy"
                    className={`w-full object-cover ${
                      m.wide ? 'h-48 md:w-[46%] md:shrink-0' : 'h-52'
                    }`}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-4 p-6 md:p-7">
                    <div>
                      <h3 className="text-xl text-ink">{m.name}</h3>
                      <p className="mt-1.5 font-mono text-[0.8125rem] text-berry">{m.role}</p>
                    </div>
                    <p className="flex-1 text-[0.9375rem] leading-[1.65] text-ink-soft">{m.body}</p>
                    <div className="flex items-baseline gap-3 border-t border-berry/15 pt-4">
                      <span className="font-display text-[1.75rem] leading-none text-berry">
                        {m.stat}
                      </span>
                      <span className="font-mono text-xs text-ink-soft">{m.statLabel}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Visit: tall photo left, stacked opening-hours rows right. */}
        <section id="visit" className="shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <figure className="overflow-hidden">
                <img
                  src="https://picsum.photos/seed/sorbet-counter-stools-marble-table/1000/1180"
                  alt="Weathered panelled door at the end of a narrow old town street"
                  width={1000}
                  height={1180}
                  loading="lazy"
                  className="h-80 w-full object-cover sm:h-[28rem] lg:h-full lg:max-h-[34rem]"
                />
              </figure>
            </Reveal>
            <Reveal delay={110} className="flex flex-col justify-center">
              <h2 className="max-w-[15ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
                One room, twelve seats, no music.
              </h2>
              <p className="mt-6 max-w-[54ch] leading-[1.7] text-ink-soft">
                You eat standing at the counter or sitting at the two marble tables by the window.
                Tastings run for forty minutes and cost nothing if you put an order together
                afterwards.
              </p>
              <dl className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {HOURS.map((h) => (
                  <div key={h.k} className="border-t border-berry/18 pt-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-berry">
                      {h.k}
                    </dt>
                    <dd className="mt-2 text-sm leading-[1.6] text-ink-soft">{h.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Quote: full-width band, the one layout family used once. */}
        <section className="shell py-20 md:py-28">
          <Reveal>
            <figure className="gel-panel grid gap-10 px-7 py-12 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-14 md:px-14 md:py-16">
              <div>
                <span className="block text-berry">
                  <QuoteMark />
                </span>
                <blockquote className="mt-6 max-w-[46ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.3] tracking-[-0.02em] text-ink">
                  “We came once for a cone and now my son is here every Saturday asking what is
                  going out of the machine.”
                </blockquote>
              </div>
              <figcaption className="border-t border-berry/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <div className="flex items-center gap-3">
                  <span className="gel-dome gel-sm gel-fill-berry shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">Beatrice Lotti</p>
                    <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft">
                      Cook, Via dei Servi
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-[30ch] text-sm leading-[1.6] text-ink-soft">
                  Comes in on a Saturday, stays for a cone and whatever the machine put out last.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Reserve: details left, gel form right, labels above every input. */}
        <section id="book" className="shell pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <h2 className="max-w-[13ch] text-[clamp(2rem,3.9vw,3.1rem)] text-ink">
                Take a tasting without paying yet.
              </h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-ink-soft">
                We hold a table for forty minutes and send nothing in the meantime. We will only
                confirm once one of us has walked back to the machine and put the scoops out.
              </p>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
                {[
                  ['Parlour', 'Via dei Servi 14, 40123 Bologna'],
                  ['Telephone', '051 226 4470'],
                  ['Tastings', 'Thursday and Friday, 18:00'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft">
                      {k}
                    </dt>
                    <dd className="mt-2 text-sm text-berry-deep">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <form className="gel-panel flex flex-col gap-5 p-7 md:p-9" onSubmit={submit} noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    Name for the booking
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Beatrice Lotti"
                    aria-describedby="name-hint"
                  />
                  <p id="name-hint" className="font-mono text-[0.6875rem] text-ink-soft">
                    Goes on the chalkboard, nothing else
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-describedby="email-hint"
                  />
                  <p id="email-hint" className="font-mono text-[0.6875rem] text-ink-soft">
                    One confirmation, then nothing from us
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="size" className="text-sm font-medium text-ink">
                      Table size
                    </label>
                    <select
                      id="size"
                      name="size"
                      className="field appearance-none"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      aria-describedby="size-hint"
                    >
                      <option value="">Select a size</option>
                      {PARTY.map((p) => (
                        <option key={p.v} value={p.v}>
                          {p.v}, {p.label}
                        </option>
                      ))}
                    </select>
                    <p id="size-hint" className="font-mono text-[0.6875rem] text-ink-soft">
                      Six is the most the room takes
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="first" className="text-sm font-medium text-ink">
                      First flavour
                    </label>
                    <select
                      id="first"
                      name="first"
                      className="field appearance-none"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      aria-describedby="first-hint"
                    >
                      <option value="">Choose one</option>
                      {FLAVOURS.map((f) => (
                        <option key={f.name} value={f.name}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                    <p id="first-hint" className="font-mono text-[0.6875rem] text-ink-soft">
                      We pull this one first
                    </p>
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-sm font-medium text-berry-deep">
                    {error}
                  </p>
                )}

                {sent ? (
                  <div className="gel-panel px-5 py-4 text-sm text-berry-deep" role="status">
                    Table held for {name.trim()}, {size} people, {first} to start. We have emailed
                    the details.
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary self-start">
                    Book a tasting
                    <span className="btn-icon">
                      <ArrowGlyph />
                    </span>
                  </button>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="gel-panel border-x-0 border-b-0">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Sorbet</p>
            <p className="mt-3 max-w-[40ch] text-sm leading-[1.65] text-ink-soft">
              A gelato parlour on Via dei Servi, open every day but Monday, churning about
              eighteen litres before the shutters go down.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <a href="#flavours" className="link-underline text-ink-soft hover:text-ink">
              Flavours
            </a>
            <a href="#makers" className="link-underline text-ink-soft hover:text-ink">
              Makers
            </a>
            <a href="#visit" className="link-underline text-ink-soft hover:text-ink">
              Visit
            </a>
          </nav>
          <div className="text-sm text-ink-soft">
            <p>Via dei Servi 14</p>
            <p className="mt-1">40123 Bologna, Italia</p>
            <p className="mt-3">Tuesday to Sunday, 09:30</p>
            <a href="#book" className="link-underline mt-4 inline-block hover:text-ink">
              Book a tasting
            </a>
          </div>
        </div>
        <div className="shell border-t border-berry/15 py-7">
          <p className="font-mono text-[0.6875rem] text-ink-soft">
            Developed by{' '}
            <a
              href="https://thediyadevelopers.com"
              className="link-underline font-medium text-ink"
            >
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
