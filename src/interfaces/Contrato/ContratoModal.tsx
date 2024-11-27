import { Contrato } from "./Contrato";

export interface ContratoModal {
  isOpen: boolean;
  onClose: () => void;
  onContratoCriado: (contrato: Contrato) => Promise<void>;
  recarregarContrato: () => Promise<void>;
}
