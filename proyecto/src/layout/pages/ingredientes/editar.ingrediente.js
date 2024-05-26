import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function EditarIngrediente() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngrediente = async () => {
      const docRef = doc(db, 'Ingredientes', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre);
        setPrecio(data.precio);
      } else {
        console.log('No such document!');
      }
    };

    fetchIngrediente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'Ingredientes', id);
      await updateDoc(docRef, {
        nombre,
        precio: parseFloat(precio)
      });
      navigate('/ingredientes/listar');
    } catch (error) {
      console.error('Error actualizando el ingrediente:', error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Editar Ingrediente</Typography>
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
          Actualizar
        </Button>
      </Box>
    </Box>
  );
}

export default EditarIngrediente;
