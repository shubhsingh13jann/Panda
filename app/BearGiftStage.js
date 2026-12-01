'use client'

import { useEffect, useMemo } from 'react'
import GiftBoxParticles from './GiftBoxParticles'

function PandaArt() {
  return (
    <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" aria-label="Cute Panda Mascot">
      <defs>
        <radialGradient id="pandaFurWhite" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
        <radialGradient id="pandaFurBlack" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="pandaPinkEar" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </radialGradient>
      </defs>

      <g className="bear-gift-breathe">
        {/* Feet / Hind Paws */}
        <ellipse cx="120" cy="370" rx="52" ry="34" fill="url(#pandaFurBlack)" />
        <ellipse cx="280" cy="370" rx="52" ry="34" fill="url(#pandaFurBlack)" />
        {/* Foot pads */}
        <circle cx="120" cy="370" r="14" fill="#64748b" opacity="0.6" />
        <circle cx="280" cy="370" r="14" fill="#64748b" opacity="0.6" />
        <circle cx="106" cy="358" r="5" fill="#64748b" opacity="0.6" />
        <circle cx="120" cy="352" r="5" fill="#64748b" opacity="0.6" />
        <circle cx="134" cy="358" r="5" fill="#64748b" opacity="0.6" />
        <circle cx="266" cy="358" r="5" fill="#64748b" opacity="0.6" />
        <circle cx="280" cy="352" r="5" fill="#64748b" opacity="0.6" />
        <circle cx="294" cy="358" r="5" fill="#64748b" opacity="0.6" />

        {/* Panda Body (White with black shoulder vest) */}
        <ellipse cx="200" cy="290" rx="116" ry="92" fill="url(#pandaFurWhite)" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="200" cy="245" rx="108" ry="46" fill="url(#pandaFurBlack)" />

        {/* Arms / Front Paws */}
        <ellipse cx="104" cy="260" rx="36" ry="60" fill="url(#pandaFurBlack)" transform="rotate(-18 104 260)" />
        <ellipse cx="296" cy="260" rx="36" ry="60" fill="url(#pandaFurBlack)" transform="rotate(18 296 260)" />

        {/* Bamboo shoot in hand */}
        <g transform="translate(80, 210) rotate(-22)">
          <rect x="0" y="0" width="8" height="110" rx="3" fill="#10b981" />
          <line x1="0" y1="36" x2="8" y2="36" stroke="#059669" strokeWidth="2" />
          <line x1="0" y1="72" x2="8" y2="72" stroke="#059669" strokeWidth="2" />
          {/* Bamboo leaves */}
          <ellipse cx="16" cy="20" rx="14" ry="4.5" fill="#34d399" transform="rotate(-30 16 20)" />
          <ellipse cx="-8" cy="48" rx="14" ry="4.5" fill="#34d399" transform="rotate(30 -8 48)" />
          <ellipse cx="18" cy="65" rx="14" ry="4.5" fill="#34d399" transform="rotate(-25 18 65)" />
        </g>

        {/* Panda Ears */}
        <circle cx="115" cy="118" r="38" fill="url(#pandaFurBlack)" />
        <circle cx="285" cy="118" r="38" fill="url(#pandaFurBlack)" />
        <circle cx="115" cy="118" r="18" fill="url(#pandaPinkEar)" opacity="0.75" />
        <circle cx="285" cy="118" r="18" fill="url(#pandaPinkEar)" opacity="0.75" />

        {/* Panda Head */}
        <ellipse cx="200" cy="165" rx="112" ry="98" fill="url(#pandaFurWhite)" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Black Eye Patches */}
        <ellipse cx="150" cy="154" rx="32" ry="38" fill="url(#pandaFurBlack)" transform="rotate(-18 150 154)" />
        <ellipse cx="250" cy="154" rx="32" ry="38" fill="url(#pandaFurBlack)" transform="rotate(18 250 154)" />

        {/* Shiny Big Eyes */}
        <g className="bear-gift-eye">
          <circle cx="154" cy="152" r="13" fill="#ffffff" />
          <circle cx="154" cy="152" r="9" fill="#0f172a" />
          <circle cx="152" cy="149" r="3.8" fill="#ffffff" />
          <circle cx="156" cy="155" r="1.8" fill="#ffffff" />
        </g>
        <g className="bear-gift-eye">
          <circle cx="246" cy="152" r="13" fill="#ffffff" />
          <circle cx="246" cy="152" r="9" fill="#0f172a" />
          <circle cx="244" cy="149" r="3.8" fill="#ffffff" />
          <circle cx="248" cy="155" r="1.8" fill="#ffffff" />
        </g>

        {/* Blush Cheeks */}
        <circle cx="120" cy="195" r="16" fill="#f472b6" opacity="0.6" />
        <circle cx="280" cy="195" r="16" fill="#f472b6" opacity="0.6" />

        {/* Cute Snout, Nose and Smile */}
        <ellipse cx="200" cy="192" rx="38" ry="24" fill="#f8fafc" />
        <path d="M188 184 Q200 178 212 184 Q216 195 200 202 Q184 195 188 184 Z" fill="#0f172a" />
        <ellipse cx="196" cy="183" rx="3" ry="1.8" fill="#ffffff" opacity="0.8" />
        <path d="M200 202 L200 210" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M190 210 Q200 218 210 210" stroke="#0f172a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function HeartsBurst({ count = 32, seed = 0 }) {
  const particles = useMemo(() => {
    const icons = ['💚', '🎋', '✨', '🌸', '💖', '⭐', '🐾']
    const colors = ['#10b981', '#34d399', '#fbbf24', '#f472b6', '#ffffff']
    const arr = []

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 160 + Math.random() * 220
      arr.push({
        i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 120,
        rot: (Math.random() - 0.5) * 720,
        scale: 0.8 + Math.random() * 1.6,
        size: 16 + Math.random() * 22,
        delay: Math.random() * 0.25,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    return arr
  }, [count, seed])

  return (
    <div className="bear-gift-burst" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.i}
          className="bear-gift-particle"
          style={{
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            '--rot': `${particle.rot}deg`,
            '--scale': particle.scale,
            color: particle.color,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            textShadow: '0 0 10px rgba(16,185,129,0.5)',
          }}
        >
          {particle.icon}
        </span>
      ))}
    </div>
  )
}

