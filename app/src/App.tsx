import { useEffect, useRef, useState, useCallback } from 'react'
import './css/App.css'

type Theme = 'light' | 'dark'
type Link = { kind: 'site' | 'code' | 'post'; href: string }
type Project = { year: string; title: string; desc: string; tags: string[]; links: Link[]; note?: string }

const SECTIONS = [
    { id: 'about', key: '1', label: 'About' },
    { id: 'writing', key: '2', label: 'Writing' },
    { id: 'projects', key: '3', label: 'Projects' },
    { id: 'experience', key: '4', label: 'Experience' },
    { id: 'honors', key: '5', label: 'Honors' },
    { id: 'contact', key: '6', label: 'Contact' },
]

const projects: Project[] = [
    { year: '2026', title: 'todo-lite', desc: 'A fast, minimal web client and desktop widget for Todo Mate.', tags: ['Web', 'Desktop'], links: [{ kind: 'site', href: 'https://todo.exon.kr' }], note: 'Vanilla JS · Electron' },
    { year: '2024', title: 'Dr.Travel — Junction Asia 2024', desc: 'Makes regional travel simpler and cheaper by connecting travelers with demand-responsive transit. Built in 3 days with Team Luuuuna.', tags: ['Hackathon', 'Mobility'], links: [{ kind: 'site', href: 'https://eu.junctionplatform.com/events/junction-asia-2024' }], note: 'Product design · React' },
    { year: '2023', title: 'Dimi6', desc: 'A point-based school-life platform with a reward store, announcements, meals and timetables.', tags: ['Full-stack'], links: [{ kind: 'code', href: 'https://github.com/sihyeokpark/dimi6' }], note: 'TypeScript · Next.js · MySQL' },
    { year: '2022', title: 'Auto Attendance', desc: 'Cross-platform attendance system that identifies students with face recognition and shares results with teachers in real time.', tags: ['Computer Vision'], links: [{ kind: 'code', href: 'https://github.com/EXON-Archive-Junior-High/AutoAttendance' }], note: 'PyQt · Java' },
    { year: '2022', title: 'Genetic Algorithm', desc: 'A visual, from-scratch genetic-algorithm experiment in pure JavaScript — where my interest in machine learning started.', tags: ['ML', 'Creative Coding'], links: [{ kind: 'code', href: 'https://github.com/EXON-Archive-Junior-High/GeneticAlgorithm' }], note: 'Vanilla JS' },
]
// Posts on blog.exon.kr (newest first) — mirrors https://blog.exon.kr/rss.xml
const BLOG = 'https://blog.exon.kr'
const posts = [
    { date: 'Aug 2024', title: 'Codegate Qual 2024 Writeup and Review', blurb: 'first Codegate finals (10th) and writeups for ShieldOSINT and combination', cat: 'CTF', href: `${BLOG}/posts/ctf/2024/codegate_qual/` },
    { date: 'Jul 2024', title: 'DeadSec CTF 2024 Writeup', blurb: 'web and misc challenge writeups', cat: 'CTF', href: `${BLOG}/posts/ctf/2024/deadsec/` },
]

const YEARS = Array.from(new Set(projects.map((p) => p.year)))

const experience = [
    { lead: '2026 —', title: 'Seoul National University', sub: 'B.S. student, Electrical & Computer Engineering', trail: 'Seoul' },
    { lead: '2023 —', title: 'LUNA', sub: 'IT social-venture community solving everyday problems with technology', trail: 'Developer' },
]

const honors = [
    { yr: '2026', text: <><b>Grand Prize</b> (Gyeonggi Governor’s Award), Gyeonggi Virtual Convergence Content Challenge</> },
    { yr: '', text: <><b>2nd Place</b>, NUS GreyHats CTF</> },
    { yr: '2024', text: <><b>10th Place</b>, Codegate CTF — Junior Division · <a href="https://blog.exon.kr/posts/ctf/2024/codegate_qual/" target="_blank" rel="noreferrer">review</a></> },
    { yr: '2023', text: <>Finalist, WACON CTF — Junior Division (Team ST3P)</> },
    // { yr: '', text: <><b>Grand Prize</b>, Goorm Algorithm Challenge — Gyeonggi division</> },
    { yr: '2022', text: <><b>Grand Prize</b> (Minister of Science and ICT Award), Korea CodeFair Hackathon</> },
]

const ICONS = {
    site: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
    code: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    post: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
}

function SunMoon({ theme }: { theme: Theme }) {
    return theme === 'dark'
        ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" /></svg>
}

const initialTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function App() {
    const [theme, setTheme] = useState<Theme>(initialTheme)
    const [active, setActive] = useState('')
    const [menu, setMenu] = useState(false)
    const [egg, setEgg] = useState(false)
    const bufRef = useRef('')

    const applyTheme = useCallback((t: Theme, persist: boolean) => {
        document.documentElement.dataset.theme = t
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#0e0e11' : '#ffffff')
        if (persist) { try { localStorage.setItem('theme', t) } catch { /* ignore */ } }
        setTheme(t)
    }, [])
    const toggleTheme = useCallback(() => applyTheme(theme === 'dark' ? 'light' : 'dark', true), [theme, applyTheme])

    // Follow the OS setting until the user picks a theme explicitly
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const onChange = (e: MediaQueryListEvent) => {
            let stored: string | null = null
            try { stored = localStorage.getItem('theme') } catch { /* ignore */ }
            if (!stored) applyTheme(e.matches ? 'dark' : 'light', false)
        }
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [applyTheme])

    const goto = useCallback((id: string) => {
        setMenu(false)
        if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    // Physical keyboard → section jumps + EXON easter egg
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return
            const t = e.target as HTMLElement
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
            const sec = SECTIONS.find((s) => s.key === e.key)
            if (sec) { goto(sec.id); return }
            if (e.key === '0' || e.key === '`') { goto('top'); return }
            if (e.key === 'Escape') { setEgg(false); setMenu(false); return }
            if (/^[a-zA-Z]$/.test(e.key)) {
                bufRef.current = (bufRef.current + e.key.toUpperCase()).slice(-8)
                if (bufRef.current.includes('EXON')) { setEgg(true); bufRef.current = '' }
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [goto])

    // Scroll spy for the nav
    useEffect(() => {
        const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
        const io = new IntersectionObserver((entries) => {
            const vis = entries.filter((en) => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
            if (atBottom()) setActive(SECTIONS[SECTIONS.length - 1].id)
            else if (vis) setActive(vis.target.id)
        }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] })
        SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
        // The last section is short, so mark it active once the page bottoms out
        const onScroll = () => {
            if (atBottom()) setActive(SECTIONS[SECTIONS.length - 1].id)
            else if (window.scrollY < 200) setActive('')
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
    }, [])

    return (
        <>
            <nav className={`topnav ${menu ? 'open' : ''}`}>
                <div className="nav-inner">
                    <a className="nav-name" href="#top" onClick={(e) => { e.preventDefault(); goto('top') }}>Sihyeok Park</a>
                    <div className="nav-links">
                        {SECTIONS.map((s) => (
                            <a key={s.id} className={active === s.id ? 'active' : ''} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); goto(s.id) }}>{s.label}</a>
                        ))}
                    </div>
                    <div className="nav-tools">
                        <button className="icon-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
                            <SunMoon theme={theme} />
                        </button>
                        <button className="icon-btn nav-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
            </nav>

            <main id="top">
                <header className="hero">
                    <h1>Sihyeok Park <span className="kr">박시혁</span></h1>
                    <p className="role">
                        Undergraduate, <a href="https://ece.snu.ac.kr/en" target="_blank" rel="noreferrer">Electrical &amp; Computer Engineering</a><br />
                        <a href="https://en.snu.ac.kr" target="_blank" rel="noreferrer">Seoul National University</a><br />
                        Goes by <b>EXON</b> online<br />
                        <a href="mailto:exon.indiv@gmail.com">exon.indiv@gmail.com</a>
                    </p>
                    <div className="hero-links">
                        <a className="chip" href="https://github.com/sihyeokpark" target="_blank" rel="noreferrer">GitHub</a>
                        <a className="chip" href="https://blog.exon.kr/" target="_blank" rel="noreferrer">Blog</a>
                        <a className="chip" href="https://www.instagram.com/exon001/" target="_blank" rel="noreferrer">Instagram</a>
                    </div>
                </header>

                <section id="about">
                    <h2 className="sec">About</h2>
                    <p className="bio">
                        I build across <strong>full-stack web</strong>, <strong>security</strong> and <strong>machine learning</strong>,
                        and I like problems where the answer isn’t obvious. I started with CTFs and hackathons in middle school;
                        these days I study ECE at SNU.
                    </p>
                    <div className="areas">
                        <div className="area">
                            <h3>Security</h3>
                            <p>CTF player since 2022 — web and systems challenges at Codegate, WACON and NUS GreyHats.</p>
                        </div>
                        <div className="area">
                            <h3>Full-stack Products</h3>
                            <p>Small, fast tools people actually use — <a href="https://todo.exon.kr" target="_blank" rel="noreferrer">todo-lite</a>, <a href="https://github.com/sihyeokpark/dimi6" target="_blank" rel="noreferrer">Dimi6</a>.</p>
                        </div>
                        <div className="area">
                            <h3>ML &amp; Quant</h3>
                            <p>Applied machine learning and systematic investing, from genetic algorithms to ETF backtests.</p>
                        </div>
                    </div>
                    <div className="callout">
                        <strong>Say hi:</strong> I’m always up for an interesting problem — a CTF team, a hackathon, or a side project.
                        Reach me at <a href="mailto:exon.indiv@gmail.com">exon.indiv@gmail.com</a>.
                    </div>
                </section>

                <section id="writing">
                    <div className="h2row">
                        <h2 className="sec">Writing</h2>
                        <a className="chip" href={`${BLOG}/archive/`} target="_blank" rel="noreferrer">All posts →</a>
                    </div>
                    {posts.map((p) => (
                        <div className="news-item" key={p.href}>
                            <div className="news-date">{p.date}</div>
                            <div className="news-body">
                                <a href={p.href} target="_blank" rel="noreferrer">{p.title}</a>: {p.blurb} <span className="area-badge">{p.cat}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <section id="projects">
                    <div className="h2row">
                        <h2 className="sec">Projects</h2>
                        <a className="chip" href="https://github.com/sihyeokpark" target="_blank" rel="noreferrer">More on GitHub →</a>
                    </div>
                    {YEARS.map((y, i) => (
                        <div key={y}>
                            <div className={`year-head ${i === 0 ? 'first' : ''}`}>{y}</div>
                            {projects.filter((p) => p.year === y).map((p) => (
                                <div className="pub" key={p.title}>
                                    <div className="pub-title"><a href={p.links[0].href} target="_blank" rel="noreferrer">{p.title}</a></div>
                                    <div className="pub-authors">{p.desc}</div>
                                    <div className="pub-meta">
                                        {p.tags.map((t) => <span className="area-badge" key={t}>{t}</span>)}
                                        {p.links.map((l) => (
                                            <a key={l.href} className={`plink ${l.kind}`} href={l.href} target="_blank" rel="noreferrer" title={l.kind} aria-label={`${p.title} ${l.kind}`}>{ICONS[l.kind]}</a>
                                        ))}
                                        {p.note && <span className="venue-full">{p.note}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>

                <section id="experience">
                    <h2 className="sec">Experience</h2>
                    {experience.map((x) => (
                        <div className="row" key={x.title}>
                            <span className="lead">{x.lead}</span>
                            <span className="grow"><b>{x.title}</b><br /><span className="sub">{x.sub}</span></span>
                            <span className="trail">{x.trail}</span>
                        </div>
                    ))}
                </section>

                <section id="honors">
                    <h2 className="sec">Honors &amp; Awards</h2>
                    <div className="hl-grid">
                        {honors.map((h, i) => (
                            <div className="hl" key={i}><span className="yr">{h.yr}</span><span>{h.text}</span></div>
                        ))}
                    </div>
                </section>

                <section id="contact">
                    <h2 className="sec">Contact</h2>
                    <div className="row"><span className="lead">Email</span><span className="grow"><a href="mailto:exon.indiv@gmail.com">exon.indiv@gmail.com</a></span></div>
                    <div className="row"><span className="lead">GitHub</span><span className="grow"><a href="https://github.com/sihyeokpark" target="_blank" rel="noreferrer">github.com/sihyeokpark</a></span></div>
                    <div className="row"><span className="lead">Blog</span><span className="grow"><a href="https://blog.exon.kr/" target="_blank" rel="noreferrer">blog.exon.kr</a></span></div>
                    <div className="row"><span className="lead">Instagram</span><span className="grow"><a href="https://www.instagram.com/exon001/" target="_blank" rel="noreferrer">@exon001</a></span></div>
                </section>
            </main>

            <footer className="sitefoot">© {new Date().getFullYear()} Sihyeok Park · EXON</footer>

            {egg && (
                <div className="egg" onClick={() => setEgg(false)}>
                    <div className="egg-card" onClick={(e) => e.stopPropagation()}>
                        <span className="egg-tag">{'// unlocked'}</span>
                        <h2>You found the switch.</h2>
                        <p>You typed <b>EXON</b>. That curiosity — poking at things until they open up — is exactly how I build. Security, ML, web: same reflex, different keycaps.</p>
                        <div className="egg-links">
                            <a className="chip" href="https://github.com/sihyeokpark" target="_blank" rel="noreferrer">GitHub →</a>
                            <button className="chip" onClick={() => setEgg(false)}>Close (Esc)</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
