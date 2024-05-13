using System;
using System.ComponentModel.DataAnnotations;

namespace LibreriaDeClases
{
    public class Pedido
    {
        private static int _contador = 0; // Contador privado para autoincrementar el ID

        [Key]
        [AutoIncrement]
        public int Id { get; private set; } // Propiedad Id con atributos Key y AutoIncrement

        [Required]
        public int UsuarioId { get; set; }

        [Required]
        public int HamburguesaId { get; set; }

        [Required]
        public DateTime FechaPedido { get; set; }

        [Required]
        public int Cantidad { get; set; }

        // Constructor por defecto para permitir la creación de instancias sin parámetros
        public Pedido() { }

        // Constructor para inicializar un pedido con todos sus atributos
        public Pedido(int usuarioId, int hamburguesaId, DateTime fechaPedido, int cantidad)
        {
            UsuarioId = usuarioId;
            HamburguesaId = hamburguesaId;
            FechaPedido = fechaPedido;
            Cantidad = cantidad;

            // Incrementar el contador y asignar el ID al pedido
            _contador++;
            Id = _contador;
        }
    }   
}