import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "./src/lib/jwt";

// Lista blanca de URLs que tienen permitido acceder al backend
const allowedOrigins = [
    "http://localhost:5173"
];

// Las opciones del CORS permitidas que apareceran en el header de la request
const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
}

// Rutas que NO requieren JWT (el propio login/logout no puede exigir un token)
const rutasPublicas = [
    "/api/auth/login",
    "/api/auth/logout",
];

export const proxy = (request: NextRequest) => {
    // Se revisa el origen de la peticion (request)
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Gestion de peticiones preflight
    if (request.method === "OPTIONS") {
        const preflightHeaders = {
            ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
            ...corsOptions,
        };
        return NextResponse.json({}, { headers: preflightHeaders });
    }

    const pathname = request.nextUrl.pathname;
    const esRutaPublica = rutasPublicas.some((ruta) => pathname.startsWith(ruta));

    // --- Aca actua como "API Gateway": valida el JWT antes de dejar pasar la peticion ---
    if (!esRutaPublica) {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ mensaje: "No autenticado" }, { status: 401 });
        }

        try {
            const usuario = verificarToken(token);

            // El "gateway" inyecta la identidad ya validada, para que los
            // endpoints downstream puedan confiar en ella sin revalidar
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-usuario-id", String(usuario.id));
            requestHeaders.set("x-usuario-rol", usuario.rol);

            const response = NextResponse.next({ request: { headers: requestHeaders } });

            if (isAllowedOrigin) response.headers.set("Access-Control-Allow-Origin", origin);
            Object.entries(corsOptions).forEach(([key, value]) => response.headers.set(key, value));

            return response;
        } catch {
            return NextResponse.json({ mensaje: "Token inválido o expirado" }, { status: 401 });
        }
    }

    // Gestion de peticiones sencillas a rutas publicas
    const response = NextResponse.next();

    if (isAllowedOrigin) response.headers.set("Access-Control-Allow-Origin", origin);
    Object.entries(corsOptions).forEach(([key, value]) => response.headers.set(key, value));

    return response;
};

export const config = {
    matcher: "/api/:path*",
    runtime: "nodejs",
};