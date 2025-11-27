/// <summary>
/// Controlador para la gestión de préstamos inactivos.
/// Permite visualizar, reactivar y eliminar préstamos inhabilitados.
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
    /// Controlador para gestion de LoanDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("prestamosinactivos")]
    public class LoanDisabledController : ControllerBase
    {
        ProcessLoanDisabled process;
        /// <summary>
        /// Ejecuta LoansDisabled de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> LoansDisabled()
        {
            GetdataUser();
            process = new ProcessLoanDisabled(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Loan>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_Loans">Parametro listid_Loans.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessLoanDisabled(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Loans);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="listid_Loans">Parametro listid_Loans.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Loans)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessLoanDisabled(dataUser[0]);
            foreach (var item in listid_Loans)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta LoansFilteOrMoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> LoansFilteOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessLoanDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("LoansFilter", model);
        }

    }
}
