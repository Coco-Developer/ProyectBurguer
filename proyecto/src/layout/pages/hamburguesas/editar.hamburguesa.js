import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { obtenerHamburguesaPorId, editarHamburguesa } from '../servicios/hamburguesa.servicio';

function EditarHamburguesa() {
  const { id } = useParams();
  const history = useHistory();
  const [hamburguesa, setHamburguesa] = useState({ nombre: '', precio: 0 });

  useEffect(() => {
    obtenerHamburguesaPorId(id)
      .then(data => setHamburguesa(data))
      .catch(error => console.error('Error al obtener la hamburguesa:', error));
  }, [id]);

  const handleChange = event => {
    const { name, value } = event.target;
    setHamburguesa(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    editarHamburguesa(id, hamburguesa)
      .then(() => {
        // Redirigir a la página de lista de hamburguesas u otra página
        history.push('/hamburguesas');
      })
      .catch(error => console.error('Error al editar la hamburguesa:', error));
  };

  return (
    <div>
      <h2>Editar Hamburguesa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={hamburguesa.nombre} onChange={handleChange} />
        </label>
        <label>
          Precio:
          <input type="number" name="precio" value={hamburguesa.precio} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default EditarHamburguesa;
