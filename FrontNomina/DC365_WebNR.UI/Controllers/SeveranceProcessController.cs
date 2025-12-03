/// <summary>
/// Controlador para el procesamiento de prestaciones laborales.
/// Permite crear, procesar, calcular y gestionar procesos de prestaciones.
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
    /// Controlador para gestión de Prestaciones Laborales.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("prestacioneslaborales")]
    public class SeveranceProcessController : ControllerBase
    {
        ProcessSeveranceProcess process;

        /// <summary>
        /// Vista principal - Lista de procesos de prestaciones.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            GetdataUser();
            process = new ProcessSeveranceProcess(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<SeveranceProcess>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias)) return GetConsistentHash(alias);
            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email)) return GetConsistentHash(email);
            return 0;
        }

        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;
            long hash = 5381;
            foreach (char c in input) hash = ((hash << 5) + hash) + c;
            return System.Math.Abs(hash);
        }

        /// <summary>
        /// Obtiene más datos con filtro.
        /// </summary>
        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> FilterOrMoreData(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessSeveranceProcess(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("SeveranceProcess_Filter_OrMore_Data", model);
        }

        /// <summary>
        /// Formulario para nuevo/editar proceso.
        /// </summary>
        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEdit([FromQuery] string processId)
        {
            SeveranceProcess model;
            GetdataUser();
            ViewBag.Culture = dataUser[5];

            process = new ProcessSeveranceProcess(dataUser[0]);

            if (!string.IsNullOrEmpty(processId))
            {
                model = await process.Getbyid(processId);
            }
            else
            {
                model = new SeveranceProcess();
                model.ProcessDate = DateTime.Now;
            }

            return PartialView("NewAndEditSeveranceProcess", model);
        }

        /// <summary>
        /// Vista para crear nuevo proceso (sin guardar en BD).
        /// </summary>
        [HttpGet("nuevo")]
        public async Task<IActionResult> NewProcess()
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];
            await GetLayoutDefauld();

            var model = new SeveranceProcess
            {
                ProcessDate = DateTime.Now,
                Description = $"Proceso de Prestaciones - {DateTime.Now:dd/MM/yyyy HH:mm}"
            };

            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];
            ViewBag.IsNew = true;

            return View("OpenProcess", model);
        }

        /// <summary>
        /// Vista del proceso abierto con detalles.
        /// </summary>
        [HttpGet("{processId}")]
        public async Task<IActionResult> OpenProcess(string processId)
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];
            process = new ProcessSeveranceProcess(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.Getbyid(processId);

            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];
            ViewBag.IsNew = false;

            return View("OpenProcess", model);
        }

        /// <summary>
        /// Guarda un proceso.
        /// </summary>
        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(SeveranceProcess model, string operation)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();

            process = new ProcessSeveranceProcess(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return Json(responseUI);
            }

            switch (operation)
            {
                case "1":
                    responseUI = await process.PostDataAsync(model);
                    break;
                case "2":
                    responseUI = await process.PutDataAsync(model.SeveranceProcessId, model);
                    break;
            }

            return Json(new ResponseUI<string>()
            {
                Type = responseUI.Type,
                Message = responseUI.Message,
                Errors = responseUI.Errors,
                Obj = responseUI.IdType ?? ""
            });
        }

        /// <summary>
        /// Elimina procesos.
        /// </summary>
        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> ids)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessSeveranceProcess(dataUser[0]);

            responseUI = await process.DeleteDataAsync(ids);

            return Json(responseUI);
        }

        /// <summary>
        /// Obtiene un proceso por Id (para auditoría).
        /// </summary>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string Id)
        {
            GetdataUser();
            SeveranceProcess _model = new SeveranceProcess();
            process = new ProcessSeveranceProcess(dataUser[0]);

            _model = await process.Getbyid(Id);

            return Json(_model);
        }

        /// <summary>
        /// Obtiene la lista de empleados para el selector.
        /// </summary>
        [HttpGet("ObtenerEmpleados")]
        public async Task<JsonResult> GetEmployeesList()
        {
            GetdataUser();
            var employees = await selectListsDropDownList(SelectListOptions.EmployeeId);

            var result = employees.Select(e => new { value = e.Value, text = e.Text }).ToList();
            return Json(result);
        }

        /// <summary>
        /// Agrega un empleado al proceso de prestaciones.
        /// </summary>
        [HttpPost("agregarempleado")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> AddEmployee(string SeveranceProcessId, string EmployeeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();

            process = new ProcessSeveranceProcess(dataUser[0]);

            responseUI = await process.AddEmployeeToProcess(SeveranceProcessId, EmployeeId);

            return Json(responseUI);
        }

        /// <summary>
        /// Obtiene el formulario de edición de detalle de empleado.
        /// </summary>
        [HttpGet("ObtenerFormEditar")]
        public async Task<IActionResult> GetEditDetailForm(string processId, string employeeId)
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];

            process = new ProcessSeveranceProcess(dataUser[0]);

            var model = await process.GetDetail(processId, employeeId);

            // Cargar opciones para dropdowns
            ViewBag.TiempoLaborando = GetTiempoLaborandoOptions();
            ViewBag.TipoCalculo = GetTipoCalculoOptions();
            ViewBag.Periodos = await GetPeriodosOptions();

            return PartialView("ModalEditDetailSeveranceProcess", model);
        }

        /// <summary>
        /// Actualiza el detalle de un empleado.
        /// </summary>
        [HttpPost("actualizardetalle")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> UpdateDetail(SeveranceProcessDetail model)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();

            process = new ProcessSeveranceProcess(dataUser[0]);

            responseUI = await process.UpdateDetail(model);

            return Json(responseUI);
        }

        /// <summary>
        /// Elimina un empleado del proceso.
        /// </summary>
        [HttpPost("eliminarempleado")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> DeleteEmployee(string processId, string employeeId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();

            process = new ProcessSeveranceProcess(dataUser[0]);

            responseUI = await process.DeleteEmployeeFromProcess(processId, employeeId);

            return Json(responseUI);
        }

        /// <summary>
        /// Calcula las prestaciones laborales de un empleado.
        /// </summary>
        [HttpPost("calculardetalle")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> CalculateDetail(string processId, string employeeId)
        {
            GetdataUser();
            process = new ProcessSeveranceProcess(dataUser[0]);

            var result = await process.CalculateSeverance(processId, employeeId);

            return Json(result);
        }

        private List<SelectListItem> GetTiempoLaborandoOptions()
        {
            return new List<SelectListItem>
            {
                new SelectListItem { Value = "0-3", Text = "0 a 3 meses" },
                new SelectListItem { Value = "3-6", Text = "3 a 6 meses" },
                new SelectListItem { Value = "6-12", Text = "6 a 12 meses" },
                new SelectListItem { Value = "1-5", Text = "1 a 5 años" },
                new SelectListItem { Value = "5+", Text = "Más de 5 años" }
            };
        }

        private List<SelectListItem> GetTipoCalculoOptions()
        {
            return new List<SelectListItem>
            {
                new SelectListItem { Value = "0", Text = "Desahucio" },
                new SelectListItem { Value = "1", Text = "Despido" },
                new SelectListItem { Value = "2", Text = "Dimisión" },
                new SelectListItem { Value = "3", Text = "Renuncia" }
            };
        }

        private async Task<List<SelectListItem>> GetPeriodosOptions()
        {
            // Por ahora retornamos una lista vacía - esto se podría conectar a un servicio de períodos
            return new List<SelectListItem>();
        }
    }
}
