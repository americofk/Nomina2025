/// <summary>
/// Controlador para la gestión de puestos inactivos.
/// Permite visualizar, reactivar y eliminar puestos inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_PositionDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("puestosinactivos")]
    public class M_PositionDisabledController : ControllerBase
    {
        ProcessPositionDisabled process;
        /// <summary>
        /// Ejecuta PositionsDisabled de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet()]
        public async Task<IActionResult> PositionsDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessPositionDisabled(dataUser[0]);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Position>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Ejecuta PositionsDisabled_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> PositionsDisabled_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPositionDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("PositionsDisabled_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> Obj)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPositionDisabled(dataUser[0]);

            responseUI = await process.DeleteDataAsync(Obj);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="PositionIdpos">Parametro PositionIdpos.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(List<string> PositionIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPositionDisabled(dataUser[0]);

            foreach (var item in PositionIdpos)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

    }
}
