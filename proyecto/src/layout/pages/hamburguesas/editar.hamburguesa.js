import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Snackbar, Box, Typography } from '@mui/material';
import { obtenerHamburguesaPorId, editarHamburguesa } from '../../../servicios/hamburguesa.servicio';

function EditarHamburguesa() {
  const { id } = useParams();
  const [hamburguesa, setHamburguesa] = useState({ nombre: '', precio: '' });
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Cargar los detalles de la hamburguesa al montar el componente
    obtenerHamburguesaPorId(id)
      .then(data => setHamburguesa(data))
      .catch(error => console.error('Error al obtener la hamburguesa:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHamburguesa(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await editarHamburguesa(id, hamburguesa);
      setMensaje('Hamburguesa actualizada correctamente');
      setOpenSnackbar(true);
      setEditMode(false); // Desactivar el modo de edición después de guardar
    } catch (error) {
      console.error('Error al editar la hamburguesa:', error.message);
      setMensaje('Error al editar la hamburguesa');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Detalles de la Hamburguesa
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nombre: {hamburguesa.nombre}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Precio: {hamburguesa.precio}
        </Typography>
        {editMode ? (
          <div>
            <TextField
              label="Nombre"
              name="nombre"
              value={hamburguesa.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              name="precio"
              value={hamburguesa.precio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Guardar
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Editar
          </Button>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={mensaje}
        />
      </Box>
    </Box>
  );
}

export default EditarHamburguesa;
