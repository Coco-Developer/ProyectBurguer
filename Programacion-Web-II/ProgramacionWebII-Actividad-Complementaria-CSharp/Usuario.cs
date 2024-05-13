using System;

namespace LibreriaDeClases
{
    public class Usuario
    {
        private static int _contador = 0;

        [Key]
        [AutoIncrement]
        public int Id { get; private set; }

        public DateTime Nacimiento { get; set; }
        public int Edad { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }

        public Usuario(DateTime nacimiento, int edad, string nombre, string apellido)
        {
            Nacimiento = nacimiento;
            Edad = edad;
            Nombre = nombre;
            Apellido = apellido;
            Id = ++_contador;
        }
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
