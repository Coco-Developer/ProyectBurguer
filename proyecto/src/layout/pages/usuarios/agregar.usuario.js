import React, { useState } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function AgregarUsuario() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleAgregarUsuario = async () => {
    try {
      await addDoc(collection(db, 'Usuario'), {
        nombre,
        direccion,
        telefono
      });
      // Limpiar los campos después de agregar el usuario
      setNombre('');
      setDireccion('');
      setTelefono('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agregar Usuario
      </Typography>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAgregarUsuario}>
        Agregar Usuario
      </Button>
      <Button variant="contained" component={Link} to="/usuarios/listar">
        Cancelar
      </Button>
    </Box>
  );
}

export default AgregarUsuario;

