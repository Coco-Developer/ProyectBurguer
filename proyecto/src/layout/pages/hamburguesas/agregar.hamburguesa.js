import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Box, Typography, MenuItem } from '@mui/material';
import { agregarHamburguesa, listarIngredientes } from '../../../servicios/hamburguesa.servicio';

function AgregarHamburguesa() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);

  useEffect(() => {
    listarIngredientes()
      .then(data => setIngredientesDisponibles(data))
      .catch(error => console.error('Error al obtener los ingredientes:', error));
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangePrecio = (event) => {
    const inputPrice = event.target.value;
    if (!isNaN(inputPrice)) {
      setPrecio(inputPrice);
    }
  };

  const handleChangeIngredientes = (event) => {
    const { value } = event.target;
    setIngredientes(value); // Solo establecer el array de IDs de ingredientes
  };
  

  const handleSubmit = async () => {
    try {
      if (nombre && precio && ingredientes.length > 0) {
        // Enviar solo los IDs de ingredientes al servicio
        await agregarHamburguesa({ 
          nombre, 
          precio, 
          ingredientes: ingredientes.map(ingrediente => ({ id: ingrediente.id, nombre: ingrediente.nombre })) 
        });
        setMensaje('Hamburguesa agregada correctamente');
        setOpenSnackbar(true);
        setNombre('');
        setPrecio('');
        setIngredientes([]);
      } else {
        setMensaje('Por favor ingresa el nombre, el precio y al menos un ingrediente de la hamburguesa');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error al agregar la hamburguesa:', error.message);
      setMensaje('Error al agregar la hamburguesa');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Agregar Hamburguesa
        </Typography>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={handleChangeNombre}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          value={precio}
          onChange={handleChangePrecio}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Ingredientes"
          value={ingredientes}
          onChange={handleChangeIngredientes}
          SelectProps={{
            multiple: true,
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            },
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar
        </Button>
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

export default AgregarHamburguesa;
