import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { BrowserRouter as useLocation } from 'react-router';

const Menu = () => {
    const location = useLocation();

    if (location.pathname === '/login')
        return null; 
    
  return (
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Prova Web
          </Typography>
          <Button color="inherit">
            Usuários
          </Button>
          <Button color="inherit">
            Filmes
          </Button>
          <Button color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default Menu;