using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace LibreriaDeClases
{
    public class Ingrediente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        public decimal Precio { get; set; }
    }
}