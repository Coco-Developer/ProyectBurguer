import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

const ingredientesCollection = collection(db, 'ingredientes');

const handleResponse = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

export const listarIngredientes = async () => {
  try {
    const querySnapshot = await getDocs(ingredientesCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener los ingredientes:', error.message);
    throw error;
  }
};

export const agregarIngrediente = async (nuevoIngrediente) => {
  return handleResponse(async () => {
    const docRef = await addDoc(ingredientesCollection, nuevoIngrediente);
    return { id: docRef.id, ...nuevoIngrediente };
  });
};

export const obtenerIngredientePorId = async (id) => {
  try {
    const docRef = doc(ingredientesCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error('No existe el ingrediente con el ID especificado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el ingrediente por ID:', error.message);
    throw error;
  }
};

export const editarIngrediente = async (id, nuevoIngrediente) => {
  return handleResponse(async () => {
    await updateDoc(doc(ingredientesCollection, id), nuevoIngrediente);
    return { id, ...nuevoIngrediente };
  });
};

export const eliminarIngrediente = async (id) => {
  return handleResponse(async () => {
    await deleteDoc(doc(ingredientesCollection, id));
    return { id };
  });
};
