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
            modelBuilder.Entity<Hamburguesa>()
                .HasMany(h => h.Ingredientes)
                .WithMany();

            modelBuilder.Entity<Pedido>()
                .HasMany(p => p.Hamburguesas)
                .WithMany();

            modelBuilder.Entity<Pedido>()
                .HasOne(p => p.Usuario)
                .WithMany(u => u.Pedidos)
                .HasForeignKey(p => p.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
    
}