/// <summary>
/// Controlador para la gestión de información de contacto de empleados.
/// Permite crear, editar, eliminar y listar contactos de emergencia.
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
    /// Controlador para gestion de EmployeeContactInf.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("contactoinfoempleados")]
    public class EmployeeContactInfController : ControllerBase
    {
        ProcessEmployeeContactInf process;

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            process = new ProcessEmployeeContactInf(dataUser[0]);

            var list = await process.GetAllDataAsync(employeeid);
            return PartialView("ListEmployeeContactInf", list);
        }

        /// <summary>

        /// Ejecuta la operacion NewContactInfoEmployee.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormNuevoContactInfo")]
        public ActionResult NewContactInfoEmployee()
        {
            EmployeeContactInf model = new EmployeeContactInf();
            return PartialView("NewContactInfoEmployee", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeContactInf model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessEmployeeContactInf(dataUser[0]);

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
            EmployeeContactInf _model = new EmployeeContactInf();
            process = new ProcessEmployeeContactInf(dataUser[0]);

            _model = await process.GetDataAsync(employeeid, internalId);

            //return (Json(_model));
            return PartialView("NewContactInfoEmployee", _model);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_contactinfo">Parametro listid_contactinfo.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_contactinfo, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessEmployeeContactInf(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_contactinfo, employeeid);

            return (Json(responseUI));
        }
    }
}
