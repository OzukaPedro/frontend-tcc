import { Contrato } from "./Contrato";
import { ContratoModal } from "./ContratoModal";

export interface ModalDeleteContrato extends ContratoModal {
  onConfirmarExclusao: () => void;
  contrato?: Contrato;
}
