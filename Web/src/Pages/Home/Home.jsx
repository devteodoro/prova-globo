import React from "react";
import "./Home.css";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Home = () => {
  const handleMenuClick = (menuItem) => {
    console.log(`Você clicou em: ${menuItem}`);
  };

  return (
    <div>
      <div className="container">
        <h1>Bem-vindo à Tela Inicial</h1>
      </div>
    </div>
  );
};

export default Home;