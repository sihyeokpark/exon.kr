import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

type Kind = 'alpha' | 'mod'
type KeyDef = {
    main?: string      // primary legend
    sub?: string       // secondary (number under symbol)
    kor?: string       // hangul sublegend (white keys)
    nav?: string       // tiny nav sublegend (F-keys, Home, End…)
    u?: number         // width in units
    h?: number         // height in units (default 1)
    x?: number         // explicit left-edge x (units) — overrides flow
    y?: number         // explicit row index — overrides flow
    c?: Kind
}

const FONT = '"Malgun Gothic","Segoe UI",system-ui,sans-serif'

// ── Leopold FC660M layout (65%) ──────────────────────────────
// Main 60% block is 15u wide; right column (Ins/Del/arrows) sits at x≥14.25/15.25
const A = (main: string, kor?: string, nav?: string, u = 1): KeyDef => ({ main, kor, nav, u, c: 'alpha' })
const N = (main: string, sub: string, nav: string): KeyDef => ({ main, sub, nav, c: 'alpha' })
const M = (main: string, u = 1): KeyDef => ({ main, u, c: 'mod' })

const rows: KeyDef[][] = [
    // Row 0 — numbers  (F-keys as sublegends)
    [M('Esc'), N('!', '1', 'F1'), N('@', '2', 'F2'), N('#', '3', 'F3'), N('$', '4', 'F4'), N('%', '5', 'F5'), N('^', '6', 'F6'), N('&', '7', 'F7'), N('*', '8', 'F8'), N('(', '9', 'F9'), N(')', '0', 'F10'), N('_', '-', 'F11'), N('+', '=', 'F12'), M('⌫ Backspace', 2), { ...M('Ins'), x: 15.25 }],
    // Row 1 — QWERTY
    [M('Tab', 1.5), A('Q', 'ㅂ'), A('W', 'ㅈ'), A('E', 'ㄷ'), A('R', 'ㄱ'), A('T', 'ㅅ'), A('Y', 'ㅛ'), A('U', 'ㅕ'), A('I', 'ㅑ', 'PSc'), A('O', 'ㅐ', 'ScrLk'), A('P', 'ㅔ', 'Brk'), A('{', '', ''), A('}', '', ''), { ...A('|', '₩'), u: 1.5 }, { ...M('Del'), x: 15.25 }],
    // Row 2 — home
    [M('CapsLock', 1.75), A('A', 'ㅁ'), A('S', 'ㄴ'), A('D', 'ㅇ'), A('F', 'ㄹ'), A('G', 'ㅎ'), A('H', 'ㅗ'), A('J', 'ㅓ'), A('K', 'ㅏ', 'Home'), A('L', 'ㅣ', 'PgUp'), { ...A(':', '') }, { ...A('"', '') }, M('Enter ⏎', 2.25)],
    // Row 3 — bottom letters + Up
    [M('⇧ Shift', 2.25), A('Z', 'ㅋ'), A('X', 'ㅌ'), A('C', 'ㅊ'), A('V', 'ㅍ'), A('B', 'ㅠ'), A('N', 'ㅜ'), A('M', 'ㅡ'), A('<', '', 'End'), A('>', '', 'PgDn'), A('?', ''), M('⇧ Shift', 1.75), { ...M('↑'), x: 14.25 }],
    // Row 4 — bottom row + arrow cluster
    [M('Ctrl', 1.25), M('⊞', 1.25), M('Alt', 1.25), { ...M(''), u: 6.5, c: 'alpha' }, { ...M('Alt'), x: 10.25 }, M('Ctrl'), M('Fn'), M('←'), M('↓'), M('→')],
]

// OEM-ish row profile: [height, top-tilt(rad)]
const PROFILE: [number, number][] = [[0.52, 0.09], [0.5, 0.05], [0.44, 0], [0.46, -0.05], [0.5, -0.09]]

const CASE_WHITE = 0xe9e6de
const CASE_WHITE_LO = 0xdcd8cf
const CAP_ALPHA = 0xf1eee7
const CAP_MOD = 0x39404e
const PLATE = 0x22242b

