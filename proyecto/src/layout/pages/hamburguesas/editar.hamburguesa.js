import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function EditarHamburguesa() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHamburguesa = async () => {
      const docRef = doc(db, 'Hamburguesa', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre);
        setPrecio(data.precio);
        setSelectedIngredientes(data.ingredientes.map(ing => ing.nombre));
      } else {
        console.log('No such document!');
      }
    };

    fetchHamburguesa();
    
    const fetchIngredientes = async () => {
      const ingredientesCollection = await getDocs(collection(db, 'Ingredientes'));
      const ingredientesList = ingredientesCollection.docs.map(doc => doc.data().nombre);
      setIngredientes(ingredientesList);
    };

    fetchIngredientes();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientesArray = selectedIngredientes.map(ing => ({ nombre: ing, precio: 0 }));
      const docRef = doc(db, 'Hamburguesa', id);
      await updateDoc(docRef, {
        nombre,
        precio,
        ingredientes: ingredientesArray
      });
      navigate('/hamburguesas/listar');
    } catch (error) {
      console.error('Error actualizando la hamburguesa:', error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: '20px', width: '50%', textAlign: 'center' }}>
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
            fullWidth
            renderValue={(selected) => selected.join(', ')}
          >
            {ingredientes.map((ingrediente) => (
              <MenuItem key={ingrediente} value={ingrediente}>
                {ingrediente}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Actualizar
        </Button>
      </Box>
    </Box>
  );
}

export default EditarHamburguesa;
