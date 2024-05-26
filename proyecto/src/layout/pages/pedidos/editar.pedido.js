import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Box, TextField, MenuItem } from '@mui/material';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function EditarPedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const docRef = doc(db, 'Pedidos', id);
        const docSnap = await getDocs(docRef);
        if (docSnap.exists()) {
          setPedido({ id: docSnap.id, ...docSnap.data() });
          setDireccion(docSnap.data().direccion);
          setUsuarioSeleccionado({
            id: docSnap.data().usuarioId,
            nombre: docSnap.data().nombreUsuario, // Suponiendo que el campo se llama nombreUsuario
            direccion: docSnap.data().direccionUsuario, // Suponiendo que el campo se llama direccionUsuario
            telefono: docSnap.data().telefonoUsuario // Suponiendo que el campo se llama telefonoUsuario
          });
        } else {
          console.error('No existe el pedido con el ID especificado');
        }
      } catch (error) {
        console.error('Error al obtener el pedido:', error.message);
      }
    };

    obtenerPedido();
  }, [id]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Usuario'));
        const usuariosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleActualizarPedido = async () => {
    try {
      await updateDoc(doc(db, 'Pedidos', id), {
        direccion,
        usuarioId: usuarioSeleccionado.id,
        // Actualizar la fecha del pedido
        fecha: serverTimestamp()
      });
      console.log('Pedido actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el pedido:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Editar Pedido
      </Typography>
      {pedido && (
        <>
          <TextField
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Usuario"
            value={usuarioSeleccionado ? usuarioSeleccionado.id : ''}
            onChange={(e) => {
              const selectedUser = usuarios.find(user => user.id === e.target.value);
              setUsuarioSeleccionado(selectedUser);
              setDireccion(selectedUser.direccion);
              // Aquí puedes cargar automáticamente otros campos como teléfono si lo deseas
            }}
            fullWidth
            margin="normal"
          >
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={handleActualizarPedido}>
            Actualizar Pedido
          </Button>
          <Button variant="contained" component={Link} to="/pedidos/listar">
            Cancelar
          </Button>
        </>
      )}
    </Box>
  );
}

export default EditarPedido;
