import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';

function EditarHamburguesa() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success or error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHamburguesa = async () => {
      const docRef = doc(db, 'Hamburguesa', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre);
        setPrecio(data.precio);
        const ingredientesRefs = data.ingredientes;
        const ingredientesData = await Promise.all(
          ingredientesRefs.map(async (ingredienteRef) => {
            const ingredienteDoc = await getDoc(ingredienteRef);
            return ingredienteDoc.exists() ? { id: ingredienteDoc.id, ...ingredienteDoc.data() } : null;
          })
        );
        setSelectedIngredientes(ingredientesData.filter(ingrediente => ingrediente !== null).map(ingrediente => ingrediente.id));
      } else {
        console.log('No such document!');
      }
    };

    fetchHamburguesa();
    
    const fetchIngredientes = async () => {
      const ingredientesCollection = await getDocs(collection(db, 'Ingredientes'));
      const ingredientesList = ingredientesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredientes(ingredientesList);
    };

    fetchIngredientes();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientesRefs = selectedIngredientes.map(ingId => doc(db, 'Ingredientes', ingId));
      const docRef = doc(db, 'Hamburguesa', id);
      await updateDoc(docRef, {
        nombre,
        precio,
        ingredientes: ingredientesRefs
      });
      setSnackbarMessage('Hamburguesa actualizada correctamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/hamburguesas/listar');
      }, 2000);
    } catch (error) {
      console.error('Error actualizando la hamburguesa:', error.message);
      setSnackbarMessage('Error actualizando la hamburguesa');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="65vh" paddingTop={"20px"}>
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center', bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}>
        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Editar Hamburguesa</Typography>
        <TextField
          label="Nombre"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Precio"
          fullWidth
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="ingredientes-label">Ingredientes</InputLabel>
          <Select
            labelId="ingredientes-label"
            multiple
            value={selectedIngredientes}
            onChange={(e) => setSelectedIngredientes(e.target.value)}
            renderValue={(selected) => selected
              .map(id => ingredientes.find(ing => ing.id === id)?.nombre)
              .join(', ')}
          >
            {ingredientes.map((ingrediente) => (
              <MenuItem key={ingrediente.id} value={ingrediente.id}>
                {ingrediente.nombre} - {ingrediente.precio} $
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Actualizar
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

export default EditarHamburguesa;
