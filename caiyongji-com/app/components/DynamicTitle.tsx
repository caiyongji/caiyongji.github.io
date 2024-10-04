'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const keywords = [
  { text: 'AI', color: '#007bff' },
  { text: 'Self Improvement', color: '#28a745' },
  { text: 'Startup', color: '#fd7e14' },
  { text: 'Personal Growth', color: '#ffc107' }
]

export default function FullPageDynamicTitle() {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:flex-1 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Hi there! I&apos;m Cai.</h1>
          <p className="text-xl lg:text-2xl mb-6">I&apos;m an indie developer exploring AI-powered entrepreneurship.</p>
          <div className="text-lg lg:text-xl flex flex-col sm:flex-row items-start sm:items-center">
            <span className="mr-2 mb-2 sm:mb-0">I&apos;m taking a <strong>Build in Public</strong> approach, focusing on</span>
            <div className="h-[40px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywords[currentKeywordIndex].text}
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  exit={{ y: -40 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block font-semibold text-2xl lg:text-3xl whitespace-nowrap"
                  style={{ color: keywords[currentKeywordIndex].color }}
                >
                  {keywords[currentKeywordIndex].text}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="lg:flex-shrink-0">
          <Avatar className="w-40 h-40 lg:w-64 lg:h-64">
            <AvatarImage src="/avatars/avatar.png" alt="Cai" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}