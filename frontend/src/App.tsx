import { AuthProvider } from "./context/AuthContext";
import RoutesDonaton from "./routes/RoutesDonaton";

function App() {
    // Tareas:
    // - [x] Trabajar la vista de Voluntario (VoluntarioPanel.tsx).
    // - [x] Trabajar la vista de Colaborador (ColaboradorPanel.tsx).
    // - [ ] Desarrollar el backend para los usuarios, login, donaciones y necesidades (si es que la hay)
    // - [ ] Agregar tabla de donaciones en vista VoluntarioPanel.tsx
    // - [ ] Agregar tabla de necesidades en vista Landing.tsx
    // - [ ] Backend para Contacto.tsx (quedara para cuando veamos lo de las colas en clases)
    return (
        <AuthProvider>
      <RoutesDonaton />
    </AuthProvider>
    );
}

export default App
