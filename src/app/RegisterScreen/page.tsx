"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import api from "../../utils/api"; // Certifique-se de ter a API configurada corretamente

const RegisterContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f4f8;
`;

const FormContainer = styled("div")`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled("h2")`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/api/auth/local/register", {
        username: name,
        email: email,
        password: password,
      });

      const token = response.data.jwt;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Registro realizado com sucesso!");
        router.push("/dashboard"); // Redireciona para o dashboard após registro
      }
    } catch (error) {
      alert("Erro ao registrar usuário.");
    }
  };

  return (
    <RegisterContainer>
      <FormContainer>
        <Title>Criar Conta</Title>
        <TextField
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          style={{ marginTop: "20px" }}
        >
          Registrar
        </Button>
      </FormContainer>
    </RegisterContainer>
  );
};

export default RegisterScreen;
