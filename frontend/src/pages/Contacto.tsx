/**
 * @module pages/Contacto
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz.
 * @description Página de contacto de la plataforma Donaton.
 *
 * Página accesible desde la zona pública sin necesidad de autenticación.
 * Presenta un formulario de contacto con efecto visual de vidrio (glassmorphism)
 * sobre un video de fondo, lo que le da un aspecto visual distintivo respecto
 * al resto de las páginas del sistema.
 *
 * Funcionalidades:
 * - Formulario con campos nombre, correo, asunto y mensaje.
 * - Validación de campos obligatorios (nombre, correo y mensaje).
 * - Mensaje de confirmación al enviar correctamente.
 *
 * Nota de implementación: el formulario actualmente simula el envío cambiando
 * el estado local a 'enviado'. En una fase posterior se conectará a un endpoint
 * del backend o a un servicio de correo para enviar los mensajes realmente.
 */

import { useForm, type SubmitHandler } from "react-hook-form";
import { contactoSchema, type ContactoType } from "../schemas/contactoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import videoContacto from "../assets/videos/fondo.mp4";

/**
 * Página de contacto con video de fondo y formulario con efecto vidrio.
 * Permite a cualquier visitante del sitio enviar un mensaje al equipo de Donaton.
 *
 * @returns Página completa con Navbar, sección de video con formulario y Footer.
 */
export default function Contacto() {
    const [enviado, setEnviado] = useState(false);
    const { register, reset, formState: { errors }, handleSubmit } = useForm<ContactoType>({
        resolver: zodResolver(contactoSchema),

        defaultValues: {
            nombre: "",
            email: "",
            asunto: "",
            mensaje: ""
        }
    });

    const onSubmitContacto: SubmitHandler<ContactoType> = async (data) => {
        // Se muestran los datos por consola. Posteriormente se agregara la logica
        // para el envio al backend
        console.log(data);

        // Activa estado de 'enviado'
        setEnviado(true);

        // Se resetea el formulario
        reset();

        // Despues de 5 segundos, desaparece el mensaje de exito ('enviado === false')
        setTimeout(
            () => setEnviado(false),
            5000
        );
    };

    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Sección principal con video de fondo */}
            <main className="relative flex-1 overflow-hidden flex items-center justify-center px-6 py-20">
                {/* Video de fondo reproducido en bucle sin sonido */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src={videoContacto} type="video/mp4"></source>
                </video>

                {/* Capa oscura sobre el video para mejorar legibilidad del formulario */}
                <div className="absolute inset-0 bg-navy/70 z-10" />

                <form
                    className="relative z-20 w-full max-w-lg
                               bg-white/10 backdrop-blur-md
                               border border-white/20 rounded-2xl
                               p-8 md:p-10 flex flex-col gap-5
                               shadow-2xl"
                    onSubmit={handleSubmit(onSubmitContacto)}
                >

                    {/* Encabezado del formulario */}
                    <div className="text-center flex flex-col gap-2 mb-2">
                        <h1 className="text-3xl font-bold text-white">Contáctanos</h1>
                        <p className="text-gray-200 text-sm">
                            ¿Tienes dudas o quieres colaborar? Escríbenos.
                        </p>
                    </div>
                    
                    {/* Confirmación de envío exitoso — solo visible tras enviar */}
                    {enviado && (
                        <div className="bg-teal/20 border border-teal text-white rounded-xl p-4 text-sm">
                            ✅ ¡Mensaje enviado! Te responderemos pronto.
                        </div>
                    )}

                    {/* Campo nombre */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Nombre</label>
                        <input
                            type="text"
                            {...register("nombre")}
                            placeholder="Tu nombre"
                            className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                                       text-white placeholder-gray-300
                                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                        />

                        { errors.nombre?.message && <p className="text-sm text-red-500 mt-[2px]">{errors.nombre.message}</p> }
                    </div>
                    
                    {/* Campo correo */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Correo</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="tucorreo@ejemplo.com"
                            className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                                       text-white placeholder-gray-300
                                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                        />

                        { errors.email?.message && <p className="text-sm text-red-500 mt-[2px]">{errors.email.message}</p> }
                    </div>
                    
                    {/* Campo asunto (opcional) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Asunto (opcional)</label>
                        <input
                            type="text"
                            {...register("asunto")}
                            placeholder="¿Sobre qué nos escribes?"
                            className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                                       text-white placeholder-gray-300
                                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                        />
                    </div>
                    
                    {/* Campo mensaje (obligatorio) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Mensaje</label>
                        <textarea
                            {...register("mensaje")}
                            rows={4}
                            className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm resize-none
                                       text-white placeholder-gray-300
                                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                            placeholder="Escribe tu mensaje aquí..."
                        />

                        { errors.mensaje?.message && <p className="text-sm text-red-500 mt-[2px]">{errors.mensaje.message}</p> }
                    </div>

                    {/* Botón de envío */}
                    <button
                        className="bg-teal text-navy font-semibold px-6 py-3 rounded-lg
                                   hover:bg-teal/90 transition-all duration-200 mt-2"
                    >
                        Enviar mensaje
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
};
