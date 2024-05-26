import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Usuario'));
        const usuariosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, 'Usuario', id));
      setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/usuarios/agregar">
        Agregar Usuario
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.direccion}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={`/usuarios/editar/${usuario.id}`}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleEliminarUsuario(usuario.id)}>
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

export default ListarUsuario;
