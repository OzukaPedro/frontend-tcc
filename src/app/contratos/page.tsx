'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Button, IconButton, TextField } from '@mui/material';
import { ExpandMore, Delete, Print, Add } from '@mui/icons-material';
import { AppContainer, AppCard } from "../../styles/global";
import SearchButton  from '../../components/SearchButton';

const Container = styled.div`
  padding: 2rem;
`;

const ContratoCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  transition: all 0.3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  ${({ isExpanded }) => !isExpanded && 'transform: scale(1.05);'}
`;

export default function ContratosPage() {
  const router = useRouter();
  const [contratos, setContratos] = useState([
    {
      id: 1,
      titulo: 'Contrato de viagem',
      dataIni: '01/01/2022',
      dataFim: '31/01/2022',
      valorTotal: 1000,
      parcelado: true,
      detalhes: 'Contrato de viagem para o cliente X.',
    },
    {
      id: 2,
      titulo: 'Contrato de transporte',
      dataIni: '01/02/2022',
      dataFim: '28/02/2022',
      valorTotal: 2000,
      parcelado: false,
      detalhes: 'Contrato de transporte para o cliente Y.',
    },
  ]);
  const [busca, setBusca] = useState('');
  const [expandedContrato, setExpandedContrato] = useState(null);

  useEffect(() => {
    fetchContratos();
  }, []);

  const fetchContratos = async (query = '') => {
    try {
      const response = await axios.get(`/api/contratos?busca=${query}`);
      setContratos(response.data);
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
    }
  };

  const handleBusca = () => fetchContratos(busca);

  const handleExpandir = (id) => {
    setExpandedContrato(expandedContrato === id ? null : id);
  };

  const handleRemover = async (id) => {
    try {
      await axios.delete(`/api/contratos/${id}`);
      setContratos((prev) => prev.filter((contrato) => contrato.id !== id));
    } catch (error) {
      console.error('Erro ao remover contrato:', error);
    }
  };
  
  const handleEdit = (id = null) => {
    if(id) return router.push(`/contratos/${id}`);
    return router.push(`/contratos/novo`);
  }

  return (
    <AppContainer>
      <h1>Lista de Contratos</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <SearchButton />
        <IconButton onClick={() => handleEdit()}>
          <Add />
        </IconButton>
      </div>

      {contratos.map((contrato) => (
        <AppCard key={contrato.id} isExpanded={expandedContrato === contrato.id}>
          <Header>
            <div>
              <h3>{contrato.titulo}</h3>
              <p>Data Início: {contrato.dataIni}</p>
              <p>Data Fim: {contrato.dataFim}</p>
            </div>
            <div>
              <IconButton onClick={() => window.print()}>
                <Print />
              </IconButton>
              <IconButton onClick={() => handleExpandir(contrato.id)}>
                <ExpandMore />
              </IconButton>
              <IconButton color="error" onClick={() => handleRemover(contrato.id)}>
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedContrato === contrato.id}>
            <p><strong>Data Emissão:</strong> 01/01/2024</p>
            <p><strong>Data Validade:</strong> 11/10/2024</p>
            <p><strong>Contratante:</strong> Cliente X</p>
            <p><strong>Contratado:</strong> Empresa Y</p>
            <p><strong>Viagem:</strong> Foz do iguaçu</p>
            <p><strong>Valor Total:</strong> R${contrato.valorTotal}</p>
            <p><strong>Parcelado:</strong> {contrato.parcelado ? 'Sim' : 'Não'}</p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
