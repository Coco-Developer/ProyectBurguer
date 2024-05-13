using DLL;
using LibreriaDeClases;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HamburguesaController : ControllerBase
    {
        private readonly HamburguesaDLL hamburguesaDLL;

        public HamburguesaController(HamburguesaDLL hamburguesaDLL)
        {
            this.hamburguesaDLL = hamburguesaDLL;
        }

        // GET: /Hamburguesa
        [HttpGet]
        public ActionResult<List<Hamburguesa>> Get()
        {
            var hamburguesas = HamburguesaDLL.ObtenerTodasLasHamburguesas();
            if (hamburguesas.Count == 0)
            {
                return NotFound("No se encontraron hamburguesas.");
            }
            return Ok(hamburguesas);
        }

        // GET: /Hamburguesa/{id}
        [HttpGet("{id}")]
        public ActionResult<Hamburguesa> Get(int id)
        {
            var hamburguesa = HamburguesaDLL.ObtenerHamburguesaPorId(id);
            if (hamburguesa == null)
            {
                return NotFound($"Hamburguesa con ID {id} no encontrada.");
            }
            return Ok(hamburguesa);
        }

        // POST: /Hamburguesa
        [HttpPost]
        public ActionResult<Hamburguesa> Post([FromBody] Hamburguesa hamburguesa)
        {
            // No es necesario proporcionar el ID al agregar una hamburguesa,
            // ya que es autoincremental y se generará automáticamente
            HamburguesaDLL.AgregarHamburguesa(hamburguesa);
            return CreatedAtAction(nameof(Get), new { id = hamburguesa.IdHamburguesa }, hamburguesa);
        }

        // PUT: /Hamburguesa/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Hamburguesa hamburguesa)
        {
            // Verificar si la hamburguesa a actualizar tiene el mismo ID que el proporcionado en la URL
            if (id != hamburguesa.IdHamburguesa)
            {
                return BadRequest("El ID de la hamburguesa en el cuerpo de la solicitud no coincide con el ID de la URL.");
            }

            // Actualizar la hamburguesa en la lista
            try
            {
                HamburguesaDLL.ActualizarHamburguesa(hamburguesa);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }



        // DELETE: /Hamburguesa/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!HamburguesaDLL.EliminarHamburguesa(id))
            {
                return NotFound($"Hamburguesa con ID {id} no encontrada.");
            }
            return NoContent();
        }
    }
}
