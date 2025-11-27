/// <summary>
/// Filtro de excepciones para validación de licencias.
/// Intercepta errores relacionados con licencias y redirige a página de error apropiada.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    /// <summary>
    /// Filtro para License.
    /// </summary>
    public class LicenseFilter : IExceptionFilter
    {
        /// <summary>
        /// Ejecuta la operacion OnException.
        /// </summary>
        /// <param name="context">Parametro context.</param>
        public void OnException(ExceptionContext context)
        {
            if (context.Exception.Message.Contains("Key-error"))
            {
                context.Result = new RedirectToRouteResult(
                                    new RouteValueDictionary
                                    {
                                            { "action", "ErrorKeyLicense" },
                                            { "controller", "Error" }
                                    });
            }
        }
    }
}
