import React, { useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function AgregarIngrediente() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Ingredientes'), {
        nombre,
        precio: parseFloat(precio)
      });
      navigate('/ingredientes/listar');
    } catch (error) {
      console.error('Error añadiendo el ingrediente:', error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center' }}>
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
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Agregar
        </Button>
      </Box>
    </Box>
  );
}

export default AgregarIngrediente;
