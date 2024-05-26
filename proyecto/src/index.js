import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/layout';
import ListarHamburguesa from './layout/pages/hamburguesas/listar.hamburguesa';
import AgregarHamburguesa from './layout/pages/hamburguesas/agregar.hamburguesa';
import EditarHamburguesa from './layout/pages/hamburguesas/editar.hamburguesa';
import ListarUsuario from './layout/pages/usuarios/listar.usuario';
import AgregarUsuario from './layout/pages/usuarios/agregar.usuario';
import EditarUsuario from './layout/pages/usuarios/editar.usuario'; // Importa el componente de edición de usuario
import ListarPedido from './layout/pages/pedidos/listar.pedido';
import AgregarPedido from './layout/pages/pedidos/agregar.pedido';
import EditarPedido from './layout/pages/pedidos/editar.pedido';
import ListarIngredientes from './layout/pages/ingredientes/listar.ingrediente';
import AgregarIngrediente from './layout/pages/ingredientes/agregar.ingrediente';
import EditarIngrediente from './layout/pages/ingredientes/editar.ingrediente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/hamburguesas/listar" element={<ListarHamburguesa />} />
          <Route path="/hamburguesas/agregar" element={<AgregarHamburguesa />} />
          <Route path="/hamburguesas/editar/:id" element={<EditarHamburguesa />} />

          <Route path="/usuarios/listar" element={<ListarUsuario />} />
          <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} /> {/* Ruta de edición de usuario */}

          <Route path="/pedidos/listar" element={<ListarPedido />} />
          <Route path="/pedidos/agregar" element={<AgregarPedido />} />
          <Route path="/pedidos/editar/:id" element={<EditarPedido />} />

          <Route path="/ingredientes/listar" element={<ListarIngredientes />} />
          <Route path="/ingredientes/agregar" element={<AgregarIngrediente />} />
          <Route path="/ingredientes/editar/:id" element={<EditarIngrediente />} />

          <Route path="*" element={<Navigate to="/hamburguesas/listar" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
