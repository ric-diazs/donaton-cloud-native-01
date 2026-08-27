import { NextRequest, NextResponse } from "next/server";

/*
    Codigo de proxy esta basado en lo siguiente:
    https://nextjs.org/docs/app/api-reference/file-conventions/proxy#cors
*/

// Lista blanca de URLs que tienen permitido acceder al backend
const allowedOrigins = [
    "http://localhost:5173"
];

// Las opciones del CORS permitidas que apareceran en el header de la request
const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const proxy = (request: NextRequest) => {
    // Se revisa el origen de la peticion (request)
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Gestion de peticiones preflight
    if(request.method === "OPTIONS") {
        const preflightHeaders = {
            ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
            ...corsOptions,
        };

        return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Gestion de peticiones sencillas
    const response = NextResponse.next();

    if(isAllowedOrigin) {
        response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};

export const config = {
    matcher: "/api/:path",
};
