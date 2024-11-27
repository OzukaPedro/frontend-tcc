import React from "react";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="" alt="TransportHub Logo" className={styles.logoImage} />
        <span>TransportHub</span>
      </div>
      <ul className={styles.menu}>
        <li>
          <a href="#">Início</a>
        </li>
        <li>
          <a href="#">Cadastros</a>
        </li>
        <li>
          <a href="#">Contratos</a>
        </li>
        <li>
          <a href="#">Viagens</a>
        </li>
      </ul>
      <div className={styles.userIcon}>
        <img src="/user-icon.svg" alt="Usuário" />
      </div>
    </nav>
  );
};

export default Navbar;
