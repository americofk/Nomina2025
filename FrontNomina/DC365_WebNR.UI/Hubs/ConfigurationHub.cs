using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Hubs
{
    public class ConfigurationHub : Hub
    {
        public async Task NotifyChange(string companyid)
        {
            await Clients.Group(Context.GetHttpContext().Session.Id).SendAsync("NotifyChange", companyid);
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.GetHttpContext().Session.Id);
            return base.OnConnectedAsync();
        }
    }
}
