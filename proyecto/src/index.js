import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout";
import ListarHamburguesa from "./layout/pages/hamburguesas/listar.hamburguesa";
import AgregarHamburguesa from "./layout/pages/hamburguesas/agregar.hamburguesa";
import BorrarHamburguesa from "./layout/pages/hamburguesas/borrar.hamburguesa";
import ListarUsuario from "./layout/pages/usuarios/listar.usuario";
import AgregarUsuario from "./layout/pages/usuarios/agregar.usuario";
import BorrarUsuario from "./layout/pages/usuarios/borrar.usuario";
import ListarPedido from "./layout/pages/pedidos/listar.pedido";
import AgregarPedido from './layout/pages/pedidos/agregar.pedido';
import BorrarPedido from './layout/pages/pedidos/borrar.pedido';
import EditarHamburguesa from './layout/pages/hamburguesas/editar.hamburguesa';
import EditarPedido from './layout/pages/pedidos/editar.pedido';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route path="/hamburguesas/listar" element={<ListarHamburguesa />} />
          <Route path="/hamburguesas/agregar" element={<AgregarHamburguesa />} />
          <Route path="/hamburguesas/borrar/:id" element={<BorrarHamburguesa />} />
          <Route path="/hamburguesas/editar/:id" element={<EditarHamburguesa />} />

          <Route path="/usuarios/listar" element={<ListarUsuario />} />
          <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
          <Route path="/usuarios/borrar/:id" element={<BorrarUsuario />} />

          <Route path="/pedidos/listar" element={<ListarPedido />} />
          <Route path="/pedidos/agregar" element={<AgregarPedido />} />
          <Route path="/pedidos/borrar/:id" element={<BorrarPedido />} />
          <Route path="/pedidos/editar/:id" element={<EditarPedido />} />

          <Route path="*" element={<Navigate to="/hamburguesas/listar" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
