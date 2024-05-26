import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar } from '@mui/material';

function AgregarHamburguesa() {
  const [nombre, setNombre] = useState('');
  const [precioBase, setPrecioBase] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [ingredientesData, setIngredientesData] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
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
    setIngredientes(e.target.value);
    const total = e.target.value.reduce((acc, ingredienteId) => {
      const ingrediente = ingredientesData.find(ing => ing.id === ingredienteId);
      return acc + (ingrediente ? parseFloat(ingrediente.precio) : 0);
    }, parseFloat(precioBase));
    setPrecioTotal(total);
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hamburguesaData = {
        nombre,
        precio: parseFloat(precioBase),
        ingredientes: ingredientes.map(id => db.doc(`Ingredientes/${id}`)),
      };
      await addDoc(collection(db, 'Hamburguesa'), hamburguesaData);
      setOpenSuccessSnackbar(true);
      setTimeout(() => {
        navigate('/hamburguesas/listar');
      }, 2000);
    } catch (error) {
      console.error('Error añadiendo la hamburguesa:', error.message);
      setOpenErrorSnackbar(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center' }}>
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
            setPrecioBase(e.target.value);
            const total = ingredientes.reduce((acc, ingredienteId) => {
              const ingrediente = ingredientesData.find(ing => ing.id === ingredienteId);
              return acc + (ingrediente ? parseFloat(ingrediente.precio) : 0);
            }, parseFloat(e.target.value));
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
            renderValue={(selected) => selected.map((id) => ingredientesData.find(ing => ing.id === id).nombre).join(', ')}
          >
            {ingredientesData.map((ingrediente) => (
              <MenuItem key={ingrediente.id} value={ingrediente.id}>
                {ingrediente.nombre}
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
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Hamburguesa agregada correctamente"
        />
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Error al agregar la hamburguesa"
        />
      </Box>
    </Box>
  );
}

export default AgregarHamburguesa;
