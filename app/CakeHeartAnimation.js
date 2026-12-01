'use client'

import { useEffect, useRef } from 'react'

const heartPoint = (t) => {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  )
  return { x, y }
}

const colorAt = (t) => {
  const { x } = heartPoint(t)

  if (x >= 0) {
    const k = Math.sin(t)
    return {
      r: Math.round(16 + 80 * k),
      g: Math.round(185 + 40 * (1 - k)),
      b: Math.round(129 + 60 * (1 - k)),
    }
  }

  const k = -Math.sin(t)
  return {
    r: Math.round(250 + 5 * (1 - k)),
    g: Math.round(180 + 30 * (1 - k)),
    b: Math.round(30 + 70 * k),
  }
}

const HEART_BOUNDS = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (let i = 0; i <= 720; i++) {
    const { x, y } = heartPoint((i / 720) * Math.PI * 2)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  }
})()

const OVERFLOW = 180

export default function CakeHeartAnimation({ scaleMultiplier = 0.42, style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let running = true

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let scale = 1

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const stageW = Math.max(1, width - OVERFLOW * 2)
      const stageH = Math.max(1, height - OVERFLOW * 2)

      scale = Math.min(
        (stageW * 0.90) / HEART_BOUNDS.width,
        (stageH * 1.00) / HEART_BOUNDS.height
      ) * scaleMultiplier

      cx = width / 2 - ((HEART_BOUNDS.minX + HEART_BOUNDS.maxX) / 2) * scale
      cy = OVERFLOW + stageH * 0.54 - ((HEART_BOUNDS.minY + HEART_BOUNDS.maxY) / 2) * scale
    }

    resize()
    window.addEventListener('resize', resize)

    const trail = []
    const spray = []
    const pandas = []

    const DURATION = 9500
    const startTs = performance.now()
    let lastPandaAt = 0
    let prevHx = null
    let prevHy = null

    const spawnSpray = (hx, hy, t, dirX, dirY) => {
      const c = colorAt(t)
      const hp = heartPoint(t)
      const outward = hp.x >= 0 ? 1 : -1
      const perpX = -dirY
      const perpY = dirX

      for (let i = 0; i < 8; i++) {
        const push = Math.random() * 1.8 + 0.3
        const jitter = (Math.random() - 0.5) * 0.8
        const vx = perpX * outward * push * 0.7 + dirX * jitter + (Math.random() - 0.5) * 0.2
        const vy = perpY * outward * push * 0.7 + dirY * jitter - Math.random() * 0.25

        spray.push({
          x: hx,
          y: hy,
          vx,
          vy,
          size: Math.random() * 1.4 + 0.4,
          r: c.r,
          g: c.g,
          b: c.b,
          life: 1,
          decay: 0.006 + Math.random() * 0.012,
        })
      }

      if (Math.random() < 0.3) {
        spray.push({
          x: hx + (Math.random() - 0.5) * 80,
          y: hy + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2.4 + 1.2,
          r: c.r,
          g: c.g,
          b: c.b,
          life: 1,
          decay: 0.004,
          bokeh: true,
        })
      }
    }

    const spawnPanda = (hx, hy) => {
      pandas.push({
        x: hx + (Math.random() - 0.5) * 8,
        y: hy + (Math.random() - 0.5) * 8,
        life: 1,
        decay: 0.025,
        size: 20 + Math.random() * 10,
        emoji: Math.random() > 0.3 ? '🐼' : '🎋',
      })
    }

    const drawSprayParticle = (particle) => {
      const alpha = Math.max(0, particle.life)
      const haloRadius = particle.size * (particle.bokeh ? 4.5 : 2.8)
      const grad = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, haloRadius)
      grad.addColorStop(0, `rgba(${particle.r},${particle.g},${particle.b},${alpha * 0.55})`)
      grad.addColorStop(1, `rgba(${particle.r},${particle.g},${particle.b},0)`)

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, haloRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(${particle.r},${particle.g},${particle.b},${alpha})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * (particle.bokeh ? 0.9 : 0.85), 0, Math.PI * 2)
      ctx.fill()
    }

    const drawTrail = () => {
      if (trail.length < 2) return

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const passes = [
        { width: 11, alpha: 0.14 },
        { width: 6, alpha: 0.4 },
        { width: 2.2, alpha: 1 },
      ]

      for (const pass of passes) {
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1]
          const p1 = trail[i]
          const p2 = trail[i + 1] || p1
          const mx = (p1.x + p2.x) / 2
          const my = (p1.y + p2.y) / 2

          ctx.strokeStyle = `rgba(${p1.r},${p1.g},${p1.b},${pass.alpha})`
          ctx.lineWidth = pass.width
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.quadraticCurveTo(p1.x, p1.y, mx, my)
          ctx.stroke()
        }
      }
    }

    const frame = (now) => {
      if (!running) return

      const progress = Math.min((now - startTs) / DURATION, 1)
      const t = progress * Math.PI * 2

      const hp = heartPoint(t)
      const hx = cx + hp.x * scale
      const hy = cy + hp.y * scale

      let dirX = 0
      let dirY = 0
      if (prevHx !== null) {
        dirX = hx - prevHx
        dirY = hy - prevHy
        const distance = Math.hypot(dirX, dirY) || 1
        dirX /= distance
        dirY /= distance
      }

      ctx.clearRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      drawTrail()

      for (let i = spray.length - 1; i >= 0; i--) {
        const particle = spray[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.life -= particle.decay

        if (particle.life <= 0) {
          spray.splice(i, 1)
          continue
        }

        drawSprayParticle(particle)
      }

      if (progress < 1) {
        const color = colorAt(t)
        trail.push({ x: hx, y: hy, r: color.r, g: color.g, b: color.b })
        spawnSpray(hx, hy, t, dirX, dirY)

        const head = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34)
        head.addColorStop(0, 'rgba(255,235,160,0.95)')
        head.addColorStop(0.35, 'rgba(74,222,128,0.8)')
        head.addColorStop(1, 'rgba(16,185,129,0)')
        ctx.fillStyle = head
        ctx.beginPath()
        ctx.arc(hx, hy, 34, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(250,204,21,1)'
        ctx.beginPath()
        ctx.arc(hx, hy, 2.4, 0, Math.PI * 2)
        ctx.fill()

        if (now - lastPandaAt > 240) {
          spawnPanda(hx, hy)
          lastPandaAt = now
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      for (let i = pandas.length - 1; i >= 0; i--) {
        const panda = pandas[i]
        panda.life -= panda.decay

        if (panda.life <= 0) {
          pandas.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, panda.life)
        ctx.font = `${panda.size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(panda.emoji, panda.x, panda.y)
        ctx.restore()
      }

      prevHx = hx
      prevHy = hy
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [scaleMultiplier])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: `-${OVERFLOW}px`,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
