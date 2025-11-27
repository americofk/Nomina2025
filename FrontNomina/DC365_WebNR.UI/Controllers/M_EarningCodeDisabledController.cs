/// <summary>
/// Controlador para la gestión de códigos de ganancia inactivos.
/// Permite visualizar y reactivar códigos de ganancia inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_EarningCodeDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("codigosgananciainactivos")]
    public class M_EarningCodeDisabledController : ControllerBase
    {
        ProcessEarningCodeDisabled process;
        /// <summary>
        /// Ejecuta EarningCodeDisabled de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> EarningCodeDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<EarningCode>.GetPropertyToSearch();
            return View(model);
        }

        

        /// <summary>

        

        /// Actualiza un registro existente.

        

        /// </summary>

        

        /// <param name="EarCodeId">Parametro EarCodeId.</param>

        

        /// <returns>Resultado de la operacion.</returns>

        

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> EarCodeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            foreach (var item in EarCodeId)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta EarningCodes_Disabled_CodeFilter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> EarningCodes_Disabled_CodeFilter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessEarningCodeDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(_PageNumber, false, "", PropertyName, PropertyValue);

            return PartialView("EarningCodes_Disabled_CodeFilter_Or_MoreData", model);
        }

    }
}
