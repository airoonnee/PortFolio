"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SkipToContentProps {
  targetId: string
}

export default function SkipToContent({ targetId }: SkipToContentProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleSkip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.focus()
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
        const skipLink = document.getElementById("skip-to-content")
        if (skipLink) {
          skipLink.focus()
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleFirstTab)
    return () => window.removeEventListener("keydown", handleFirstTab)
  }, [])

  return (
    <a
      id="skip-to-content"
      href={`#${targetId}`}
      onClick={handleSkip}
      onKeyDown={(e) => e.key === "Enter" && handleSkip(e)}
      className={`
        fixed top-4 left-4 z-50 p-3 bg-blue-600 text-white rounded
        transform transition-transform duration-200
        ${isFocused ? "translate-y-0" : "-translate-y-20"}
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label="Passer au contenu principal"
      tabIndex={0}
    >
      Passer au contenu principal
    </a>
  )
}
