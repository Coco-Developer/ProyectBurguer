using LibreriaDeClases;
using System;
using System.Collections.Generic;

namespace DLL
{
    public class UsuarioDLL
    {
        private static readonly List<Usuario> usuarios = new();

        // Constructor estático para inicializar algunos usuarios de muestra
        static UsuarioDLL()
        {
            usuarios.Add(new Usuario(DateTime.Parse("1990-01-01"), 31, "Roberto", "Perez"));
            usuarios.Add(new Usuario(DateTime.Parse("1985-05-05"), 36, "Daniel", "Gomez"));
            usuarios.Add(new Usuario(DateTime.Parse("1980-10-10"), 41, "Jose", "Ramallo"));
        }

        public static List<Usuario> ObtenerTodosLosUsuarios()
        {
            return usuarios;
        }

        public static Usuario ObtenerUsuarioPorId(int id)
        {
            return usuarios.Find(u => u.Id == id);
        }

        public static void AgregarUsuario(Usuario usuario)
        {
            // No necesitamos asignar manualmente el Id, ya que se maneja internamente en la clase Usuario
            usuarios.Add(usuario);
        }

        public static bool EliminarUsuario(int id)
        {
            Usuario usuario = usuarios.Find(u => u.Id == id);
            if (usuario != null)
            {
                usuarios.Remove(usuario);
                return true;
            }
            return false;
        }
    }
}
