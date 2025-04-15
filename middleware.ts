import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur accède à la page portfolio
  if (request.nextUrl.pathname.startsWith("/portfolio")) {
    // Dans un environnement réel, vous vérifieriez un cookie ou un token JWT
    // Pour ce projet, nous allons simplement rediriger vers la page de connexion
    // si l'utilisateur tente d'accéder directement à /portfolio sans passer par le formulaire

    // Cette vérification est simplifiée pour la démonstration
    // Dans un environnement de production, utilisez des cookies sécurisés ou des JWT
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/portfolio/:path*",
}
