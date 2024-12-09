"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditUserPage = () => {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userId = 1; // Aqui você pode pegar o id do usuário de alguma forma (ex: da URL ou de um estado global)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginScreen"); // Se já estiver logado, redireciona para o Dashboard
    }
  }, [router]);
  useEffect(() => {
    // Carregar os dados do usuário no carregamento da página
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/usuarios/${userId}`);
        setUserData((prevData) => ({
          ...prevData,
          nome: response.data.nome,
          email: response.data.email,
        }));
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (userData.novaSenha !== userData.confirmarNovaSenha) {
      alert("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`/api/usuarios/${userId}`, {
        ...userData,
        senhaAtual: userData.senhaAtual,
        novaSenha: userData.novaSenha,
      });
      router.push("/perfil"); // Redireciona após a edição
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Editar Dados do Usuário
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={userData.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="E-mail"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Senha Atual"
          type="password"
          name="senhaAtual"
          value={userData.senhaAtual}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nova Senha"
          type="password"
          name="novaSenha"
          value={userData.novaSenha}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Nova Senha"
          type="password"
          name="confirmarNovaSenha"
          value={userData.confirmarNovaSenha}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditUserPage;
