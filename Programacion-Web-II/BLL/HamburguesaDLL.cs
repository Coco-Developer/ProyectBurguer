using LibreriaDeClases;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DLL
{
    public class HamburguesaDLL
    {



        // Lista de hamburguesas con datos preestablecidos
        private static readonly List<Hamburguesa> hamburguesas = new()
        {
            new Hamburguesa("Cheddar", 3599),
            new Hamburguesa("Vegetariana", 4699),
            new Hamburguesa("Doble bacon", 5399)
        };
        private static readonly object _bloqueo;

        // Método para agregar una hamburguesa
        public static void AgregarHamburguesa(Hamburguesa hamburguesa)
        {

            hamburguesas.Add(hamburguesa);

        }


        // Método para obtener todas las hamburguesas
        public static List<Hamburguesa> ObtenerTodasLasHamburguesas()
        {
            return hamburguesas;
        }

        // Método para actualizar una hamburguesa
        public static void ActualizarHamburguesa(int id, Hamburguesa hamburguesa)
        {
            lock (_bloqueo)
            {
                // Busca la hamburguesa por su ID
                var hamburguesaExistente = hamburguesas.FirstOrDefault(h => h.IdHamburguesa == id);

                // Verifica si se encontró la hamburguesa
                if (hamburguesaExistente != null)
                {
                    // Actualiza los campos de la hamburguesa existente
                    hamburguesaExistente.Nombre = hamburguesa.Nombre;
                    hamburguesaExistente.Precio = hamburguesa.Precio;
                }
                else
                {
                    throw new ArgumentException($"No se encontró ninguna hamburguesa con el ID {id}.");
                }
            }
        }



        // Método para eliminar una hamburguesa por su ID
        public static bool EliminarHamburguesa(int id)
        {
            Hamburguesa hamburguesa = hamburguesas.SingleOrDefault(h => h.IdHamburguesa == id);
            if (hamburguesa != null)
            {
                hamburguesas.Remove(hamburguesa);
                return true;
            }
            else
            {
                return false; // No se encontró la hamburguesa con el ID proporcionado
            }
        }

        public static object ObtenerHamburguesaPorId(int id)
        {
            throw new NotImplementedException();
        }

        public static void ActualizarHamburguesa(Hamburguesa hamburguesa)
        {
            throw new NotImplementedException();
        }
    }
}
