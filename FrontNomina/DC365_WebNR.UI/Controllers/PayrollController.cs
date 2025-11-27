/// <summary>
/// Controlador para la gestión de nóminas activas.
/// Permite crear, editar, eliminar e inhabilitar configuraciones de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
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
    /// Controlador para gestion de Payroll.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("nomina")]
    public class PayrollController : ControllerBase
    {
        ProcessPayroll process;
        /// <summary>
        /// Ejecuta Payrolls de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet]
        public async Task<IActionResult> Payrolls()
        {
            GetdataUser();
            await GetLayoutDefauld();

            process = new ProcessPayroll(dataUser[0]);
            ViewBag.Currencies = await selectListsDropDownList(SelectListOptions.Currency);
            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Payroll>.GetPropertyToSearch();

            return View(model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Payroll Obj, string operacion)
        {
            GetdataUser();
            ResponseUI<Payroll> responseUI = new ResponseUI<Payroll>();
            process = new ProcessPayroll(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operacion)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(Obj.PayrollId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="IdPayroll">Parametro IdPayroll.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdPayroll)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayroll(dataUser[0]);

            responseUI = await process.DeleteDataAsync(IdPayroll);

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Payroll _model = new Payroll();
            process = new ProcessPayroll(dataUser[0]);

            _model = await process.GetIdDataAsync(Id);

            return (Json(_model));
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="payrollIdOp">Parametro payrollIdOp.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> payrollIdOp)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPayroll(dataUser[0]);

            foreach (var item in payrollIdOp)
            {
                responseUI = await process.UpdateStatus(item);
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta Payroll_Filter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Payroll_Filter_Or_MoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPayroll(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);
            return PartialView("Payroll_Filter_Or_MoreData", model);
        }
    }
}
