'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const keywords = ['AI', 'Self Improvement','Startup','Personal Growth']

export default function FullPageDynamicTitle() {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 w-full">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:flex-1 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-gray-800">Hi there! I'm Cai.</h1>
          <p className="text-xl lg:text-2xl mb-6 text-gray-600">I'm an indie developer exploring AI-powered entrepreneurship.</p>
          <div className="text-lg lg:text-xl flex flex-col sm:flex-row items-start sm:items-center text-gray-700">
            <span className="mr-2 mb-2 sm:mb-0">I'm taking a <strong>Build in Public</strong> approach, focusing on</span>
            <div className="h-[40px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywords[currentKeywordIndex]}
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  exit={{ y: -40 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-blue-500 font-semibold text-2xl lg:text-3xl"
                >
                  {keywords[currentKeywordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="lg:flex-shrink-0">
          <Avatar className="w-40 h-40 lg:w-64 lg:h-64">
            <AvatarImage src="/avatars/IMG_9492.JPG" alt="Cai" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}