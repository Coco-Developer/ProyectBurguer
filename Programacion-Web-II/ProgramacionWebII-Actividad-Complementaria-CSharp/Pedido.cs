using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibreriaDeClases
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        public DateTime Fecha { get; set; }

        public required Hamburguesa Hamburugesa { get; set; }
        public int HamburguesaId { get; set; }

        public int UsuarioId { get; set; }
        public required Usuario Usuario { get; set; }
    }
}