"use client";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import { Button, IconButton, TextField } from "@mui/material";
import { ExpandMore, Delete, Edit, Print, Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { AppContainer, AppCard } from "../../styles/global";
import SearchButton from "../../components/SearchButton";

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
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
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
  const [viagens, setViagens] = useState([]);
  const [busca, setBusca] = useState("");
  const [expandedViagem, setExpandedViagem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginScreen"); // Se já estiver logado, redireciona para o Dashboard
    }
  }, [router]);

  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = async (query = "") => {
    try {
      let query = "";
      if (busca) {
        query = `?busca=${busca}`;
      }
      const response = await api.get(`/api/viagens${query}`);
      setViagens(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    }
  };

  const handleBusca = () => fetchViagens(busca);

  const handleExpandir = (id) => {
    setExpandedViagem(expandedViagem === id ? null : id);
  };

  const handleRemover = async (id) => {
    try {
      await api.delete(`/api/viagens/${id}`);
      setViagens((prev) => prev.filter((viagem) => viagem.id !== id));
    } catch (error) {
      console.error("Erro ao remover viagem:", error);
    }
  };

  const handleEdit = (id = null) => {
    if (id) return router.push(`/viagens/${id}`);
    return router.push(`/viagens/novo`);
  };

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
              <IconButton
                color="error"
                onClick={() => handleRemover(viagem.id)}
              >
                <Delete />
              </IconButton>
            </div>
          </Header>
          <ExpandableContent isExpanded={expandedViagem === viagem.id}>
            <p>
              <strong>Cidade de Origem:</strong> {viagem.cidadeOrigem}
            </p>
            <p>
              <strong>UF de Origem:</strong> {viagem.ufOrigem}
            </p>
            <p>
              <strong>Cidade de Destino:</strong> {viagem.cidadeDestino}
            </p>
            <p>
              <strong>UF de Destino:</strong> {viagem.ufDestino}
            </p>
            <p>
              <strong>Valor total:</strong> {viagem.valor}
            </p>
          </ExpandableContent>
        </AppCard>
      ))}
    </AppContainer>
  );
}
