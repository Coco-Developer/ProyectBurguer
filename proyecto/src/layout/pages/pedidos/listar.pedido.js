import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function ListarPedido() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Pedidos'));
        const pedidosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPedidos(pedidosData);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error.message);
      }
    };

    obtenerPedidos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'Pedidos', id));
      setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
    } catch (error) {
      console.error('Error al eliminar el pedido:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Pedidos
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/pedidos/agregar">
        Agregar Pedido
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pedido</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hamburguesas</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{pedido.usuario.nombre}</TableCell>
                <TableCell>{pedido.direccion}</TableCell>
                <TableCell>{pedido.fecha.toDate().toLocaleDateString()}</TableCell> {/* Corrige el acceso a la fecha */}
                <TableCell>
                  <ul>
                    {pedido.hamburguesas.map((hamburguesa, index) => (
                      <li key={index}>{hamburguesa.nombre} - Cantidad: {hamburguesa.cantidad}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  ${pedido.hamburguesas.reduce((total, hamburguesa) => total + (hamburguesa.precio * hamburguesa.cantidad), 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={`/pedidos/editar/${pedido.id}`}>
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
    </Box>
  );
}

export default ListarPedido;
