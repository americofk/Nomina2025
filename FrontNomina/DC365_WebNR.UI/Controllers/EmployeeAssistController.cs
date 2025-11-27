/// <summary>
/// Controlador para el control de asistencia de empleados.
/// Permite registrar, editar y consultar el calendario de control laboral.
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
    /// Controlador para gestion de EmployeeAssist.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("controlasistenciaempleado")]
    public class EmployeeAssistController : ControllerBase
    {
        ProcessEmployeeAssist process;

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];
            process = new ProcessEmployeeAssist(dataUser[0]);
            var list = await process.GetAllDataAsync(employeeid);

            return PartialView("EmployeeAssist", list);
        }

        /// <summary>

        /// Ejecuta Employee_ExtraHour_Filter_Or_MoreData de forma asincrona.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Employee_ExtraHour_Filter_Or_MoreData(string employeeid, string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessEmployeeAssist(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync(employeeid, _PageNumber, PropertyName, PropertyValue);

            return PartialView("Employee_ExtraHour_Filter_Or_MoreData", model);
        }


        /// <summary>


        /// Ejecuta EmployeeAssist de forma asincrona.


        /// </summary>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("formnewemployeeassist")]
        public async Task<ActionResult> EmployeeAssist()
        {
            GetdataUser();
            EmployeeWorkControlCalendarResponse model = new EmployeeWorkControlCalendarResponse();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.EarningCodehours = await selectListsDropDownList(SelectListOptions.EarningCodehours);
            return PartialView("NewEmployeeAssist", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeWorkControlCalendarRequest model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeAssist(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operation)
                {
                    case "1":
                        responseUI = await process.PostDataAsync(model);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(model.EmployeeId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalId">Parametro internalId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ListWorkControlCalendar")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeWorkControlCalendarResponse _model;
            process = new ProcessEmployeeAssist(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId.ToString());

            return PartialView("NewEmployeeAssist", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<EmployeeWorkCalendarDeleteRequest> model, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeAssist(dataUser[0]);

            responseUI = await process.DeleteDataAsync(model, employeeid);

            return (Json(responseUI));
        }

    }
}
