/// <summary>
/// Interfaz para HubNotification.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Interfaz para IHubNotification.
    /// </summary>
    public interface IHubNotification
    {
        public Task NotificationBatchImport(string messages);
    }
}
