/// <summary>
/// Controlador para la gestión de departamentos asignados a empleados.
/// Permite crear, editar, eliminar y listar asignaciones de departamento.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de EmployeeDepartment.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("departamentoempleados")]
    public class EmployeeDepartmentController : ControllerBase
    {
        ProcessEmployeeDepartment process;
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeDepartment(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            return PartialView("ListEmployeeDepartment", list);
        }

        /// <summary>

        /// Ejecuta la operacion EmployeeDepartment.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNewEmployeeDepartment")]
        public ActionResult EmployeeDepartment()
        {
            EmployeeDepartment model = new EmployeeDepartment();
            return PartialView("NewEmployeeDepartment", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeDepartment model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeDepartment(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.DepartmentId, model);
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
            EmployeeDepartment _model = new EmployeeDepartment();
            process = new ProcessEmployeeDepartment(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);

            return PartialView("NewEmployeeDepartment", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_Department">Parametro listid_Department.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_Department, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeDepartment(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_Department, employeeid);

            return (Json(responseUI));
        }
    }
}
