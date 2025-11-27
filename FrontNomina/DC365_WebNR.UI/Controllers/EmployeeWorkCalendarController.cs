/// <summary>
/// Controlador para la gestión de horarios de trabajo de empleados.
/// Permite crear, editar, eliminar y consultar calendarios de trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de EmployeeWorkCalendar.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("horarioempleado")]
    public class EmployeeWorkCalendarController : ControllerBase
    {
        ProcessEmployeeWorkCalendar process;

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];

            return PartialView("ListEmployeeWorkCalendar", list);
        }

        /// <summary>

        /// Ejecuta EmployeeWorkCalendar de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNewEmployeeWorkCalendar")]
        public async Task<ActionResult> EmployeeWorkCalendar()
        {
            GetdataUser();
            EmployeeWorkCalendar model = new EmployeeWorkCalendar();
            return PartialView("NewEmployeeWorkCalendar", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeWorkCalendar model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.InternalId, model);
                        break;
                }
            }

            return (Json(responseUI));
        }

        //[HttpGet("{employeeid}/{internalId}")]
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="internalId">Parametro internalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("ListCalendar")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeWorkCalendar _model = new EmployeeWorkCalendar();
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);
            _model = await process.GetDataAsync(employeeid, internalId.ToString());

            return PartialView("NewEmployeeWorkCalendar", _model);
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
            process = new ProcessEmployeeWorkCalendar(dataUser[0]);

            responseUI = await process.DeleteDataAsync(model, employeeid);

            return (Json(responseUI));
        }

    }
}
