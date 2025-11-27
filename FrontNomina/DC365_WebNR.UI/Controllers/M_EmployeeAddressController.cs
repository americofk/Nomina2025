/// <summary>
/// Controlador para la gestión de direcciones de empleados.
/// Permite crear, editar, eliminar y listar direcciones de residencia de empleados.
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
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_EmployeeAddress.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("direccionempleados")]
    public class M_EmployeeAddressController : ControllerBase
    {
        ProcessEmployeeAddress processEmployeeAddress;

        //[HttpGet("buscardirecciones")]
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("{employeeid}")]
        public async Task<ActionResult> Get(string employeeid)
        {
            GetdataUser();
            processEmployeeAddress = new ProcessEmployeeAddress(dataUser[0]);

            var PositionRequirement = await processEmployeeAddress.GetAllDataAsync(employeeid);
            return PartialView("ListEmployeeAddress", PositionRequirement);
        }


        /// <summary>


        /// Guarda los cambios.


        /// </summary>


        /// <param name="Obj">Parametro Obj.</param>


        /// <param name="operacion">Parametro operacion.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(EmployeeAddress Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processEmployeeAddress = new ProcessEmployeeAddress(dataUser[0]);
          
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
                        responseUI = await processEmployeeAddress.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processEmployeeAddress.PutDataAsync(Obj.InternalId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ListIdAddress">Parametro ListIdAddress.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> ListIdAddress, string employeeid)
        {
            GetdataUser();
            ResponseUI responseUI;
            processEmployeeAddress = new ProcessEmployeeAddress(dataUser[0]);

            responseUI = await processEmployeeAddress.DeleteDataAsync(ListIdAddress, employeeid);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta NewAddresEmployee de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("formularioNewAddres")]
        public async Task<ActionResult> NewAddresEmployee()
        {
            GetdataUser();
            EmployeeAddress employee = new EmployeeAddress();
            ViewBag.Provinces = await selectListsDropDownList(SelectListOptions.Province);
            return PartialView("NewAddresEmployee", employee);
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
            EmployeeAddress _model = new EmployeeAddress();
            processEmployeeAddress = new ProcessEmployeeAddress(dataUser[0]);

            ViewBag.Provinces = await selectListsDropDownList(SelectListOptions.Province);
            _model = await processEmployeeAddress.GetDataAsync(employeeid, internalId);

            //return (Json(_model));
            return PartialView("NewAddresEmployee", _model);
        }
    }

}
