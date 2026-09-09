import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

interface PanelHeaderProps {
    titulo: string;
    subtitulo: string;
}

export default function PanelHeader({ titulo, subtitulo }: PanelHeaderProps) {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-navy">{titulo}</h1>
                <p className="text-gray-500 text-sm">{subtitulo}</p>
            </div>

            <div className="flex items-center gap-4">
                {usuario && (
                    <span className="text-sm text-gray-500">
                        Hola, <span className="font-semibold text-navy">{usuario.nombre}</span>
                    </span>
                )}
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-navy transition-colors cursor-pointer"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}