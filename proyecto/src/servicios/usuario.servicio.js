import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Ajusta la ruta de importación según la ubicación de tu archivo de configuración de Firebase

const usuariosCollection = collection(db, 'usuarios');

const handleResponse = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

export const listarUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(usuariosCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    throw error;
  }
};

export const agregarUsuario = async (nuevoUsuario) => {
  return handleResponse(async () => {
    const docRef = await addDoc(usuariosCollection, nuevoUsuario);
    return { id: docRef.id, ...nuevoUsuario };
  });
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const docRef = doc(usuariosCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error('No existe el usuario con el ID especificado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error.message);
    throw error;
  }
};

export const editarUsuario = async (id, nuevoUsuario) => {
  return handleResponse(async () => {
    await updateDoc(doc(usuariosCollection, id), nuevoUsuario);
    return { id, ...nuevoUsuario };
  });
};

export const eliminarUsuario = async (id) => {
  return handleResponse(async () => {
    await deleteDoc(doc(usuariosCollection, id));
    return { id };
  });
};