function GiftBox({ open, onClick }) {
  return (
    <div
      className={`bear-gift-box ${open ? 'open' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open the gift box"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="bear-gift-box-inner">
        <div className="bear-gift-box-body" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }} />
        <div className="bear-gift-box-glow" />
        <div className="bear-gift-box-lid" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          <div className="bear-gift-lid-ribbon" style={{ background: '#fbbf24' }} />
        </div>
        <div className="bear-gift-bow">
          <div className="bear-gift-bow-loop left" style={{ borderColor: '#fbbf24' }} />
          <div className="bear-gift-bow-loop right" style={{ borderColor: '#fbbf24' }} />
          <div className="bear-gift-bow-knot" style={{ background: '#f59e0b' }} />
        </div>
      </div>
    </div>
  )
}

export default function BearGiftStage({ open, burstKey, onOpen }) {
  const ambient = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        bottom: -10 - Math.random() * 10,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        opacity: 0.35 + Math.random() * 0.35,
        emoji: index % 3 === 0 ? '💚' : index % 3 === 1 ? '🎋' : '🌸',
      })),
    []
  )

  return (
    <section className="bear-gift-root" style={{ background: 'radial-gradient(circle at 50% 40%, #064e3b 0%, #022c22 75%, #011611 100%)' }}>
      <GiftBoxParticles heartScale={0.22} />

      {ambient.map((item) => (
        <span
          key={item.id}
          className="bear-gift-ambient-heart"
          style={{
            left: `${item.left}%`,
            bottom: `${item.bottom}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: item.opacity,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="bear-gift-title">
        <div className="bear-gift-eyebrow" style={{ color: '#a7f3d0' }}>A Special Surprise for Big Sis</div>
        <h1 style={{ color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}>
          Meri Badi Sis Gg🐼 ke liye ek Panda Special Surprise🥰
        </h1>
      </div>

      <div className="bear-gift-stage">
        <div className="bear-gift-wrap">
          <PandaArt />
        </div>

        <GiftBox open={open} onClick={onOpen} />

        <div className="bear-gift-floor-shadow" />

        <div className={`bear-gift-reveal-card ${open ? 'show' : ''}`} style={{ borderColor: '#10b981', color: '#064e3b' }}>
          You&apos;re invited Gg🐼! <span className="small">opening your grand surprise…</span>
        </div>

        {open && <HeartsBurst key={burstKey} count={32} seed={burstKey} />}

        {!open && <div className="bear-gift-tap-hint" style={{ color: '#a7f3d0' }}>tap the golden bow to open Gg🐼 ✦</div>}
      </div>
    </section>
  )
}
