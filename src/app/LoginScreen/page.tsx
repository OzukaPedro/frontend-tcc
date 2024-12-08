"use client";

import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import Api from "../../utils/api";
import { useRouter } from "next/navigation";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Inicializa como string vazia
  const [senha, setSenha] = useState(""); // Inicializa como string vazia

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await Api.post("/api/auth/local", {
        identifier: email,
        password: senha,
      });

      const token = response.data.jwt;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Login realizado com sucesso!");
        console.log(token);
        router.push("/dashboard"); // Redireciona para a home page
      }
    } catch (error) {
      alert("Email ou senha incorretos");
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.box}>
          <h1 className={styles.registerTitle}>ENTRAR</h1>

          {/* Campo de Email */}
          <div className={styles.inputText}>
            <p>Email</p>
            <input
              type="email"
              className={styles.inputs}
              value={email} // Controlado pelo estado
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
            />
          </div>

          {/* Campo de Senha */}
          <div className={styles.inputText}>
            <p>Senha</p>
            <input
              type="password"
              className={styles.inputs}
              value={senha} // Controlado pelo estado
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
            />
          </div>

          {/* Botão de Login */}

          <button className={styles.buttons} onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
