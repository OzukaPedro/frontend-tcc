"use client";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import { Button, IconButton, TextField, Avatar } from "@mui/material";
import {
  ExpandMore,
  Delete,
  Print,
  Search,
  Add,
  Person,
  Business,
  Edit,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { AppContainer, AppCard } from "../../styles/global";
import SearchButton from "../../components/SearchButton";

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

const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  ${({ isExpanded }) => isExpanded && `padding: 15px;`};
`;

export default function UsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [expandedUsuario, setExpandedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async (query = "") => {
    try {
      const responsePf = await api.get(
        `/api/cadastro-pessoa-fisicas?busca=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responsePj = await api.get(
        `/api/cadastro-pessoa-juridicas?busca=${query}`
      );

      setUsuarios([...responsePf.data.data, ...responsePj.data.data]); // Combina os resultados
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };
  const handleBusca = () => fetchUsuarios(busca);

  const handleExpandir = (id) => {
    setExpandedUsuario(expandedUsuario === id ? null : id);
  };

  const handleRemover = async (id) => {
    try {
      await api.delete(`/api/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  };

  const handleEdit = (id = null) => {
    const route = id ? `/cadastros/${id}` : "/cadastros/novo";
    router.push(route);
  };

  return (
    <AppContainer>
      <h1>Lista de Usuários</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
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
                {usuario.cadastro?.tipo === "PF" ? <Person /> : <Business />}
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
              <IconButton
                color="error"
                onClick={() => handleRemover(usuario.id)}
              >
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedUsuario === usuario.id}>
            <p>
              <strong>Tipo:</strong> {usuario.cadastro.tipo}
            </p>
            <p>
              <strong>CPF:</strong> {usuario.cpf}
            </p>
            <p>
              <strong>RG:</strong> {usuario.rg}
            </p>
            <p>
              <strong>CEP:</strong> {usuario.cadastro.cep}
            </p>
            <p>
              <strong>Endereço:</strong> {usuario.cadastro.logradouro}
            </p>
            <p>
              <strong>Número:</strong> {usuario.cadastro.numero}
            </p>
            <p>
              <strong>Bairro:</strong> {usuario.cadastro.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {usuario.cadastro.cidade}
            </p>
            <p>
              <strong>UF:</strong> {usuario.cadastro.uf}
            </p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
