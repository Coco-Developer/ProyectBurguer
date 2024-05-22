using LibreriaDeClases;
using DLL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HamburguesasController : ControllerBase
    {
        private readonly HamburguesaDLL _hamburguesaDLL;

        public HamburguesasController(HamburguesaDLL hamburguesaDLL)
        {
            _hamburguesaDLL = hamburguesaDLL;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodasLasHamburguesas()
        {
            var hamburguesas = await _hamburguesaDLL.ObtenerTodasLasHamburguesasAsync();
            return Ok(hamburguesas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerHamburguesaPorId(int id)
        {
            var hamburguesa = await _hamburguesaDLL.ObtenerHamburguesaPorIdAsync(id);
            if (hamburguesa == null)
                return NotFound();
            return Ok(hamburguesa);
        }

        [HttpPost]
        public async Task<IActionResult> AgregarHamburguesa(Hamburguesa hamburguesa)
        {
            await _hamburguesaDLL.AgregarHamburguesaAsync(hamburguesa);
            return CreatedAtAction(nameof(ObtenerHamburguesaPorId), new { id = hamburguesa.Id }, hamburguesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarHamburguesa(int id, Hamburguesa hamburguesa)
        {
            if (id != hamburguesa.Id)
                return BadRequest();

            try
            {
                await _hamburguesaDLL.ActualizarHamburguesaAsync(id, hamburguesa);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarHamburguesa(int id)
        {
            var result = await _hamburguesaDLL.EliminarHamburguesaAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
