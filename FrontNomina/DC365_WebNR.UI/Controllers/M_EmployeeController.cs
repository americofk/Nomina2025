/// <summary>
/// Controlador para la gestión de empleados.
/// Permite crear, editar, eliminar y administrar toda la información de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de M_Employee.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("empleadosactivos")]
    public class M_EmployeeController : ControllerBase
    {
        
        ProcessEmployee processEmployee;

        /// <summary>

        /// Ejecuta Employees de forma asincrona.

        /// </summary>

        /// <param name="workStatus">Parametro workStatus.</param>

        /// <param name="IdEmployee">Parametro IdEmployee.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Employees([FromQuery] WorkStatus workStatus, string IdEmployee="")
        {
            GetdataUser();
            await GetLayoutDefauld();
            string title = string.Empty;
            ViewBag.idemployee = IdEmployee;


            ViewBag.FilterExtraHours = new List<SelectListItem>();
            switch (workStatus)
            {
                case WorkStatus.Candidate:
                    ViewBag.typeEmployee = "Prospectos a empleado";
                    break;
                case WorkStatus.Dismissed:
                    ViewBag.typeEmployee = "Dados de baja";

                    break;
                case WorkStatus.Employ:
                    ViewBag.typeEmployee = "Empleados";
                    ViewBag.FilterExtraHours = FilterHelper<EmployeeExtraHour>.GetPropertyToSearch();                    
                    break;
              
            }
           
            processEmployee = new ProcessEmployee(dataUser[0]);
            var model = await processEmployee.GetAllDataAsync(workStatus.ToString());
            ViewBag.typeView = true;
            ViewBag.Filter = FilterHelper<Employee>.GetPropertyToSearch();
            ViewBag.FilterModalEc = FilterHelper<EmployeeEarningCode>.GetPropertyToSearch();
            ViewBag.FilterModalEh = FilterHelper<EmployeeExtraHour>.GetPropertyToSearch();
            ViewBag.Occupation = await selectListsDropDownList(SelectListOptions.Occupation);
            ViewBag.EducationLevel = await selectListsDropDownList(SelectListOptions.EducationLevel);
            ViewBag.DisabilityType = await selectListsDropDownList(SelectListOptions.DisabilityType);
            ViewBag.Country = await selectListsDropDownList(SelectListOptions.Country);

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// </summary>
        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias))
            {
                return GetConsistentHash(alias);
            }
            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email))
            {
                return GetConsistentHash(email);
            }
            return 0;
        }

        /// <summary>
        /// Genera un hash numerico consistente.
        /// </summary>
        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;
            long hash = 5381;
            foreach (char c in input)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return System.Math.Abs(hash);
        }

        /// <summary>

        /// Ejecuta Employee_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <param name="type">Parametro type.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Employee_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, string type = "")
        {
            GetdataUser();
            processEmployee = new ProcessEmployee(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await processEmployee.GetAllDataAsync(type,PropertyName, PropertyValue, _PageNumber);

            return PartialView("Employee_Filter_OrMore_Data", model);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <param name="type">Parametro type.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}/{type}")]
        public async Task<JsonResult> GetId(string Id,string type)
        {
            GetdataUser();
            Employee _model = new Employee();
            processEmployee = new ProcessEmployee(dataUser[0]);

            _model = await processEmployee.GetIdDataAsync(Id, type);
            return (Json(_model));
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Employee Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processEmployee = new ProcessEmployee(dataUser[0]);

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
                        responseUI = await processEmployee.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processEmployee.PutDataAsync(Obj.EmployeeId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ObjEmployees">Parametro ObjEmployees.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Delete(List<string> ObjEmployees)
        {
            GetdataUser();
            ResponseUI responseUI;
            processEmployee = new ProcessEmployee(dataUser[0]);

            responseUI = await processEmployee.DeleteDataAsync(ObjEmployees);

            return (Json(responseUI));
        }

        /// <summary>

        /// Carga un archivo.

        /// </summary>

        /// <param name="file">Parametro file.</param>

        /// <param name="IdEmpleyee">Parametro IdEmpleyee.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("cargarimagen")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UploadImage(IFormFile file, string IdEmpleyee)
        {
            GetdataUser();
            Employee _model = new Employee();
            processEmployee = new ProcessEmployee(dataUser[0]);
            var result = await processEmployee.Uploadimage(file, IdEmpleyee);


            return (Json(result));
        }

        /// <summary>

        /// Descarga.

        /// </summary>

        /// <param name="IdEmployee">Parametro IdEmployee.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("descargarimagen/{IdEmployee}")]
        public async Task<JsonResult> DownloadImage(string IdEmployee)
        {
            GetdataUser();
            Employee _model = new Employee();
            processEmployee = new ProcessEmployee(dataUser[0]);
            var result = await processEmployee.Downloadimage(IdEmployee);

            return (Json(result));
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="idEmployeeDesh">Parametro idEmployeeDesh.</param>

        /// <param name="optionDesh">Parametro optionDesh.</param>

        /// <param name="_isforDgt">Parametro _isforDgt.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> updateStatus(string idEmployeeDesh, string optionDesh, bool _isforDgt)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processEmployee = new ProcessEmployee(dataUser[0]);
            responseUI = await processEmployee.UpdateStatus(idEmployeeDesh, int.Parse(optionDesh),_isforDgt);

            return (Json(responseUI));
        }

        /// <summary>

        /// Contrata al empleado.

        /// </summary>

        /// <param name="hireEmployee">Parametro hireEmployee.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("hireemployee")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> HireEmployee(HireEmployee hireEmployee)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processEmployee = new ProcessEmployee(dataUser[0]);
            responseUI = await processEmployee.HireEmployee(hireEmployee);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta DissmisEmployee de forma asincrona.

        /// </summary>

        /// <param name="dissmisemployee">Parametro dissmisemployee.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("dissmisemployee")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> DissmisEmployee(HireEmployee dissmisemployee)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processEmployee = new ProcessEmployee(dataUser[0]);
            responseUI = await processEmployee.DissmisEmployee(dissmisemployee);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta EmployeesDisabled de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("inactivo")]
        public async Task<IActionResult> EmployeesDisabled()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processEmployee = new ProcessEmployee(dataUser[0]);
            var model = await processEmployee.GetAllDataAsync("inactivos");
            ViewBag.typeView = false;
            ViewBag.typeEmployee = "Empleados inactivos";
            ViewBag.FilterModalEc = FilterHelper<EmployeeEarningCode>.GetPropertyToSearch();
            ViewBag.FilterDisable = FilterHelper<Employee>.GetPropertyToSearch();
            ViewBag.FilterModalEh = FilterHelper<EmployeeExtraHour>.GetPropertyToSearch();
            ViewBag.Occupation = await selectListsDropDownList(SelectListOptions.Occupation);
            ViewBag.EducationLevel = await selectListsDropDownList(SelectListOptions.EducationLevel);
            ViewBag.DisabilityType = await selectListsDropDownList(SelectListOptions.DisabilityType);
            ViewBag.Country = await selectListsDropDownList(SelectListOptions.Country);

            return View(model);
        }

        /// <summary>

        /// Ejecuta FormHireEmployee de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FormHireEmployee")]
        public async Task<ActionResult> FormHireEmployee()
        {
            GetdataUser();
            ViewBag.Position =  await selectListsDropDownList(SelectListOptions.PositionVacant);
            return PartialView("ModalContratar");
        }
        
        /// <summary>
        
        /// Ejecuta la operacion FormdissmisEmployee.
        
        /// </summary>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("FormdissmisEmployee")]
        public ActionResult FormdissmisEmployee()
        {
            GetdataUser();
            return PartialView("ModalDesvincular");
        }
    }
}
