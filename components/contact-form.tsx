"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ type: null, message: null })

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        setFormStatus({
          type: "success",
          message: "Votre message a été envoyé avec succès !",
        })

        // Announce to screen readers
        const liveRegion = document.getElementById("portfolio-announcements")
        if (liveRegion) {
          liveRegion.textContent = "Votre message a été envoyé avec succès !"

          // Clear after announcement
          setTimeout(() => {
            liveRegion.textContent = ""
          }, 5000)
        }
      } catch (error) {
        setFormStatus({
          type: "error",
          message: "Une erreur est survenue. Veuillez réessayer.",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Envoyez-moi un message</CardTitle>
        <CardDescription>Remplissez le formulaire ci-dessous pour me contacter</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Formulaire de contact">
          {formStatus.type && (
            <Alert variant={formStatus.type === "success" ? "default" : "destructive"} aria-live="assertive">
              {formStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
              )}
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nom{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={errors.name ? "true" : "false"}
              aria-required="true"
              aria-label="Nom complet"
              className={`${errors.name ? "border-red-500" : ""} text-black dark:text-black`}
              required
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500" aria-live="polite">
                {errors.name}
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
            <Label htmlFor="subject" className="text-sm font-medium">
              Sujet{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              aria-invalid={errors.subject ? "true" : "false"}
              aria-required="true"
              aria-label="Sujet du message"
              className={`${errors.subject ? "border-red-500" : ""} text-black dark:text-black`}
              required
            />
            {errors.subject && (
              <p id="subject-error" className="text-sm text-red-500" aria-live="polite">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={errors.message ? "true" : "false"}
              aria-required="true"
              aria-label="Contenu du message"
              className={`${errors.message ? "border-red-500" : ""} text-black dark:text-black`}
              required
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500" aria-live="polite">
                {errors.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </CardFooter>
    </Card>
  )
}
