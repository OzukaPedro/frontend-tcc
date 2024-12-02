'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, IconButton, TextField, Avatar } from '@mui/material';
import { ExpandMore, Delete, Print, Search, Add, Person, Business, Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AppContainer, AppCard } from "../../styles/global";
import SearchButton  from '../../components/SearchButton';

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

export default function UsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: 'Fulano de Tal',
      phone: '(11) 99999-9999',
      tipo: 'pf',
      cpf: '111.222.333-44',
      cep: '12345-678',
      rg: '123456789',
      cidade: 'São Paulo',
      uf: 'SP',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      complemento: 'Apto 101',
    },
    {
      id: 2,
      nome: 'Ciclano de Tal',
      phone: '(11) 99999-9999',
      tipo: 'pj',
      cpf: '222.333.444-55',
      cep: '54321-876',
      rg: '987654321',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      endereco: 'Avenida dos Anjos',
      numero: '456',
      bairro: 'Jardim',
      complemento: 'Casa 2',
    },
  ]);
  const [busca, setBusca] = useState('');
  const [expandedUsuario, setExpandedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async (query = '') => {
    try {
      const response = await axios.get(`/api/usuarios?busca=${query}`);
      setUsuarios(response.data);
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
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };
  
  const handleEdit = (id = null) => {
    if(id) return router.push(`/cadastros/${id}`);
    return router.push(`/cadastros/novo`);
  };

  return (
    <AppContainer>
      <h1>Lista de Usuários</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <SearchButton />
        <IconButton onClick={handleEdit}>
          <Add />
        </IconButton>
      </div>

      {usuarios.map((usuario) => (
        <AppCard key={usuario.id} isExpanded={expandedUsuario === usuario.id}>
          <Header>
            <User>
              <Avatar>
                {usuario.tipo === 'pf' ? <Person /> : <Business />}
              </Avatar>
              <h3>{usuario.nome}</h3>
            </User>
            <div>
              <IconButton onClick={() => handleExpandir(usuario.id)}>
                <ExpandMore />
              </IconButton>
              <IconButton onClick={() => handleEdit(usuario.id)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleRemover(usuario.id)}>
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedUsuario === usuario.id}>
            <p><strong>Tipo:</strong> {usuario.tipo}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            <p><strong>RG:</strong> {usuario.rg}</p>
            <p><strong>Celular:</strong> {usuario.phone}</p>
            <p><strong>CEP:</strong> {usuario.cep}</p>
            <p><strong>Endereço:</strong> {usuario.endereco}</p>
            <p><strong>Número:</strong> {usuario.numero}</p>
            <p><strong>Bairro:</strong> {usuario.bairro}</p>
            <p><strong>Cidade:</strong> {usuario.cidade}</p>
            <p><strong>UF:</strong> {usuario.uf}</p>
            <p><strong>Complemento:</strong> {usuario.complemento}</p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
