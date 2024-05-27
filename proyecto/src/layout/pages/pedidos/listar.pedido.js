import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function ListarPedido() {
  const [pedidos, setPedidos] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Pedidos'));
        const pedidosData = [];
        for (const docRef of querySnapshot.docs) {
          const pedido = { id: docRef.id, ...docRef.data() };
          // Obtener el documento completo del usuario
          const usuarioDoc = await getDoc(doc(db, 'Usuario', pedido.usuario));
          const usuarioData = usuarioDoc.data();
          // Reemplazar el ID del usuario con el documento completo del usuario
          pedido.usuario = usuarioData;
          pedidosData.push(pedido);
        }
        setPedidos(pedidosData);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error.message);
        setOpenErrorSnackbar(true);
      }
    };

    obtenerPedidos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'Pedidos', id));
      setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
      setOpenSuccessSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar el pedido:', error.message);
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
        Lista de Pedidos
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/pedidos/agregar" sx={{ marginBottom: 2 }}>
        Agregar Pedido
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: isMobile ? 400 : 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Usuario</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Dirección</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Hamburguesas</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell sx={{ fontSize: isMobile ? 6 : 8 }}>{pedido.id}</TableCell>
                <TableCell sx={{ fontSize: isMobile ? 10 : 12 }}>{pedido.usuario.nombre}</TableCell>
                <TableCell sx={{ fontSize: isMobile ? 10 : 12 }}>{pedido.direccion}</TableCell>
                <TableCell sx={{ fontSize: isMobile ? 10 : 12 }}>{pedido.fecha.toDate().toLocaleDateString()}</TableCell> 
                <TableCell>
                  <ul style={{ margin: 0, paddingInlineStart: '10px' }}>
                    {pedido.hamburguesas.map((hamburguesa, id) => (
                      <li key={id}>{hamburguesa.nombre} - Cant: {hamburguesa.cantidad}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell sx={{ fontSize: isMobile ? 10 : 12 }}>
                  ${pedido.hamburguesas.reduce((total, hamburguesa) => total + (hamburguesa.precio * hamburguesa.cantidad), 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={`/pedidos/editar/${pedido.id}`} sx={{ marginRight: 1 }}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleEliminar(pedido.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Button component={Link} to="lista/hamburguesas" variant="contained" color="secondary">
          Volver a la Lista de Hamburguesas
        </Button>
      </Box>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Pedido eliminado correctamente"
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Error al realizar la operación"
      />
    </Box>
  );
}

export default ListarPedido;
