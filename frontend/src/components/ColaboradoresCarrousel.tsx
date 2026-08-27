/**
 * @module components/Colaboradores
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz
 * @description Componente de carrusel animado de organizaciones colaboradoras de Donaton.
 *
 * Muestra las instituciones públicas, privadas y organismos internacionales
 * que colaboran con la plataforma Donaton. Se usa en la Landing page como
 * sección de validación institucional del proyecto.
 *
 * El carrusel se construye duplicando la lista original de colaboradores
 * para crear un efecto de desplazamiento continuo e infinito mediante
 * la animación CSS scroll-logos definida en index.css
 * Al pausar el mouse sobre el carrusel, la animación se detiene.
 *
 * Colaboradores incluidos:
 * SENAPRED, Cruz Roja, BID Lab, PNUD Chile, Gobierno de Chile,
 * Municipalidad de Valparaíso, Duoc UC, Desafío Levantemos Chile.
 */

 import imgSenapred from '../assets/img/senapred.png';
 import imgCruzRoja from '../assets/img/cruzroja.png'
 import imgBID from '../assets/img/bid.png';
 import imgPNUD from '../assets/img/pnud.png';
 import imgGob from '../assets/img/gob.png';
 import imgMuniValpo from '../assets/img/valparaiso.png';
 import imgDuoc from '../assets/img/duoc.png';
 import imgDesafioLevantemosChile from '../assets/img/dlc.png';

/**
 * Carrusel animado de organizaciones colaboradoras.
 * La animación scroll-logos está definida en tailwind.config.js y se pausa
 * automáticamente cuando el usuario posa el mouse sobre el carrusel.
 *
 * @returns Sección con encabezado y carrusel horizontal de logos institucionales.
 */
 export default function ColaboradoresCarrousel() {
    // Lista de organizaciones colaboradoras con nombre y ruta del logo.
    const colaboradores = [
        { nombre: 'SENAPRED',                    logo: imgSenapred},
        { nombre: 'Cruz Roja',                   logo: imgCruzRoja},
        { nombre: 'BID Lab',                     logo: imgBID},
        { nombre: 'PNUD Chile',                  logo: imgPNUD},
        { nombre: 'Gobierno de Chile',           logo: imgGob},
        { nombre: 'Municipalidad de Valparaiso', logo: imgMuniValpo},
        { nombre: 'Duoc UC',                     logo: imgDuoc},
        { nombre: 'Desafio Levantemos Chile',    logo: imgDesafioLevantemosChile}
    ]

    /**
     * Lista duplicada de colaboradores para crear el efecto de carrusel infinito.
     * Al terminar de desplazarse la primera copia, la segunda ya está en posición
     * para continuar sin cortes visibles.
     */
    const all = [...colaboradores, ...colaboradores]
     return(
        <section id="colaboradores" className="bg-gray-50 py-24 px-6">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
            
                {/* Encabezado de la sección */}
                <div className="text-center flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 bg-teal px-4 py-2 rounded-full mx-auto w-fit">
                        <span className="w-2 h-2 rounded-full bg-navy" />
                        <span className="text-sm font-medium text-navy">
                          Red de colaboradores
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-navy">
                        Organizaciones que confían en Donaton
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
                        Trabajamos junto a instituciones públicas, privadas y organismos
                        internacionales para garantizar que cada donación llegue a quien
                        más la necesita.
                    </p>
                </div>
                
                {/* Carrusel con animación de desplazamiento continuo */}
                <div className="w-full overflow-hidden">
                    <div className="flex gap-6 items-center w-max animate-scroll-logos hover:[animation-play-state:paused]">
                        {all.map((org, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center justify-center gap-2
                                         w-48 h-32 flex-shrink-0 px-6 py-4
                                         bg-white border border-gray-200 rounded-xl
                                         hover:border-teal hover:shadow-md
                                         transition-all duration-200"
                            >
                              {/* Logo de la organización */}
                              <img
                                src={org.logo}
                                alt={org.nombre}
                                className="max-h-16 max-w-full object-contain"
                              />
                              {/* Nombre de la organización */}
                              <span className="text-sm font-semibold text-navy text-center">
                                {org.nombre}
                              </span>
                            </div>
                        ))}
                    </div>
                </div>
            
            </div>
        </section>
     );
 };
