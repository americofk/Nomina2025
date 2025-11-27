/// <summary>
/// Controlador para la gestión de proyectos inactivos.
/// Permite visualizar, reactivar y eliminar proyectos inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de ProjectDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("proyectosinactivos")]
    public class ProjectDisabledController : ControllerBase
    {
     
        ProcessProjectDisabled process;
        /// <summary>
        /// Ejecuta Projects de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Projects()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessProjectDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Project>.GetPropertyToSearch();
            return View(model);

            
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdProject">Parametro IdProject.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdProject)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjectDisabled(dataUser[0]);

            responseUI = await process.DeleteDataAsync(IdProject);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="IdProject">Parametro IdProject.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> IdProject)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessProjectDisabled(dataUser[0]);
            foreach (var item in IdProject)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }
        /// <summary>
        /// Ejecuta ProjectDisabledFilterOrMoreData de forma asincrona.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ProjectDisabledFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessProjectDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("ProjectDisabledFilterOrMoreData", model);
        }

    }
}
