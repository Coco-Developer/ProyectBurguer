import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function AgregarUsuario() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleAgregarUsuario = async () => {
    try {
      if (!nombre || !direccion || !telefono) {
        throw new Error('Por favor, complete todos los campos.');
      }
      await addDoc(collection(db, 'Usuario'), {
        nombre,
        direccion,
        telefono
      });
      setOpenSuccessSnackbar(true);
      // Limpiar los campos después de agregar el usuario
      setNombre('');
      setDireccion('');
      setTelefono('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAgregarUsuario();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="65vh">
      <Box
        component="form"
        onKeyPress={handleKeyPress}
        sx={{ padding: '20px', width: '50%', textAlign: 'center', bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Agregar Usuario
        </Typography>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#3f51b5' } }}
        />
        <TextField
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#3f51b5' } }}
        />
        <TextField
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#3f51b5' } }}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleAgregarUsuario} style={{ marginRight: 8 }}>
            Agregar Usuario
          </Button>
          <Button variant="contained" component={Link} to="/usuarios/listar" color="secondary">
            Volver a lista de Usuarios
          </Button>
        </Box>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Usuario agregado correctamente
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            Error al agregar el usuario
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AgregarUsuario;
