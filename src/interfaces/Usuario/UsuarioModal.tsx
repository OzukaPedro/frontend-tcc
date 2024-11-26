import { Usuario } from "./Usuario";

export interface UsuarioModal {
  isOpen: boolean;
  onClose: () => void;
  onUsuarioCriado: (usuario: Usuario) => Promise<void>;
  recarregarUsuarios: () => Promise<void>;
}
