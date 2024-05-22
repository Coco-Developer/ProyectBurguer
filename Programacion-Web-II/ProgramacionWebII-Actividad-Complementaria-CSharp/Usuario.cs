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
        public string Nombre { get; set; }

        public List<Pedido> Pedidos { get; set; }
    }
}