function legendTexture(kd: KeyDef, w: number, d: number, kind: Kind): THREE.CanvasTexture | null {
    if (!kd.main && !kd.sub && !kd.kor && !kd.nav) return null
    const H = 256
    const W = Math.max(96, Math.round(256 * (w / d)))
    const c = document.createElement('canvas'); c.width = W; c.height = H
    const ctx = c.getContext('2d')!
    ctx.textBaseline = 'top'
    const pad = 30
    const onMod = kind === 'mod'

    if (onMod) {
        ctx.fillStyle = '#d8d8dc'                 // light gray legend for legibility
        ctx.textBaseline = 'middle'
        const t = kd.main || ''
        const isGlyph = t.length <= 2
        const fs = isGlyph ? 122 : t.length > 8 ? 66 : t.length > 4 ? 82 : 100
        ctx.font = `700 ${fs}px ${FONT}`
        if (isGlyph) {
            // single glyph: dead-center
            ctx.textAlign = 'center'
            ctx.fillText(t, W / 2, H / 2)
        } else {
            // word: left-aligned but vertically centered (readable when foreshortened)
            ctx.textAlign = 'left'
            ctx.fillText(t, pad, H / 2)
        }
    } else {
        // white keycap
        const mainCol = '#44454d'
        const navCol = '#8a94a4'
        ctx.textAlign = 'left'
        if (kd.sub !== undefined) {
            // number/symbol key: symbol upper, base lower
            ctx.fillStyle = mainCol
            ctx.font = `600 78px ${FONT}`
            ctx.fillText(kd.main || '', pad, pad + 4)
            ctx.fillText(kd.sub, pad, pad + 96)
        } else if (kd.main) {
            ctx.fillStyle = mainCol
            ctx.font = `600 104px ${FONT}`
            ctx.fillText(kd.main, pad, (H - 104) / 2)
        }
        if (kd.nav) {
            ctx.fillStyle = navCol
            ctx.textAlign = 'right'
            ctx.font = `italic 500 38px ${FONT}`
            ctx.fillText(kd.nav, W - pad, H - pad - 38)
        }
    }

    const tx = new THREE.CanvasTexture(c)
    tx.anisotropy = 16
    tx.colorSpace = THREE.SRGBColorSpace
    return tx
}

/** Sculpted OEM-profile keycap: tapered sides + dished (concave) top */
function keycapGeometry(w: number, h: number, d: number, dish = 0.05, taper = 0.22) {
    const geo = new RoundedBoxGeometry(w, h, d, 5, 0.05)
    const pos = geo.attributes.position
    const halfW = w / 2, halfD = d / 2
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
        const t = Math.max(0, Math.min(1, y / h + 0.5))
        const k = 1 - taper * t
        pos.setX(i, x * k); pos.setZ(i, z * k)
        if (t > 0.82) {
            const nx = (x * k) / (halfW * 0.78)
            const nz = (z * k) / (halfD * 0.78)
            const r2 = Math.min(1, nx * nx * 0.4 + nz * nz)
            pos.setY(i, y - dish * (1 - r2) * ((t - 0.82) / 0.18))
        }
    }
    geo.computeVertexNormals()
    return geo
}

type KeyEntry = { mesh: THREE.Mesh; baseY: number; target: number; cur: number; vel: number; kind: Kind; pressed: boolean; hover: boolean }

