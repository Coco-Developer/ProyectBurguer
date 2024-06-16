// Importar las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "fbase-reactjs",
  storageBucket: "fbase-reactjs.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Exportar la instancia de Firestore para usarla en otros archivos
export { db };
