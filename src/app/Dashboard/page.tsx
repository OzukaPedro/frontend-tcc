import React from "react";
import Navbar from "../../components/Navbar";
import styles from "./Dashboard.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        {/* Conteúdo principal pode ser adicionado aqui */}
      </div>
    </div>
  );
};

export default Home;
