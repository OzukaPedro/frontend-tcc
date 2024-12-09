"use client";

import React from "react";
import styles from "./page.module.css"; // Importe o arquivo CSS conforme necessário
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bem-vindo, Guias Turísticos!</h1>
        <p className={styles.subtitle}>Sua jornada começa aqui</p>
      </div>

      <div className={styles.actionContainer}>
        <button
          className={styles.button}
          onClick={() => router.push("/RegisterScreen")}
        >
          Cadastrar
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/LoginScreen")}
        >
          Entrar
        </button>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 Guias Turísticos. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
