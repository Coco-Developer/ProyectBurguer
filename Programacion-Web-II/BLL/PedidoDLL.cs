using LibreriaDeClases;
using System;
using System.Collections.Generic;

namespace DLL
{
    public class PedidoDLL
    {
        // Lista de pedidos con los pedidos predefinidos
        private static readonly List<Pedido> pedidos = new()
        {
            new Pedido(1, 1, DateTime.Now, 2),
            new Pedido(2, 2, DateTime.Now, 1),
            new Pedido(3, 3, DateTime.Now, 3)
        };

        // Objeto para controlar el acceso a la lista de pedidos de forma segura en entornos multiproceso
        private static readonly object _bloqueo = new();

        // Método para agregar un pedido
        public static void AgregarPedido(int usuarioId, int hamburguesaId, DateTime fechaPedido, int cantidad)
        {
            lock (_bloqueo)
            {
                // Crear un nuevo pedido con el próximo ID
                var nuevoPedido = new Pedido(usuarioId, hamburguesaId, fechaPedido, cantidad);
                pedidos.Add(nuevoPedido);
            }
        }

    

        // Método para obtener todos los pedidos
        public static List<Pedido> ObtenerTodosLosPedidos()
        {
            return pedidos;
        }

        // Método para obtener un pedido por su ID
        public static Pedido ObtenerPedidoPorId(int id)
        {
            return pedidos.Find(p => p.Id == id);
        }

        // Método para actualizar un pedido
        public static void ActualizarPedido(Pedido pedidoActualizado)
        {
            lock (_bloqueo)
            {
                var pedidoExistente = pedidos.Find(p => p.Id == pedidoActualizado.Id);
                if (pedidoExistente != null)
                {
                    // Actualizar los datos del pedido existente
                    pedidoExistente.UsuarioId = pedidoActualizado.UsuarioId;
                    pedidoExistente.HamburguesaId = pedidoActualizado.HamburguesaId;
                    pedidoExistente.FechaPedido = pedidoActualizado.FechaPedido;
                    pedidoExistente.Cantidad = pedidoActualizado.Cantidad;
                }
                else
                {
                    throw new ArgumentException($"No se encontró ningún pedido con el ID {pedidoActualizado.Id}.");
                }
            }
        }

        // Método para eliminar un pedido por su ID
        public static void EliminarPedido(int id)
        {
            lock (_bloqueo)
            {
                var pedidoAEliminar = pedidos.Find(p => p.Id == id);
                if (pedidoAEliminar != null)
                {
                    pedidos.Remove(pedidoAEliminar);
                }
                else
                {
                    throw new ArgumentException($"No se encontró ningún pedido con el ID {id}.");
                }
            }
        }
    }
}
