using LibreriaDeClases;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLL
{
    public class IngredienteDLL
    {
        private readonly MyDbContext _context;

        public IngredienteDLL(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Ingrediente>> ObtenerTodosLosIngredientesAsync()
        {
            return await _context.Ingredientes.ToListAsync();
        }

        public async Task<Ingrediente> ObtenerIngredientePorIdAsync(int id)
        {
            return await _context.Ingredientes.FindAsync(id);
        }

        public async Task AgregarIngredienteAsync(Ingrediente ingrediente)
        {
            _context.Ingredientes.Add(ingrediente);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarIngredienteAsync(int id, Ingrediente ingredienteActualizado)
        {
            var ingredienteExistente = await _context.Ingredientes.FindAsync(id);
            if (ingredienteExistente != null)
            {
                ingredienteExistente.Nombre = ingredienteActualizado.Nombre;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"No se encontró ningún ingrediente con el ID {id}.");
            }
        }

        public async Task<bool> EliminarIngredienteAsync(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente != null)
            {
                _context.Ingredientes.Remove(ingrediente);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
