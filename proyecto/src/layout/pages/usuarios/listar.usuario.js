import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableRow, Paper, Button, Typography, TableContainer, Table, TableHead, Box } from '@mui/material';
import { obtenerUsuarios } from '../../../servicios/usuario.servicio';
import BorrarUsuario from './borrar.usuario';

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuariosData = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
      }
    };

    obtenerUsuariosData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <div style={{ padding: '20px', width: '80%' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Lista de Usuarios</Typography>
        <TableContainer component={Paper}>
          <Table style={{ border: '2px solid black' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center' }}>Apellido</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center' }}>Edad</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '2px solid black', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>{usuario.id}</TableCell>
                  <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>{usuario.nombre}</TableCell>
                  <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>{usuario.apellido}</TableCell>
                  <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>{usuario.edad}</TableCell>
                  <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>
                    <Button>
                      <BorrarUsuario />
                    </Button>
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

export default ListarUsuario;

