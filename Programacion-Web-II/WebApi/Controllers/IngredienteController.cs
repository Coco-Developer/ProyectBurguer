using DLL;
using LibreriaDeClases;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public IngredientesController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ingrediente>>> ObtenerTodosLosIngredientes()
        {
            var ingredientes = await _context.Ingredientes.ToListAsync();
            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ingrediente>> ObtenerIngredientePorId(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound();
            }
            return Ok(ingrediente);
        }

        [HttpPost]
        public async Task<IActionResult> CrearIngrediente([FromBody] Ingrediente ingrediente)
        {
            _context.Ingredientes.Add(ingrediente);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarIngrediente(int id, [FromBody] Ingrediente ingrediente)
        {
            var ingredienteExistente = await _context.Ingredientes.FindAsync(id);
            if (ingredienteExistente == null)
            {
                return NotFound();
            }

            ingredienteExistente.Nombre = ingrediente.Nombre;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarIngrediente(int id)
        {
            var ingrediente = await _context.Ingredientes.FindAsync(id);
            if (ingrediente == null)
            {
                return NotFound();
            }

            _context.Ingredientes.Remove(ingrediente);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
