"use client";

import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const NavbarContainer = styled(AppBar)`
  background-color: #1d1d1d;
  position: absolute;
`;

const LogoContainer = styled(Box)`
  flex: 0;
`;

const MenuContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex: 2;
`;

const NavItem = styled(Button)`
  color: white;
  text-transform: none;
  font-weight: bold;
  margin: 0 1rem;
`;

const UserContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Checa se o token está no localStorage (ou outro método de verificação)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Define se o usuário está autenticado ou não
  }, []);

  const handleMenuClick = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const handleRedirect = (path) => {
    router.push(path);
    handleClose();
  };
  const handleLogout = () => {
    router.push("/");
    localStorage.clear();
    handleClose();
  };

  const handleProfileRedirect = () => {
    router.push("/perfil"); // Redireciona para a página de perfil
  };

  return (
    <NavbarContainer>
      <Toolbar>
        <LogoContainer>
          <Typography
            variant="h6"
            color="inherit"
            onClick={() => router.push("/dashboard")}
          >
            TransportHub
          </Typography>
        </LogoContainer>

        <MenuContainer>
          <NavItem onClick={() => router.push("/dashboard")}>Início</NavItem>
          <NavItem onClick={(e) => handleMenuClick(e, "cadastros")}>
            Cadastros
          </NavItem>
          <NavItem onClick={(e) => handleMenuClick(e, "contratos")}>
            Contratos
          </NavItem>
          <NavItem onClick={(e) => handleMenuClick(e, "viagens")}>
            Viagens
          </NavItem>
        </MenuContainer>

        <UserContainer>
          {isAuthenticated ? (
            // Exibir o ícone de usuário se estiver autenticado
            <div>
              <button>Ícone de Usuário</button>
              <Button onClick={handleLogout} color="secondary">
                Sair
              </Button>
            </div>
          ) : (
            // Exibir os botões "Registrar" e "Entrar" se não estiver autenticado
            <div>
              <NavItem onClick={() => router.push("/RegisterScreen")}>
                Registrar
              </NavItem>
              <NavItem onClick={() => router.push("/LoginScreen")}>
                Entrar
              </NavItem>
            </div>
          )}
        </UserContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuType === "cadastros" && (
            <>
              <MenuItem onClick={() => handleRedirect("/cadastros/novo")}>
                Novo Cadastro
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/cadastros")}>
                Lista de Cadastros
              </MenuItem>
            </>
          )}
          {menuType === "contratos" && (
            <>
              <MenuItem onClick={() => handleRedirect("/contratos/novo")}>
                Novo Contrato
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/contratos")}>
                Lista de Contratos
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/contratos/modelos")}>
                Modelos
              </MenuItem>
            </>
          )}
          {menuType === "viagens" && (
            <>
              <MenuItem onClick={() => handleRedirect("/viagens/novo")}>
                Nova Viagem
              </MenuItem>
              <MenuItem onClick={() => handleRedirect("/viagens")}>
                Lista de Viagens
              </MenuItem>
            </>
          )}
          {menuType === "perfil" && (
            <>
              <MenuItem onClick={handleProfileRedirect}>Meu Perfil</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Sair</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </NavbarContainer>
  );
}
