/**
 * @module pages/Login
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz
 * @description Página de inicio de sesión para el sistema de gestión de Donaton.
 *
 * Flujo de autenticación:
 * 1. El usuario ingresa su correo y contraseña.
 * 2. Al hacer clic en "Ingresar", se valida que los campos no estén vacíos.
 *
 */

import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type LoginType } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

/**
 * Página de inicio de sesión del sistema Donaton.
 * Permite a los usuarios internos autenticarse y acceder a su panel correspondiente.
 *
 * @returns Formulario de login centrado en pantalla con fondo navy.
 */
export default function Login(){
    // Gestion de estados del formulario con react-hook-form
    const { register, formState: { errors }, handleSubmit, reset } = useForm<LoginType>({
        // resolver para usar esquema de Zod de validacion de login
        resolver: zodResolver(LoginSchema),

        defaultValues: {
            email: "",
            password: ""
        }
    });

    // Navegacion
    const navigate = useNavigate();

    // Funcion para gestion de envio de datos del formulario
    const onSubmitLogin: SubmitHandler<LoginType> = async (data) => {
        // Se muestran los datos por consola. Posteriormente se agregara la logica
        // para el envio al backend
        console.log(data);

        // Se resetea el formulario
        reset();
    };

    return(
        <div className="min-h-screen bg-navy flex items-center justify-center px-6 py-20">
            <form
                 className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6"
                 onSubmit={handleSubmit(onSubmitLogin)}
            >
                {/* Encabezado del formulario */}
                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-navy">Iniciar sesión</h1>
                    <p className="text-gray-500 text-sm">
                        Ingresa al sistema de gestión de Donaton
                    </p>
                </div>

                {/* Campo de correo electrónico */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="correo" className="text-sm font-semibold text-navy">Correo</label>
                    <input
                        id="correo"
                        type="email"
                        {...register("email")}
                        placeholder="tucorreo@donaton.cl"
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm
                                   focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                    />

                    {errors.email?.message && <p className="text-sm text-red-500 mt-[2px]">{errors.email.message}</p> }
                </div>

                {/* Campo de contraseña */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="contrasena" className="text-sm font-semibold text-navy">Contraseña</label>
                    <input
                        id="contrasena"
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="border border-gray-300 rounded-lg px-4 py-3 text-sm
                                   focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                    />

                    {errors.password?.message && <p className="text-sm text-red-500 mt-[2px]">{errors.password.message}</p> }
                </div>

                {/* Botón de ingreso al sistema */}
                <button
                    className="bg-teal text-navy font-semibold px-6 py-3 rounded-lg
                               hover:bg-teal/90 transition-all duration-200 mt-2 cursor-pointer"
                >
                    Ingresar
                </button>

                {/* Botón para volver a la landing page */}
                <p
                  onClick={() => navigate('/')}
                  className="text-gray-400 text-sm hover:text-navy transition-colors cursor-pointer"
                >
                  ← Volver al inicio
                </p>
            </form>
        </div>
    );
};
