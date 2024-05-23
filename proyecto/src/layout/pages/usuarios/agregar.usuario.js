import React, { useState } from 'react';
import { Button, TextField, Snackbar, Box, Typography } from '@mui/material';
import { agregarUsuario } from '../../../servicios/usuario.servicio';

function AgregarUsuario() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const handleChangeTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (nombre && direccion && telefono) {
        await agregarUsuario({ nombre, direccion, telefono });
        setMensaje('Usuario agregado correctamente');
        setOpenSnackbar(true);
        setNombre('');
        setDireccion('');
        setTelefono('');
      } else {
        setMensaje('Por favor ingresa el nombre, dirección y teléfono del usuario');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error al agregar el usuario:', error.message);
      setMensaje('Error al agregar el usuario');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Agregar Usuario
        </Typography>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={handleChangeNombre}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          value={direccion}
          onChange={handleChangeDireccion}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono"
          value={telefono}
          onChange={handleChangeTelefono}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={mensaje}
        />
      </Box>
    </Box>
  );
}

export default AgregarUsuario;
