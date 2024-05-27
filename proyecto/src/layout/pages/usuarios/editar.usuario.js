import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, TextField, Snackbar, Alert } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function EditarUsuario() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const navigate = useNavigate();

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
          setOpenErrorSnackbar(true);
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        setOpenErrorSnackbar(true);
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleActualizarUsuario = async () => {
    try {
      await updateDoc(doc(db, 'Usuario', id), {
        nombre,
        direccion,
        telefono
      });
      setOpenSuccessSnackbar(true);
      setTimeout(() => {
        navigate('/usuarios/listar');
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleActualizarUsuario();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box 
        component="form" 
        sx={{ width: '50%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        onKeyPress={handleKeyPress}
      >
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
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
          <Button variant="contained" color="primary" onClick={handleActualizarUsuario} fullWidth sx={{ mr: 1 }}>
            Actualizar Usuario
          </Button>
          <Button variant="contained" component={Link} to="/usuarios/listar" color="secondary" fullWidth sx={{ ml: 1 }}>
            Cancelar
          </Button>
        </Box>
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Usuario actualizado correctamente
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            Error al actualizar el usuario
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default EditarUsuario;
       