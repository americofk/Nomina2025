/// <summary>
/// Interfaz para ConnectThirdServices.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Interfaz para IConnectThirdServices.
    /// </summary>
    public interface IConnectThirdServices
    {
        public Task<HttpResponseMessage> CallAsync(string url, object body, HttpMethod method, IFormFile file = null);
    }
}
