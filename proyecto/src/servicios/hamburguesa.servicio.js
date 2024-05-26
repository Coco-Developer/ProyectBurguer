import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

// Colección de hamburguesas
const hamburguesasCollection = collection(db, 'hamburguesas');

// Función para manejar las respuestas y los errores
const handleResponse = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

// Función para listar todas las hamburguesas
export const listarHamburguesas = async () => {
  try {
    const querySnapshot = await getDocs(hamburguesasCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener las hamburguesas:', error.message);
    throw error;
  }
};

// Función para agregar una nueva hamburguesa
export const agregarHamburguesa = async (nuevaHamburguesa) => {
  return handleResponse(async () => {
    const docRef = await addDoc(hamburguesasCollection, nuevaHamburguesa);
    return { id: docRef.id, ...nuevaHamburguesa };
  });
};

// Función para obtener una hamburguesa por su ID
export const obtenerHamburguesaPorId = async (id) => {
  try {
    const docRef = doc(hamburguesasCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error('No existe la hamburguesa con el ID especificado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la hamburguesa por ID:', error.message);
    throw error;
  }
};

// Función para editar una hamburguesa
export const editarHamburguesa = async (id, nuevaHamburguesa) => {
  return handleResponse(async () => {
    await updateDoc(doc(hamburguesasCollection, id), nuevaHamburguesa);
    return { id, ...nuevaHamburguesa };
  });
};

// Función para eliminar una hamburguesa
export const eliminarHamburguesa = async (id) => {
  return handleResponse(async () => {
    await deleteDoc(doc(hamburguesasCollection, id));
    return { id };
  });
};
