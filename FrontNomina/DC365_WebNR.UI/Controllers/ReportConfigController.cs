/// <summary>
/// Controlador para la configuración de reportes.
/// Permite configurar parámetros específicos para la generación de reportes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de ReportConfig.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("configuracionreportes")]
    public class ReportConfigController : ControllerBase
    {
        ProcessReportConfig process;

        /// <summary>

        /// Ejecuta ReportsConfig de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> ReportsConfig()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessReportConfig(dataUser[0]);
            var model = await process.GetAllDataAsync();

            ViewBag.Earnings = await selectListsDropDownList(SelectListOptions.EarningCodeEarning);
            ViewBag.Deductions = await selectListsDropDownList(SelectListOptions.DeductionCode);
            ViewBag.Taxes = await selectListsDropDownList(SelectListOptions.Tax);
            ViewBag.Loans = await selectListsDropDownList(SelectListOptions.Loan);

            if (model.Count() == 0)
                return View(new ReportConfig());
            else
                return View(model.First());
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(ReportConfig model)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessReportConfig(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                responseUI = await process.PostDataAsync(model);
            }

            return (Json(responseUI));
        }
    }
}
