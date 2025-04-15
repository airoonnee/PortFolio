"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import HeaderLoginForm from "@/components/header-login-form"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false) // Fermer le menu mobile si ouvert

    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80 // Hauteur approximative du header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window
        .scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })(
          // Focus the section for screen readers
          element as HTMLElement,
        )
        .focus()

      // Announce to screen readers
      const liveRegion = document.getElementById("nav-announcement")
      if (liveRegion) {
        const sectionName = href.replace("#", "")
        liveRegion.textContent = `Navigation vers la section ${sectionName}`

        // Clear after announcement
        setTimeout(() => {
          liveRegion.textContent = ""
        }, 1000)
      }
    }
  }

  const handleKeyboardNavigation = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window
          .scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })(
            // Focus the section for screen readers
            element as HTMLElement,
          )
          .focus()

        setIsOpen(false)
      }
    }
  }

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll)
    } else {
      setIsScrolled(true) // Always show background for users who prefer reduced motion
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length > 0) {
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

        document.addEventListener("keydown", handleTabKey)
        return () => document.removeEventListener("keydown", handleTabKey)
      }
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { name: "Accueil", href: "#hero", id: "nav-home" },
    { name: "À propos", href: "#about", id: "nav-about" },
    { name: "Compétences", href: "#skills", id: "nav-skills" },
    { name: "Formation", href: "#education", id: "nav-education" },
    { name: "Expériences", href: "#experience", id: "nav-experience" },
    { name: "Projets", href: "#projects", id: "nav-projects" },
    { name: "Contact", href: "#contact", id: "nav-contact" },
  ]

  const handleKeyDown = (e: React.KeyboardEvent, index: number, href: string) => {
    if (e.key === "Escape") {
      setIsOpen(false)
      return
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, href)
      return
    }

    if (!isOpen) return

    if (e.key === "Tab") {
      if (index === navLinks.length - 1 && !e.shiftKey) {
        const themeToggle = document.getElementById("theme-toggle")
        if (themeToggle) {
          e.preventDefault()
          themeToggle.focus()
        }
      }
    }
  }

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div id="nav-announcement" className="sr-only" aria-live="polite" aria-atomic="true"></div>

      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white dark:bg-gray-900 shadow-md text-gray-900 dark:text-gray-100"
            : "bg-transparent text-white dark:text-white"
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  id={link.id}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
                    isScrolled ? "text-gray-900 dark:text-gray-100" : "text-white"
                  }`}
                  aria-label={`Naviguer vers la section ${link.name}`}
                  onKeyDown={(e) => handleKeyboardNavigation(e, link.href)}
                  tabIndex={0}
                >
                  {link.name}
                </a>
              ))}

              {/* Theme Toggle */}
              {mounted && (
                <button
                  id="theme-toggle-desktop"
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
                  aria-pressed={theme === "dark"}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}

              {/* Login Form */}
              <HeaderLoginForm />
            </div>

            {/* Mobile Navigation Button */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Login Form Mobile */}
              <HeaderLoginForm />

              {/* Theme Toggle Mobile */}
              {mounted && (
                <button
                  id="theme-toggle"
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
                  aria-pressed={theme === "dark"}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}

              <button
                ref={menuButtonRef}
                className="focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 rounded"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className="md:hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-4 px-2 rounded-lg shadow-lg absolute top-16 right-4 left-4"
              role="menu"
              aria-labelledby="mobile-menu-button"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded"
                    onClick={(e) => scrollToSection(e, link.href)}
                    role="menuitem"
                    onKeyDown={(e) => handleKeyDown(e, index, link.href)}
                    tabIndex={0}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
