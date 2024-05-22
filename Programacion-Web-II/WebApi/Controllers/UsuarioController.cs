using LibreriaDeClases;
using DLL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioDLL _usuarioDLL;

        public UsuariosController(UsuarioDLL usuarioDLL)
        {
            _usuarioDLL = usuarioDLL;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodosLosUsuarios()
        {
            var usuarios = await _usuarioDLL.ObtenerTodosLosUsuariosAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerUsuarioPorId(int id)
        {
            var usuario = await _usuarioDLL.ObtenerUsuarioPorIdAsync(id);
            if (usuario == null)
                return NotFound();
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> AgregarUsuario(Usuario usuario)
        {
            await _usuarioDLL.AgregarUsuarioAsync(usuario);
            return CreatedAtAction(nameof(ObtenerUsuarioPorId), new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id)
                return BadRequest();

            try
            {
                await _usuarioDLL.ActualizarUsuarioAsync(id, usuario);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var result = await _usuarioDLL.EliminarUsuarioAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
