/**
 * @module components/Navbar
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz
 * @description Barra de navegación global del sistema Donaton.
 *
 * Componente que se renderiza en todas las páginas públicas del sistema.
 * Es fija en la parte superior de la pantalla (sticky) con sombra para
 * mantener visibilidad al hacer scroll.
 *
 * Versión móvil:
 * - Oculta los enlaces y el botón de escritorio.
 * - Muestra un botón de menú hamburguesa que despliega un menú vertical.
 * - El estado del menú (abierto/cerrado) se controla con menuAbierto.
*/

import { useState } from "react";
import { useNavigate } from "react-router";
import donatonLogo from "../assets/img/Donaton_Logo.png";

/**
 * Barra de navegación global con soporte para escritorio y móvil.
 *
 * @returns Elemento nav con logo, enlaces de navegación y botón de acceso al sistema.
 */
export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();

    // enlaces de navegacion dentro de la landing
    const navLinks = [
        {to: "#como-funciona", text: "Cómo funciona"},
        {to: "#mision", text: "Impacto"}
    ];

    return(
        <nav className="bg-navy w-full sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo con enlace a la pagina de inicio */}
                <div className="text-white text-xl font-bold tracking-widest cursor-pointer" onClick={() => navigate("/")}>
                    <img className="w-45 h-20 inline-block mr-2 -mt-1" src={donatonLogo} alt="Logo de Donaton" />
                </div>

                {/* Enlaces de navegacion (visibles en pantallas de escritorio */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <a 
                        key={index}
                        href={link.to}
                        className="text-gray-300 hover:text-teal text-sm transition-colors duration-200"
                        >
                            {link.text}
                        </a>
                    ))}

                    <p
                        className="text-gray-300 hover:text-teal text-sm transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate("/contacto")}
                    >
                        Contacto
                    </p>
                </div>

                {/* Botón de acceso al sistema — solo visible en escritorio */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        className="bg-teal text-navy text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-teal/90 transition-all duration-200 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Ingresar al sistema
                    </button>
                </div>

                {/* Botón hamburguesa — solo visible en móvil */}
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="md:hidden text-white focus:outline-none cursor-pointer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuAbierto
                            /* Ícono X cuando el menú está abierto */
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            /* Ícono hamburguesa cuando el menú está cerrado */
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        }
                    </svg>
                </button>
            </div>

            {/* Menú desplegable móvil — solo visible cuando menuAbierto es true */}
            {menuAbierto && (
                <div className="md:hidden bg-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-center">
                    {navLinks.map((link, index) => (
                        <a 
                        key={index}
                        href={link.to}
                        className="text-gray-300 text-sm hover:text-teal"
                        >
                            {link.text}
                        </a>
                    ))}

                    <p
                        className="text-gray-300 hover:text-teal text-sm transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate("/contacto")}
                    >
                        Contacto
                    </p>

                    {/* Boton de acceso en version movil */}
                    <button
                        className="bg-teal text-navy text-sm font-semibold px-5 py-2.5 rounded-lg w-full cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Ingresar al sistema
                    </button>
                </div>
            )}
        </nav>
    );
};
