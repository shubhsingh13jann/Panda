'use client'

import { useEffect, useRef } from 'react'

function getHeartPoint(t, cx, cy, scale) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  )
  return {
    x: cx + x * scale,
    y: cy + y * scale,
  }
}

export default function HeartParticles({ style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId = null
    let running = true

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let baseScale = 1

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cx = width / 2
      cy = height / 2 - 10
      baseScale = Math.min((width * 0.88) / 34, (height * 0.72) / 34)
    }

    resize()
    window.addEventListener('resize', resize)

    const sparks = []
    const floatingEmbers = []
    const shockwaves = []
    const startTs = performance.now()
    const TRACE_DURATION = 1800
    let tipShockwaveTriggered = false
    let lastBeatPulse = false

    const PALETTE = [
      { r: 16, g: 185, b: 129 },  // emerald #10b981
      { r: 52, g: 211, b: 153 },  // mint #34d399
      { r: 251, g: 191, b: 36 },  // warm gold #fbbf24
      { r: 255, g: 255, b: 255 }, // pure white
      { r: 244, g: 114, b: 182 }, // blush rose #f472b6
    ]

    const FLOATING_ICONS = ['✨', '🎋', '💚', '🌸', '✨']

    const spawnSpark = (x, y, vx, vy, color, size = 2) => {
      sparks.push({
        x,
        y,
        vx: vx + (Math.random() - 0.5) * 1.6,
        vy: vy + (Math.random() - 0.5) * 1.6,
        size: size * (Math.random() * 0.8 + 0.6),
        color,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
      })
    }

    const spawnFloatingEmber = (targetX, targetY) => {
      if (floatingEmbers.length >= 28) return
      const isEmoji = Math.random() > 0.45
      const icon = FLOATING_ICONS[Math.floor(Math.random() * FLOATING_ICONS.length)]
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]

      floatingEmbers.push({
        x: targetX + (Math.random() - 0.5) * 40,
        y: targetY + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.4 - Math.random() * 0.8,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.03 + Math.random() * 0.02,
        size: isEmoji ? 13 : 2.5 + Math.random() * 2.5,
        isEmoji,
        icon,
        color,
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
      })
    }

    const spawnShockwave = (x, y, maxRadius = 120, color = 'rgba(52, 211, 153, 0.7)') => {
      shockwaves.push({
        x,
        y,
        radius: 4,
        maxRadius,
        growth: 3.5,
        opacity: 0.85,
        decay: 0.025,
        color,
      })
    }

    const drawHeartRibbon = (currentScale, traceProgress, alpha = 1) => {
      const steps = 90
      const count = Math.floor(steps * traceProgress)
      if (count < 2) return

      const passes = [
        { width: 15, color: `rgba(16, 185, 129, ${0.22 * alpha})`, blur: 18 },
        { width: 6.5, color: `rgba(52, 211, 153, ${0.68 * alpha})`, blur: 9 },
        { width: 2.4, color: `rgba(255, 255, 255, ${0.94 * alpha})`, blur: 0 },
      ]

      passes.forEach((pass) => {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = pass.width
        ctx.strokeStyle = pass.color
        if (pass.blur > 0) {
          ctx.shadowColor = 'rgba(52, 211, 153, 0.85)'
          ctx.shadowBlur = pass.blur
        }

        // Right lobe
        ctx.beginPath()
        for (let s = 0; s <= count; s++) {
          const t = Math.PI - (s / steps) * Math.PI
          const pt = getHeartPoint(t, cx, cy, currentScale)
          if (s === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke()

        // Left lobe
        ctx.beginPath()
        for (let s = 0; s <= count; s++) {
          const t = Math.PI + (s / steps) * Math.PI
          const pt = getHeartPoint(t, cx, cy, currentScale)
          if (s === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke()
        ctx.restore()
      })
    }

    const render = (now) => {
      if (!running) return

      const elapsed = now - startTs
      const traceProgress = Math.min(elapsed / TRACE_DURATION, 1)

      // Double-pulse heartbeat breathing rhythm
      let heartbeatScale = 1
      if (traceProgress >= 1) {
        const cycle = ((elapsed - TRACE_DURATION) / 1300) % 1
        let beat = 0
        if (cycle < 0.14) {
          beat = Math.sin((cycle / 0.14) * Math.PI) * 0.038
        } else if (cycle >= 0.22 && cycle < 0.40) {
          beat = Math.sin(((cycle - 0.22) / 0.18) * Math.PI) * 0.055
        }
        heartbeatScale = 1 + beat

        // Trigger subtle aura wave on main heartbeat peak
        const isPeaking = beat > 0.048
        if (isPeaking && !lastBeatPulse) {
          const tip = getHeartPoint(0, cx, cy, baseScale * heartbeatScale)
          spawnShockwave(tip.x, tip.y, 95, 'rgba(251, 191, 36, 0.65)')
        }
        lastBeatPulse = isPeaking
      }

      const currentScale = baseScale * heartbeatScale
      ctx.clearRect(0, 0, width, height)

      // Dual-comet trailing sparks during tracing phase
      if (traceProgress < 1) {
        const tRight = Math.PI - traceProgress * Math.PI
        const tLeft = Math.PI + traceProgress * Math.PI
        const pt1 = getHeartPoint(tRight, cx, cy, currentScale)
        const pt2 = getHeartPoint(tLeft, cx, cy, currentScale)

        for (let k = 0; k < 3; k++) {
          spawnSpark(pt1.x, pt1.y, (Math.random() - 0.5) * 1.5, -0.8, PALETTE[1], 2.8)
          spawnSpark(pt2.x, pt2.y, (Math.random() - 0.5) * 1.5, -0.8, PALETTE[2], 2.8)
          spawnSpark(pt1.x, pt1.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, PALETTE[3], 1.8)
        }

        if (Math.random() < 0.25) {
          spawnFloatingEmber(pt1.x, pt1.y)
          spawnFloatingEmber(pt2.x, pt2.y)
        }
      } else if (!tipShockwaveTriggered) {
        // Shockwave burst when comets merge at the bottom tip
        const tip = getHeartPoint(0, cx, cy, currentScale)
        spawnShockwave(tip.x, tip.y, 160, 'rgba(52, 211, 153, 0.85)')
        spawnShockwave(tip.x, tip.y, 220, 'rgba(251, 191, 36, 0.7)')
        for (let k = 0; k < 25; k++) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 3 + 1
          spawnSpark(tip.x, tip.y, Math.cos(angle) * speed, Math.sin(angle) * speed, PALETTE[k % PALETTE.length], 3)
        }
        tipShockwaveTriggered = true
      }

      // Sporadically spawn floating bamboo & stardust embers along perimeter
      if (traceProgress >= 1 && Math.random() < 0.12) {
        const randT = Math.random() * Math.PI * 2
        const pt = getHeartPoint(randT, cx, cy, currentScale)
        spawnFloatingEmber(pt.x, pt.y)
      }

      // Draw glowing heart ribbon
      drawHeartRibbon(currentScale, traceProgress)

      // Shockwave rings
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += sw.growth
        sw.opacity -= sw.decay

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = sw.color.replace(/[\d\.]+\)$/, `${Math.max(0, sw.opacity)})`)
        ctx.lineWidth = 2.4
        ctx.shadowColor = sw.color
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.restore()
      }

      // Floating bamboo embers & cute icons
      for (let i = floatingEmbers.length - 1; i >= 0; i--) {
        const fe = floatingEmbers[i]
        fe.swayPhase += fe.swaySpeed
        fe.x += Math.sin(fe.swayPhase) * 0.7 + fe.vx
        fe.y += fe.vy
        fe.life -= fe.decay

        if (fe.life <= 0) {
          floatingEmbers.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, fe.life))
        if (fe.isEmoji) {
          ctx.font = `${fe.size}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(fe.icon, fe.x, fe.y)
        } else {
          ctx.fillStyle = `rgba(${fe.color.r}, ${fe.color.g}, ${fe.color.b}, ${fe.life})`
          ctx.shadowColor = `rgba(${fe.color.r}, ${fe.color.g}, ${fe.color.b}, 0.8)`
          ctx.shadowBlur = 6
          ctx.beginPath()
          ctx.arc(fe.x, fe.y, fe.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      // Fast firefly sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life -= p.decay

        if (p.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      running = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
