using System;

namespace LibreriaDeClases
{
    public class Hamburguesa
    {
        private static int _contador = 0;

        [Key]
        [AutoIncrement]
        public int IdHamburguesa { get; private set; }
        public string Nombre { get; set; }
        public double Precio { get; set; }

        public Hamburguesa(string nombre, double precio)
        {
            // Si el contador es cero, significa que no hay datos predefinidos
            if (_contador == 0)
            {
                // Se está creando el primer dato predefinido, así que se asigna el ID 1
                IdHamburguesa = 1;
                _contador = IdHamburguesa; // Se actualiza el contador para que coincida con el ID asignado
            }
            else
            {
                // Si ya hay datos predefinidos, se incrementa el contador y se asigna como ID
                IdHamburguesa = ++_contador;
            }

            Nombre = nombre;
            Precio = precio;
        }

        // Definir los atributos Key y AutoIncrement
        [AttributeUsage(AttributeTargets.Property)]
        public class KeyAttribute : Attribute
        {
        }

        [AttributeUsage(AttributeTargets.Property)]
        public class AutoIncrementAttribute : Attribute
        {
        }
    }
}
