import { Cadastro } from "./Cadastro";
import { CadastroModal } from "./CadastroModal";

export interface ModalDeleteCadastro extends CadastroModal {
  onConfirmarExclusao: () => void;
  cadastro?: Cadastro;
}
