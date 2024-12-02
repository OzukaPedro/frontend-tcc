'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, IconButton, TextField, Avatar } from '@mui/material';
import { ExpandMore, Delete, Print, Search, Add, Person, Business, Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AppContainer, AppCard } from "../../../styles/global";
import SearchButton  from '../../../components/SearchButton';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ExpandableContent = styled.div<{isExpanded}>`
  max-height: ${(props) => (props.isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  ${({ isExpanded }) => isExpanded && `padding: 15px;`};
`;

export default function Modelos() {
  const router = useRouter();
  const [modelos, setModelos] = useState([
    {
      id: 1,
      title: 'Modelo 1',
      prologue: 'Prologo do modelo 1',
      clauses: ['Cláusula 1', 'Cláusula 2'],
      paragraph: 'Parágrafo único do modelo 1',
    },
    {
      id: 2,
      title: 'Modelo 2',
      prologue: 'Prologo do modelo 2',
      clauses: ['Cláusula 1', 'Cláusula 2'],
      paragraph: 'Parágrafo único do modelo 2',
    },
  ]);
  const [busca, setBusca] = useState('');
  const [expandedUsuario, setExpandedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async (query = '') => {
    try {
      const response = await axios.get(`/api/modelos?busca=${query}`);
      setModelos(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleBusca = () => fetchUsuarios(busca);

  const handleExpandir = (id) => {
    setExpandedUsuario(expandedUsuario === id ? null : id);
  };

  const handleRemover = async (id) => {    
    try {
      await axios.delete(`/api/usuarios/${id}`);
      setModelos((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };
  
  const handleEdit = (id = null) => {
    if(id) return router.push(`/contratos/modelos/${id}`);
    return router.push(`/contratos/modelos/novo`);
  };

  return (
    <AppContainer>
      <h1>Lista de Modelos</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <SearchButton />
        <IconButton onClick={handleEdit}>
          <Add />
        </IconButton>
      </div>

      {modelos.map((m) => (
        <AppCard key={m.id} isExpanded={expandedUsuario === m.id}>
          <Header>
            <User>
              <h3>{m.title}</h3>
            </User>
            <div>
              <IconButton onClick={() => handleExpandir(m.id)}>
                <ExpandMore />
              </IconButton>
              <IconButton onClick={() => handleEdit(m.id)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleRemover(m.id)}>
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedUsuario === m.id}>
            <p><strong>Prologo:</strong> {m.prologue}</p>
            {m.clauses.map((c, i) => (
              <p key={i}><strong>Cláusula {i + 1}:</strong> {c}</p>
            ))}
            <p><strong>Parágrafo único:</strong> {m.paragraph}</p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
