import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Rol } from "../types/rolEnum";

interface Usuario {
  id: string;
  nombre: string;
  rol: Rol;
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No autenticado");
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  function login(usuario: Usuario) {
    setUsuario(usuario);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}