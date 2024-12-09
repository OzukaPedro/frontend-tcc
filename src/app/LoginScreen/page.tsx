"use client";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";

const LoginContainer = styled("div")`
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

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Verifica se o token está presente no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard"); // Se já estiver logado, redireciona para o Dashboard
    }
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post("/api/auth/local", {
        identifier: email,
        password: password,
      });
      const userId = response.data.user.id;
      const token = response.data.jwt;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        console.log("Login realizado com sucesso!");
        router.push("/dashboard");
      }
    } catch (error) {
      alert("Email ou senha incorretos");
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Title>Entrar</Title>
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: "20px" }}
        >
          Entrar
        </Button>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginScreen;
