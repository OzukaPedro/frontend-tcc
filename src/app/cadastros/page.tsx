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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginScreen"); // Se já estiver logado, redireciona para o Dashboard
    }
  }, [router]);
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async (query = "") => {
    try {
      const responsePf = await api.get(
        `/api/cadastros?userId${localStorage.getItem("userId")}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUsuarios([...responsePf.data.data]); // Combina os resultados
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
      await api.delete(`/api/cadastros/${id}`);
      await api.delete(`/api/cadastros/${id - 1}`);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  };

  const handleEdit = (id = null) => {
    console.log(id);
    const route = id ? `/cadastros/${id - 1}` : "/cadastros/novo";
    router.push(route);
  };

  return (
    <AppContainer>
      <h1>Lista de Cadastros</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
        <SearchButton />
        <IconButton onClick={() => handleEdit()}>
          <Add />
        </IconButton>
      </div>

      {usuarios.map((usuario) => (
        <AppCard key={usuario.id} isExpanded={expandedUsuario === usuario.id}>
          <Header>
            <User>
              <Avatar>
                {usuario.tipo === "PF" ? <Person /> : <Business />}
              </Avatar>
              <h3>
                {usuario.tipo === "PF" ? usuario.nome : usuario.razaoSocial}
              </h3>
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
              <strong>Tipo:</strong>{" "}
              {usuario.tipo === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
            </p>

            {/* Campos específicos para PF */}
            {usuario.tipo === "PF" && (
              <>
                <p>
                  <strong>CPF:</strong> {usuario.cpf}
                </p>
                <p>
                  <strong>RG:</strong> {usuario.rg}
                </p>
              </>
            )}

            {/* Campos específicos para PJ */}
            {usuario.tipo === "PJ" && (
              <>
                <p>
                  <strong>Razão Social:</strong> {usuario.razaoSocial}
                </p>
                <p>
                  <strong>CNPJ:</strong> {usuario.cnpj}
                </p>
                <p>
                  <strong>Inscrição Estadual:</strong>{" "}
                  {usuario.inscricaoEstadual}
                </p>
              </>
            )}

            {/* Campos comuns para ambos PF e PJ */}
            <p>
              <strong>CEP:</strong> {usuario.cep}
            </p>
            <p>
              <strong>Endereço:</strong> {usuario.logradouro}
            </p>
            <p>
              <strong>Número:</strong> {usuario.numero}
            </p>
            <p>
              <strong>Bairro:</strong> {usuario.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {usuario.cidade}
            </p>
            <p>
              <strong>UF:</strong> {usuario.uf}
            </p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
