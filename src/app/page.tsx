"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Um alívio para os{" "}
          <span className={styles.highlight}>Guia Turísticos</span>
        </h1>
        <p className={styles.subtitle}>
          Nunca foi tão simples gerir seus clientes e contratos.
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.registerButton}
            onClick={() => router.push(`/RegisterScreen`)}
          >
            Registrar
          </button>
          <button
            className={styles.loginButton}
            onClick={() => router.push(`/LoginScreen`)}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
