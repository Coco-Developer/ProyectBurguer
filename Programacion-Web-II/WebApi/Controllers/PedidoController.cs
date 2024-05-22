using LibreriaDeClases;
using DLL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly PedidoDLL _pedidoDLL;

        public PedidosController(PedidoDLL pedidoDLL)
        {
            _pedidoDLL = pedidoDLL;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodosLosPedidos()
        {
            var pedidos = await _pedidoDLL.ObtenerTodosLosPedidosAsync();
            return Ok(pedidos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPedidoPorId(int id)
        {
            var pedido = await _pedidoDLL.ObtenerPedidoPorIdAsync(id);
            if (pedido == null)
                return NotFound();
            return Ok(pedido);
        }

        [HttpPost]
        public async Task<IActionResult> AgregarPedido(Pedido pedido)
        {
            await _pedidoDLL.AgregarPedidoAsync(pedido);
            return CreatedAtAction(nameof(ObtenerPedidoPorId), new { id = pedido.Id }, pedido);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPedido(int id, Pedido pedido)
        {
            if (id != pedido.Id)
                return BadRequest();

            try
            {
                await _pedidoDLL.ActualizarPedidoAsync(id, pedido);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarPedido(int id)
        {
            var result = await _pedidoDLL.EliminarPedidoAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
