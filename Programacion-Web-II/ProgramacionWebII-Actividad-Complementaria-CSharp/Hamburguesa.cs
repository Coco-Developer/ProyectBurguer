using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibreriaDeClases
{
    public class Hamburguesa
    {
        [Key]
        public int IdHamburguesa { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        [Required]
        public decimal Precio { get; set; }

        public List<Ingrediente> Ingredientes { get; set; } = new List<Ingrediente>();
    }
}
