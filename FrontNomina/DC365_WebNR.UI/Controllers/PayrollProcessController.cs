/// <summary>
/// Controlador para el procesamiento de nóminas.
/// Permite crear, procesar, calcular, pagar y cancelar procesos de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de PayrollProcess.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("procesonomina")]
    public class PayrollProcessController : ControllerBase
    {
        ProcessPayrollProcess process;

        /// <summary>

        /// Ejecuta PayrollsProcess de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> PayrollsProcess()
        {
            GetdataUser();
            process = new ProcessPayrollProcess(dataUser[0]);
            await GetLayoutDefauld();

            var model = await process.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<PayrollProcess>.GetPropertyToSearch();

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

        /// Ejecuta PayrollProcess_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> PayrollProcess_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            process = new ProcessPayrollProcess(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;

            var model = await process.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("PayrollProcess_Filter_OrMore_Data", model);
        }


        /// <summary>


        /// Ejecuta NewAndEditPayrollProcess de forma asincrona.


        /// </summary>


        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("ObtenerFormNuevo")]
        public async Task<IActionResult> NewAndEditPayrollProcess([FromQuery] string payrollprocessid)
        {
            PayrollProcess model;
            GetdataUser();
            ViewBag.Culture = dataUser[5];

            process = new ProcessPayrollProcess(dataUser[0]);

            if (!string.IsNullOrEmpty(payrollprocessid))
            {
                //Editar
                model = await process.GetIdDataAsync(payrollprocessid);
           
            }
            else
            {
                //Nuevo
                model = new PayrollProcess();
                //ViewBag.Paycyle = null;
            }

            ViewBag.Payrolls = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Projects = await selectListsDropDownList(SelectListOptions.Project);
            ViewBag.ProjCategory = await selectListsDropDownList(SelectListOptions.ProjCategory);

            return PartialView("NewAndEditPayrollProcess", model);
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="operation">Parametro operation.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Save(PayrollProcess model, string operation)
        {
            GetdataUser();
            ResponseUI<PayrollProcess> responseUI = new ResponseUI<PayrollProcess>();

            process = new ProcessPayrollProcess(dataUser[0]);

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
                        responseUI = await process.PutDataAsync(model.PayrollProcessId, model);
                        break;
                }
            }

            return (Json(new ResponseUI<string>()
            {
                Type = responseUI.Type,
                Message = responseUI.Message,
                Errors = responseUI.Errors,
                Obj = responseUI.Obj == null?"": responseUI.Obj.PayrollProcessId 
            }));
            //return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="listid_payrollprocess">Parametro listid_payrollprocess.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Delete(List<string> listid_payrollprocess)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.DeleteDataAsync(listid_payrollprocess);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta Payrollprocess de forma asincrona.

        /// </summary>

        /// <param name="PayrollProcessId">Parametro PayrollProcessId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("procesar")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Payrollprocess(string PayrollProcessId)
        {
            GetdataUser();
            ResponseUI<List<PayrollProcessDetail>> responseUI = new ResponseUI<List<PayrollProcessDetail>>();

            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.Process(PayrollProcessId);
            if (responseUI.Type == "error")
            {
                return (Json(new ResponseUI() { Type = responseUI.Type, Errors = responseUI.Errors }));
            }

            ViewBag.Culture = dataUser[5];

            return PartialView("DetailEmployeesPayrollProcess", responseUI.Obj);
        }

        /// <summary>

        /// Ejecuta Calcprocess de forma asincrona.

        /// </summary>

        /// <param name="PayrollProcessId">Parametro PayrollProcessId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("calcular")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Calcprocess(string PayrollProcessId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.CalcProcess(PayrollProcessId);
            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollprocessid}/{employeeid}")]
        public async Task<ActionResult> Getnovelties(string payrollprocessid, string employeeid)
        {
            GetdataUser();
            ViewBag.Culture = dataUser[5];
            ProceesPayrollProcessDetail processOne = new ProceesPayrollProcessDetail(dataUser[0]);

            var list = await processOne.GetAllDataAsync(payrollprocessid, employeeid);
            return PartialView("ListPayrollProcessDetail", list);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollprocessid}")]
        public async Task<ActionResult> GetDetailProcessPayroll(string payrollprocessid)
        {
            GetdataUser();
            ResponseUI<List<PayrollProcessDetail>> responseUI = new ResponseUI<List<PayrollProcessDetail>>();

            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.ProcessDetail(payrollprocessid);

            ViewBag.Culture = dataUser[5];

            return PartialView("DetailEmployeesPayrollProcess", responseUI.Obj);
        }

        /// <summary>

        /// Ejecuta Payprocess de forma asincrona.

        /// </summary>

        /// <param name="PayrollProcessId">Parametro PayrollProcessId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("pagar")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Payprocess(string PayrollProcessId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.PayPayroll(PayrollProcessId);
            return (Json(responseUI));
        }

        /// <summary>

        /// Verifica si puede.

        /// </summary>

        /// <param name="PayrollProcessId">Parametro PayrollProcessId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("cancelar")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Cancelprocess(string PayrollProcessId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPayrollProcess(dataUser[0]);

            responseUI = await process.CancelPayroll(PayrollProcessId);
            return (Json(responseUI));
        }

        /// <summary>
        /// Obtiene un proceso de nómina por Id (para auditoría).
        /// </summary>
        /// <param name="Id">Parametro Id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string Id)
        {
            GetdataUser();
            PayrollProcess _model = new PayrollProcess();
            process = new ProcessPayrollProcess(dataUser[0]);

            _model = await process.GetIdDataAsync(Id);

            return (Json(_model));
        }
    }
}
