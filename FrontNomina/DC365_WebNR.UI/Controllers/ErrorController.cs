/// <summary>
/// Controlador para el manejo de páginas de error.
/// Muestra páginas de error personalizadas y errores de licencia.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    //[UserAttribute]
    /// <summary>
    /// Controlador para gestion de Error.
    /// </summary>
    public class ErrorController : ControllerBase
    {
        /// <summary>
        /// Ejecuta la operacion Index.
        /// </summary>
        /// <param name="message">Parametro message.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public IActionResult Index(string message)
        {
            return View(message);
        }

        /// <summary>

        /// Ejecuta la operacion ReportDesign.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public IActionResult ReportDesign()
        {
            return View();
        }

        /// <summary>

        /// Ejecuta ErrorKeyLicense de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> ErrorKeyLicense()
        {
            GetdataUser();
            await GetLayoutDefauld();
            return View();
        }
    }
}
