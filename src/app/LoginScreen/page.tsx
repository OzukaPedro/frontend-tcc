import React from "react";
import styles from "./LoginSreen.module.css";

const LoginScreen: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.box}>
          <h1 className={styles.registerTitle}>ENTRAR</h1>
          <div className={styles.inputText}>
            <p>Email</p>
            <input type="email" className={styles.inputs} />
          </div>
          <div className={styles.inputText}>
            <p>Senha</p>
            <input type="password" className={styles.inputs} />
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxBox}>
              <input type="checkbox" className={styles.checkboxBox} />
              <p>Lembrar</p>
            </div>
            <div>
              <p>
                Não possui uma conta?{" "}
                <a href="#" className={styles.link}>
                  Registro
                </a>
              </p>
            </div>
          </div>
          <button className={styles.buttons}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
