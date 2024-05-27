import React, { useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

function AgregarIngrediente() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Ingredientes'), {
        nombre,
        precio: parseFloat(precio)
      });
      setSnackbarSeverity('success');
      setSnackbarMessage('Ingrediente agregado correctamente');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/ingredientes/listar');
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error('Error añadiendo el ingrediente:', error.message);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al agregar el ingrediente');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="65vh">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center', bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}>
        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Agregar Ingrediente</Typography>
        <TextField
          label="Nombre"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Precio"
          fullWidth
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', marginRight: '10px' }}>
          Agregar
        </Button>
        <Button component={Link} to="/ingredientes/listar" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Volver a Lista de Ingredientes
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AgregarIngrediente;
