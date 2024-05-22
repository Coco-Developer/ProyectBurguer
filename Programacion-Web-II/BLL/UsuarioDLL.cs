using LibreriaDeClases;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DLL
{
    public class UsuarioDLL
    {
        private readonly MyDbContext _context;

        public UsuarioDLL(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Usuario>> ObtenerTodosLosUsuariosAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> ObtenerUsuarioPorIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task AgregarUsuarioAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarUsuarioAsync(int id, Usuario usuarioActualizado)
        {
            var usuarioExistente = await _context.Usuarios.FindAsync(id);
            if (usuarioExistente != null)
            {
                usuarioExistente.Nombre = usuarioActualizado.Nombre;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException($"No se encontró ningún usuario con el ID {id}.");
            }
        }

        public async Task<bool> EliminarUsuarioAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
