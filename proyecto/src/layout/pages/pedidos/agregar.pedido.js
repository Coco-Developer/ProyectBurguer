import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

function AgregarPedido() {
  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  // Estado para la dirección seleccionada
  const [direccion, setDireccion] = useState('');
  // Estado para la nueva dirección (opcional)
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  // Estado para el usuario seleccionado
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  // Estado para las hamburguesas seleccionadas
  const [hamburguesas, setHamburguesas] = useState([]);
  // Estado para el total del pedido
  const [totalPedido, setTotalPedido] = useState(0);

  // Obtener la lista de usuarios al cargar el componente
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

  // Función para agregar un pedido
  const handleAgregarPedido = async () => {
    try {
      // Validar que se haya seleccionado un usuario y una dirección
      if (!usuarioSeleccionado || !direccion) {
        console.error('Por favor completa todos los campos obligatorios.');
        return;
      }

      // Agregar el pedido a la base de datos
      await addDoc(collection(db, 'Pedidos'), {
        direccion: nuevaDireccion || direccion, // Usar la nueva dirección si se proporciona, de lo contrario, usar la dirección seleccionada
        usuarioId: usuarioSeleccionado.id,
        hamburguesas,
        fecha: serverTimestamp() // Agregar la fecha actual
      });
      
      // Limpiar los campos después de agregar el pedido
      setDireccion('');
      setUsuarioSeleccionado(null);
      setHamburguesas([]);
      setTotalPedido(0);
      setNuevaDireccion('');
      console.log('Pedido agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el pedido:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agregar Pedido
      </Typography>
      {/* Input para la dirección */}
      <TextField
        label="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* Input para la nueva dirección (opcional) */}
      <TextField
        label="Nueva Dirección (opcional)"
        value={nuevaDireccion}
        onChange={(e) => setNuevaDireccion(e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* Selector para el usuario */}
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
      {/* Visualización de las hamburguesas seleccionadas */}
      <Typography variant="h6" gutterBottom>
        Hamburguesas Seleccionadas
      </Typography>
      {hamburguesas.map((hamburguesa, index) => (
        <Typography key={index} variant="body1">{hamburguesa.nombre}</Typography>
      ))}
      {/* Visualización del total del pedido */}
      <Typography variant="h6" gutterBottom>
        Total del Pedido: ${totalPedido.toFixed(2)}
      </Typography>
      {/* Botón para agregar el pedido */}
      <Button variant="contained" color="primary" onClick={handleAgregarPedido}>
        Agregar Pedido
      </Button>
      {/* Botón para cancelar y volver a la lista de pedidos */}
      <Button variant="contained" component={Link} to="/pedidos/listar">
        Cancelar
      </Button>
    </Box>
  );
}

export default AgregarPedido;
