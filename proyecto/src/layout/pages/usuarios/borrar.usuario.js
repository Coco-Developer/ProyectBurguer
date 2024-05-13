import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { eliminarUsuario, obtenerUsuarios } from '../../../servicios/usuario.servicio';

function BorrarUsuario() {
  const { id } = useParams();
  const [open, setOpen] = useState(false); // Estado para controlar la apertura/cierre del diálogo de confirmación

  useEffect(() => {
    const obtenerUsuarioData = async () => {
      try {
        const usuarioData = await obtenerUsuarios(id);
        // Verificar si el usuario existe, si no, redireccionar a la página de listar
        if (!usuarioData) {
          // Puedes agregar aquí la lógica para redireccionar
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error.message);
      }
    };

    obtenerUsuarioData();
  }, [id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await eliminarUsuario(id);
      handleClose(); // Cerrar el diálogo después de eliminar el usuario
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
    }
  };

  return (
    <div>
      
      <Button variant="contained" color="error" onClick={handleOpen} style={{ display: 'block', margin: 'auto' }}>
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
    </div>
  );
}

export default BorrarUsuario;
