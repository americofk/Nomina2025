/// <summary>
/// Controlador para la gestión de impuestos de empleados.
/// Permite crear, editar, eliminar y listar impuestos asignados a empleados.
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
    /// Controlador para gestion de EmployeeTax.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("impuestosempleado")]
    public class EmployeeTaxController : ControllerBase
    {
        ProcessEmployeeTax process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {

            GetdataUser();
            process = new ProcessEmployeeTax(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            return PartialView("EmployeeTax", list);



        }

        /// <summary>

        /// Ejecuta EmployeeTaxs de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNewEmployeeTaxs")]
        public async Task<ActionResult> EmployeeTaxs()
        {
            GetdataUser();
            EmployeeTax model = new EmployeeTax();
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Tax = await selectListsDropDownList(SelectListOptions.Tax);
            return PartialView("NewEmployeeTaxs", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeTax model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeTax(dataUser[0]);

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

        [HttpGet("{employeeid}/{internalId}")]
        public async Task<ActionResult> GetId(string employeeid, string internalId)
        {
            GetdataUser();
            EmployeeTax _model;
            process = new ProcessEmployeeTax(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);
            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Tax = await selectListsDropDownList(SelectListOptions.Tax);
            return PartialView("NewEmployeeTaxs", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_EmployeeTaxs">Parametro listid_EmployeeTaxs.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_EmployeeTaxs, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeTax(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_EmployeeTaxs, employeeid);

            return (Json(responseUI));
        }


    }
}
