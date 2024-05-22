using System.ComponentModel.DataAnnotations;

namespace LibreriaDeClases
{
    public class Ingrediente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }
    }
}
