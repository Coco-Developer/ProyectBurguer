import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, styled, Box, Container, Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiMenuItem-root': {
    color: theme.palette.common.white,
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 700,
  textAlign: 'center',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    flexGrow: 0,
  },
}));

const Footer = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

function Layout({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledAppBar position="static">
        <Container>
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
              <MenuItem component={Link} to="/ingredientes/listar" onClick={handleMenuClose}>Ingredientes</MenuItem>
              <MenuItem component={Link} to="/usuarios/listar" onClick={handleMenuClose}>Usuarios</MenuItem>
              <MenuItem component={Link} to="/pedidos/listar" onClick={handleMenuClose}>Pedidos</MenuItem>
            </StyledMenu>
            <Logo component={Link} to="/" variant="h6">
              PROYECTO BURGUER
            </Logo>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Container sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Footer variant="body2">
        LAZARO JOAQUIN 29009 - PROGRAMACION WEB II
      </Footer>
    </Box>
  );
}

export default Layout;
