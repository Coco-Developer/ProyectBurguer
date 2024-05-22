using LibreriaDeClases;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DLL
{
    public class PedidoDLL
    {
        private readonly MyDbContext _context;

        public PedidoDLL(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pedido>> ObtenerTodosLosPedidosAsync()
        {
            return await _context.Pedidos.Include(p => p.Hamburguesas).Include(p => p.Usuario).ToListAsync();
        }

        public async Task<Pedido> ObtenerPedidoPorIdAsync(int id)
        {
            return await _context.Pedidos.Include(p => p.Hamburguesas).Include(p => p.Usuario)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AgregarPedidoAsync(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarPedidoAsync(int id, Pedido pedidoActualizado)
        {
            var pedidoExistente = await _context.Pedidos.Include(p => p.Hamburguesas).Include(p => p.Usuario)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedidoExistente != null)
            {
                pedidoExistente.Fecha = pedidoActualizado.Fecha;
                pedidoExistente.Hamburguesas = pedidoActualizado.Hamburguesas;
                pedidoExistente.UsuarioId = pedidoActualizado.UsuarioId;

                _context.Pedidos.Update(pedidoExistente);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"No se encontró ningún pedido con el ID {id}.");
            }
        }

        public async Task<bool> EliminarPedidoAsync(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido != null)
            {
                _context.Pedidos.Remove(pedido);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
