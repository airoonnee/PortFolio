import type { Metadata } from "next"
import PortfolioContent from "@/components/portfolio-content"
import SkipToContent from "@/components/skip-to-content"

export const metadata: Metadata = {
  title: "Portfolio | Erwan AGESNE",
  description: "Portfolio professionnel d'Erwan AGESNE, spécialiste en IA et Data",
}

export default function PortfolioPage() {
  return (
    <>
      <SkipToContent />
      <PortfolioContent />
    </>
  )
}
