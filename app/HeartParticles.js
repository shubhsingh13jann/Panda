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
    let scale = 1

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
      scale = Math.min((width * 0.88) / 34, (height * 0.72) / 34)
    }

    resize()
    window.addEventListener('resize', resize)

    const sparks = []
    const startTs = performance.now()
    const TRACE_DURATION = 1800

    const PALETTE = [
      { r: 16, g: 185, b: 129 },
      { r: 52, g: 211, b: 153 },
      { r: 251, g: 191, b: 36 },
      { r: 255, g: 255, b: 255 },
    ]

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

    const render = (now) => {
      if (!running) return

      const elapsed = now - startTs
      const traceProgress = Math.min(elapsed / TRACE_DURATION, 1)

      ctx.clearRect(0, 0, width, height)

      const tRight = Math.PI - traceProgress * Math.PI
      const tLeft = Math.PI + traceProgress * Math.PI

      if (traceProgress < 1) {
        const pt1 = getHeartPoint(tRight, cx, cy, scale)
        const pt2 = getHeartPoint(tLeft, cx, cy, scale)

        for (let k = 0; k < 4; k++) {
          spawnSpark(pt1.x, pt1.y, (Math.random() - 0.5) * 1, -1, PALETTE[1], 3)
          spawnSpark(pt2.x, pt2.y, (Math.random() - 0.5) * 1, -1, PALETTE[2], 3)
        }
      }

      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 3
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.85)'

      ctx.beginPath()
      const stepsRight = Math.floor(60 * traceProgress)
      for (let s = 0; s <= stepsRight; s++) {
        const t = Math.PI - (s / 60) * Math.PI
        const pt = getHeartPoint(t, cx, cy, scale)
        if (s === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      }
      ctx.stroke()

      ctx.beginPath()
      const stepsLeft = Math.floor(60 * traceProgress)
      for (let s = 0; s <= stepsLeft; s++) {
        const t = Math.PI + (s / 60) * Math.PI
        const pt = getHeartPoint(t, cx, cy, scale)
        if (s === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      }
      ctx.stroke()
      ctx.restore()

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
