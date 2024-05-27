import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

function AgregarHamburguesa() {
  const [nombre, setNombre] = useState('');
  const [precioBase, setPrecioBase] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [ingredientesData, setIngredientesData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success or error
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerIngredientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Ingredientes'));
        const ingredientesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIngredientesData(ingredientesData);
      } catch (error) {
        console.error('Error al obtener los ingredientes:', error.message);
      }
    };

    obtenerIngredientes();
  }, []);

  const handleIngredientesChange = (e) => {
    const selectedIngredientes = e.target.value;
    setIngredientes(selectedIngredientes);

    const total = selectedIngredientes.reduce((acc, ingredienteId) => {
      const ingrediente = ingredientesData.find(ing => ing.id === ingredienteId);
      return acc + (ingrediente ? parseFloat(ingrediente.precio) : 0);
    }, parseFloat(precioBase));

    setPrecioTotal(total);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hamburguesaData = {
        nombre,
        precio: parseFloat(precioBase),
        ingredientes: ingredientes.map(id => doc(db, `Ingredientes/${id}`)),
      };
      await addDoc(collection(db, 'Hamburguesa'), hamburguesaData);
      setSnackbarMessage('Hamburguesa agregada correctamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/hamburguesas/listar');
      }, 2000);
    } catch (error) {
      console.error('Error añadiendo la hamburguesa:', error.message);
      setSnackbarMessage('Error al agregar la hamburguesa');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="65vh" paddingTop={"20px"}>
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center', bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}>
        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Agregar Hamburguesa</Typography>
        <TextField
          id="nombre"
          name="nombre"
          label="Nombre"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          id="precioBase"
          name="precioBase"
          label="Precio Base"
          fullWidth
          type="number"
          value={precioBase}
          onChange={(e) => {
            const newPrecioBase = parseFloat(e.target.value);
            setPrecioBase(newPrecioBase);

            const total = ingredientes.reduce((acc, ingredienteId) => {
              const ingrediente = ingredientesData.find(ing => ing.id === ingredienteId);
              return acc + (ingrediente ? parseFloat(ingrediente.precio) : 0);
            }, newPrecioBase);

            setPrecioTotal(total);
          }}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="ingredientes-label">Ingredientes</InputLabel>
          <Select
            labelId="ingredientes-label"
            id="ingredientes"
            name="ingredientes"
            multiple
            value={ingredientes}
            onChange={handleIngredientesChange}
            label="Ingredientes"
            renderValue={(selected) => selected.map((id) => {
              const ingrediente = ingredientesData.find(ing => ing.id === id);
              return ingrediente ? `${ingrediente.nombre} - ${ingrediente.precio} $` : '';
            }).join(', ')}
          >
            {ingredientesData.map((ingrediente) => (
              <MenuItem key={ingrediente.id} value={ingrediente.id}>
                {ingrediente.nombre} - {ingrediente.precio} $
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" gutterBottom>
          Precio Total: {precioTotal.toFixed(2)}
        </Typography>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Agregar
        </Button>
        <br /><br />
        <Button component={Link} to="/hamburguesas/listar" variant="contained" color="secondary">
          Volver a la Lista de Hamburguesas
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AgregarHamburguesa;
