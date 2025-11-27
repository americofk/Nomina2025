/// <summary>
/// Controlador para la gestión de impuestos inactivos.
/// Permite visualizar y reactivar impuestos inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de TaxDisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("impuestosinactivos")]
    public class TaxDisabledController : ControllerBase
    {
        ProcessTaxDisabled process;
        /// <summary>
        /// Ejecuta TaxsDidabled de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        

        public async Task<IActionResult> TaxsDidabled()
        {
            GetdataUser();
            process = new ProcessTaxDisabled(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Tax>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="listid_Tax">Parametro listid_Tax.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> listid_Tax)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessTaxDisabled(dataUser[0]);
            foreach (var item in listid_Tax)
            {
                responseUI = await process.UpdateStatus(item);

            }

            return (Json(responseUI));
        }
        /// <summary>
        /// Ejecuta TaxDisabledFilterOrMoreData de forma asincrona.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> TaxDisabledFilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessTaxDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("TaxDisabledFilterOrMoreData", model);
        }


    }
}
