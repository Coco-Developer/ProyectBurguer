
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace LibreriaDeClases
{

    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        [MaxLength(200)]
        public required string Direccion { get; set; }

        [Required]
        [MaxLength(15)]
        public required string Telefono { get; set; }

        public List<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}