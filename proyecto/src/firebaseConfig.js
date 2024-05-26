// Importar las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyB2_SSAaVCkUw4uf3fVR2BmmX0PPomIcSY",
  authDomain: "fbase-reactjs.firebaseapp.com",
  projectId: "fbase-reactjs",
  storageBucket: "fbase-reactjs.appspot.com",
  messagingSenderId: "251405788813",
  appId: "1:251405788813:web:4933e2fab2f2a008eea4c4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Exportar la instancia de Firestore para usarla en otros archivos
export { db };
