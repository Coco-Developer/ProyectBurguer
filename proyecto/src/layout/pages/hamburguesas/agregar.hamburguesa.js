import React, { useState } from 'react';
import { Button, TextField, Snackbar, Box } from '@mui/material';
import { agregarHamburguesa } from '../../../servicios/hamburguesa.servicio';

function AgregarHamburguesa() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangePrecio = (event) => {
    // Validar que el valor ingresado sea un número
    const inputPrice = event.target.value;
    if (!isNaN(inputPrice)) {
      setPrecio(inputPrice);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validar que se haya ingresado un nombre y un precio
      if (nombre && precio) {
        await agregarHamburguesa({ nombre, precio });
        setMensaje('Hamburguesa agregada correctamente');
        setOpenSnackbar(true);
        // Limpiar los campos después de agregar la hamburguesa
        setNombre('');
        setPrecio('');
      } else {
        setMensaje('Por favor ingresa el nombre y el precio de la hamburguesa');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error al agregar la hamburguesa:', error.message);
      setMensaje('Error al agregar la hamburguesa');
      setOpenSnackbar(true);
    }
  };

  const handleKeyPress = (event) => {
    // Verificar si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>Agregar Hamburguesa</h2>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={handleChangeNombre}
          onKeyPress={handleKeyPress}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          value={precio}
          onChange={handleChangePrecio}
          onKeyPress={handleKeyPress}
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

export default AgregarHamburguesa;
