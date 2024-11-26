export interface Usuario {
  id: number;
  nomeUsuario: string;
  email: string;
  senha: string;
  estLogin: boolean;
  dataCadastro: Date;
}
