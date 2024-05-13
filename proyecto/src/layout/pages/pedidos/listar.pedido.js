import React, { useState, useEffect } from 'react';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { listarPedidos } from '../../../servicios/pedido.servicio';

function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosData = await listarPedidos();
        setPedidos(pedidosData);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error.message);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Lista de Pedidos</Typography>
      <Paper style={{ margin: '0 auto', maxWidth: '80%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>ID Usuario</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>ID Hamburguesa</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Fecha del Pedido</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell style={{ textAlign: 'center' }}>{pedido.id}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{pedido.usuarioId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{pedido.hamburguesaId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{pedido.fechaPedido}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{pedido.cantidad}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button component={Link} to={`/pedidos/eliminar/${pedido.id}`} variant="contained" color="error" style={{ marginRight: '10px' }}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button component={Link} to="/pedidos/agregar" variant="contained" color="primary">
          Agregar Pedido
        </Button>
      </div>
    </div>
  );
}

export default ListarPedidos;
