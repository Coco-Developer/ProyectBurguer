import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import { eliminarHamburguesa } from '../../../servicios/hamburguesa.servicio';

function BorrarHamburguesa() {
  const { nombre } = useParams(); // Obtenemos el parámetro nombre de los parámetros de la URL
  const [open, setOpen] = useState(false); // Estado para controlar la apertura/cierre del diálogo de confirmación

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      if (nombre) { // Cambiado de id a nombre
        await eliminarHamburguesa(nombre);
        handleClose();
      } else {
        console.error('Nombre de hamburguesa no definido');
      }
    } catch (error) {
      console.error('Error al eliminar la hamburguesa:', error.message);
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
            ¿Estás seguro de que deseas eliminar esta hamburguesa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleEliminar()} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default BorrarHamburguesa;

