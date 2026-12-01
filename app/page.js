'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import BearGiftStage from './BearGiftStage'
import BalloonRoseStage from './BalloonRoseStage'
import PandaCakeScene from './PandaCakeScene'
import { CAKE_SPARKLES } from './cakeSparkles'

const EnvelopePromise = dynamic(() => import('./EnvelopePromise'), { ssr: false })
const HeartParticles = dynamic(() => import('./HeartParticles'), { ssr: false })
const CakeHeartAnimation = dynamic(() => import('./CakeHeartAnimation'), { ssr: false })

import photo1 from '../Images/1775886681934.png'
import photo2 from '../Images/1775886682054.png'
import photo3 from '../Images/1775886682123.png'
import photo4 from '../Images/1775886682174.png'
import photo5 from '../Images/1775886682265.png'
import photo6 from '../Images/1775886682297.png'
import photo7 from '../Images/1775886682396.png'
import photo8 from '../Images/1775886682498.png'
import photo9 from '../Images/1775886682638.png'
import photo10 from '../Images/1775886682736.png'
import photo11 from '../Images/1775886682803.png'
import photo12 from '../Images/LS20260403164527.png'
import photo13 from '../Images/LS20260403164533.png'
import photo14 from '../Images/LS20260403164542.png'

/* ══════════════════════════════════════════════
   SVG BOTANICAL & LOTUS COMPONENTS
══════════════════════════════════════════════ */

function LotusSVG({ width = 120, color = '#10b981', centerColor = '#ffd700', className = '', style = {} }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg
      width={width} height={width}
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`rg-${color.replace('#', '')}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </radialGradient>
        <filter id="lotus-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {petals.map((angle, i) => (
        <ellipse
          key={i}
          cx="100" cy="58" rx="22" ry="46"
          transform={`rotate(${angle} 100 100)`}
          fill={`url(#rg-${color.replace('#', '')})`}
          filter="url(#lotus-glow)"
          opacity={0.78 + i * 0.02}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="100" cy="72" rx="14" ry="28"
          transform={`rotate(${angle} 100 100)`}
          fill={color}
          opacity={0.55}
        />
      ))}
      <circle cx="100" cy="100" r="26" fill={centerColor} opacity="0.95" filter="url(#lotus-glow)" />
      <circle cx="100" cy="100" r="18" fill={centerColor === '#ffd700' ? '#fff8a0' : '#fff'} opacity="0.75" />
      <circle cx="100" cy="100" r="10" fill={centerColor} opacity="0.95" />
    </svg>
  )
}

function SmallFlower({ width = 50, color = '#34d399', style = {} }) {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <svg width={width} height={width} viewBox="0 0 100 100" aria-hidden="true" style={style}>
      <defs>
        <radialGradient id={`sg-${width}-${color.replace('#', '')}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </radialGradient>
      </defs>
      {petals.map((angle, i) => (
        <ellipse
          key={i}
          cx="50" cy="28" rx="11" ry="24"
          transform={`rotate(${angle} 50 50)`}
          fill={`url(#sg-${width}-${color.replace('#', '')})`}
          opacity={0.85 + i * 0.02}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#fbbf24" />
      <circle cx="50" cy="50" r="9" fill="#fef08a" opacity="0.8" />
    </svg>
  )
}

function TinyFlower({ color = '#10b981', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx="30" cy="16" rx="7" ry="14"
          transform={`rotate(${angle} 30 30)`}
          fill={color}
          opacity={0.8 + i * 0.03}
        />
      ))}
      <circle cx="30" cy="30" r="9" fill="#fbbf24" />
    </svg>
  )
}

