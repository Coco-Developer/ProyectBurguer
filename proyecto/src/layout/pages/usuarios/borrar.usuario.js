import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import { eliminarUsuario } from '../../../servicios/usuario.servicio';

function BorrarUsuario() {
  const { id } = useParams(); // Obtenemos el parámetro ID de los parámetros de la URL
  const [open, setOpen] = useState(false); // Estado para controlar la apertura/cierre del diálogo de confirmación

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      if (id) {
        await eliminarUsuario(id);
        handleClose();
      } else {
        console.error('ID de usuario no definido');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
    }
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
            ¿Estás seguro de que deseas eliminar este usuario?
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
    </div >
  );
}

export default BorrarUsuario;
