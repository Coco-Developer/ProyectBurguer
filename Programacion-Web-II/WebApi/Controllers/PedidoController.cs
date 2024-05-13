using DLL;
using LibreriaDeClases;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : ControllerBase
    {
        // GET: /Pedido
        [HttpGet]
        public ActionResult<List<Pedido>> Get()
        {
            // Obtener todos los pedidos
            var pedidos = PedidoDLL.ObtenerTodosLosPedidos();
            if (pedidos.Count == 0)
            {
                return NotFound("No se encontraron pedidos.");
            }
            return Ok(pedidos);
        }

        // GET: /Pedido/{id}
        [HttpGet("{id}")]
        public ActionResult<Pedido> Get(int id)
        {
            // Obtener un pedido por su ID
            var pedido = PedidoDLL.ObtenerPedidoPorId(id);
            if (pedido == null)
            {
                return NotFound($"Pedido con ID {id} no encontrado.");
            }
            return Ok(pedido);
        }

        // POST: /Pedido
        [HttpPost]
        public ActionResult<Pedido> Post([FromBody] Pedido pedido)
        {
            // Agregar un nuevo pedido
            PedidoDLL.AgregarPedido(pedido.UsuarioId, pedido.HamburguesaId, pedido.FechaPedido, pedido.Cantidad);
            return CreatedAtAction(nameof(Get), new { id = pedido.Id }, pedido);
        }

        // PUT: /Pedido/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Pedido pedido)
        {
            if (id != pedido.Id)
            {
                return BadRequest("El ID del pedido en el cuerpo de la solicitud no coincide con el ID de la URL.");
            }

            // Actualizar un pedido
            try
            {
                PedidoDLL.ActualizarPedido(pedido);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: /Pedido/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Eliminar un pedido por su ID
            try
            {
                PedidoDLL.EliminarPedido(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
