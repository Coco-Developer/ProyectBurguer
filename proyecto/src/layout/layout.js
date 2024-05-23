import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, styled, Box, Form } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Estilo personalizado para el AppBar
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

// Personalizamos el estilo del menú desplegable
const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#34495e',
  },
  '& .MuiMenuItem-root': {
    color: '#ffffff',
  },
}));

// Estilo para el contenedor del fondo
const BackgroundContainer = styled(Box)({
  height: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#black',
});

function Layout({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledAppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/hamburguesas/listar" onClick={handleMenuClose}>Hamburguesas</MenuItem>
            <MenuItem component={Link} to="/usuarios/listar" onClick={handleMenuClose}>Usuarios</MenuItem>
            <MenuItem component={Link} to="/pedidos/listar" onClick={handleMenuClose}>Pedidos</MenuItem>
          </StyledMenu>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 700, textAlign: 'right' }}>
            PROYECTO BURGUER
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Box sx={{ flexGrow: 1, mt: 2, mb: 4 }}>
        {children}
      </Box>
      <Outlet />
    </div>
  );
}

export default Layout;

