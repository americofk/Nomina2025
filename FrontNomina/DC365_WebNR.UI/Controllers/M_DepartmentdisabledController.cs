/// <summary>
/// Controlador para la gestión de departamentos inactivos.
/// Permite visualizar, reactivar y eliminar departamentos inhabilitados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Departmentdisabled.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("departamentosinactivos")]
    public class M_DepartmentdisabledController : ControllerBase
    {
        ProcessDepartamentDisabled processDepartament;
        /// <summary>
        /// Ejecuta Departmentdisabled de forma asincrona.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet()]
        public async Task<IActionResult> Departmentdisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            ViewData["ListDepartment"] = await processDepartament.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Department>.GetPropertyToSearch();

            return View();
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ListIdDepartmentDisabled">Parametro ListIdDepartmentDisabled.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> deleteDepartmentDisabled(List<string> ListIdDepartmentDisabled)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);

            responseUI = await processDepartament.DeleteDataAsync(ListIdDepartmentDisabled);

            return (Json(responseUI));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="DepartmentId">Parametro DepartmentId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> DepartmentId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            foreach (var item in DepartmentId)
            {
                responseUI = await processDepartament.UpdateStatusDepartment(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta DepartamentDisabled_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> DepartamentDisabled_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processDepartament = new ProcessDepartamentDisabled(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processDepartament.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("DepartamentDisabled_Filter_OrMore_Data", model);
        }
    }
}
