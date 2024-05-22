using LibreriaDeClases;
using DLL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientesController : ControllerBase
    {
        private readonly IngredienteDLL _ingredienteDLL;

        public IngredientesController(IngredienteDLL ingredienteDLL)
        {
            _ingredienteDLL = ingredienteDLL;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodosLosIngredientes()
        {
            var ingredientes = await _ingredienteDLL.ObtenerTodosLosIngredientesAsync();
            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerIngredientePorId(int id)
        {
            var ingrediente = await _ingredienteDLL.ObtenerIngredientePorIdAsync(id);
            if (ingrediente == null)
                return NotFound();
            return Ok(ingrediente);
        }

        [HttpPost]
        public async Task<IActionResult> AgregarIngrediente(Ingrediente ingrediente)
        {
            await _ingredienteDLL.AgregarIngredienteAsync(ingrediente);
            return CreatedAtAction(nameof(ObtenerIngredientePorId), new { id = ingrediente.Id }, ingrediente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarIngrediente(int id, Ingrediente ingrediente)
        {
            if (id != ingrediente.Id)
                return BadRequest();

            try
            {
                await _ingredienteDLL.ActualizarIngredienteAsync(id, ingrediente);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarIngrediente(int id)
        {
            var result = await _ingredienteDLL.EliminarIngredienteAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
