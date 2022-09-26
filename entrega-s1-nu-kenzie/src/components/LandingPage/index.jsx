import "./style.css";
import logo from "../../assets/NuKenzie.svg";
import ilustration from "../../assets/illustration.svg";
import { useState } from "react";

const LandingPage = ({ setRendle }) => {
  const rendlePage = () => {
    setRendle(true);
  };

  return (
    <main className="landingPage">
      <div className="container">
        <div>
          <img src={logo} alt="Logo Nu Kenzie" />
          <h1>Centralize o controle das suas finanças</h1>
          <p>de forma rápida e segura</p>
          <button className="btn-primary" onClick={rendlePage}>
            Iniciar
          </button>
        </div>
        <div>
          <img src={ilustration} alt="Ilustração" />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
