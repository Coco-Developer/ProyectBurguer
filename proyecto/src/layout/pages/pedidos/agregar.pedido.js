import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

function AgregarPedido() {
  const [usuarios, setUsuarios] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [direccionAlternativa, setDireccionAlternativa] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [hamburguesasDisponibles, setHamburguesasDisponibles] = useState([]);
  const [hamburguesaSeleccionada, setHamburguesaSeleccionada] = useState('');
  const [cantidadHamburguesa, setCantidadHamburguesa] = useState(1);
  const [hamburguesasSeleccionadas, setHamburguesasSeleccionadas] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  useEffect(() => {
    const obtenerHamburguesas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Hamburguesa'));
        const hamburguesasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHamburguesasDisponibles(hamburguesasData);
      } catch (error) {
        console.error('Error al obtener las hamburguesas:', error.message);
      }
    };

    obtenerHamburguesas();
  }, []);

  useEffect(() => {
    // Actualizar la dirección al seleccionar un usuario
    if (usuarioSeleccionado) {
      const usuario = usuarios.find(user => user.id === usuarioSeleccionado);
      if (usuario) {
        setDireccion(usuario.direccion);
      }
    }
  }, [usuarioSeleccionado, usuarios]);

  const handleAgregarHamburguesa = () => {
    const hamburguesaSeleccionadaData = hamburguesasDisponibles.find(hamburguesa => hamburguesa.id === hamburguesaSeleccionada);
    const nuevaHamburguesa = {
      ...hamburguesaSeleccionadaData,
      cantidad: cantidadHamburguesa
    };
    setHamburguesasSeleccionadas([...hamburguesasSeleccionadas, nuevaHamburguesa]);
    setTotalPedido(prevTotal => prevTotal + (hamburguesaSeleccionadaData.precio * cantidadHamburguesa));
    // Reseteamos la selección de la hamburguesa y la cantidad después de agregarla
    setHamburguesaSeleccionada('');
    setCantidadHamburguesa(1);
    setSnackbarMessage('Hamburguesa agregada al pedido');
    setSnackbarOpen(true);
  };

  const handleEliminarHamburguesa = (index) => {
    const hamburguesasActualizadas = [...hamburguesasSeleccionadas];
    const hamburguesaEliminada = hamburguesasActualizadas.splice(index, 1);
    setHamburguesasSeleccionadas(hamburguesasActualizadas);
    setTotalPedido(prevTotal => prevTotal - (hamburguesaEliminada[0].precio * hamburguesaEliminada[0].cantidad));
    setSnackbarMessage('Hamburguesa eliminada del pedido');
    setSnackbarOpen(true);
  };

  const handleAgregarPedido = async () => {
    try {
      if (!usuarioSeleccionado || !direccion || hamburguesasSeleccionadas.length === 0) {
        setSnackbarMessage('Por favor completa todos los campos obligatorios.');
        setSnackbarOpen(true);
        return;
      }

      await addDoc(collection(db, 'Pedidos'), {
        direccion,
        direccionAlternativa,
        usuario: usuarioSeleccionado,
        hamburguesas: hamburguesasSeleccionadas,
        totalPedido,
        fecha: serverTimestamp()
      });

      setSnackbarMessage('Pedido agregado exitosamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al agregar el pedido:', error.message);
      setSnackbarMessage('Error al agregar el pedido');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Agregar Pedido
      </Typography>
      <TextField
        label="Dirección"
        value={direccion}
        fullWidth
        margin="normal"
        disabled // Para evitar que se modifique
      />
      <TextField
        label="Dirección Envío Alternativa (opcional)"
        value={direccionAlternativa}
        onChange={(e) => setDireccionAlternativa(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField select
        label="Usuario"
        value={usuarioSeleccionado}
        onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        fullWidth
        margin="normal"
      >
        {usuarios.map((usuario) => (
          <MenuItem key={usuario.id} value={usuario.id}>
            {usuario.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Hamburguesa"
        value={hamburguesaSeleccionada}
        onChange={(e) => setHamburguesaSeleccionada(e.target.value)}
        fullWidth
        margin="normal"
      >
        {hamburguesasDisponibles.map((hamburguesa) => (
          <MenuItem key={hamburguesa.id} value={hamburguesa.id}>
            {hamburguesa.nombre} - ${hamburguesa.precio}
          </MenuItem>
        ))}
      </TextField>
      {hamburguesaSeleccionada && (
        <Box mt={2}>
          <TextField
            type="number"
            label="Cantidad"
            value={cantidadHamburguesa}
            onChange={(e) => setCantidadHamburguesa(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { min: 1 },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    onClick={handleAgregarHamburguesa}
                    variant="contained"
                    color="primary">
                    Agregar
                  </Button>
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Hamburguesas Seleccionadas
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hamburguesasSeleccionadas.map((hamburguesa, index) => (
                <TableRow key={index}>
                  <TableCell>{hamburguesa.nombre}</TableCell>
                  <TableCell>${hamburguesa.precio}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={hamburguesa.cantidad}
                      onChange={(e) => {
                        const newCantidad = parseInt(e.target.value);
                        const updatedHamburguesas = [...hamburguesasSeleccionadas];
                        updatedHamburguesas[index].cantidad = newCantidad;
                        setHamburguesasSeleccionadas(updatedHamburguesas);
                        const totalPrice = updatedHamburguesas.reduce((total, item) => total + (item.precio * item.cantidad), 0);
                        setTotalPedido(totalPrice);
                      }}
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEliminarHamburguesa(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="h6" gutterBottom>
        Total del Pedido: ${totalPedido.toFixed(2)}
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAgregarPedido}>
          Agregar Pedido
        </Button>
        <Button variant="contained" component={Link} to="/pedidos/listar" color='secondary'>
          Volver a lista de Pedidos
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgregarPedido;

