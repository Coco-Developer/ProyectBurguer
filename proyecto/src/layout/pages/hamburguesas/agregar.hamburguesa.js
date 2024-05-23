import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Box, Typography, MenuItem } from '@mui/material';
import { agregarHamburguesa} from '../../../servicios/hamburguesa.servicio';
import { listarIngredientes } from '../../../servicios/ingrediente.servicio';

function AgregarHamburguesa() {
  // Estado para el nombre, precio, ingredientes y mensaje de la hamburguesa
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);

  // Cargar la lista de ingredientes disponibles al cargar el componente
  useEffect(() => {
    listarIngredientes()
      .then(data => setIngredientesDisponibles(data))
      .catch(error => console.error('Error al obtener los ingredientes:', error));
  }, []);

  // Manejar el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Manejar el cambio en el nombre de la hamburguesa
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  // Manejar el cambio en el precio de la hamburguesa
  const handleChangePrecio = (event) => {
    const inputPrice = event.target.value;
    if (!isNaN(inputPrice)) {
      setPrecio(inputPrice);
    }
  };

  // Manejar el cambio en los ingredientes seleccionados
  const handleChangeIngredientes = (event) => {
    const { value } = event.target;
    setIngredientes(value); // Establecer el array de IDs de ingredientes
  };
  
  // Manejar el envío del formulario para agregar la hamburguesa
  const handleSubmit = async () => {
    try {
      // Validar que se ingresen todos los campos necesarios
      if (nombre && precio && ingredientes.length > 0) {
        // Enviar solo los IDs de ingredientes al servicio
        await agregarHamburguesa({ 
          nombre, 
          precio, 
          ingredientes: ingredientes.map(ingrediente => ({ id: ingrediente.id, nombre: ingrediente.nombre })) 
        });
        // Mostrar mensaje de éxito
        setMensaje('Hamburguesa agregada correctamente');
        setOpenSnackbar(true);
        // Reiniciar los campos
        setNombre('');
        setPrecio('');
        setIngredientes([]);
      } else {
        // Mostrar mensaje de error si no se ingresan todos los campos necesarios
        setMensaje('Por favor ingresa el nombre, el precio y al menos un ingrediente de la hamburguesa');
        setOpenSnackbar(true);
      }
    } catch (error) {
      // Mostrar mensaje de error si ocurre un error al agregar la hamburguesa
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
        {/* Campo para ingresar el nombre de la hamburguesa */}
        <TextField
          label="Nombre"
          value={nombre}
          onChange={handleChangeNombre}
          fullWidth
          margin="normal"
        />
        {/* Campo para ingresar el precio de la hamburguesa */}
        <TextField
          label="Precio"
          value={precio}
          onChange={handleChangePrecio}
          fullWidth
          margin="normal"
        />
        {/* Lista desplegable para seleccionar los ingredientes */}
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
          {/* Opciones de ingredientes disponibles */}
          {ingredientesDisponibles.map((ingrediente) => (
            <MenuItem key={ingrediente.id} value={ingrediente}>
              {ingrediente.nombre}
            </MenuItem>
          ))}
        </TextField>
        {/* Botón para agregar la hamburguesa */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar
        </Button>
        {/* Snackbar para mostrar mensajes */}
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
