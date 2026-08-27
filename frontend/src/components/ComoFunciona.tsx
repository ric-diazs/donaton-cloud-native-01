/**
 * @module components/ComoFunciona
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz.
 * @description Componente de sección explicativa del proceso de donación en Donaton.
 *
 * Presenta los tres pasos del ciclo operativo de Donaton de forma visual
 * mediante tarjetas numeradas con imagen, título y descripción.
 * Se usa en la Landing page para que el visitante entienda cómo funciona
 * el sistema antes de registrar una donación.
 *
 * Los tres pasos corresponden a las fases del ciclo de vida de una donación:
 * 1. Registro: el voluntario ingresa la donación al sistema en el centro de acopio.
 * 2. Identificación: el coordinador visualiza las necesidades activas y elige cuál cubrir.
 * 3. Asignación y entrega: se vincula la donación a la necesidad y se confirma la entrega.
 *
 */

import imgPaso1 from '../assets/img/paso1.png';
import imgPaso2 from '../assets/img/paso2.png';
import imgPaso3 from '../assets/img/paso3.png';

/**
 * Sección explicativa del proceso de donación en tres pasos.
 * Muestra tarjetas con número destacado, título, descripción e imagen ilustrativa.
 *
 * @returns Sección con encabezado y grilla de tres tarjetas de proceso.
 */
export default function ComoFunciona() {
    // Configuración de los tres pasos del proceso de donación.
    const pasos = [
        {
            numero:      '01',
            titulo:      'Registrar donación',
            descripcion: 'El voluntario ingresa tipo, cantidad y origen de la donación al sistema en tiempo real desde el centro de acopio.',
            imagen:      imgPaso1,
        },
        {
            numero:      '02',
            titulo:      'Identificar necesidad',
            descripcion: 'El coordinador visualiza las necesidades activas organizadas por urgencia, categoría y municipio.',
            imagen:      imgPaso2,
        },
        {
            numero:      '03',
            titulo:      'Asignar y entregar',
            descripcion: 'Se vincula la donación a la necesidad. El dashboard muestra el estado de entrega en tiempo real.',
            imagen:      imgPaso3,
        }
    ]

    return(
        <section id="como-funciona" className="bg-gray-50 py-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
                {/* Encabezado de la sección */}
                <div className="text-center flex flex-col gap-3">
                    <h2 className="text-4xl font-bold text-navy">¿Cómo funciona?</h2>
                    <p className="text-gray-500 text-base max-w-xl">Tres pasos para que cada donación llegue a donde más se necesita.</p>
                </div>

                {/* Grilla de tarjetas de proceso */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {pasos.map((paso) => (
                    <div key={paso.numero} className="bg-white rounded-2xl p-8 flex flex-col gap-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-200">

                        <span className="text-5xl font-bold text-teal">{paso.numero}</span>

                        <h3 className="text-xl font-semibold text-navy">{paso.titulo}</h3>

                        <img src={paso.imagen} alt={paso.titulo} className="w-full h-45 object-cover rounded-xl"/>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};
