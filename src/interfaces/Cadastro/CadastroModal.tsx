import { Cadastro } from "./Cadastro";

export interface CadastroModal {
  isOpen: boolean;
  onClose: () => void;
  onCadastroCriado: (cadastro: Cadastro) => Promise<void>;
  recarregarCadastros: () => Promise<void>;
}
