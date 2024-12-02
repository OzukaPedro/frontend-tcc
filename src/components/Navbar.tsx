'use client';

import React, { useState } from 'react';
import { Menu, MenuItem, Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const NavbarContainer = styled(AppBar)`
  background-color: #1d1d1d;
  position: sticky;
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

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const router = useRouter();

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

  return (
    <NavbarContainer>
      <Toolbar>
        <LogoContainer>
          <Typography variant="h6" color="inherit" onClick={() => router.push('/')}>
            Logo
          </Typography>
        </LogoContainer>
        
        <MenuContainer>
          <NavItem onClick={() => router.push('/')}>Início</NavItem>

          <NavItem onClick={(e) => handleMenuClick(e, 'cadastros')}>Cadastros</NavItem>
          <NavItem onClick={(e) => handleMenuClick(e, 'contratos')}>Contratos</NavItem>
          <NavItem onClick={(e) => handleMenuClick(e, 'viagens')}>Viagens</NavItem>
        </MenuContainer>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuType === 'cadastros' && (
            <>
              <MenuItem onClick={() => handleRedirect('/cadastros/novo')}>Novo Cadastro</MenuItem>
              <MenuItem onClick={() => handleRedirect('/cadastros')}>Lista de Cadastros</MenuItem>
            </>
          )}
          {menuType === 'contratos' && (
            <>
              <MenuItem onClick={() => handleRedirect('/contratos/novo')}>Novo Contrato</MenuItem>
              <MenuItem onClick={() => handleRedirect('/contratos')}>Lista de Contratos</MenuItem>
              <MenuItem onClick={() => handleRedirect('/contratos/modelos')}>Modelos</MenuItem>
            </>
          )}
          {menuType === 'viagens' && (
            <>
              <MenuItem onClick={() => handleRedirect('/viagens/novo')}>Nova Viagem</MenuItem>
              <MenuItem onClick={() => handleRedirect('/viagens')}>Lista de Viagens</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </NavbarContainer>
  );
}
