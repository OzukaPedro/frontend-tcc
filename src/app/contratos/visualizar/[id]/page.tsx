'use client';

import { useState, useEffect } from "react";
import { PageContainer, Title, Section, Footer, Signatures, Container } from "./styles";
import { useParams } from "next/navigation";
import api from "../../../../utils/api";

const cadastroDefault = {
  id: null,
  documentId: "",
  uf: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  cep: "",
  tipo: "",
  cpf: "",
  cnpj: "",
  razaoSocial: "",
  nome: "",
  rg: "",
  inscricaoEstadual: "",
  createdAt: "",
  updatedAt: "",
  publishedAt: ""
}

export default function ContratoPage() {
  const { id } = useParams();
  const [data, setData] = useState({
    id: null,
    documentId: "",
    descricao: "",
    valor: "",
    parcelado: false,
    parcelas: "",
    dataEmissao: "",
    dataValidade: "",
    dataInicio: "",
    dataFinal: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    contratante: {
      id: null,
      documentId: "",
      uf: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      cep: "",
      tipo: "",
      cpf: "",
      cnpj: "",
      razaoSocial: "",
      nome: "",
      rg: "",
      inscricaoEstadual: "",
      createdAt: "",
      updatedAt: "",
      publishedAt: ""
    },
    contratado: {
      id: null,
      documentId: "",
      uf: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      cep: "",
      tipo: "",
      cpf: "",
      cnpj: "",
      razaoSocial: "",
      nome: "",
      rg: "",
      inscricaoEstadual: "",
      createdAt: "",
      updatedAt: "",
      publishedAt: ""
    },
    viagem: {
      id: null,
      documentId: "",
      nome: "",
      valor: null,
      ufOrigem: "",
      cidadeOrigem: "",
      ufDestino: "",
      cidadeDestino: "",
      createdAt: "",
      updatedAt: "",
      publishedAt: ""
    },
    modelo: {
      id: null,
      documentId: "",
      nomeModelo: "",
      prologo: "",
      clausulas: [],
      paragrafoUnico: "",
      createdAt: "",
      updatedAt: "",
      publishedAt: ""
    }
  });
  
  useEffect(() => {
    if (id) {
      fetchContrato();
    }
  }, [id]);
  
  const fetchContrato = async () => {
    try {
      const populate = `?userId=${localStorage.getItem("userId")}&populate=contratantes&populate=contratados&populate=viagems&populate=modelos`;
      api.get(`/api/contratos/${id}${populate}`).then((response) => {
        let responseData = response.data.data;
        
        responseData.contratantes.length > 0
          ? responseData.contratante = responseData.contratantes[0]
          : responseData.contratante = cadastroDefault;
        
        responseData.contratados.length > 0
          ? responseData.contratado = responseData.contratados[0]
          : responseData.contratado = cadastroDefault;
        
        responseData.viagems.length > 0
          ? responseData.viagem = responseData.viagems[0]
          : responseData.viagem = { id: null, documentId: "", nome: "", valor: null, ufOrigem: "", cidadeOrigem: "", ufDestino: "", cidadeDestino: "", createdAt: "", updatedAt: "", publishedAt: "" };
          
        responseData.modelos.length > 0
          ? responseData.modelo = responseData.modelos[0]
          : responseData.modelo = { id: null, documentId: "", nomeModelo: "", prologo: "", clausulas: [], paragrafoUnico: "", createdAt: "", updatedAt: "", publishedAt: "" };

        setData(responseData);
      }).catch((error) => {
        throw error;
      });
    } catch (error) {
      console.error('Erro ao buscar contrato:', error);
    }
  };
  
  
  return (
    <Container>
      <PageContainer>
        <Title>CONTRATO DE VIAGEM</Title>
        <Section>
          <strong>Contratado - </strong>{`${data.contratado.nome}, CNPJ. ${data.contratado.cnpj}, ${data.contratado.logradouro} nº ${data.contratado.numero}, ${data.contratado.bairro}, ${data.contratado.cidade} - ${data.contratado.uf}`}
        </Section>
        <Section>
          <strong>Contratante: </strong>{`${data.contratante.nome}, RG: ${data.contratante.rg}.`}
          <p>Endereço: {data.contratante.logradouro} nº {data.contratante.numero}, {data.contratante.bairro}.</p>
          <p>Cidade: {data.contratante.cidade} - Estado: {data.contratante.uf}</p>
        </Section>
        <Section>
          <strong>Objeto do Contrato:</strong> {data.modelo.prologo}
        </Section>
        <Section>
          <p><strong>Condições de Pagamentos:</strong> {data.parcelado ? `Parcelado em ${data.parcelas}x` : 'À vista'}</p>
          <p><strong>Valor Total do Contrato:</strong> R$ {data.viagem.valor}</p>
        </Section>
        <Section>
          <p><i>O contratado, em hipótese alguma se responsabilizará pelos pertences do grupo.</i></p>
          <p><i>O seguro contra acidente pessoal será de responsabilidade do contratante.</i></p>
        </Section>
        <Section>
          {data.modelo.clausulas.map((clausula, index) => (
            <p key={index}><strong>Cláusula {index + 1}º - </strong>{clausula}</p>
          ))}
        </Section>
        <Section>
          <strong>Parágrafo Único - </strong> {data.modelo.paragrafoUnico}
        </Section>
        <Footer>
          <p>Data de Emissão: {data.dataEmissao}</p>
          <Signatures>
            <div>
              <p>___________________________</p>
              <span>Contratante</span>
            </div>
            <div>
              <p>___________________________</p>
              <span>Contratado</span>
            </div>
          </Signatures>
        </Footer>
      </PageContainer>
    </Container>
  );
}
