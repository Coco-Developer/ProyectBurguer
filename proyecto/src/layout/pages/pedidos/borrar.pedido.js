import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { eliminarPedido } from '../../../servicios/pedido.servicio';

function BorrarPedido({ id }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await eliminarPedido(id);
      setMensaje('Pedido eliminado correctamente');
      setOpenSnackbar(true);
      handleClose();
      // Redirigir a la página de lista de pedidos después de eliminar
      navigate('/pedidos');
    } catch (error) {
      console.error('Error al eliminar el pedido:', error.message);
      setMensaje('Error al eliminar el pedido');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Eliminar
      </Button>
      {/* Diálogo de confirmación para la eliminación */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este pedido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEliminar} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={mensaje}
      />
    </div>
  );
}

export default BorrarPedido;
