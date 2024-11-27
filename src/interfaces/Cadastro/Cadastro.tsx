export interface Cadastro {
  id: number;
  idUsuario: number;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numeroLogradouro: string;
  telefone: string;
  cep: string;
}

export interface CadastroPj extends Cadastro {
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
}

export interface CadastroPf extends Cadastro {
  nome: string;
  cpf: string;
  rg: string;
}
