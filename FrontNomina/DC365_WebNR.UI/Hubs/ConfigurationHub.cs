/// <summary>
/// Hub de SignalR para notificaciones de configuración en tiempo real.
/// Gestiona notificaciones de cambios de configuración entre clientes conectados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Hubs
{
    /// <summary>
    /// Hub de SignalR para Configuration.
    /// </summary>
    public class ConfigurationHub : Hub
    {
        /// <summary>
        /// Notifica.
        /// </summary>
        /// <param name="companyid">Parametro companyid.</param>
        public async Task NotifyChange(string companyid)
        {
            await Clients.Group(Context.GetHttpContext().Session.Id).SendAsync("NotifyChange", companyid);
        }

        /// <summary>

        /// Ejecuta la operacion OnConnectedAsync.

        /// </summary>

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.GetHttpContext().Session.Id);
            return base.OnConnectedAsync();
        }
    }
}
