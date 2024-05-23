import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { listarPedidos, eliminarPedido } from '../../../servicios/pedido.servicio';

function ListarPedido() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    listarPedidos()
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al listar los pedidos:', error));
  }, []);

  const handleEliminar = async (id) => {
    try {
      await eliminarPedido(id);
      setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
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
              <TableCell>Nombre Usuario</TableCell>
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
                <TableCell>{new Date(pedido.fecha).toLocaleDateString()}</TableCell>
                <TableCell>
                  {pedido.hamburguesas.map((hamburguesa, index) => (
                    <div key={index}>
                      {hamburguesa.nombre} - {hamburguesa.cantidad}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{pedido.hamburguesas.reduce((acc, curr) => acc + curr.precio * curr.cantidad, 0)}</TableCell>
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
