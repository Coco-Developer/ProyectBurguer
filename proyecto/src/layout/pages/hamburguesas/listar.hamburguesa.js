import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableRow, Paper, Button, Typography, TableContainer, Table, TableHead, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';

function ListarHamburguesa() {
  const [hamburguesas, setHamburguesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const obtenerHamburguesas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Hamburguesa'));
        const hamburguesasData = await Promise.all(
          querySnapshot.docs.map(async (hamburguesaDoc) => {
            const hamburguesaData = hamburguesaDoc.data();
            const ingredientesData = await Promise.all(
              (hamburguesaData.ingredientes || []).map(async (ingredienteRef) => {
                const ingredienteDoc = await getDoc(ingredienteRef);
                return ingredienteDoc.exists() ? ingredienteDoc.data() : null;
              })
            );
            return {
              id: hamburguesaDoc.id,
              ...hamburguesaData,
              ingredientes: ingredientesData.filter(ingrediente => ingrediente !== null),
            };
          })
        );
        setHamburguesas(hamburguesasData);
      } catch (error) {
        console.error('Error al obtener las hamburguesas:', error.message);
        setError('Error al cargar las hamburguesas');
      } finally {
        setLoading(false);
      }
    };

    obtenerHamburguesas();
  }, []);

  const calcularPrecioTotal = (hamburguesa) => {
    const precioHamburguesa = parseFloat(hamburguesa.precio) || 0;
    const precioIngredientes = (hamburguesa.ingredientes || []).reduce((total, ingrediente) => {
      const precioIngrediente = parseFloat(ingrediente.precio) || 0;
      return total + precioIngrediente;
    }, 0);
    return precioHamburguesa + precioIngredientes;
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Hamburguesa', id));
      setHamburguesas(hamburguesas.filter(hamburguesa => hamburguesa.id !== id));
      setSnackbarMessage('Hamburguesa eliminada correctamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar la hamburguesa:', error.message);
      setSnackbarMessage('Error al eliminar la hamburguesa');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      {loading && <CircularProgress />}
      {!loading && error && <Typography color="error">Error al cargar las hamburguesas: {error}</Typography>}
      {!loading && !error && (
        <div style={{ padding: '20px', width: '80%' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            Lista de Hamburguesas
          </Typography>
          <TableContainer component={Paper} sx={{ border: '2px solid #000' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '2%' }}>ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '20%' }}>Nombre</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '10%' }}>Precio</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '38%' }}>Ingredientes</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '15%' }}>Precio Total</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center', width: '15%' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hamburguesas.length > 0 ? (
                  hamburguesas.map((hamburguesa) => (
                    <TableRow key={hamburguesa.id}>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center', fontSize: '0.33rem' }}>{hamburguesa.id}</TableCell>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{hamburguesa.nombre}</TableCell>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{hamburguesa.precio || 'N/A'} $</TableCell>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {(hamburguesa.ingredientes || []).map((ingrediente, index) => (
                            <li key={index}>
                              {ingrediente.nombre} - {ingrediente.precio || 'N/A'} $
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center', fontStyle: 'oblique', fontWeight: 'bold' }}>{calcularPrecioTotal(hamburguesa).toFixed(2)} $</TableCell>
                      <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                        <Button
                          component={Link}
                          to={`/hamburguesas/editar/${hamburguesa.id}`}
                          variant="contained"
                          color="primary"
                          style={{ margin: '2px' }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ margin: '2px' }}
                          onClick={() => handleDelete(hamburguesa.id)}
                        >
                          Borrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: 'center' }}>No hay hamburguesas disponibles</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center">
            <Button component={Link} to="/hamburguesas/agregar" variant="contained" color="primary">
              Agregar Hamburguesa
            </Button>
          </Box>
        </div>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ListarHamburguesa;
