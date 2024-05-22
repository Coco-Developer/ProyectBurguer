using LibreriaDeClases;
using Microsoft.EntityFrameworkCore;

namespace DLL
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Hamburguesa> Hamburguesas { get; set; }
        public DbSet<Ingrediente> Ingredientes { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de la clase Hamburguesa
            modelBuilder.Entity<Hamburguesa>()
                .Property(h => h.IdHamburguesa)
                .ValueGeneratedOnAdd();

            // Configuración de la clase Ingrediente
            modelBuilder.Entity<Ingrediente>()
                .Property(i => i.Id)
                .ValueGeneratedOnAdd();


        }
    }
}
