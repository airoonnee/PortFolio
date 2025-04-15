"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Briefcase, GraduationCap, MapPin, Mail, Phone, Linkedin, Code, Languages, Heart, Award } from "lucide-react"
import Navbar from "@/components/navbar"
import ContactForm from "@/components/contact-form"
import ProjectCard from "@/components/project-card"
import SkipToContent from "@/components/skip-to-content"

export default function PortfolioContent() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const mainContentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = sessionStorage.getItem("userInfo")
    if (!storedUserInfo) {
      router.push("/")
      return
    }

    try {
      setUserInfo(JSON.parse(storedUserInfo))

      // Add fade-in animation
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!prefersReducedMotion) {
        setIsLoaded(true)
      } else {
        // Skip animation for users who prefer reduced motion
        setIsLoaded(true)
      }
    } catch (error) {
      console.error("Error parsing user info:", error)
      router.push("/")
    }
  }, [router])

  // Focus main content when loaded
  useEffect(() => {
    if (isLoaded && mainContentRef.current) {
      mainContentRef.current.focus()
    }
  }, [isLoaded])

  if (!userInfo) {
    return null // Don't render anything until we check authentication
  }

  return (
    <>
      <SkipToContent targetId="main-content" />

      {/* Live region for dynamic announcements */}
      <div id="portfolio-announcements" className="sr-only" aria-live="polite" aria-atomic="true"></div>

      <Navbar />

      <main
        id="main-content"
        ref={mainContentRef}
        className={`min-h-screen bg-white dark:bg-gray-900 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={-1}
      >
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-[100vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white"
          aria-labelledby="hero-heading"
          tabIndex={-1}
        >
          <div
            className="absolute inset-0 opacity-20 bg-[url()] bg-cover bg-center"
            aria-hidden="true"
          ></div>
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold mb-4" aria-label="Nom de l'auteur : Erwan AGESNE" tabIndex={0}>
              Erwan AGESNE
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-8"aria-label="Domaine d'activiter : Développeur &  IA / Data" tabIndex={0}>
            Développeur &  IA / Data</h2>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span aria-label="localisation : principalement Lyon et aussi mobilité géographiquement" tabIndex={0}>Lyon, France (mobilité géographique)</span>
            </div>
            {/* <div className="mt-8">
              <p className="text-lg">
                Bienvenue {userInfo.firstName} {userInfo.lastName} de {userInfo.city} !
              </p>
            </div> */}
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800" id="about" aria-labelledby="about-heading" tabIndex={0}>
          <div className="container mx-auto px-4">
            <h2 id="about-heading" className="text-3xl font-bold mb-12 text-center" aria-label="A propos" tabIndex={0}>
              À propos
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-600">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Photo de profil d'Erwan AGESNE"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4" aria-label="Je suis Erwan AGESNE" tabIndex={0}>Erwan AGESNE</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4" aria-label="J'ai 21 ans et je suis mobile géographiquement" tabIndex={0}>21 ans | Mobilité géographique</p>
                  <div className="flex flex-col space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <Link
                        href="tel:+33767540068"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="Téléphone: +33 7 67 54 00 68"
                      >
                        +33 7 67 54 00 68
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <Link
                        href="mailto:erwanagesne@free.fr"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="Email: erwanagesne@free.fr"
                      >
                        erwanagesne@free.fr
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <Link
                        href="https://linkedin.com/in/erwan-agesne-020292278"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="LinkedIn: erwan-agesne-020292278"
                      >
                        linkedin.com/in/erwan-agesne-020292278
                      </Link>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300" aria-label="brève présentation : Étudiant en Bachelor Informatique spécialisé en IA et Data, je suis passionné par les nouvelles
                    technologies et l'innovation. Mon expérience internationale en Argentine m'a permis de développer
                    une grande adaptabilité et une ouverture d'esprit essentielle dans le domaine tech." tabIndex={0}>
                    Étudiant en Bachelor Informatique spécialisé en IA et Data, je suis passionné par les nouvelles
                    technologies et l'innovation. Mon expérience internationale en Argentine m'a permis de développer
                    une grande adaptabilité et une ouverture d'esprit essentielle dans le domaine tech.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20" id="skills" aria-labelledby="skills-heading" tabIndex={-1}>
          <div className="container mx-auto px-4">
            <h2 id="skills-heading" className="text-3xl font-bold mb-12 text-center" aria-label="Compétences" tabIndex={0}>
              Compétences
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-start mb-6">
                  <Code
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-4" aria-label="Compétences techniques" tabIndex={0}>Compétences techniques</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="Python" tabIndex={0}>Python</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="SQL" tabIndex={0}>SQL</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="Golang" tabIndex={0}>Golang</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="C#" tabIndex={0}>C#</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="Linux" tabIndex={0}>Linux</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="Git" tabIndex={0}>Git</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center col-span-2">
                        <span className="font-medium" aria-label="Analyse statistique" tabIndex={0}>Analyse statistique</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-start mb-6">
                  <Award
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-4" aria-label="Soft skills" tabIndex={0}>Soft skills</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Prise de parole en public</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Travail en équipe</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Discipline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-start mb-6">
                  <Languages
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-4" aria-label="" tabIndex={0}>Langues</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Français </span>
                          <span>Natif</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                            style={{ width: "100%" }}
                            aria-hidden="true"
                          ></div>
                          <span className="sr-only" aria-label="" tabIndex={0}>Niveau de français: Natif (100%)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Anglais</span>
                          <span>B2</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                            style={{ width: "75%" }}
                            aria-hidden="true"
                          ></div>
                          <span className="sr-only" aria-label="" tabIndex={0}>Niveau d'anglais: B2 (75%)</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Espagnol</span>
                          <span>B2</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                            style={{ width: "75%" }}
                            aria-hidden="true"
                          ></div>
                          <span className="sr-only" aria-label="" tabIndex={0}>Niveau d'espagnol: B2 (75%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-start mb-6">
                  <Heart
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-4" aria-label="" tabIndex={0}>Intérêts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Musculation</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Basketball</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Ski</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="font-medium" aria-label="" tabIndex={0}>Snowboard</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center col-span-2">
                        <span className="font-medium" aria-label="" tabIndex={0}>Bénévolat (Croix-Rouge, Rotary)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          className="py-20 bg-gray-50 dark:bg-gray-800"
          id="education"
          aria-labelledby="education-heading"
          tabIndex={-1}
        >
          <div className="container mx-auto px-4">
            <h2 id="education-heading" className="text-3xl font-bold mb-12 text-center" aria-label="" tabIndex={0}>
              Formation
            </h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex items-start">
                  <GraduationCap
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Bachelor Informatique, spécialité IA / Data</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Ynov Campus, Lyon | 2023 - 2026</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Formation complète en informatique avec une spécialisation en Intelligence Artificielle et Data
                      Science.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex items-start">
                  <GraduationCap
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Rotary étudiant d'échange</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Cordoba, Argentine | 2022 - 2023</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Programme d'échange international permettant une immersion culturelle et linguistique complète.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex items-start">
                  <GraduationCap
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Bac STI2D</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Lycée Louis-Lachenal, Argonay | 2019 - 2022</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Baccalauréat Sciences et Technologies de l'Industrie et du Développement Durable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20" id="experience" aria-labelledby="experience-heading" tabIndex={-1}>
          <div className="container mx-auto px-4">
            <h2 id="experience-heading" className="text-3xl font-bold mb-12 text-center" aria-label="" tabIndex={0}>
              Expériences Professionnelles
            </h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Briefcase
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Chef de projet IA / Pédagogie</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Projet STELLAR | 2024 - 2025</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Gestion de projet dans le domaine de l'intelligence artificielle avec un focus sur les aspects
                      pédagogiques.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Briefcase
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Projet de sensibilisation en cybersécurité</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>CyberSec | 2023 - 2024</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Participation à un projet visant à sensibiliser différents publics aux enjeux de la cybersécurité.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Briefcase
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Magasinier</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>VELSOL FRANCE | Été 2023</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Gestion de stock, préparation de commandes et organisation logistique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Briefcase
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Ouvrier</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Bati Service, Suisse | Juin 2024</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Travaux de construction et rénovation dans le secteur du bâtiment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Briefcase
                    className="h-8 w-8 mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-semibold" aria-label="" tabIndex={0}>Employé Polyvalent</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2" aria-label="" tabIndex={0}>Netto | Été 2022</p>
                    <p className="text-gray-700 dark:text-gray-300" aria-label="" tabIndex={0}>
                      Diverses responsabilités incluant la gestion de caisse, mise en rayon et service client.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          className="py-20 bg-gray-50 dark:bg-gray-800"
          id="projects"
          aria-labelledby="projects-heading"
          tabIndex={-1}
        >
          <div className="container mx-auto px-4">
            <h2 id="projects-heading" className="text-3xl font-bold mb-12 text-center" aria-label="" tabIndex={0}>
              Projets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <ProjectCard
                title="Projet STELLAR"
                description="Développement d'une plateforme d'apprentissage IA pour les étudiants."
                tags={["Python", "Machine Learning", "Pédagogie"]}
                image="/placeholder.svg?height=300&width=400"
              />
              <ProjectCard
                title="CyberSec"
                description="Création d'ateliers de sensibilisation à la cybersécurité pour différents publics."
                tags={["Sécurité", "Formation", "Sensibilisation"]}
                image="/placeholder.svg?height=300&width=400"
              />
              <ProjectCard
                title="Analyse de données"
                description="Projet d'analyse statistique sur des données environnementales."
                tags={["Python", "Data Science", "Visualisation"]}
                image="/placeholder.svg?height=300&width=400"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20" id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
          <div className="container mx-auto px-4">
            <h2 id="contact-heading" className="text-3xl font-bold mb-12 text-center" aria-label="" tabIndex={0}>
              Contact
            </h2>
            <div className="max-w-3xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="bg-gray-900 dark:bg-gray-950 text-white py-10"
          role="contentinfo"
          aria-label="Informations de contact et copyright"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <Link
                href="tel:+33767540068"
                className="flex items-center hover:text-blue-400 transition-colors"
                aria-label="Téléphone: +33 7 67 54 00 68"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                +33 7 67 54 00 68
              </Link>
              <Link
                href="mailto:erwanagesne@free.fr"
                className="flex items-center hover:text-blue-400 transition-colors"
                aria-label="Email: erwanagesne@free.fr"
              >
                <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
                erwanagesne@free.fr
              </Link>
              <Link
                href="https://linkedin.com/in/erwan-agesne-020292278"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition-colors"
                aria-label="LinkedIn: erwan-agesne-020292278"
              >
                <Linkedin className="h-5 w-5 mr-2" aria-hidden="true" />
                LinkedIn
              </Link>
            </div>
            <p className="text-gray-400">© {new Date().getFullYear()} Erwan AGESNE. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
