import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableRow, Paper, Button, Typography, TableContainer, Table, TableHead, Box } from '@mui/material';
import { listarUsuarios } from '../../../servicios/usuario.servicio';
import BorrarUsuario from './borrar.usuario'; // Asegúrate de que la importación sea correcta y coincida con la ubicación del archivo

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const usuariosData = await listarUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <div style={{ padding: '20px', width: '80%' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Lista de Usuarios</Typography>
        <TableContainer component={Paper} sx={{ border: '2px solid #000' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Dirección</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Teléfono</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{usuario.id}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{usuario.nombre}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{usuario.direccion}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{usuario.telefono}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                    <Button component={Link} to={`/usuarios/editar/${usuario.id}`} variant="contained" color="primary" style={{ width: '100px', textTransform: 'none', marginRight: '10px' }}>
                      Editar
                    </Button>
                    <BorrarUsuario id={usuario.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Button component={Link} to="/usuarios/agregar" variant="contained" color="primary">
            Agregar Usuario
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default ListarUsuarios;
