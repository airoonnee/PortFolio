"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"
import SkipToContent from "@/components/skip-to-content"

export default function ClientPage() {
  const router = useRouter()
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is already logged in
    const userInfo = sessionStorage.getItem("userInfo")
    if (userInfo) {
      router.push("/portfolio")
    }
  }, [router])

  return (
    <>
      <SkipToContent targetId="main-content" />

      <main
        id="main-content"
        ref={mainContentRef}
        className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-4"
        tabIndex={-1}
      >
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" aria-label="Erwan AGESNE, Portfolio">
              Erwan AGESNE
            </h1>
            <p className="text-xl md:text-2xl font-light" aria-label="Développeur et Spécialiste IA / Data">
              Développeur & Spécialiste IA / Data
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Bienvenue sur mon portfolio</h2>
            <p className="mb-6 text-center">Veuillez vous connecter pour accéder à mon portfolio professionnel</p>
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  )
}
