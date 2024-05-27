import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Usuario'));
        const usuariosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        setOpenErrorSnackbar(true);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, 'Usuario', id));
      setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
      setOpenSuccessSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
        Lista de Usuarios
      </Typography>

      <TableContainer component={Paper} sx={{ border: '1px solid #000' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell align="center">{usuario.id}</TableCell>
                <TableCell align="center">{usuario.nombre}</TableCell>
                <TableCell align="center">{usuario.direccion}</TableCell>
                <TableCell align="center">{usuario.telefono}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/usuarios/editar/${usuario.id}`}
                      style={{ marginRight: 8 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEliminarUsuario(usuario.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Button variant="contained" color="primary" component={Link} to="/usuarios/agregar" style={{ marginRight: 20 }}>
          Agregar Usuario
        </Button>
      </Box>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Usuario eliminado correctamente
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Error al eliminar el usuario
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ListarUsuario;
