import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Snackbar, Typography } from '@mui/material';
import { editarPedido, obtenerPedidoPorId } from '../../../servicios/pedido.servicio';

function EditarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({ fecha: '', hamburguesas: [], usuarioId: '', direccion: '' });
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    obtenerPedidoPorId(id)
      .then(data => setPedido(data))
      .catch(error => console.error('Error al obtener el pedido:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPedido(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await editarPedido(id, pedido);
      setMensaje('Pedido actualizado correctamente');
      setOpenSnackbar(true);
      // Redirigir a la página de detalles del pedido después de editar
      navigate(`/pedidos/${id}`);
    } catch (error) {
      console.error('Error al editar el pedido:', error.message);
      setMensaje('Error al editar el pedido');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Editar Pedido
      </Typography>
      <TextField
        label="Fecha"
        name="fecha"
        value={pedido.fecha}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Hamburguesas"
        name="hamburguesas"
        value={pedido.hamburguesas}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Usuario ID"
        name="usuarioId"
        value={pedido.usuarioId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dirección"
        name="direccion"
        value={pedido.direccion}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={mensaje}
      />
    </div>
  );
}

export default EditarPedido;
