/// <summary>
/// Componente de infraestructura para ConnectThirdServices.
/// Implementa servicios de soporte para el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Interface;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Infrastructure.Service
{
    /// <summary>
    /// Clase para gestion de ConnectThirdServices.
    /// </summary>
    public class ConnectThirdServices : IConnectThirdServices
    {
        /// <summary>
        /// Ejecuta CallAsync de forma asincrona.
        /// </summary>
        /// <param name="url">Parametro url.</param>
        /// <param name="body">Parametro body.</param>
        /// <param name="method">Parametro method.</param>
        /// <param name="file">Parametro file.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<HttpResponseMessage> CallAsync(string url, object body, HttpMethod method, IFormFile file = null)
        {
            HttpClient client = new HttpClient();
            MultipartFormDataContent form = null;
            HttpRequestMessage message = new HttpRequestMessage(method, url);

            if (body != null)
            {
                message.Content = new StringContent(JsonConvert.SerializeObject(body), UnicodeEncoding.UTF8, "application/json");
            }

            if (file != null)
            {
                byte[] data;
                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    data = ms.ToArray();
                }

                form = new MultipartFormDataContent();
                form.Add(new ByteArrayContent(data), "file", file.FileName);

            }

            return await client.SendAsync(message);
        }
    }
}
