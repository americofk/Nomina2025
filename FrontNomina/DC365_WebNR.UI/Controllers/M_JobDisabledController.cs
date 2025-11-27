/// <summary>
/// Controlador para la gestión de cargos inactivos.
/// Permite visualizar, reactivar y eliminar cargos inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_JobDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("cargosinactivos")]
    public class M_JobDisabledController : ControllerBase
    {
        ProcessJobDisabled processJob;

        /// <summary>

        /// Ejecuta Jobs de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Jobs()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processJob = new ProcessJobDisabled(dataUser[0]);
            var model = await processJob.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Job>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Ejecuta JobDisabled_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> JobDisabled_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processJob = new ProcessJobDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processJob.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("JobDisabled_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdJobsDisabled">Parametro IdJobsDisabled.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdJobsDisabled)
        {
            GetdataUser();
            ResponseUI responseUI;
            processJob = new ProcessJobDisabled(dataUser[0]);

            responseUI = await processJob.DeleteDataAsync(IdJobsDisabled);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="JobIdpos">Parametro JobIdpos.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> JobIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processJob = new ProcessJobDisabled(dataUser[0]);
            foreach (var item in JobIdpos)
            {
                responseUI = await processJob.UpdateStatus(item);

            }

            return (Json(responseUI));
        }
    }
}
