"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }

    if (!formData.age.trim()) {
      newErrors.age = "L'âge est requis"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "L'âge doit être un nombre positif"
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(null)

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Store user info in sessionStorage
        sessionStorage.setItem("userInfo", JSON.stringify(formData))

        setFormSuccess("Connexion réussie ! Redirection vers le portfolio...")

        // Redirect after a short delay to allow screen readers to announce the success message
        setTimeout(() => {
          router.push("/portfolio")
        }, 1500)
      } catch (error) {
        setFormError("Une erreur est survenue. Veuillez réessayer.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setFormError("Veuillez corriger les erreurs dans le formulaire")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Formulaire de connexion">
      {formError && (
        <Alert variant="destructive" aria-live="assertive">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      {formSuccess && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200" aria-live="assertive">
          <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
          <AlertDescription>{formSuccess}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium">
          Nom{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
          aria-invalid={errors.lastName ? "true" : "false"}
          aria-required="true"
          aria-label="Nom de famille"
          className={`${errors.lastName ? "border-red-500" : ""} text-black dark:text-black`}
          required
        />
        {errors.lastName && (
          <p id="lastName-error" className="text-sm text-red-500" aria-live="polite">
            {errors.lastName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium">
          Prénom{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
          aria-invalid={errors.firstName ? "true" : "false"}
          aria-required="true"
          aria-label="Prénom"
          className={`${errors.firstName ? "border-red-500" : ""} text-black dark:text-black`}
          required
        />
        {errors.firstName && (
          <p id="firstName-error" className="text-sm text-red-500" aria-live="polite">
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-sm font-medium">
          Âge{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="age"
          name="age"
          type="number"
          min="1"
          value={formData.age}
          onChange={handleChange}
          aria-describedby={errors.age ? "age-error" : undefined}
          aria-invalid={errors.age ? "true" : "false"}
          aria-required="true"
          aria-label="Âge"
          className={`${errors.age ? "border-red-500" : ""} text-black dark:text-black`}
          required
        />
        {errors.age && (
          <p id="age-error" className="text-sm text-red-500" aria-live="polite">
            {errors.age}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={errors.email ? "true" : "false"}
          aria-required="true"
          aria-label="Adresse email"
          className={`${errors.email ? "border-red-500" : ""} text-black dark:text-black`}
          required
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-500" aria-live="polite">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium">
          Ville{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          aria-describedby={errors.city ? "city-error" : undefined}
          aria-invalid={errors.city ? "true" : "false"}
          aria-required="true"
          aria-label="Ville de résidence"
          className={`${errors.city ? "border-red-500" : ""} text-black dark:text-black`}
          required
        />
        {errors.city && (
          <p id="city-error" className="text-sm text-red-500" aria-live="polite">
            {errors.city}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Connexion en cours..." : "Accéder au portfolio"}
      </Button>
    </form>
  )
}
