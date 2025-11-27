/// <summary>
/// Controlador para el historial de empleados.
/// Permite consultar, actualizar y eliminar registros históricos de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de EmployeeHistory.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("historialempleado")]
    public class EmployeeHistoryController : ControllerBase
    {
        ProcessEmployeeHistory process;

        /// <summary>

        /// Ejecuta EmployeeHistory de forma asincrona.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="name">Parametro name.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> EmployeeHistory(string employeeid, string name)
        {
            GetdataUser();
            process = new ProcessEmployeeHistory(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(employeeid);
            ViewBag.Filter = FilterHelper<EmployeeHistoryResponse>.GetPropertyToSearch();
            ViewBag.employeData = name;
            return View(model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid">Parametro listid.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<EmployeeHistoryDeleteRequest> listid, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid, employeeid);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta la operacion FormUpdateEmployeeHistory.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormUpdateEmployeeHistory")]
        public ActionResult FormUpdateEmployeeHistory()
        {
            GetdataUser();
            return PartialView("ModalUpdateEmployeeHistory");
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("UpdateEmployeeHistory")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UpdateEmployeeHistory(EmployeeHistoryUpdateRequest  request, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.PutDataAsync(employeeid, request);
            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta MarkForDgt de forma asincrona.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("marcarparadgt")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForDgt(EmployeeHistoryIsForDGTRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeHistory(dataUser[0]);

            responseUI = await process.MaxForDgtAsync(model);

            return (Json(responseUI));
        }
    }
}
