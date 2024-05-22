using LibreriaDeClases;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLL
{
    public class HamburguesaDLL
    {
        private readonly MyDbContext _context;

        public HamburguesaDLL(MyDbContext context)
        {
            _context = context;
        }

        public async Task AgregarHamburguesaAsync(Hamburguesa hamburguesa)
        {
            _context.Hamburguesas.Add(hamburguesa);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Hamburguesa>> ObtenerTodasLasHamburguesasAsync()
        {
            return await _context.Hamburguesas.Include(h => h.Ingredientes).ToListAsync();
        }

        public async Task<Hamburguesa> ObtenerHamburguesaPorIdAsync(int id)
        {
            return await _context.Hamburguesas.Include(h => h.Ingredientes)
                .FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task ActualizarHamburguesaAsync(int id, Hamburguesa hamburguesaActualizada)
        {
            var hamburguesaExistente = await _context.Hamburguesas.Include(h => h.Ingredientes)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hamburguesaExistente != null)
            {
                hamburguesaExistente.Nombre = hamburguesaActualizada.Nombre;
                hamburguesaExistente.Precio = hamburguesaActualizada.Precio;
                hamburguesaExistente.Ingredientes = hamburguesaActualizada.Ingredientes;

                _context.Hamburguesas.Update(hamburguesaExistente);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"No se encontró ninguna hamburguesa con el ID {id}.");
            }
        }

        public async Task<bool> EliminarHamburguesaAsync(int id)
        {
            var hamburguesa = await _context.Hamburguesas.FindAsync(id);
            if (hamburguesa != null)
            {
                _context.Hamburguesas.Remove(hamburguesa);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
