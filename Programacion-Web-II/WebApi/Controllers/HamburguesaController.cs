using DLL;
using LibreriaDeClases;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HamburguesasController : ControllerBase
    {
        private readonly MyDbContext _context;

        public HamburguesasController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Hamburguesa>>> ObtenerTodasLasHamburguesas()
        {
            var hamburguesas = await _context.Hamburguesas.Include(h => h.Ingredientes).ToListAsync();
            return Ok(hamburguesas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hamburguesa>> ObtenerHamburguesaPorId(int id)
        {
            var hamburguesa = await _context.Hamburguesas.Include(h => h.Ingredientes).FirstOrDefaultAsync(h => h.IdHamburguesa == id);
            if (hamburguesa == null)
            {
                return NotFound();
            }
            return Ok(hamburguesa);
        }

        [HttpPost]
        public async Task<IActionResult> CrearHamburguesa([FromBody] Hamburguesa hamburguesa)
        {
            _context.Hamburguesas.Add(hamburguesa);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarHamburguesa(int id, [FromBody] Hamburguesa hamburguesa)
        {
            var hamburguesaExistente = await _context.Hamburguesas.Include(h => h.Ingredientes).FirstOrDefaultAsync(h => h.IdHamburguesa == id);
            if (hamburguesaExistente == null)
            {
                return NotFound();
            }

            hamburguesaExistente.Nombre = hamburguesa.Nombre;
            hamburguesaExistente.Precio = hamburguesa.Precio;
            hamburguesaExistente.Ingredientes = hamburguesa.Ingredientes;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarHamburguesa(int id)
        {
            var hamburguesa = await _context.Hamburguesas.FindAsync(id);
            if (hamburguesa == null)
            {
                return NotFound();
            }

            _context.Hamburguesas.Remove(hamburguesa);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
