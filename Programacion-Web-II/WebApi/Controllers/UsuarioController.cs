using DLL;
using LibreriaDeClases;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioDLL usuarioDLL;

        public UsuarioController()
        {
            usuarioDLL = new UsuarioDLL();
        }

        // GET: /Usuario
        [HttpGet]
        public ActionResult<List<Usuario>> Get()
        {
            var usuarios = UsuarioDLL.ObtenerTodosLosUsuarios();
            if (usuarios.Count == 0)
            {
                return NotFound("No se encontraron usuarios.");
            }
            return Ok(usuarios);
        }

        // GET: /Usuario/{id}
        [HttpGet("{id}")]
        public ActionResult<Usuario> Get(int id)
        {
            var usuario = UsuarioDLL.ObtenerUsuarioPorId(id);
            if (usuario == null)
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }
            return Ok(usuario);
        }

        // POST: /Usuario
        [HttpPost]
        public ActionResult<Usuario> Post([FromBody] Usuario usuario)
        {
            UsuarioDLL.AgregarUsuario(usuario);
            return CreatedAtAction(nameof(Get), new { id = usuario.Id }, usuario);
        }

        // DELETE: /Usuario/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!UsuarioDLL.EliminarUsuario(id))
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }
            return NoContent();
        }
    }
}
