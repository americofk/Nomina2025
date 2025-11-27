/// <summary>
/// Controlador para la gestión de ciclos de pago.
/// Permite crear, eliminar y marcar ciclos para impuestos y TSS.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de PayCycle.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("ciclopagos")]
    public class PayCycleController : ControllerBase
    {
        ProcessPayCycle process;

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollId">Parametro payrollId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollId}")]
        public async Task<ActionResult> Get(string payrollId)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);

            var list = await process.GetAllDataAsync(payrollId);
            ViewBag.Culture = dataUser[5];
            ViewBag.CountPageNumber = 0;

            return PartialView("ListPayCycle", list);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="PayrollId">Parametro PayrollId.</param>

        /// <param name="PayCycleQty">Parametro PayCycleQty.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(string PayrollId, int PayCycleQty)
        {
            GetdataUser();
            ResponseUI<List<PayCycle>> responseUI = new ResponseUI<List<PayCycle>>();

            if(PayCycleQty == 0)
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { "La cantidad no puede ser cero" };
                return Json(responseUI);
            }

            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.PostDataAsync(PayrollId, PayCycleQty);
           
            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdPayCycle">Parametro IdPayCycle.</param>

        /// <param name="_PayrollId">Parametro _PayrollId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> IdPayCycle, string _PayrollId)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);
            IdPayCycle.Reverse();
            responseUI = await process.DeleteDataAsync(IdPayCycle, _PayrollId);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta MarkForTax de forma asincrona.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("marcarimpuesto")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForTax(PayCycleIsForTaxRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.MaxForTaxAsync(model);

            return (Json(responseUI));
        }
        /// <summary>
        /// Ejecuta MarkForTss de forma asincrona.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost("marcartss")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> MarkForTss(PayCycleIsForTssRequest model)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayCycle(dataUser[0]);

            responseUI = await process.MaxForTssAsync(model);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta MoreData de forma asincrona.

        /// </summary>

        /// <param name="pagenumber">Parametro pagenumber.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("moredata")]
        public async Task<ActionResult> MoreData(int pagenumber,string id)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);

            var list = await process.GetAllDataAsync(id,pagenumber);
            ViewBag.Culture = dataUser[5];
            return PartialView("ListPayCycle", list);
        }

        /// <summary>

        /// Ejecuta ListPayCycle_Filter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ListPayCycle_Filter_Or_MoreData(string Id,int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPayCycle(dataUser[0]);
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(Id,_PageNumber);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListPayCycle", model);
        }


    }
}
