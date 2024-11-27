export interface Contrato {
  id: number;
  idUsuario: number;
  idContratado: number;
  idContratante: number;
  idViagem: number;
  idModelo: number;
  descricao: string;
  valor: number;
  dataEmissao: Date;
  dataValidade: Date;
  isParcel: boolean;
  parcelas: number;
}
