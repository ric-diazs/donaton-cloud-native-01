/**
 * @module routes/RoutesDonaton
 * @author Remi García, Benjamin Llanquiman y Ricardo Díaz
 * @description Componente para rutas de navegación de la aplicación web de Donaton.
 *
 * En este componente se agrupan las distintas rutas de navegación de la
 * plataforma web de Donaton.
*/

import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Contacto from "../pages/Contacto";
import VoluntarioPanel from "../pages/VoluntarioPanel";
import ColaboradorPanel from "../pages/ColaboradorPanel";
import AdminDashboard from "../pages/AdminDashboard";
import RegistroUsuarios from "../pages/RegistroUsuarios";

/**
* Rutas de navegación de la plataforma web
*
* @returns Rutas para ser usadas con hook `useNavigate` de dependencia `react-router`.
*/
export default function RoutesDonaton () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/voluntario" element={<VoluntarioPanel />} />
                <Route path="/colaborador" element={<ColaboradorPanel />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/usuarios" element={<RegistroUsuarios />} />
            </Routes>
        </BrowserRouter>
    );
};
