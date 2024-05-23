import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Box, Typography, TextField, MenuItem } from '@mui/material';
import { agregarPedido } from '../../../servicios/pedido.servicio';
import { listarHamburguesas } from '../../../servicios/hamburguesa.servicio';



function AgregarPedido() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [direccionUsuario, setDireccionUsuario] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [hamburguesasSeleccionadas, setHamburguesasSeleccionadas] = useState([]);
  const [total, setTotal] = useState(0);
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [hamburguesasDisponibles, setHamburguesasDisponibles] = useState([]);

  useEffect(() => {
    // Cargar las hamburguesas disponibles al montar el componente
    listarHamburguesas()
      .then(data => setHamburguesasDisponibles(data))
      .catch(error => console.error('Error al obtener las hamburguesas:', error));
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    try {
      if (!nombreUsuario || !direccionUsuario || !telefonoUsuario || !fecha || hamburguesasSeleccionadas.length === 0) {
        setMensaje('Por favor complete todos los campos');
        setOpenSnackbar(true);
        return;
      }

      const nuevoPedido = {
        nombreUsuario,
        direccionUsuario,
        telefonoUsuario,
        hamburguesas: hamburguesasSeleccionadas.map(hamburguesa => ({ id: hamburguesa.id })),
        total,
        fecha
      };

      await agregarPedido(nuevoPedido);
      setMensaje('Pedido agregado correctamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al agregar el pedido:', error.message);
      setMensaje('Error al agregar el pedido');
      setOpenSnackbar(true);
    }
  };

  const handleHamburguesaChange = (event) => {
    const { value } = event.target;
    const hamburguesaSeleccionada = hamburguesasDisponibles.find(hamburguesa => hamburguesa.id === value);
    if (hamburguesaSeleccionada) {
      const nuevoTotal = total + parseFloat(hamburguesaSeleccionada.precio);
      setTotal(nuevoTotal);
      setHamburguesasSeleccionadas([...hamburguesasSeleccionadas, hamburguesaSeleccionada]);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Agregar Pedido
        </Typography>
        <TextField
          label="Nombre del usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección del usuario"
          value={direccionUsuario}
          onChange={(e) => setDireccionUsuario(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono del usuario"
          value={telefonoUsuario}
          onChange={(e) => setTelefonoUsuario(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Hamburguesas"
          value={hamburguesasSeleccionadas}
          onChange={handleHamburguesaChange}
          fullWidth
          margin="normal"
        >
          {hamburguesasDisponibles.map((hamburguesa) => (
            <MenuItem key={hamburguesa.id} value={hamburguesa.id}>
              {hamburguesa.nombre} - ${hamburguesa.precio}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Fecha del pedido"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="body1" gutterBottom>
          Total: ${total.toFixed(2)}
        </Typography>
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

export default AgregarPedido;
