/// <summary>
/// Controlador para la gestión de préstamos de empleados.
/// Permite crear, editar, eliminar y consultar préstamos asignados a empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de EmployeeLoan.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("prestamosempleados")]
    public class EmployeeLoanController : ControllerBase
    {
        ProcessEmployeeLoan process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeLoan(dataUser[0]);
            var list = await process.GetAllDataAsync(employeeid);
            ViewBag.Culture = dataUser[5];
            return PartialView("EmployeeLoans", list);
        }

        /// <summary>

        /// Ejecuta EmployeeEmployeeLoans de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNewEmployeeLoans")]
        public async Task<ActionResult> EmployeeEmployeeLoans()
        {
            GetdataUser();
            EmployeeLoan model = new EmployeeLoan();
            ViewBag.Paycyle = new List<SelectListItem>();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Loan = await selectListsDropDownList(SelectListOptions.Loan);
            return PartialView("NewEmployeeLoans", model);
        }


        /// <summary>


        /// Guarda los cambios.


        /// </summary>


        /// <param name="model">Parametro model.</param>


        /// <param name="operation">Parametro operation.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(EmployeeLoan model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeLoan(dataUser[0]);

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

        /// <param name="loanid">Parametro loanid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}/{loanid}")]
        public async Task<ActionResult> GetId(string employeeid, string loanid)
        {
            GetdataUser();
            EmployeeLoan _model;
            process = new ProcessEmployeeLoan(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, loanid);
            ViewBag.Paycyle = await selectListsDropDownList(SelectListOptions.PayCycles, _model.PayrollId);
            ViewBag.Payrolls = null;
            ViewBag.Loan = null;
            return PartialView("NewEmployeeLoans", _model);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalId">Parametro internalId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("GethistoriLoan")]
        public async Task<ActionResult> GethistoriLoan(string employeeid, int internalId)
        {
            GetdataUser();
            process = new ProcessEmployeeLoan(dataUser[0]);

            var list = await process.GetHistoryLoan(employeeid, internalId);
            ViewBag.Culture = dataUser[5];
            return PartialView("GethistoriLoan", list);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_EmployeeLoan">Parametro listid_EmployeeLoan.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_EmployeeLoan, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeLoan(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_EmployeeLoan, employeeid);

            return (Json(responseUI));
        }


    }
}
