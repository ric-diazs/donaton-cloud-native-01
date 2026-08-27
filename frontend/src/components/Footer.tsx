/**
 * @module components/Footer
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz
 * @description Pie de página global del sistema Donaton.
 *
 * Componente que se renderiza en todas las páginas públicas del sistema
 * (Landing, DonadorPortal, Seguimiento, Contacto). Proporciona navegación
 * secundaria, información de contacto institucional y acceso rápido al sistema.
 *
 * Estructura del Footer:
 * - Columna de marca: nombre y descripción breve de la plataforma.
 * - Columna de navegación: enlaces a secciones de la Landing y al portal del donante.
 * - Columna de contacto: correo, ubicación y acceso directo al login del sistema.
 * - Barra inferior: copyright y enlaces a términos y privacidad.
 */

import { useNavigate } from "react-router";

/**
 * Pie de página global con navegación secundaria e información institucional.
 * Usa fondo navy con texto en tonos grises y acentos en teal para mantener
 * la identidad visual de la plataforma.
 *
 * @returns Elemento footer con cuatro columnas y barra inferior de copyright.
 */
export default function Footer(){

    // Hook de react-router
    const navigate = useNavigate();

    const navLinks = [
        {to: "#como-funciona", text: "Cómo funciona"},
        {to: "#mision", text: "Nuestro propósito"},
        {to: "#colaboradores", text: "Colaboradores"},
        {to: "#donar", text: "Quiero donar"}
    ];

    return(
        <footer className="bg-navy text-white">
            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* Grilla de cuatro columnas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Columna de marca — ocupa dos columnas en escritorio */}
                    <div>
                        <span className="text-2xl font-bold tracking-widest">DONATON</span>
                        <p
                            className="text-gray-400 text-sm leading-relaxed max-w-sm"
                        >
                        Plataforma digital de coordinación humanitaria que conecta donaciones con necesidades reales, asegurando trazabilidad y transparencia en cada entrega.
                        </p>
                    </div>

                    {/* Columna de navegación con anclas a secciones de la Landing */}
                    <div className="flex flex-col gap-4">
                        <h4
                            className="text-sm font-semibold text-white uppercase tracking-wider"
                        >
                            Navegación
                        </h4>

                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.to}
                                className="text-gray-400 text-sm hover:text-teal transition-colors"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>

                    {/* Columna de contacto con acceso directo al login */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Contacto
                        </h4>
                        <span className="text-gray-400 text-sm">contacto@donaton.cl</span>
                        <span className="text-gray-400 text-sm">Santiago, Chile</span>

                        {/* Acceso directo al sistema para usuarios internos (Agregar a Login)*/}
                        <p
                            className="text-teal text-sm font-semibold hover:underline mt-2 cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Ingresar al sistema →
                        </p>
                    </div>
                </div>

                {/* Barra inferior con copyright y enlaces legales */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-gray-500 text-xs">
                        © 2026 Donaton. Todos los derechos reservados.
                    </span>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 text-xs hover:text-teal transition-colors">
                            Términos
                        </a>
                        <a href="#" className="text-gray-500 text-xs hover:text-teal transition-colors">
                            Privacidad
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
