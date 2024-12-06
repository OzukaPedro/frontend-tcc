'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, IconButton, TextField } from '@mui/material';
import { ExpandMore, Delete, Edit, Print, Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AppContainer, AppCard } from "../../styles/global";
import SearchButton  from '../../components/SearchButton';

const Container = styled.div`
  padding: 2rem;
`;

const ViagemCard = styled.div`
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
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default function ViagensPage() {
  const router = useRouter();
  const [viagens, setViagens] = useState([
    {
      id: 1,
      nome: 'Viagem de Férias',
      valorTotal: 1000,
      tipo: 'viagem',
      cidadeOrigem: 'São Paulo',
      ufOrigem: 'SP',
      cidadeDestino: 'Rio de Janeiro',
      ufDestino: 'RJ',
    },
    {
      id: 2,
      nome: 'Viagem de Trabalho',
      valorTotal: 2000,
      tipo: 'trabalho',
      cidadeOrigem: 'São Paulo',
      ufOrigem: 'SP',
      cidadeDestino: 'Curitiba',
      ufDestino: 'PR',
    },
  ]);
  const [busca, setBusca] = useState('');
  const [expandedViagem, setExpandedViagem] = useState(null);

  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = async (query = '') => {
    try {
      const response = await axios.get(`/api/viagens?busca=${query}`);
      setViagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar viagens:', error);
    }
  };

  const handleBusca = () => fetchViagens(busca);

  const handleExpandir = (id) => {
    setExpandedViagem(expandedViagem === id ? null : id);
  };

  const handleRemover = async (id) => {
    try {
      await axios.delete(`/api/viagens/${id}`);
      setViagens((prev) => prev.filter((viagem) => viagem.id !== id));
    } catch (error) {
      console.error('Erro ao remover viagem:', error);
    }
  };
  
  const handleEdit = (id = null) => {
    if(id) return router.push(`/viagens/${id}`);
    return router.push(`/viagens/novo`);
  }

  return (
    <AppContainer>
      <h1>Lista de Viagens</h1>
      
      <SearchContainer>
        <SearchButton />
        <IconButton onClick={() => handleEdit()}>
          <Add />
        </IconButton>
      </SearchContainer>

      {viagens.map((viagem) => (
        <AppCard key={viagem.id} isExpanded={expandedViagem === viagem.id}>
          <Header>
            <div>
              <h3>{viagem.nome}</h3>
            </div>
            <div>
              <IconButton onClick={() => handleExpandir(viagem.id)}>
                <ExpandMore />
              </IconButton>
              <IconButton onClick={() => router.push(`/viagens/${viagem.id}`)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleRemover(viagem.id)}>
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedViagem === viagem.id}>
            <p><strong>Cidade de Origem:</strong> {viagem.cidadeOrigem}</p>
            <p><strong>UF de Origem:</strong> {viagem.ufOrigem}</p>
            <p><strong>Cidade de Destino:</strong> {viagem.cidadeDestino}</p>
            <p><strong>UF de Destino:</strong> {viagem.ufDestino}</p>
            <p><strong>Valor total:</strong> {viagem.valorTotal}</p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
