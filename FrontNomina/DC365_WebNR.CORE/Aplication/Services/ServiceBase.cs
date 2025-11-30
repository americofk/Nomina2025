/// <summary>
/// Servicio base para todos los servicios del sistema.
/// Proporciona funcionalidad común y métodos base para los servicios de la aplicación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Clase base para ServiceBase.
    /// </summary>
    public class ServiceBase
    {
        public string Token;
        public UrlsServices urlsServices = new UrlsServices();

        /// <summary>

        /// Ejecuta la operacion CatchError.

        /// </summary>

        /// <param name="response">Parametro response.</param>

        /// <returns>Resultado de la operacion.</returns>

        protected ResponseUI CatchError(HttpResponseMessage response)
        {
            ResponseUI responseUI = new ResponseUI();

            if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
            {
                var content = response.Content.ReadAsStringAsync().Result;
                try
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(content);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError?.Errors ?? new List<string>() { content };
                }
                catch
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { content };
                }
            }
            else
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
            }

            return responseUI;
        }
    }
}
