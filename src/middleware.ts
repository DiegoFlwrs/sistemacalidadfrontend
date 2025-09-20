import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

    if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard/contrato", req.url));
  }
  // Redirigir solo la ruta principal del dashboard a contrato
  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/contrato", req.url));
  }

  // Permitir el acceso a las demás rutas
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/dashboard"],
};