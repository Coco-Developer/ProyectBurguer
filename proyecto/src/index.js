import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout"; // Importamos el componente Layout
import ListarHamburguesa from "./layout/pages/hamburguesas/listar.hamburguesa"; // Importamos la página ListarHamburguesas
import AgregarHamburguesa from "./layout/pages/hamburguesas/agregar.hamburguesa";
import BorrarHamburguesa from "./layout/pages/hamburguesas/borrar.hamburguesa";
import ListarUsuario from "./layout/pages/usuarios/listar.usuario";
import AgregarUsuario from "./layout/pages/usuarios/agregar.usuario";
import BorrarUsuario from "./layout/pages/usuarios/borrar.usuario";
import ListarPedido from "./layout/pages/pedidos/listar.pedido"; // Importamos la página ListarPedido

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout />}>
          {/* Rutas para hamburguesas */}
          <Route path="/hamburguesas/listar" element={<ListarHamburguesa />} />
          <Route path="/hamburguesas/agregar" element={<AgregarHamburguesa />} />
          <Route path="/hamburguesas/borrar" element={<BorrarHamburguesa />} />

          {/* Rutas para usuarios */}
          <Route path="/usuarios/listar" element={<ListarUsuario />} />
          <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
          <Route path="/usuarios/borrar" element={<BorrarUsuario />} />

          {/* Ruta para listar pedidos */}
          <Route path="/pedidos/listar" element={<ListarPedido />} />

          {/* Si no se encuentra ninguna ruta, redirigir a /hamburguesas/listar */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/// Renderiza la aplicación utilizando createRoot en lugar de ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(<App />);
