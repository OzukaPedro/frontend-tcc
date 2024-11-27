import React from "react";
import styles from "./RegisterScreen.module.css";

const RegisterScreen: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.box}>
          <h1 className={styles.registerTitle}>REGISTRO</h1>
          <div className={styles.inputText}>
            <p>Username</p>
            <input type="text" className={styles.inputs} />
          </div>
          <div className={styles.inputText}>
            <p>Email</p>
            <input type="email" className={styles.inputs} />
          </div>
          <div className={styles.inputText}>
            <p>Senha</p>
            <input type="password" className={styles.inputs} />
          </div>
          <div className={styles.inputText}>
            <p>Confirmar Senha</p>
            <input type="password" className={styles.inputs} />
          </div>
          <button className={styles.buttons}>Cadastrar</button>
          <div className={styles.inputText}>
            <p>
              Já possui uma conta?{" "}
              <a href="#" className={styles.link}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
