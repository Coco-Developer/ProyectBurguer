import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableRow, Paper, Button, Typography, TableContainer, Table, TableHead, Box, Snackbar, Alert } from '@mui/material';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

function ListarIngredientes() {
  const [ingredientes, setIngredientes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const obtenerIngredientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Ingredientes'));
        const ingredientesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setIngredientes(ingredientesData);
      } catch (error) {
        console.error('Error al obtener los ingredientes:', error.message);
      }
    };

    obtenerIngredientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Ingredientes', id));
      setIngredientes(ingredientes.filter(ingrediente => ingrediente.id !== id));
      setSnackbarSeverity('success');
      setSnackbarMessage('Ingrediente eliminado correctamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar el ingrediente:', error.message);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al eliminar el ingrediente');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <div style={{ padding: '20px', width: '80%' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Lista de Ingredientes</Typography>
        <TableContainer component={Paper} sx={{ border: '2px solid #000' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Precio</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientes.map((ingrediente) => (
                <TableRow key={ingrediente.id}>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center', fontSize: '0.66rem' }}>{ingrediente.id}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{ingrediente.nombre}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{ingrediente.precio}$</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                    <Button component={Link} to={`/ingredientes/editar/${ingrediente.id}`} variant="contained" color="primary" style={{ width: '100px', textTransform: 'none', marginRight: '10px' }}>
                      Editar
                    </Button>
                    <Button variant="contained" color="secondary" style={{ width: '100px', textTransform: 'none' }} onClick={() => handleDelete(ingrediente.id)}>
                      Borrar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Button component={Link} to="/ingredientes/agregar" variant="contained" color="primary">
            Agregar Ingrediente
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
}

export default ListarIngredientes;