export default function Keyboard3D({ fit: fitScale = 0.82 }: { fit?: number }) {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.0
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.appendChild(renderer.domElement)

        const pmrem = new THREE.PMREMGenerator(renderer)
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        scene.environment = envTex

        // Lights
        scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2634, 0.6))
        const sun = new THREE.DirectionalLight(0xfff4e6, 2.0)
        sun.position.set(-8, 16, 9)
        sun.castShadow = true
        sun.shadow.mapSize.set(4096, 4096)
        sun.shadow.camera.left = sun.shadow.camera.bottom = -16
        sun.shadow.camera.right = sun.shadow.camera.top = 16
        sun.shadow.bias = -0.0004
        sun.shadow.radius = 6
        scene.add(sun)
        const fill = new THREE.DirectionalLight(0xdfe6ff, 0.6)
        fill.position.set(9, 6, 6)
        scene.add(fill)
        const rim = new THREE.DirectionalLight(0xffffff, 0.4)
        rim.position.set(6, 5, -12)
        scene.add(rim)

        const board = new THREE.Group()
        scene.add(board)

        const TOTAL_U = 16.25
        const ROWS = rows.length
        const GAP = 0.1

        // ── Case: white top shell + slightly darker bottom, extra back bezel ──
        const PADX = 0.6, PADF = 0.55, PADB = 1.05
        const caseW = TOTAL_U + PADX * 2
        const caseD = ROWS + PADF + PADB
        const caseCenterZ = (PADB - PADF) / 2 * -1 // shift so extra bezel is at back

        const topMat = new THREE.MeshStandardMaterial({ color: CASE_WHITE, roughness: 0.5, metalness: 0.08, envMapIntensity: 0.7 })
        const botMat = new THREE.MeshStandardMaterial({ color: CASE_WHITE_LO, roughness: 0.62, metalness: 0.05, envMapIntensity: 0.5 })

        const topShell = new THREE.Mesh(new RoundedBoxGeometry(caseW, 0.62, caseD, 5, 0.14), topMat)
        topShell.position.set(0, -0.3, caseCenterZ)
        topShell.castShadow = topShell.receiveShadow = true
        board.add(topShell)

        const bottomShell = new THREE.Mesh(new RoundedBoxGeometry(caseW + 0.1, 0.8, caseD + 0.1, 5, 0.18), botMat)
        bottomShell.position.set(0, -0.95, caseCenterZ)
        bottomShell.rotation.x = 0.03
        bottomShell.castShadow = bottomShell.receiveShadow = true
        board.add(bottomShell)

        // Dark inner plate visible between keycaps
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(TOTAL_U + 0.24, 0.1, ROWS + 0.24),
            new THREE.MeshStandardMaterial({ color: PLATE, roughness: 0.85, metalness: 0.1 }),
        )
        plate.position.set(0, 0.02, 0)
        plate.receiveShadow = true
        board.add(plate)

        // ── Keycaps ──
        const keyEntries: KeyEntry[] = []
        const geoCache = new Map<string, THREE.BufferGeometry>()
        const baseMats: Record<Kind, THREE.MeshStandardMaterial> = {
            alpha: new THREE.MeshStandardMaterial({ color: CAP_ALPHA, roughness: 0.58, metalness: 0.02, envMapIntensity: 0.5 }),
            mod: new THREE.MeshStandardMaterial({ color: CAP_MOD, roughness: 0.55, metalness: 0.04, envMapIntensity: 0.55 }),
        }
        const hoverMats: Record<Kind, THREE.MeshStandardMaterial> = {
            alpha: new THREE.MeshStandardMaterial({ color: CAP_ALPHA, roughness: 0.5, metalness: 0.02, envMapIntensity: 0.7, emissive: 0xffffff, emissiveIntensity: 0.16 }),
            mod: new THREE.MeshStandardMaterial({ color: CAP_MOD, roughness: 0.48, metalness: 0.04, envMapIntensity: 0.7, emissive: 0xffffff, emissiveIntensity: 0.2 }),
        }
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x14161c, roughness: 0.85 })

        // Map a key definition → physical KeyboardEvent.code(s)
        const codeFor = (kd: KeyDef): string[] => {
            const m = kd.main || ''
            if (kd.u === 6.5 && kd.c === 'alpha') return ['Space']
            if (/^[A-Z]$/.test(m)) return ['Key' + m]
            if (kd.sub && /^[0-9]$/.test(kd.sub)) return ['Digit' + kd.sub]
            const table: Record<string, string[]> = {
                'Esc': ['Escape'], 'Tab': ['Tab'], 'CapsLock': ['CapsLock'],
                '⇧ Shift': ['ShiftLeft', 'ShiftRight'], 'Ctrl': ['ControlLeft', 'ControlRight'],
                'Alt': ['AltLeft', 'AltRight'], '⊞': ['MetaLeft', 'MetaRight'],
                'Enter ⏎': ['Enter'], '⌫ Backspace': ['Backspace'],
                'Ins': ['Insert'], 'Del': ['Delete'], 'Fn': [],
                '↑': ['ArrowUp'], '↓': ['ArrowDown'], '←': ['ArrowLeft'], '→': ['ArrowRight'],
                '_': ['Minus'], '+': ['Equal'], '{': ['BracketLeft'], '}': ['BracketRight'],
                '|': ['Backslash'], ':': ['Semicolon'], '"': ['Quote'],
                '<': ['Comma'], '>': ['Period'], '?': ['Slash'],
            }
            return table[m] ?? []
        }
        const codeMap = new Map<string, KeyEntry>()

        rows.forEach((row, r) => {
            let flowX = 0
            const [keyH, tilt] = PROFILE[r]
            row.forEach((kd) => {
                const u = kd.u ?? 1
                const x = kd.x !== undefined ? kd.x : flowX
                const z = (kd.y !== undefined ? kd.y : r) - (ROWS - 1) / 2
                const w = u - GAP
                const d = 1 - GAP
                const wide = u >= 5
                const taper = wide ? 0.055 : 0.22   // steeper (near-vertical) walls on the spacebar
                const dish = wide ? -0.02 : 0.05    // spacebar is slightly convex
                const gKey = `${w.toFixed(2)}|${keyH}|${taper}|${dish}`
                if (!geoCache.has(gKey)) geoCache.set(gKey, keycapGeometry(w, keyH, d, dish, taper))
                const kind = kd.c ?? 'alpha'
                const mesh = new THREE.Mesh(geoCache.get(gKey)!, baseMats[kind])
                const baseY = keyH / 2 + 0.14
                mesh.position.set(x + u / 2 - TOTAL_U / 2, baseY, z)
                mesh.rotation.x = tilt
                mesh.castShadow = mesh.receiveShadow = true
                board.add(mesh)

                const stem = new THREE.Mesh(new THREE.BoxGeometry(Math.min(w * 0.5, 0.5), 0.2, 0.5), stemMat)
                stem.position.set(x + u / 2 - TOTAL_U / 2, 0.06, z)
                board.add(stem)

                const tex = legendTexture(kd, w, d, kind)
                if (tex) {
                    const legend = new THREE.Mesh(
                        new THREE.PlaneGeometry(w * 0.82, d * 0.82),
                        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.97 }),
                    )
                    legend.rotation.x = -Math.PI / 2 + tilt
                    legend.position.set(0, keyH / 2 + 0.004, 0.015)
                    legend.renderOrder = 2
                    mesh.add(legend)
                }
                const entry: KeyEntry = { mesh, baseY, target: 0, cur: 0, vel: 0, kind, pressed: false, hover: false }
                keyEntries.push(entry)
                codeFor(kd).forEach((code) => codeMap.set(code, entry))
                flowX = x + u
            })
        })

        // Contact shadow + soft glow
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.32 }))
        ground.rotation.x = -Math.PI / 2
        ground.position.y = -1.42
        ground.receiveShadow = true
        scene.add(ground)

        const glowC = document.createElement('canvas'); glowC.width = glowC.height = 256
        const gctx = glowC.getContext('2d')!
        const grad = gctx.createRadialGradient(128, 128, 10, 128, 128, 128)
        grad.addColorStop(0, 'rgba(255,255,255,.14)')
        grad.addColorStop(0.55, 'rgba(255,255,255,.04)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        gctx.fillStyle = grad; gctx.fillRect(0, 0, 256, 256)
        const glow = new THREE.Mesh(new THREE.PlaneGeometry(38, 26), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(glowC), transparent: true, depthWrite: false }))
        glow.rotation.x = -Math.PI / 2
        glow.position.y = -1.41
        scene.add(glow)

        // ── Camera: ¾ view, auto-fit so nothing clips ──
        board.rotation.y = -0.22
        const ELEV = 0.92
        const fit = () => {
            const w = mount.clientWidth, h = mount.clientHeight
            if (!w || !h) return
            renderer.setSize(w, h)
            camera.aspect = w / h
            const radius = 10.8
            const vFov = (camera.fov * Math.PI) / 180
            const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect)
            const dist = (radius / Math.sin(Math.min(vFov, hFov) / 2)) * fitScale
            camera.position.set(0, Math.sin(ELEV) * dist, Math.cos(ELEV) * dist)
            camera.lookAt(0, -0.5, 0)
            camera.updateProjectionMatrix()
        }
        fit()
        const ro = new ResizeObserver(fit); ro.observe(mount)

        // ── Interaction ──
        const raycaster = new THREE.Raycaster()
        const pointer = new THREE.Vector2(10, 10)
        let targetRotY = -0.22, targetRotX = 0
        const onMove = (e: globalThis.PointerEvent) => {
            const b = mount.getBoundingClientRect()
            const nx = ((e.clientX - b.left) / b.width) * 2 - 1
            const ny = -((e.clientY - b.top) / b.height) * 2 + 1
            pointer.set(nx, ny)
            targetRotY = -0.22 + nx * 0.16
            targetRotX = -ny * 0.04
        }
        const onLeave = () => { pointer.set(10, 10); targetRotY = -0.22; targetRotX = 0 }
        mount.addEventListener('pointermove', onMove)
        mount.addEventListener('pointerleave', onLeave)

        // ── Physical keyboard input → press that keycap ──
        const applyState = (k: KeyEntry) => {
            k.target = (k.pressed || k.hover) ? -0.26 : 0
            k.mesh.material = k.pressed ? hoverMats[k.kind] : k.hover ? hoverMats[k.kind] : baseMats[k.kind]
        }
        const onKeyDown = (e: globalThis.KeyboardEvent) => {
            const k = codeMap.get(e.code)
            if (k && !k.pressed) { k.pressed = true; applyState(k) }
        }
        const onKeyUp = (e: globalThis.KeyboardEvent) => {
            const k = codeMap.get(e.code)
            if (k && k.pressed) { k.pressed = false; applyState(k) }
        }
        // release everything if the window loses focus (avoids stuck keys)
        const clearAll = () => keyEntries.forEach((k) => { if (k.pressed) { k.pressed = false; applyState(k) } })
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('blur', clearAll)

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const keyMeshes = keyEntries.map((k) => k.mesh)
        let hovered: KeyEntry | null = null
        const clock = new THREE.Clock()
        let raf = 0
        const animate = () => {
            raf = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()
            board.rotation.y += (targetRotY - board.rotation.y) * 0.06
            board.rotation.x += (targetRotX - board.rotation.x) * 0.06
            if (!reduceMotion) board.position.y = Math.sin(t * 0.7) * 0.04

            raycaster.setFromCamera(pointer, camera)
            const hits = pointer.x <= 1 ? raycaster.intersectObjects(keyMeshes, false) : []
            const next = hits.length ? keyEntries.find((k) => k.mesh === hits[0].object) ?? null : null
            if (next !== hovered) {
                if (hovered) { hovered.hover = false; applyState(hovered) }
                hovered = next
                if (hovered) { hovered.hover = true; applyState(hovered) }
            }
            keyEntries.forEach((k) => {
                // critically-damped ease — no bounce
                const stiffness = k.pressed ? 0.32 : 0.28
                const damping = k.pressed ? 0.72 : 0.7
                const accel = (k.target - k.cur) * stiffness - k.vel * damping
                k.vel += accel; k.cur += k.vel
                k.mesh.position.y = k.baseY + k.cur
            })
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            mount.removeEventListener('pointermove', onMove)
            mount.removeEventListener('pointerleave', onLeave)
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('blur', clearAll)
            mount.removeChild(renderer.domElement)
            geoCache.forEach((g) => g.dispose())
            envTex.dispose(); pmrem.dispose()
            scene.traverse((o) => {
                if (o instanceof THREE.Mesh) {
                    const mats = Array.isArray(o.material) ? o.material : [o.material]
                    mats.forEach((m) => {
                        const std = m as THREE.MeshStandardMaterial & { map?: THREE.Texture | null }
                        if (std.map) std.map.dispose()
                        m.dispose()
                    })
                    o.geometry.dispose()
                }
            })
            renderer.dispose()
        }
    }, [fitScale])

    return <div ref={mountRef} className="kb3d-mount" />
}
