import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { Rol } from "../types/rolEnum";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactNode;
  rolesPermitidos: Rol[];
}

export function ProtectedRoute({ children, rolesPermitidos }: Props) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}