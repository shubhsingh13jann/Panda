'use client'

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const TreeTrunkAndLimbs = React.memo(function TreeTrunkAndLimbs({ isNight, sunsetFactor, directSunFactor = 1.0 }) {
  const trunkCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06, -6.0, 0),
        new THREE.Vector3(-0.04, -4.8, 0.02),
        new THREE.Vector3(-0.02, -3.6, 0.01),
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(0.12, -1.6, 0.05),
        new THREE.Vector3(-0.08, -0.6, -0.05),
        new THREE.Vector3(0.06, 0.5, 0.08),
        new THREE.Vector3(0.08, 1.4, 0),
      ]),
    []
  )

  const owlBoughCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, -0.28, 0.15),
        new THREE.Vector3(0.68, -0.26, 0.55),
        new THREE.Vector3(1.35, -0.16, 0.85),
        new THREE.Vector3(2.0, -0.04, 0.65),
      ]),
    []
  )

  const leftLimbCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.06, 0.4, -0.02),
        new THREE.Vector3(-0.65, 0.95, -0.18),
        new THREE.Vector3(-1.3, 1.5, 0.05),
      ]),
    []
  )

  const rightLimbCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 0.8, 0.04),
        new THREE.Vector3(0.6, 1.4, 0.22),
        new THREE.Vector3(1.1, 2.0, 0.08),
      ]),
    []
  )

  const centerLimbCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.04, 1.1, 0),
        new THREE.Vector3(-0.08, 1.9, 0.08),
        new THREE.Vector3(0.02, 2.6, 0),
      ]),
    []
  )

  // Buttress roots spreading deep into the soil and off the screen
  const root1Curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.8, 0),
        new THREE.Vector3(-0.35, -2.8, 0.15),
        new THREE.Vector3(-0.85, -4.2, 0.35),
        new THREE.Vector3(-1.3, -5.8, 0.45),
      ]),
    []
  )
  const root2Curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.8, 0),
        new THREE.Vector3(0.35, -2.8, 0.15),
        new THREE.Vector3(0.9, -4.2, 0.3),
        new THREE.Vector3(1.4, -5.8, 0.4),
      ]),
    []
  )
  const root3Curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.8, 0),
        new THREE.Vector3(0.05, -2.8, -0.3),
        new THREE.Vector3(0.08, -4.2, -0.6),
        new THREE.Vector3(0.12, -5.8, -0.75),
      ]),
    []
  )

  const barkColor = isNight
    ? '#21140c'
    : directSunFactor < 0.25
    ? '#24140b' // Dull mountain shadow bark
    : sunsetFactor > 0.3
    ? '#4a2612'
    : '#3b2011'

  return (
    <group>
      <mesh>
        <tubeGeometry args={[trunkCurve, 40, 0.44, 14, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[owlBoughCurve, 24, 0.18, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[leftLimbCurve, 20, 0.16, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[rightLimbCurve, 20, 0.15, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[centerLimbCurve, 20, 0.14, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[root1Curve, 20, 0.24, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.94} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[root2Curve, 20, 0.22, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.94} metalness={0.05} />
      </mesh>
      <mesh>
        <tubeGeometry args={[root3Curve, 20, 0.26, 10, false]} />
        <meshStandardMaterial color={barkColor} roughness={0.94} metalness={0.05} />
      </mesh>
    </group>
  )
})

const TreeFoliageCanopy = React.memo(function TreeFoliageCanopy({ isNight, sunsetFactor, directSunFactor = 1.0 }) {
  const leafGroupRef = useRef()

  const FOLIAGE_DATA = useMemo(
    () => [
      { pos: [0, 2.7, 0], scale: [1.25, 1.05, 1.15], colorDay: '#38a169', colorNight: '#0d2b1a', phase: 0 },
      { pos: [0.2, 2.0, 0.3], scale: [1.6, 1.35, 1.5], colorDay: '#2f855a', colorNight: '#0b2617', phase: 0.5 },
      { pos: [-1.1, 1.8, 0.1], scale: [1.4, 1.2, 1.3], colorDay: '#276749', colorNight: '#081f12', phase: 1.0 },
      { pos: [1.2, 1.7, -0.1], scale: [1.5, 1.25, 1.4], colorDay: '#2f855a', colorNight: '#0b2617', phase: 1.5 },
      { pos: [1.70, 1.52, -0.15], scale: [1.0, 0.85, 0.95], colorDay: '#38a169', colorNight: '#0d2b1a', phase: 2.0 },
      { pos: [-1.3, 0.9, -0.2], scale: [1.2, 0.95, 1.1], colorDay: '#22543d', colorNight: '#071b10', phase: 2.5 },
      { pos: [-0.4, 1.7, -0.8], scale: [1.55, 1.3, 1.5], colorDay: '#1c4532', colorNight: '#05160d', phase: 3.0 },
      { pos: [0.5, 1.4, -0.8], scale: [1.45, 1.2, 1.4], colorDay: '#1c4532', colorNight: '#05160d', phase: 3.5 },
      { pos: [0.3, 1.5, 0.8], scale: [1.35, 1.2, 1.25], colorDay: '#48bb78', colorNight: '#103320', phase: 4.0 },
      { pos: [-0.6, 1.3, 0.7], scale: [1.2, 1.1, 1.1], colorDay: '#38a169', colorNight: '#0d2b1a', phase: 4.5 },
      { pos: [0.9, 2.3, 0.2], scale: [1.15, 0.95, 1.05], colorDay: '#48bb78', colorNight: '#103320', phase: 5.0 },
      { pos: [-0.7, 2.4, -0.2], scale: [1.1, 0.95, 1.0], colorDay: '#38a169', colorNight: '#0d2b1a', phase: 5.5 },
      { pos: [2.15, 0.95, -0.2], scale: [0.85, 0.7, 0.8], colorDay: '#48bb78', colorNight: '#103320', phase: 6.0 },
      { pos: [-1.7, 0.5, 0.1], scale: [0.9, 0.75, 0.85], colorDay: '#276749', colorNight: '#081f12', phase: 6.5 },
      { pos: [0, 3.25, 0], scale: [0.85, 0.75, 0.85], colorDay: '#68d391', colorNight: '#144027', phase: 7.0 },
    ],
    []
  )

  useFrame(({ clock }) => {
    if (leafGroupRef.current) {
      const t = clock.getElapsedTime()
      leafGroupRef.current.children.forEach((child, i) => {
        const item = FOLIAGE_DATA[i]
        if (item) {
          child.rotation.y = Math.sin(t * 1.5 + item.phase) * 0.05
          child.rotation.x = Math.cos(t * 1.3 + item.phase) * 0.04
        }
      })
    }
  })

  return (
    <group ref={leafGroupRef}>
      {FOLIAGE_DATA.map((item, idx) => {
        const leafColor = isNight
          ? item.colorNight
          : directSunFactor < 0.25
          ? '#1b432a' // Dull mountain shadow foliage
          : sunsetFactor > 0.35
          ? '#4a6b38'
          : item.colorDay
        return (
          <mesh key={`foliage-${idx}`} position={item.pos} scale={item.scale}>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={leafColor}
              roughness={0.78}
              metalness={0.02}
              emissive={isNight ? '#06170d' : '#143820'}
              emissiveIntensity={isNight ? 0.2 : 0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
})

/* ══════════════════════════════════════════════════════════════════
   🍎 3D REALISTIC SCULPTED WILD MOUNTAIN APPLES (MALUS PUMILA)
   - Oblate sculpted fruits with calyx dimple & golden sunlit blush
   - Organic curved woody stems hanging from foliage canopy boughs
   - Fresh miniature green leaves budding off the stems
   - Gentle harmonic pendulum breeze flutter in useFrame
   - Fully interactive tap target with Botanical Inspection
══════════════════════════════════════════════════════════════════ */
const SingleApple = React.memo(function SingleApple({ position, scale = 0.16, phase = 0, isNight, onInspect }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      // Gentle natural pendulum swaying in the mountain wind
      groupRef.current.rotation.z = Math.sin(t * 1.8 + phase) * 0.08
      groupRef.current.rotation.x = Math.cos(t * 1.4 + phase) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onInspect?.('apple')
      }}
      onPointerOver={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto'
      }}
    >
      {/* Curved slender apple stem extending upward to branch */}
      <mesh position={[0, scale * 0.95 + 0.09, 0]} rotation={[0.08, 0, 0.15]}>
        <cylinderGeometry args={[0.012, 0.009, 0.20, 8]} />
        <meshStandardMaterial color="#3b1b0b" roughness={0.9} />
      </mesh>

      {/* Fresh miniature green leaf budding off the stem */}
      <mesh
        position={[0.06, scale * 0.95 + 0.12, 0.02]}
        rotation={[0.3, 0.2, 0.5]}
        scale={[0.09, 0.03, 0.06]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={isNight ? '#0d2b1a' : '#22c55e'} roughness={0.6} />
      </mesh>

      {/* Main Apple Fruit Body: slightly oblate with glossy crimson finish */}
      <mesh position={[0, 0, 0]} scale={[scale * 1.08, scale * 0.96, scale * 1.08]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={isNight ? '#7f1d1d' : '#dc2626'}
          roughness={0.20}
          metalness={0.06}
          emissive={isNight ? '#2a0404' : '#650909'}
          emissiveIntensity={isNight ? 0.35 : 0.18}
        />
      </mesh>

      {/* Golden-Amber Sunlit Blush on sun-facing side */}
      <mesh position={[scale * 0.32, scale * 0.12, scale * 0.35]} scale={[scale * 0.65, scale * 0.65, scale * 0.5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={isNight ? '#78350f' : '#facc15'}
          roughness={0.30}
          opacity={0.65}
          transparent
        />
      </mesh>

      {/* Indented Top Calyx Dimple */}
      <mesh position={[0, scale * 0.88, 0]} scale={[scale * 0.28, scale * 0.1, scale * 0.28]}>
        <cylinderGeometry args={[1, 0.4, 1, 12]} />
        <meshStandardMaterial color="#2d1007" roughness={0.9} />
      </mesh>
    </group>
  )
})

const TreeApples = React.memo(function TreeApples({ isNight, onInspect }) {
  const apples = [
    // 1. Far lower left branch
    { pos: [-1.65, 0.35, 0.85], scale: 0.15, phase: 0.2 },
    // 2. Mid-low left hanging
    { pos: [-1.25, 0.55, 1.10], scale: 0.16, phase: 1.1 },
    // 3. Mid-left outer canopy
    { pos: [-1.40, 1.25, 1.15], scale: 0.16, phase: 2.1 },
    // 4. Upper-left canopy cluster
    { pos: [-0.90, 2.05, 1.45], scale: 0.16, phase: 3.0 },
    // 5. Lower-center-left hanging (clear of trunk and owl)
    { pos: [-0.45, 0.65, 1.40], scale: 0.17, phase: 3.8 },
    // 6. Mid front-left foliage
    { pos: [-0.55, 1.40, 1.95], scale: 0.17, phase: 4.6 },
    // 7. High-center peak canopy
    { pos: [0.15, 2.25, 1.50], scale: 0.17, phase: 5.3 },
    // 8. Mid front-center foliage
    { pos: [0.45, 1.45, 1.95], scale: 0.16, phase: 0.9 },
    // 9. High-right bough
    { pos: [0.85, 1.85, 1.35], scale: 0.15, phase: 1.8 },
    // 10. Upper-right bough (well above owl at Y=0.28, completely uncrowded!)
    { pos: [1.65, 1.15, 1.05], scale: 0.15, phase: 2.7 },
  ]

  return (
    <group name="tree-apples">
      {apples.map((apple, i) => (
        <SingleApple
          key={`apple-${i}`}
          position={apple.pos}
          scale={apple.scale}
          phase={apple.phase}
          isNight={isNight}
          onInspect={onInspect}
        />
      ))}
    </group>
  )
})

const ThreeOwl = React.memo(function ThreeOwl({ isNight, isAwakened = false, onInspect }) {
  const headRef = useRef()
  const bodyRef = useRef()
  const [localAwake, setLocalAwake] = useState(false)
  const wakeTimerRef = useRef(null)

  const awake = isNight || isAwakened || localAwake

  const handlePointerDown = (e) => {
    e.stopPropagation()
    if (!isNight) {
      setLocalAwake(true)
      if (wakeTimerRef.current) clearTimeout(wakeTimerRef.current)
      wakeTimerRef.current = setTimeout(() => {
        setLocalAwake(false)
      }, 5000)
    }
    onInspect?.('owl')
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (headRef.current) {
      if (awake) {
        // Active, wise head turning & curious tilting when awake
        headRef.current.rotation.y = Math.sin(t * 0.4) * 0.26
        headRef.current.rotation.x = Math.sin(t * 0.75) * 0.08
        headRef.current.rotation.z = Math.cos(t * 0.5) * 0.05
      } else {
        // Subtle resting slumber head nod when sleeping during daytime
        headRef.current.rotation.y = Math.sin(t * 0.15) * 0.08
        headRef.current.rotation.x = 0.10 + Math.sin(t * 0.3) * 0.03
        headRef.current.rotation.z = Math.cos(t * 0.2) * 0.03
      }
    }
    if (bodyRef.current) {
      // Subtle rhythmic breathing in the chest (slower and deeper when sleeping)
      const breathSpeed = awake ? 1.6 : 1.0
      const breathAmp = awake ? 0.02 : 0.03
      bodyRef.current.scale.y = 1 + Math.sin(t * breathSpeed) * breathAmp
    }
  })

  return (
    <group
      position={[1.42, 0.28, 0.96]}
      rotation={[0.04, -0.18, 0]}
      onClick={handlePointerDown}
      onPointerOver={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto'
      }}
    >
      {/* ── 🦉 PROUD SCULPTED EURASIAN EAGLE-OWL ── */}
      {/* Soft Contact Ambient Shadow on Branch Bark */}
      <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.32]} />
        <meshBasicMaterial color="#080402" opacity={0.5} transparent />
      </mesh>

      {/* Main Oval Body with Breathing Animation */}
      <group ref={bodyRef}>
        <mesh position={[0, 0, 0]} scale={[0.34, 0.46, 0.32]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial
            color={isNight ? '#3e2723' : '#5d4037'}
            roughness={0.82}
            metalness={0.04}
          />
        </mesh>
        {/* Layered Pale Speckled Chest Bib */}
        <mesh position={[0, -0.04, 0.16]} scale={[0.24, 0.36, 0.16]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#bcaaa4' : '#ede0d4'} roughness={0.85} />
        </mesh>
        {/* Dark Feather Chevron Markings on Chest */}
        {[-0.08, 0, 0.08].map((fx, i) => (
          <mesh key={`chev-${i}`} position={[fx, -0.06 - (i % 2) * 0.08, 0.28]} scale={[0.03, 0.02, 0.02]}>
            <coneGeometry args={[1, 1, 3]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} />
          </mesh>
        ))}
        {/* Folded Scapular Left Wing */}
        <mesh position={[-0.24, -0.04, -0.02]} rotation={[0.1, 0, 0.18]} scale={[0.13, 0.42, 0.24]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#4e342e'} roughness={0.85} />
        </mesh>
        {/* Folded Scapular Right Wing */}
        <mesh position={[0.24, -0.04, -0.02]} rotation={[0.1, 0, -0.18]} scale={[0.13, 0.42, 0.24]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#4e342e'} roughness={0.85} />
        </mesh>
        {/* Tail Feathers Extending Down Behind Branch */}
        <mesh position={[0, -0.34, -0.14]} rotation={[-0.22, 0, 0]} scale={[0.18, 0.34, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={isNight ? '#24140b' : '#3e2723'} roughness={0.9} />
        </mesh>
      </group>

      {/* Wise Sculpted Head with Expressive Facial Discs & Plumicorns */}
      <group ref={headRef} position={[0, 0.44, 0.06]}>
        {/* Cranium */}
        <mesh scale={[0.28, 0.24, 0.26]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color={isNight ? '#3e2723' : '#5d4037'} roughness={0.8} />
        </mesh>
        {/* Heart-Shaped Facial Disc Border */}
        <mesh position={[-0.09, 0.02, 0.18]} scale={[0.12, 0.14, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#3e2723'} />
        </mesh>
        <mesh position={[0.09, 0.02, 0.18]} scale={[0.12, 0.14, 0.04]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#3e2723'} />
        </mesh>
        {/* Pale Inner Facial Disc Plumage */}
        <mesh position={[-0.09, 0.02, 0.20]} scale={[0.10, 0.12, 0.03]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#bcaaa4' : '#ede0d4'} roughness={0.85} />
        </mesh>
        <mesh position={[0.09, 0.02, 0.20]} scale={[0.10, 0.12, 0.03]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={isNight ? '#bcaaa4' : '#ede0d4'} roughness={0.85} />
        </mesh>

        {/* Prominent Feathered Ear Horns (Plumicorn Tufts) */}
        <mesh position={[-0.14, 0.22, 0.04]} rotation={[-0.1, 0, -0.32]}>
          <coneGeometry args={[0.05, 0.18, 6]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#3e2723'} roughness={0.85} />
        </mesh>
        <mesh position={[0.14, 0.22, 0.04]} rotation={[-0.1, 0, 0.32]}>
          <coneGeometry args={[0.05, 0.18, 6]} />
          <meshStandardMaterial color={isNight ? '#2d1a10' : '#3e2723'} roughness={0.85} />
        </mesh>

        {/* Sharp Curved Raptor Beak */}
        <mesh position={[0, -0.04, 0.24]} rotation={[0.52, 0, 0]}>
          <coneGeometry args={[0.036, 0.11, 8]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.01, 0.23]} scale={[0.03, 0.02, 0.02]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#2d1a10" />
        </mesh>

        {/* ── EYES (DAYTIME PEACEFUL SLEEPY SLITS vs NIGHTTIME LUMINOUS GOLD) ── */}
        {awake ? (
          isNight ? (
            <>
              {/* Luminous Golden Nocturnal Eyes with Wide Pupils */}
              <mesh position={[-0.09, 0.03, 0.22]}>
                <sphereGeometry args={[0.055, 16, 16]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3.2} />
              </mesh>
              <mesh position={[-0.09, 0.03, 0.26]}>
                <sphereGeometry args={[0.028, 14, 14]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
              <mesh position={[0.09, 0.03, 0.22]}>
                <sphereGeometry args={[0.055, 16, 16]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3.2} />
              </mesh>
              <mesh position={[0.09, 0.03, 0.26]}>
                <sphereGeometry args={[0.028, 14, 14]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
              {/* Gentle Warm Nocturnal Ambient Light cast on branch */}
              <pointLight position={[0, -0.05, 0.35]} color="#f59e0b" intensity={0.65} distance={1.8} />
            </>
          ) : (
            <>
              {/* Daytime Temporarily Awakened / Curious Amber Eyes */}
              <mesh position={[-0.09, 0.03, 0.22]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.25} />
              </mesh>
              <mesh position={[-0.09, 0.03, 0.25]}>
                <sphereGeometry args={[0.024, 14, 14]} />
                <meshBasicMaterial color="#090503" />
              </mesh>
              <mesh position={[-0.075, 0.045, 0.26]}>
                <sphereGeometry args={[0.009, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0.09, 0.03, 0.22]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.25} />
              </mesh>
              <mesh position={[0.09, 0.03, 0.25]}>
                <sphereGeometry args={[0.024, 14, 14]} />
                <meshBasicMaterial color="#090503" />
              </mesh>
              <mesh position={[0.105, 0.045, 0.26]}>
                <sphereGeometry args={[0.009, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </>
          )
        ) : (
          <>
            {/* 😴 PEACEFUL CLOSED SLEEPY EYES (AUTHENTIC NOCTURNAL DAYTIME REST) */}
            {/* Left Sleepy Eyelid Dome */}
            <mesh position={[-0.09, 0.025, 0.21]} scale={[0.046, 0.038, 0.03]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#4e342e" roughness={0.9} />
            </mesh>
            {/* Left Slumber Curved Eyelid Slit (⌒) */}
            <mesh position={[-0.09, 0.024, 0.235]} rotation={[0.1, 0, Math.PI]}>
              <torusGeometry args={[0.028, 0.005, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#1a0c06" roughness={0.8} />
            </mesh>
            {/* Left Feather Lashes */}
            {[-0.018, 0, 0.018].map((lx, idx) => (
              <mesh key={`lelash-${idx}`} position={[-0.09 + lx, 0.034, 0.232]} rotation={[0.3, 0, (idx - 1) * 0.25]}>
                <cylinderGeometry args={[0.0018, 0.0018, 0.012, 4]} />
                <meshStandardMaterial color="#2d1a10" />
              </mesh>
            ))}

            {/* Right Sleepy Eyelid Dome */}
            <mesh position={[0.09, 0.025, 0.21]} scale={[0.046, 0.038, 0.03]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#4e342e" roughness={0.9} />
            </mesh>
            {/* Right Slumber Curved Eyelid Slit (⌒) */}
            <mesh position={[0.09, 0.024, 0.235]} rotation={[0.1, 0, Math.PI]}>
              <torusGeometry args={[0.028, 0.005, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#1a0c06" roughness={0.8} />
            </mesh>
            {/* Right Feather Lashes */}
            {[-0.018, 0, 0.018].map((rx, idx) => (
              <mesh key={`relash-${idx}`} position={[0.09 + rx, 0.034, 0.232]} rotation={[0.3, 0, (idx - 1) * 0.25]}>
                <cylinderGeometry args={[0.0018, 0.0018, 0.012, 4]} />
                <meshStandardMaterial color="#2d1a10" />
              </mesh>
            ))}
          </>
        )}
      </group>

      {/* Raptor Feet with 3 Curving Talons Gripping the Branch Bark */}
      <group position={[0, -0.26, 0.12]}>
        {/* Left Foot */}
        <mesh position={[-0.09, 0, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.14]} />
          <meshStandardMaterial color="#21140c" roughness={0.85} />
        </mesh>
        <mesh position={[-0.11, -0.02, 0.06]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.018, 0.06, 6]} />
          <meshStandardMaterial color="#090503" roughness={0.3} />
        </mesh>
        <mesh position={[-0.07, -0.02, 0.06]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.018, 0.06, 6]} />
          <meshStandardMaterial color="#090503" roughness={0.3} />
        </mesh>
        {/* Right Foot */}
        <mesh position={[0.09, 0, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.14]} />
          <meshStandardMaterial color="#21140c" roughness={0.85} />
        </mesh>
        <mesh position={[0.07, -0.02, 0.06]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.018, 0.06, 6]} />
          <meshStandardMaterial color="#090503" roughness={0.3} />
        </mesh>
        <mesh position={[0.11, -0.02, 0.06]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.018, 0.06, 6]} />
          <meshStandardMaterial color="#090503" roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
})

const FloatingBreezeLeaves = React.memo(function FloatingBreezeLeaves({ isNight }) {
  const count = 16
  const leavesRef = useRef([])

  const initialData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: -1.2 + Math.random() * 2.8,
      y: 0.5 + Math.random() * 2.5,
      z: -0.8 + Math.random() * 1.6,
      speedY: 0.3 + Math.random() * 0.4,
      speedX: 0.2 + Math.random() * 0.3,
      rotSpeed: 1 + Math.random() * 2,
    }))
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    leavesRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const init = initialData[i]
      mesh.position.y = init.y - ((t * init.speedY + i * 0.8) % 4.5)
      mesh.position.x = init.x + Math.sin(t * 1.2 + i) * 0.35 + ((t * init.speedX) % 1.5)
      mesh.rotation.x = t * init.rotSpeed
      mesh.rotation.y = t * (init.rotSpeed * 0.8)
    })
  })

  return (
    <group>
      {initialData.map((_, i) => (
        <mesh
          key={`leaf-p-${i}`}
          ref={(el) => (leavesRef.current[i] = el)}
          scale={[0.06, 0.12, 0.02]}
        >
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial
            color={isNight ? '#4ade80' : '#86efac'}
            emissive={isNight ? '#22c55e' : '#15803d'}
            emissiveIntensity={isNight ? 0.6 : 0.1}
          />
        </mesh>
      ))}
    </group>
  )
})

function SceneTreeContent({ timeT, sunPos, isNight, sunsetFactor, directSunFactor = 1.0, isOwlAwakened = false, onInspect }) {
  const treeGroupRef = useRef()

  useFrame(({ clock }) => {
    if (treeGroupRef.current) {
      const t = clock.getElapsedTime()
      // Living mountain breeze harmonic sway
      treeGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.014 + Math.sin(t * 1.8) * 0.004
      treeGroupRef.current.rotation.x = Math.cos(t * 0.65) * 0.008
    }
  })

  // 3D Solar Light position tracking from 2D sunPos
  const sunLightX = sunPos ? ((sunPos.x / 1600) - 0.5) * 16 : (timeT - 0.5) * 16
  const sunLightY = sunPos ? (1 - (sunPos.y / 900)) * 10 - 2 : 5 - (timeT - 0.35) * (timeT - 0.35) * 10
  
  // Real Physics: When sun dips behind mountain, direct beam is cut off!
  // Light drops to soft dull diffuse mountain ambient shadow
  const sunLightColor = isNight
    ? '#93c5fd'
    : directSunFactor < 0.25
    ? '#64748b' // Dull cool mountain shadow
    : sunsetFactor > 0.3
    ? '#fed7aa'
    : '#fffbeb'

  const sunIntensity = isNight
    ? 0.45
    : 0.30 + 1.45 * directSunFactor

  return (
    <>
      <ambientLight
        intensity={isNight ? 0.35 : (0.38 + 0.47 * directSunFactor)}
        color={isNight ? '#0f172a' : directSunFactor < 0.25 ? '#334155' : '#f8fafc'}
      />
      <directionalLight position={[sunLightX, sunLightY, 5]} intensity={sunIntensity} color={sunLightColor} />

      {/* 
        Position & Scale calibration:
        - position={[0, -0.85, 0]} and scale={[0.82, 0.82, 0.82]}
        - Gives 1.8+ units of pure open sky headroom (ZERO clipping at top!)
        - Deep trunk & roots reach Y = -5.8 (ZERO floating at bottom!)
      */}
      <group ref={treeGroupRef} position={[0, -0.85, 0]} scale={[0.82, 0.82, 0.82]}>
        <TreeTrunkAndLimbs isNight={isNight} sunsetFactor={sunsetFactor} directSunFactor={directSunFactor} />
        <TreeFoliageCanopy isNight={isNight} sunsetFactor={sunsetFactor} directSunFactor={directSunFactor} />
        <TreeApples isNight={isNight} onInspect={onInspect} />
        <ThreeOwl isNight={isNight} isAwakened={isOwlAwakened} onInspect={onInspect} />
        <FloatingBreezeLeaves isNight={isNight} />
      </group>
    </>
  )
}

function ThreeBotanicalTree({ timeT, sunPos, isNight, sunsetFactor, directSunFactor = 1.0, isOwlAwakened = false, onInspect, isPortraitMobile = false }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      style={
        isPortraitMobile
          ? {
              position: 'absolute',
              left: 0,
              top: 'calc(50% - 28.125vw)',
              width: '38vw',
              height: '56.25vw',
              zIndex: 25,
              pointerEvents: 'none',
              overflow: 'visible',
            }
          : {
              position: 'absolute',
              left: 'max(-2vw, -20px)',
              bottom: 0,
              width: 'min(36vw, 540px)',
              height: 'min(88dvh, 820px)',
              zIndex: 25,
              pointerEvents: 'none',
              overflow: 'visible',
            }
      }
    >
      <Canvas
        camera={{ position: [0.12, 0.25, 10.2], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
      >
        <Suspense fallback={null}>
          <SceneTreeContent
            timeT={timeT}
            sunPos={sunPos}
            isNight={isNight}
            sunsetFactor={sunsetFactor}
            directSunFactor={directSunFactor}
            isOwlAwakened={isOwlAwakened}
            onInspect={onInspect}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

// ── EXACT MOUNTAIN RIDGE SKYLINE PROFILE ──
// Accurately maps the silhouette of foreground alpine peaks across the valley


export default React.memo(ThreeBotanicalTree)
export { TreeTrunkAndLimbs, TreeFoliageCanopy, TreeApples, ThreeOwl }
