import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Box, TextField } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function EditarUsuario() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const docRef = doc(db, 'Usuario', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre);
          setDireccion(data.direccion);
          setTelefono(data.telefono);
        } else {
          console.error('No existe el usuario con el ID especificado');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleActualizarUsuario = async () => {
    try {
      await updateDoc(doc(db, 'usuarios', id), {
        nombre,
        direccion,
        telefono
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Editar Usuario
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
      <Button variant="contained" color="primary" onClick={handleActualizarUsuario}>
        Actualizar Usuario
      </Button>
      <Button variant="contained" component={Link} to="/usuarios/listar">
        Cancelar
      </Button>
    </Box>
  );
}

export default EditarUsuario;
