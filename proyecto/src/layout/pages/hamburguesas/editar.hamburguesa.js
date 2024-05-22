import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Snackbar, Box, Typography, MenuItem } from '@mui/material';
import { obtenerHamburguesaPorId, editarHamburguesa, listarIngredientes } from '../../../servicios/hamburguesa.servicio';

function EditarHamburguesa() {
  const { id } = useParams();
  const [hamburguesa, setHamburguesa] = useState({ nombre: '', precio: '', ingredientes: [] });
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);

  useEffect(() => {
    obtenerHamburguesaPorId(id)
      .then(data => setHamburguesa(data))
      .catch(error => console.error('Error al obtener la hamburguesa:', error));
    
    listarIngredientes()
      .then(data => setIngredientesDisponibles(data))
      .catch(error => console.error('Error al obtener los ingredientes:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHamburguesa(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIngredientesChange = (event) => {
    const { value } = event.target;
    setHamburguesa(prevState => ({
      ...prevState,
      ingredientes: value
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const data = {
        ...hamburguesa,
        ingredientes: hamburguesa.ingredientes.map(ingrediente => ({ id: ingrediente.id, nombre: ingrediente.nombre }))
      };
      await editarHamburguesa(id, data);
      setMensaje('Hamburguesa actualizada correctamente');
      setOpenSnackbar(true);
      setEditMode(false);
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
              id="nombre" // Añadido el id correspondiente
              name="nombre"
              value={hamburguesa.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              id="precio" // Añadido el id correspondiente
              name="precio"
              value={hamburguesa.precio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Ingredientes"
              id="ingredientes" // Añadido el id correspondiente
              name="ingredientes"
              SelectProps={{
                multiple: true,
                value: hamburguesa.ingredientes,
                onChange: handleIngredientesChange,
              }}
              fullWidth
              margin="normal"
            >
              {ingredientesDisponibles.map((ingrediente) => (
                <MenuItem key={ingrediente.id} value={ingrediente}>
                  {ingrediente.nombre}
                </MenuItem>
              ))}
            </TextField>
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
