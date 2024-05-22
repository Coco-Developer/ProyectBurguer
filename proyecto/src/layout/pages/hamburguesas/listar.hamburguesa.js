import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableBody, TableCell, TableRow, Paper, Button, Typography, TableContainer, Table, TableHead, Box } from '@mui/material';
import { listarHamburguesas } from '../../../servicios/hamburguesa.servicio';
import BorrarHamburguesa from './borrar.hamburguesa';

function ListarHamburguesa() {
  const [hamburguesas, setHamburguesas] = useState([]);

  useEffect(() => {
    const obtenerHamburguesas = async () => {
      try {
        const hamburguesasData = await listarHamburguesas();
        setHamburguesas(hamburguesasData);
      } catch (error) {
        console.error('Error al obtener las hamburguesas:', error.message);
      }
    };

    obtenerHamburguesas();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <div style={{ padding: '20px', width: '80%' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Lista de Hamburguesas</Typography>
        <TableContainer component={Paper} sx={{ border: '2px solid #000' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Precio</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Ingredientes</TableCell>
                <TableCell style={{ fontWeight: 'bold', border: '1px solid #000', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hamburguesas.map((hamburguesa) => (
                <TableRow key={hamburguesa.idHamburguesa}>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{hamburguesa.idHamburguesa}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{hamburguesa.nombre}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>{hamburguesa.precio}</TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                    <ul>
                      {hamburguesa.ingredientes.map((ingrediente, index) => (
                        <li key={index}>{ingrediente.nombre}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell style={{ border: '1px solid #000', textAlign: 'center' }}>
                    <Button component={Link} to={`/hamburguesas/editar/${hamburguesa.idHamburguesa}`} variant="contained" color="primary" style={{ width: '100px', textTransform: 'none', marginRight: '10px' }}>
                      Editar
                    </Button>
                    <BorrarHamburguesa id={hamburguesa.idHamburguesa} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Button component={Link} to="/hamburguesas/agregar" variant="contained" color="primary">
            Agregar Hamburguesa
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default ListarHamburguesa;
