'use client'
import React from 'react'

export default function BotanicalGardenStage({ sw, sh, onComplete }) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900 flex items-center justify-center">
      <span className="text-white text-sm font-light tracking-widest opacity-80">
        Entering Enchanted Botanical Garden...
      </span>
    </div>
  )
}
