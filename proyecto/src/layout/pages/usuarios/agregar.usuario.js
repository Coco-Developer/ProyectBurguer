import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import { agregarUsuario } from '../../../servicios/usuario.servicio';

function AgregarUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    edad: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await agregarUsuario(usuario);
      setMensaje('Usuario agregado correctamente');
      setOpenSnackbar(true);
      // Restablecer los campos del formulario a su estado inicial
      setUsuario({
        nombre: '',
        apellido: '',
        edad: '',
      });
    } catch (error) {
      console.error('Error al agregar usuario:', error.message);
      setMensaje('Error al agregar usuario');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <div style={{ width: '50%' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Agregar Usuario</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            value={usuario.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="apellido"
            label="Apellido"
            value={usuario.apellido}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="edad"
            label="Edad"
            type="number"
            value={usuario.edad}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={mensaje}
        />
      </div>
    </Box>
  );
}

export default AgregarUsuario;