function AmbientFloatingHearts({ count = 14, zIndex = 1, fixed = false }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        bottom: -10 - Math.random() * 10,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        opacity: 0.35 + Math.random() * 0.35,
        icon: index % 3 === 0 ? '💚' : index % 3 === 1 ? '🎋' : '🌸',
      })),
    [count]
  )

  return (
    <div
      aria-hidden="true"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex,
      }}
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="bear-gift-ambient-heart"
          style={{
            left: `${heart.left}%`,
            bottom: `${heart.bottom}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.icon}
        </span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   DATA (CUSTOMIZED FOR BADI SISTER / Gg🐼)
══════════════════════════════════════════════ */

const WISHES = [
  {
    icon: '🎋',
    title: 'Sukoon & Endless Joy',
    text: 'Aapka har din utni hi shanti aur khushi se bhara rahe jitna sukoon aapke paas baith ke baat karne me milta hai... Hamesha aise hi muskurati rehna Gg🐼 🥰💚',
    delay: '0s',
  },
  {
    icon: '✨',
    title: 'A Fearless & Golden Future',
    text: 'Aapki mehnat, aapki samajh aur aapka hosla sabse alag hai. Zindagi ka sabse khoobsurat safar abhi samne hai — aur aapka chhota bhai hamesha aapke saath khada hai 🥹💛✨',
    delay: '0.5s',
  },
  {
    icon: '🐼',
    title: 'Panda Comfort & Love',
    text: 'Hamari pyari Gg🐼 ji — chahe kitni bhi badi ho jao, hamari sabse caring aur pyari badi behen aap hi ho. Bas apna khayal rakha karo aur bilkul stress mat liya karo 🥹❤️',
    delay: '1s',
  },
  {
    icon: '🌸',
    title: 'Unbreakable Bond',
    text: 'Kitni bhi ladayi ho jaye, kitni bhi baatein ho jayein, par jab bhai ko koi baat share karni hoti hai toh sabse pehle aapka hi naam aata hai dimaag me. Love you so much Badi Sis 💚🌸',
    delay: '1.5s',
  },
  {
    icon: '🌟',
    title: 'Dream Without Limits',
    text: 'Aapne jo bhi sapne dekhe hain, woh sab poore honge. Bhai ko aapki qabiliyat pe poora bharosa hai — aap jo chahein woh haasil kar sakti hain! 🌟🔥',
    delay: '2s',
  },
  {
    icon: '🎂',
    title: 'Sweet & Beautiful Life',
    text: 'Zindagi itni meethi aur sukoon bhari ho aapki, jitna pyara aapka dil hai. May this year bring you all the respect, happiness and success in the world! 🎂🎋✨',
    delay: '2.5s',
  },
]

const GARDEN_FLOWERS = [
  { color: '#10b981', centerColor: '#ffd700', width: 150, stemH: 60 },
  { color: '#34d399', centerColor: '#fde68a', width: 130, stemH: 48 },
  { color: '#059669', centerColor: '#fff',    width: 160, stemH: 72 },
  { color: '#14b8a6', centerColor: '#ffd700', width: 140, stemH: 56 },
  { color: '#6ee7b7', centerColor: '#fff3a0', width: 120, stemH: 44 },
]

const PHOTO_MEMORIES = [
  { src: photo1, title: 'Sukoon Bhara Pal', note: 'Jab bhi yeh dekhta hu, bachpan aur ghar ka sukoon yaad aata hai.', size: 'wide', tilt: '-5deg' },
  { src: photo2, title: 'Golden Memory', note: 'Kaash vo waqt fir se ruk jaye, jab sab itna simple aur pyara tha.', size: 'wide', tilt: '4deg' },
  { src: photo3, title: 'The Pillar of Support', note: 'Ghar ki sabse samajhdaar aur sabse pyaari Gg🐼.', size: 'square', tilt: '-3deg' },
  { src: photo4, title: 'Festival Cheer', note: 'Har tyohaar pe aapke bina ghar me vo raunak hi nahi aati.', size: 'wide', tilt: '5deg' },
  { src: photo5, title: 'Smile Queen', note: 'Yeh smile hi toh sabse badi taakat hai hum sabki.', size: 'square', tilt: '-4deg' },
  { src: photo6, title: 'Big Sis Vibes', note: 'Hamesha sabka dhyan rakhna, sabko guide karna — koi aap jaisa nahi ho sakta.', size: 'square', tilt: '3deg' },
  { src: photo7, title: 'Pure Grace', note: 'So beautiful, graceful and inspiring hamesha.', size: 'tall', tilt: '-2deg' },
  { src: photo8, title: 'Unconditional Bond', note: 'Door ho ya paas, humara rishta hamesha sabse khaas aur mazboot hai.', size: 'tall', tilt: '4deg' },
  { src: photo9, title: 'Rakhi Moments', note: 'Har saal ki rakhi aur aapka diya hua aashirwaad hamesha mere saath hai.', size: 'tall', tilt: '-5deg' },
  { src: photo10, title: 'A Little Message', note: 'Aap sabka dhyan rakhti ho, par apna bhi khayal rakha karo Gg🐼.', size: 'square', tilt: '2deg' },
  { src: photo11, title: 'Brother’s Promise', note: 'Chahe zindagi me kuch bhi ho jaye, bhai hamesha aapke ek call pe haazir hai.', size: 'tall', tilt: '5deg' },
  { src: photo12, title: 'Laughter Unlimited', note: 'Jo hasi-mazak aur teasing humari hoti hai, vo kisi aur ke saath ho hi nahi sakti!', size: 'wide', tilt: '-3deg' },
  { src: photo13, title: 'Timeless Cuteness', note: 'Aise hi hamesha khush raho aur apni cute photos bhejti raha karo.', size: 'square', tilt: '4deg' },
  { src: photo14, title: 'Priceless Blessing', note: 'Life me aapka hona mere liye sabse bada blessing hai.', size: 'tall', tilt: '-2deg' },
]

/* ══════════════════════════════════════════════
   MAIN PAGE ORCHESTRATION
══════════════════════════════════════════════ */

export default function BirthdayPage() {
  const canvasRef  = useRef(null)
  const petalsRef  = useRef(null)
  const rafRef     = useRef(null)
  const openTimerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [stage, setStage] = useState('promise')
  const [openingEnvelope, setOpeningEnvelope] = useState(false)
  const [heartsActive, setHeartsActive] = useState(false)
  const [heartPieces, setHeartPieces] = useState([])
  const [candleBlown, setCandleBlown] = useState(false)
  const [giftOpening, setGiftOpening] = useState(false)
  const [giftBurstKey, setGiftBurstKey] = useState(0)

  /* ── Canvas sparkles ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#10b981', '#34d399', '#fbbf24', '#ffffff', '#a7f3d0', '#6ee7b7', '#f472b6']
    const particles = Array.from({ length: 160 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      sz:   Math.random() * 2.8 + 0.4,
      vx:   (Math.random() - 0.5) * 0.28,
      vy:   (Math.random() - 0.5) * 0.28,
      op:   Math.random(),
      opS:  (Math.random() * 0.015 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      twk:  Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const drawStar = (x, y, size) => {
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const outerA = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const innerA = outerA + Math.PI / 5
        if (i === 0) ctx.moveTo(x + Math.cos(outerA) * size, y + Math.sin(outerA) * size)
        else         ctx.lineTo(x + Math.cos(outerA) * size, y + Math.sin(outerA) * size)
        ctx.lineTo(x + Math.cos(innerA) * size * 0.38, y + Math.sin(innerA) * size * 0.38)
      }
      ctx.closePath()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.op += p.opS; p.twk += 0.04

        if (p.op <= 0) { p.op = 0; p.opS = Math.abs(p.opS) }
        if (p.op >= 1) { p.op = 1; p.opS = -Math.abs(p.opS) }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = p.op * (0.45 + 0.55 * Math.abs(Math.sin(p.twk)))
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10
        drawStar(p.x, p.y, p.sz * 2.5)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Falling petals & bamboo leaves ── */
  useEffect(() => {
    const container = petalsRef.current
    if (!container) return

    const shapeColors = [
      '#10b981', '#34d399', '#059669', '#a7f3d0',
      '#6ee7b7', '#fbbf24', '#fbcfe8', '#f472b6',
    ]

    for (let i = 0; i < 65; i++) {
      const el   = document.createElement('div')
      const size = Math.random() * 22 + 9
      const col  = shapeColors[Math.floor(Math.random() * shapeColors.length)]
      const left = Math.random() * 100
      const delay    = Math.random() * 18
      const duration = Math.random() * 12 + 9
      const drift    = (Math.random() - 0.5) * 360
      const rot      = (Math.floor(Math.random() * 3 + 2)) * 360

      const shape = Math.random() > 0.5
        ? '150% 0 150% 0'
        : '50% 50% 50% 50%'

      el.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -${size + 20}px;
        width: ${size}px;
        height: ${size * (Math.random() * 0.5 + 0.8)}px;
        background: radial-gradient(ellipse, ${col}ee 0%, ${col}44 100%);
        border-radius: ${shape};
        animation: petalFall ${duration}s ${delay}s linear infinite;
        --rot: ${rot}deg;
        --drift: ${drift}px;
        pointer-events: none;
        box-shadow: 0 0 ${size / 2}px ${col}55;
        transform-style: preserve-3d;
      `
      container.appendChild(el)
    }

    return () => { container.innerHTML = '' }
  }, [])

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Mount fade-in ── */
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  /* ── Lock scroll until website stage ── */
  useEffect(() => {
    document.body.style.overflow = stage === 'website' ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [stage])

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
    }
  }, [])

  const handlePromise = () => {
    if (openingEnvelope) return
    setOpeningEnvelope(true)

    openTimerRef.current = setTimeout(() => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const palette = ['#10b981','#34d399','#fbbf24','#a7f3d0','#059669','#f472b6','#fff','#6ee7b7']
      const pieces = Array.from({ length: 72 }, (_, i) => {
        const baseAngle = (i / 72) * Math.PI * 2
        const jitter    = (Math.random() - 0.5) * 0.4
        const angle     = baseAngle + jitter
        const dist      = vw * 0.35 + Math.random() * Math.max(vw, vh) * 0.9
        return {
          id:       i,
          hx:       `${Math.cos(angle) * dist}px`,
          hy:       `${Math.sin(angle) * dist}px`,
          hr:       `${Math.random() * 720 - 360}deg`,
          hs:       Math.random() * 0.7 + 0.2,
          size:     Math.random() * 32 + 14,
          delay:    Math.random() * 0.35,
          duration: Math.random() * 0.6 + 1.1,
          color:    palette[i % palette.length],
          char:     i % 4 === 0 ? '🎋' : i % 4 === 1 ? '💚' : i % 4 === 2 ? '✨' : '🌸',
        }
      })
      setHeartPieces(pieces)
      setHeartsActive(true)

      openTimerRef.current = setTimeout(() => {
        setHeartsActive(false)
        setStage('cake')
      }, 2200)
    }, 850)
  }

  const handleBlow = () => {
    setCandleBlown(true)
    setTimeout(() => setStage('balloon'), 2600)
  }

  const handleGiftOpen = () => {
    if (giftOpening) return
    setGiftOpening(true)
    setGiftBurstKey((value) => value + 1)
    setTimeout(() => setStage('website'), 2600)
  }

  const confetti = Array.from({ length: 24 }, (_, i) => {
    const group      = Math.floor(i / 8)
    const posInGroup = i % 8
    const angle      = (posInGroup / 8) * Math.PI * 2 + group * (Math.PI / 12)
    const dist       = 100 + Math.random() * 120
    const palette    = ['#10b981','#34d399','#fbbf24','#a7f3d0','#059669','#f472b6','#fff']
    return {
      cx:    `${Math.cos(angle) * dist}px`,
      cy:    `${Math.sin(angle) * dist}px`,
      cr:    `${Math.random() * 360 - 180}deg`,
      cd:    `${group * 0.8}s`,
      color: palette[i % palette.length],
      size:  `${14 + Math.random() * 10}px`,
      char:  i % 3 === 0 ? '🎋' : i % 3 === 1 ? '💚' : '✨',
    }
  })

  const orbitFlowers = [
    '#10b981', '#34d399', '#fbbf24', '#059669',
    '#a7f3d0', '#f472b6', '#6ee7b7', '#14b8a6',
  ]

  return (
    <>
      {/* ══ STAGE: PROMISE ══ */}
      {stage === 'promise' && (
        <section className={`promise-screen ${openingEnvelope ? 'opened' : ''} ${heartsActive ? 'shattering' : ''}`}>
          <AmbientFloatingHearts />
          <HeartParticles />
          <div className="promise-stars" aria-hidden="true" />
          <div className="promise-aura promise-aura-left" aria-hidden="true" />
          <div className="promise-aura promise-aura-right" aria-hidden="true" />
          <div className={heartsActive ? 'shattering' : ''}>
            <EnvelopePromise
              openingEnvelope={openingEnvelope}
              onPromise={handlePromise}
            />
          </div>
        </section>
      )}

      {/* Explosion overlay */}
      {heartsActive && stage === 'promise' && (
        <div className="hearts-overlay" aria-hidden="true">
          {heartPieces.map(p => (
            <span key={p.id} className="heart-piece" style={{
              fontSize: `${p.size}px`, color: p.color,
              animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
              '--hx': p.hx, '--hy': p.hy, '--hr': p.hr, '--hs': p.hs,
            }}>{p.char}</span>
          ))}
        </div>
      )}

      {/* ══ STAGE: CAKE ══ */}
      {stage === 'cake' && (
        <section className="cake-screen">
          <AmbientFloatingHearts />
          <div className="cake-stars" aria-hidden="true">
            {CAKE_SPARKLES.map((sparkle) => (
              <span
                key={`${sparkle.left}-${sparkle.top}`}
                className="cake-star"
                style={{
                  left: `${sparkle.left}%`,
                  top: `${sparkle.top}%`,
                  width: `${sparkle.size}px`,
                  height: `${sparkle.size}px`,
                  animationDelay: `${sparkle.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="cake-stage-shell">
            <CakeHeartAnimation scaleMultiplier={1.05} style={{ zIndex: -1 }} />
            <div className="cake-header">
              <p className="cake-eyebrow">✨ A Very Special Birthday Celebration ✨</p>
              <h2 className="cake-title">Make a Wish, Gg🐼!</h2>
              <p className="cake-sub">Phoonk maar ke apni wish maango 🌟🎋</p>
            </div>

            <div className="cake-heart-stage">
              <div className="cake-scene-wrap">
                <PandaCakeScene candleBlown={candleBlown} name="Gg🐼🥰" />
              </div>
            </div>

            {!candleBlown ? (
              <button className="blow-btn" onClick={handleBlow}>
                <span>Phoonk Maro Badi Sis 🥰!</span>
              </button>
            ) : (
              <div className="wish-granted">
                <p className="wish-granted-text">🌟 Gg🐼 ki har dua aur wish zaroor poori hogi! 🌟</p>
                <p className="wish-granted-sub">Ek khaas Panda surprise aapke liye aage hai…</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ STAGE: BALLOON TO LOTUS ══ */}
      {stage === 'balloon' && (
        <BalloonRoseStage onComplete={() => setStage('gift')} />
      )}

      {/* ══ STAGE: GIFT BOX ══ */}
      {stage === 'gift' && (
        <BearGiftStage
          open={giftOpening}
          burstKey={giftBurstKey}
          onOpen={handleGiftOpen}
        />
      )}

      {/* Fixed sparkle layer */}
      <canvas ref={canvasRef} className="sparkle-canvas" />
      <div ref={petalsRef} className="petals-layer" />
      {stage === 'website' && <AmbientFloatingHearts fixed zIndex={2} />}

      <main
        className="page-wrapper"
        style={{ opacity: ready && stage === 'website' ? 1 : 0, transition: 'opacity 1.2s ease' }}
      >
        {/* SVG filter for water-wave reflection */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', overflow: 'hidden' }}>
          <defs>
            <filter id="water-wave" x="-5%" y="-5%" width="110%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.013 0.07" numOctaves="2" result="noise">
                <animate
                  attributeName="baseFrequency"
                  values="0.013 0.062;0.013 0.082;0.013 0.068;0.013 0.062"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* ══════ HERO ══════ */}
        <section className="hero" id="top">
          <AmbientFloatingHearts zIndex={2} />

          {/* Corner lotus flowers */}
          {[
            { cls: 'corner-flower tl', color: '#10b981', delay: 0 },
            { cls: 'corner-flower tr', color: '#34d399', delay: 0.4 },
            { cls: 'corner-flower bl', color: '#059669', delay: 0.8 },
            { cls: 'corner-flower br', color: '#fbbf24', delay: 1.2 },
          ].map(({ cls, color, delay }) => (
            <div key={cls} className={cls}>
              <LotusSVG
                width={120}
                color={color}
                centerColor="#ffd700"
                style={{ animation: `bloom 1.4s ease ${delay}s both, floatSway 7s ease-in-out ${delay}s infinite` }}
              />
            </div>
          ))}

          {/* Side vine flowers */}
          <div className="side-vines">
            <div className="vine-left">
              {['#10b981','#34d399','#059669'].map((c, i) => (
                <TinyFlower key={i} color={c} size={32} />
              ))}
            </div>
            <div className="vine-right">
              {['#fbbf24','#a7f3d0','#34d399'].map((c, i) => (
                <TinyFlower key={i} color={c} size={32} />
              ))}
            </div>
          </div>

          <div className="hero-inner">
            <p className="hero-eyebrow">✨ A Very Special Day for Big Sis ✨</p>

            <h1 className="hero-title">Happy Birthday!</h1>

            <div className="hero-name-row">
              <span className="name-emoji">🎋</span>
              <h2 className="hero-name">Gg🐼 Ji (Panda)</h2>
              <span className="name-emoji">🎋</span>
            </div>

            {/* Age badge */}
            <div className="age-badge">
              <div className="age-digit age-digit-1">★</div>
              <div className="age-digit age-digit-2">★</div>
            </div>
            <p className="age-label">"Ghar ki sabse pyari, sabse strong aur sabse supportive Badi Behen ke liye 🥹💚🎋"</p>

            <p className="hero-tagline">
              "Aapka hona hi hum sabke chehre pe muskaan la deta hai — Happy Birthday Gg🐼!" 🌸
            </p>

            <a href="#garden" className="scroll-btn">
              <span>"Neeche jaaiye, aapke liye ek pyara sa safar hai 🥹🎋💚"</span>
              <div className="scroll-circle">↓</div>
            </a>
          </div>
        </section>

        {/* ══════ GARDEN ══════ */}
        <section className="garden-section" id="garden">
          <AmbientFloatingHearts zIndex={1} />
          <div className="garden-header reveal">
            <p className="section-tag">🎋 Ye Bamboo &amp; Lotus Garden Aapki Tarah Khubsurat Hai 🎋</p>
            <h2 className="section-heading">Your Peaceful Sanctuary</h2>
            <p className="section-sub">
              "Bamboo ki tarah hamesha mazboot aur phoolon ki tarah hamesha mehekti rahein aap 💚🥹"
            </p>
          </div>

          <div className="flower-garden">
            {GARDEN_FLOWERS.map((f, i) => (
              <div
                key={i}
                className="garden-flower-wrap reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <LotusSVG
                  width={f.width}
                  color={f.color}
                  centerColor={f.centerColor}
                  style={{
                    animation: `bloom 1.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.25}s both,
                               floatSway ${7 + i}s ease-in-out ${i * 0.5}s infinite`,
                    filter: `drop-shadow(0 0 24px ${f.color}88)`,
                  }}
                />
                <div
                  className="garden-flower-stem"
                  style={{ height: f.stemH }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════ WISHES ══════ */}
        <section className="wishes-section" id="wishes">
          <AmbientFloatingHearts zIndex={1} />
          <div className="wishes-header reveal">
            <p className="section-tag">💝 Dil Se Nikli Duaayein Badi Sis Ke Liye 💝</p>
            <h2 className="section-heading">Jo dil ne maanga, woh sab aapke liye 🥹💚🎋</h2>
          </div>

          <div className="wishes-grid">
            {WISHES.map((w, i) => (
              <div
                key={i}
                className="wish-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="wish-card-inner">
                  <span className="wish-icon" style={{ '--icon-delay': `${i * 0.7}s` }}>
                    {w.icon}
                  </span>
                  <h3 className="wish-title">{w.title}</h3>
                  <p className="wish-text">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ MEMORIES ══════ */}
        <section className="memories-section" id="memories">
          <AmbientFloatingHearts zIndex={1} />
          <div className="memories-shell reveal">
            <div className="memories-header">
              <p className="section-tag">📸 Little Moments, Forever Kept 📸</p>
              <h2
                className="section-heading water-heading"
                data-text="Gg ke liye ek khaas gallery. Jo mere liye bahut anmol hai..."
              >Gg ke liye ek khaas gallery. Jo mere liye bahut anmol hai... </h2>
              <p className="section-sub">
                "Aapke saath bitaya hua har lamha, har haseen pal hamesha dil ke kareeb rehta hai 💚🎋"
              </p>
            </div>

            <div className="memories-grid">
              {PHOTO_MEMORIES.map((photo, i) => (
                <article
                  key={photo.src.src}
                  className={`memory-card reveal memory-card-${photo.size}`}
                  style={{
                    transitionDelay: `${0.08 * i}s`,
                    '--memory-tilt': photo.tilt,
                    '--memory-delay': `${(i % 5) * 0.45}s`,
                  }}
                >
                  <div className="memory-card-glow" />
                  <div className="memory-frame">
                    <div className="memory-pin" />
                    <div className="memory-image-wrap">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        className="memory-image"
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="memory-caption">
                      <h3>{photo.title}</h3>
                      <p>{photo.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ LETTER ══════ */}
        <section className="letter-section" id="letter">
          <AmbientFloatingHearts zIndex={1} />
          <div className="letter-outer reveal">
            <div className="letter-flowers-row">
              {['#10b981', '#34d399', '#fbbf24', '#34d399', '#10b981'].map((c, i) => (
                <SmallFlower
                  key={i}
                  width={40}
                  color={c}
                  style={{ animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
                />
              ))}
            </div>

            <div className="letter-box">
              <p className="letter-tag">💚 A Message From The Heart 💚</p>
              <h2 className="letter-heading">For My Dearest Badi Sister / Gg🐼 💕</h2>

              <div className="letter-body">
                <p>
                  "Aap sirf meri badi behen nahi ho Gg🐼 — aap woh ho jinhone hamesha ek protective 
                  shield ki tarah mera khayal rakha hai 🥹... Bachpan se leke aaj tak, har mushkil 
                  me aapne hamesha sahi rasta dikhaya hai 🎋💚"
                </p>
                <p>
                  Maine hamesha dekha hai ki aap sabka kitna khayal rakhti ho... Ghar ki har ek baat, 
                  har ek zaroorat ko bina kahe samajh lena — yeh sirf aap hi kar sakti ho. 
                  Aapka patience, aapka pyaar aur aapka care hum sabke liye ek sukoon hai 🐼💛.
                </p>
                <p>
                  "Chahe hum kitni bhi nok-jhok karein, kitni bhi taang-khinchayi ho jaye 😅 — 
                  par dil me jo izzat aur pyaar aapke liye hai, woh shabdon me bayaan nahi ho sakta. 
                  Jab aap kehti ho ki 'chinta mat kar, sab theek ho jayega', toh sach me lagta hai 
                  ki koi tension hi nahi hai" 🥹✨
                </p>
                <p>
                  Aur ek baat bolni hai Gg🐼 ji... jaise maine Bhalu ke aane par realize kiya tha ki 
                  chhoti behen kitni pyari hoti hai, waise hi har pal yeh ehsaas hota hai ki 
                  ek <strong>Badi Behen</strong> ka hona kitna bada ashirwaad hai 🥹. 
                  Aapke bina humara bachpan aur yeh ghar bilkul adhoora hota 💚.
                </p>
                <p>
                  Aapki har khwahish, har sapna poora ho — bhai hamesha aapke saath hai, 
                  har kadam pe aapko support karne ke liye taiyaar 🔥🎋.
                </p>
                <p>
                  Bas hamesha aise hi muskurati rehna, tension kam liya karo aur apne chote bhai ko 
                  aise hi daantte aur pyaar karte rehna 🥹❤️.
                </p>
                <p className="letter-closing">
                  Happy Birthday to the most amazing Big Sister in the whole universe! 🎋🐼💚
                </p>
              </div>

              <div className="letter-sig">
                <p>Special day ko khoob enjoy kariyega aur hamesha smile karte rahiye 😊</p>
                <p className="letter-sig-name">Aapka Chhota Bhai 💕</p>
              </div>
            </div>

            <div className="letter-flowers-row">
              {['#10b981', '#fbbf24', '#34d399', '#fbbf24', '#10b981'].map((c, i) => (
                <SmallFlower
                  key={i}
                  width={40}
                  color={c}
                  style={{ animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.4 + 1}s infinite` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CELEBRATION ══════ */}
        <section className="celebration-section" id="celebrate">
          <AmbientFloatingHearts zIndex={1} />

          {/* Orbiting ring */}
          <div className="celebration-orbit reveal">
            <div className="orbit-center-flower">
              <LotusSVG
                width={100}
                color="#10b981"
                centerColor="#ffd700"
                style={{
                  animation: 'rotateSlowly 20s linear infinite, scaleBreath 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.7))',
                }}
              />
            </div>
            {orbitFlowers.map((color, i) => (
              <div
                key={i}
                className="orbit-flower"
                style={{ '--od': `${-(i / orbitFlowers.length) * 14}s` }}
              >
                <TinyFlower color={color} size={36} />
              </div>
            ))}
          </div>

          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="celebration-crown">👑</span>
            <h2 className="celebration-title">Here&apos;s To Big Sis!</h2>
            <p className="celebration-sub">Ever Wonderful &amp; Inspiring 🌟</p>
          </div>

          <p className="celebration-msg reveal" style={{ transitionDelay: '0.4s' }}>
            "Yeh aane wala saal aapke liye bohot saari khushiyan, sukoon, acchi health aur unche mukam leke aaye 🥹 — 
            Aap har achi cheez ki haqdaar hain is duniya mein, aur aapka bhai hamesha aapke liye dua karta hai 💚🎋✨"
          </p>

          {/* Ripple rings */}
          <div className="ripple-rings" style={{ marginTop: '3rem' }}>
            <svg className="ripple-center-heart" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M 100 158 C 30 125,5 85,5 62 C 5 30,28 12,58 12 C 75 12,88 20,100 38 C 112 20,125 12,142 12 C 172 12,195 30,195 62 C 195 85,170 125,100 158 Z"
                fill="#10b981"
              />
            </svg>

            {['#10b981', '#34d399', '#fbbf24'].map((color, i) => (
              <svg
                key={i}
                className="ripple-ring"
                style={{ '--rd': `${i * 0.8}s`, '--rc': color }}
                viewBox="0 0 200 180"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 100 158 C 30 125,5 85,5 62 C 5 30,28 12,58 12 C 75 12,88 20,100 38 C 112 20,125 12,142 12 C 172 12,195 30,195 62 C 195 85,170 125,100 158 Z"
                  fill="none"
                  stroke="var(--rc)"
                  strokeWidth="3"
                />
              </svg>
            ))}

            {confetti.map((c, i) => (
              <span
                key={i}
                className="confetti-piece"
                aria-hidden="true"
                style={{
                  '--cx': c.cx, '--cy': c.cy, '--cr': c.cr, '--cd': c.cd,
                  color: c.color,
                  fontSize: c.size,
                }}
              >{c.char}</span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
            className="reveal"
          >
            {['#10b981','#34d399','#fbbf24','#059669','#a7f3d0'].map((c, i) => (
              <LotusSVG
                key={i}
                width={70}
                color={c}
                centerColor={i % 2 === 0 ? '#ffd700' : '#fff'}
                style={{
                  animation: `bloom 1s ease ${i * 0.2}s both,
                             float ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                  filter: `drop-shadow(0 0 15px ${c}88)`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer className="footer">
          <span className="footer-flowers">🎋 🐼 🌸 🌿 💐 💚</span>
          <p className="footer-main">"Crafted with pure respect, fondest memories, and endless love — for my dearest Gg🐼 🥹💚"</p>
          <p className="footer-main">Happy Birthday, Big Sis (Panda Ji) 🐼 &nbsp;·&nbsp;</p> 
          <p className="footer-main">"A sister like you is a gift that makes life beautiful every single day 🥹✨"</p>
        </footer>

      </main>
    </>
  )
}
