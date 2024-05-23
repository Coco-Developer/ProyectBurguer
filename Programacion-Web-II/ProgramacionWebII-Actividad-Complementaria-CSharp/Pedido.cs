using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LibreriaDeClases
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        public DateTime Fecha { get; set; }

        [JsonIgnore]
        public List<Hamburguesa> Hamburguesas { get; set; } = new List<Hamburguesa>();

        public int UsuarioId { get; set; }
        public required Usuario Usuario { get; set; }
    }
}