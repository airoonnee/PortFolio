import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Connexion | Erwan AGESNE",
  description: "Connectez-vous pour accéder au portfolio d'Erwan AGESNE",
}

export default function Home() {
  return <ClientPage />
}
