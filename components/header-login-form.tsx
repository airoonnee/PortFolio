"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useOnClickOutside } from "@/hooks/use-click-outside"

export default function HeaderLoginForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    age: "",
    email: "",
    city: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  // Close the form when clicking outside
  useOnClickOutside(formRef, (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  })

  // Handle escape key to close the form
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Focus trap for keyboard navigation
  useEffect(() => {
    if (isOpen) {
      const form = formRef.current
      if (!form) return

      const focusableElements = form.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      form.addEventListener("keydown", handleTabKey)
      firstElement.focus()

      return () => {
        form.removeEventListener("keydown", handleTabKey)
      }
    }
  }, [isOpen])

  const toggleForm = () => {
    setIsOpen(!isOpen)
    setFormError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }

    if (!formData.age.trim()) {
      newErrors.age = "L'âge est requis"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "L'âge doit être un nombre positif"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (validateForm()) {
      // Store user info in sessionStorage
      sessionStorage.setItem("userInfo", JSON.stringify(formData))
      // Redirect to portfolio
      router.push("/portfolio")
    } else {
      setFormError("Veuillez corriger les erreurs dans le formulaire")
    }
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={toggleForm}
        aria-expanded={isOpen}
        aria-controls="header-login-form"
        aria-label={isOpen ? "Fermer le formulaire de connexion" : "Ouvrir le formulaire de connexion"}
        className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <User className="h-5 w-5" aria-hidden="true" />
      </Button>

      {isOpen && (
        <div
          ref={formRef}
          id="header-login-form"
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50"
          role="dialog"
          aria-labelledby="login-form-title"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 id="login-form-title" className="text-lg font-semibold">
              Connexion
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le formulaire"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            {formError && (
              <Alert variant="destructive" aria-live="assertive">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1">
              <Label htmlFor="header-lastName" className="text-sm font-medium">
                Nom{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="header-lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                aria-describedby={errors.lastName ? "header-lastName-error" : undefined}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-required="true"
                aria-label="Nom de famille"
                className={`${errors.lastName ? "border-red-500" : ""} text-black dark:text-black`}
                required
              />
              {errors.lastName && (
                <p id="header-lastName-error" className="text-sm text-red-500" aria-live="polite">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="header-firstName" className="text-sm font-medium">
                Prénom{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="header-firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                aria-describedby={errors.firstName ? "header-firstName-error" : undefined}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-required="true"
                aria-label="Prénom"
                className={`${errors.firstName ? "border-red-500" : ""} text-black dark:text-black`}
                required
              />
              {errors.firstName && (
                <p id="header-firstName-error" className="text-sm text-red-500" aria-live="polite">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="header-age" className="text-sm font-medium">
                Âge{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="header-age"
                name="age"
                type="number"
                min="1"
                value={formData.age}
                onChange={handleChange}
                aria-describedby={errors.age ? "header-age-error" : undefined}
                aria-invalid={errors.age ? "true" : "false"}
                aria-required="true"
                aria-label="Âge"
                className={`${errors.age ? "border-red-500" : ""} text-black dark:text-black`}
                required
              />
              {errors.age && (
                <p id="header-age-error" className="text-sm text-red-500" aria-live="polite">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="header-email" className="text-sm font-medium">
                Email{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="header-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "header-email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
                aria-required="true"
                aria-label="Adresse email"
                className={`${errors.email ? "border-red-500" : ""} text-black dark:text-black`}
                required
              />
              {errors.email && (
                <p id="header-email-error" className="text-sm text-red-500" aria-live="polite">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="header-city" className="text-sm font-medium">
                Ville{" "}
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="header-city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                aria-describedby={errors.city ? "header-city-error" : undefined}
                aria-invalid={errors.city ? "true" : "false"}
                aria-required="true"
                aria-label="Ville de résidence"
                className={`${errors.city ? "border-red-500" : ""} text-black dark:text-black`}
                required
              />
              {errors.city && (
                <p id="header-city-error" className="text-sm text-red-500" aria-live="polite">
                  {errors.city}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" role="button" aria-label="Se connecter">
              Se connecter
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
