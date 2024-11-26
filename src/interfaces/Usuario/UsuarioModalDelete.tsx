import { Usuario } from "./Usuario";
import { UsuarioModal } from "./UsuarioModal";

export interface ModalDeleteUsuario extends UsuarioModal {
  onConfirmarExclusao: () => void;
  usuario?: Usuario;
}
