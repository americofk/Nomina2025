/// <summary>
/// Controlador para la generación de reportes generales.
/// Incluye reportes de nómina, TSS, DGT y exportación a diferentes formatos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.CORE.Domain.Models.Reports;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    /// <summary>
    /// Controlador para gestion de GeneralReports.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("reportes")]
    public class GeneralReportsController : ControllerBase
    {
        ProcessReports process;

        /// <summary>

        /// Ejecuta PayrollPayments de forma asincrona.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <param name="deparmentId">Parametro deparmentId.</param>

        /// <param name="employeeId">Parametro employeeId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("pagosdenomina")]
        public async Task<IActionResult> PayrollPayments([FromQuery] string payrollprocessid, [FromQuery] bool hidefilter,[FromQuery] string deparmentId,[FromQuery] string employeeId)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.Culture = dataUser[5];
            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.hidefilter = hidefilter;

            var model = await process.PagosNomina(payrollprocessid, deparmentId, employeeId);
            return View(model);
        }

        /// <summary>

        /// Ejecuta EmailPayrollPayments de forma asincrona.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="deparmentId">Parametro deparmentId.</param>

        /// <param name="employeeId">Parametro employeeId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("email/pagosdenomina")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> EmailPayrollPayments([FromQuery] string payrollprocessid, [FromQuery] string deparmentId, [FromQuery] string employeeId)
        {
            ResponseUI responseUI = new ResponseUI();
            GetdataUser();

            process = new ProcessReports(dataUser[0]);

            responseUI = await process.EnvioCorreoPagosNomina(payrollprocessid, deparmentId, employeeId);
            return Json(responseUI);
        }


        /// <summary>


        /// Ejecuta PayrollPaymentsSummary de forma asincrona.


        /// </summary>


        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>


        /// <param name="hidefilter">Parametro hidefilter.</param>


        /// <param name="deparmentId">Parametro deparmentId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("resumenpagosdenomina")]
        public async Task<IActionResult> PayrollPaymentsSummary([FromQuery] string payrollprocessid, [FromQuery] bool hidefilter, [FromQuery] string deparmentId)
        {
            GetdataUser();
            await GetLayoutDefauld();
            ViewBag.Culture = dataUser[5];
            process = new ProcessReports(dataUser[0]);
            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.hidefilter = hidefilter;

            var model = await process.ResumenPagosNomina(payrollprocessid, deparmentId);
            return View(model);
        }

        /// <summary>

        /// Exporta los datos.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="deparmentId">Parametro deparmentId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("ExportarPayroll")]
        public async Task<IActionResult> ExportarPayrollPaymentsSummary([FromQuery] string payrollprocessid, [FromQuery] string deparmentId)
        {
            GetdataUser();
            await GetLayoutDefauld();
            ViewBag.Culture = dataUser[5];
            process = new ProcessReports(dataUser[0]);
            string validador;
            ExportarExcel<ReportResumePayrollResponseCSV> exportar = new ExportarExcel<ReportResumePayrollResponseCSV>();

            string[] header = new string[] {"Nómina","Periodo de nómina","Total empleados","Empleados aplicables para pago","Fecha de pago",
                "Proyecto","Departamento","Total a pagar","Salario","Préstamos", "AFP", "SFS", "ISR", "Comisiones", "Abono cooperativa",
            "Préstamo cooperativa", "Horas extras", "Otros ingresos", "Otras deducciones"};
            try
            {
                var model = await process.ResumenPagosNomina(payrollprocessid, deparmentId);
                List<ReportResumePayrollResponse> newList = (List<ReportResumePayrollResponse>)model;
                List<ReportResumePayrollResponseCSV> d = newList.Select(x => new ReportResumePayrollResponseCSV()
                {
                    PayrollName=x.PayrollName,
                    DepartmentName=x.DepartmentName,
                    Period=x.Period,
                    PaymentDate=x.PaymentDate.ToString("dd/MM/yyyy"),
                    TotalEmployee=x.TotalEmployee.ToString(),
                    Project=x.Project,
                    Total=x.Total.ToString(),
                    Salary=x.Salary.ToString(),
                    ExtraHour=x.ExtraHour.ToString(),
                    Commision=x.Commision.ToString(),
                    OtherEarning=x.OtherEarning.ToString(),
                    OtherDiscount=x.OtherDiscount.ToString(),
                    ISR=x.ISR.ToString(),
                    SFS=x.SFS.ToString(),
                    AFP=x.AFP.ToString(),
                    Loan=x.Loan.ToString(),
                    LoanCooperative=x.LoanCooperative.ToString(),
                    DeductionCooperative=x.DeductionCooperative.ToString(),

                }).ToList();
                string filename = ($"archivo607_{HttpContext.Session.GetString("Customer")}_{DateTime.Now}.csv").Replace(" ", "_");
                validador = exportar.CreateCSV(d, header);


                return File(Encoding.UTF8.GetBytes(validador), "text/csv", filename);

            }
            catch (Exception ex)
            {

                validador = $"Error - {ex.Message}";
            }
            return (Json(validador));
        }


        /// <summary>


        /// Ejecuta PayrollReport de forma asincrona.


        /// </summary>


        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>


        /// <param name="hidefilter">Parametro hidefilter.</param>


        /// <param name="deparmentId">Parametro deparmentId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("reportenomina")]
        public async Task<IActionResult> PayrollReport([FromQuery] string payrollprocessid, [FromQuery] bool hidefilter, [FromQuery] string deparmentId)

        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);

            ViewBag.hidefilter = hidefilter;

            var model = await process.GetAllDataPayrollReport(payrollprocessid, deparmentId);
            return View(model);
        }


        /// <summary>


        /// Ejecuta TSSReport de forma asincrona.


        /// </summary>


        /// <param name="payrollid">Parametro payrollid.</param>


        /// <param name="hidefilter">Parametro hidefilter.</param>


        /// <param name="year">Parametro year.</param>


        /// <param name="month">Parametro month.</param>


        /// <param name="typetss">Parametro typetss.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("tss")]
        public async Task<IActionResult> TSSReport([FromQuery] string payrollid, [FromQuery] bool hidefilter, [FromQuery] int year, [FromQuery] int month ,[FromQuery] string typetss)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);

            ViewBag.Payroll = await selectListsDropDownList(SelectListOptions.Payroll);
            ViewBag.typeDGT = TypeDTG.TSS;
            ViewBag.hidefilter = hidefilter;

            var model = await process.GetAllDataTssReport(payrollid, year, month, typetss);

            return View(model);
        }

        /// <summary>

        /// Ejecuta AllEmployeeReport de forma asincrona.

        /// </summary>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <param name="deparmentId">Parametro deparmentId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("reporteempleados")]
        public async Task<IActionResult> AllEmployeeReport([FromQuery] bool hidefilter, [FromQuery] string deparmentId)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);

            ViewBag.Deparment = await selectListsDropDownList(SelectListOptions.Department);

            ViewBag.hidefilter = hidefilter;

            var model = await process.GetAllEmployeeReport(deparmentId);

            return View(model);
        }


        /// <summary>


        /// Ejecuta DGT4Report de forma asincrona.


        /// </summary>


        /// <param name="year">Parametro year.</param>


        /// <param name="month">Parametro month.</param>


        /// <param name="hidefilter">Parametro hidefilter.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("dgt4")]
        public async Task<IActionResult> DGT4Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;
            ViewBag.typeDGT = TypeDTG.Dgt4;

            var model = await process.GetAllDataDGT4Report(year, month);
            return View(model);
        }


        /// <summary>


        /// Ejecuta DGT2Report de forma asincrona.


        /// </summary>


        /// <param name="year">Parametro year.</param>


        /// <param name="month">Parametro month.</param>


        /// <param name="hidefilter">Parametro hidefilter.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet("dgt2")]
        public async Task<IActionResult> DGT2Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;
            ViewBag.typeDGT = TypeDTG.Dgt2;

            var model = await process.GetAllDataDGT2Report(year, month);
            return View(model);
        }

        /// <summary>

        /// Ejecuta DGT3Report de forma asincrona.

        /// </summary>

        /// <param name="year">Parametro year.</param>

        /// <param name="month">Parametro month.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt3")]
        public async Task<IActionResult> DGT3Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;
            ViewBag.typeDGT = TypeDTG.Dgt3;

            var model = await process.GetAllDataDGT3Report(year, month);
            if (model.Details == null)
            {
                model.Details = new List<CORE.Domain.Models.Reports.DGT3Detail>();
            }
            return View(model);
        }
        
        /// <summary>
        
        /// Ejecuta Txt de forma asincrona.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <param name="payrollid">Parametro payrollid.</param>
        
        /// <param name="typetss">Parametro typetss.</param>
        
        /// <param name="typeDTG">Parametro typeDTG.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("Txt")]
        public async Task<IActionResult> Txt([FromQuery] int year, [FromQuery] int month, [FromQuery] string payrollid, [FromQuery] string typetss, TypeDTG typeDTG)
        {
            GetdataUser();
            ProcessReportTxt process = new ProcessReportTxt(dataUser[0]);
            MemoryStream responseUI = new MemoryStream();
            if (year == 0 && month == 0)
            {
                DateTime dateTime = DateTime.Today;
                year = dateTime.Year;
                month = dateTime.Month;
            }
            switch (typeDTG)
            {
                case TypeDTG.Dgt2:
                    responseUI = await process.TXT_DGT2(year, month);
                    break;
                case TypeDTG.Dgt3:
                    responseUI = await process.TXT_DGT3(year, month);
                    break;
                case TypeDTG.Dgt4:
                    responseUI = await process.TXT_DGT4(year, month);
                    break;
                case TypeDTG.Dgt5:
                    responseUI = await process.TXT_DGT5(year, month);
                    break;
                case TypeDTG.TSS:
                    responseUI = await process.TXT_TSS(year, month, payrollid, typetss);
                    break;
                case TypeDTG.Dgt9:
                    break;
                case TypeDTG.Dgt12:
                    break;
                default:
                    break;
            }

            return File(responseUI, "text/plain", $"{typeDTG.ToString()}{DateTime.Now.ToString("ddMMyyyy")}.txt");
        }

        /// <summary>

        /// Ejecuta DGT5Report de forma asincrona.

        /// </summary>

        /// <param name="year">Parametro year.</param>

        /// <param name="month">Parametro month.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt5")]
        public async Task<IActionResult> DGT5Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;
            ViewBag.typeDGT = TypeDTG.Dgt5;
            var model = await process.GetAllDataDGT5Report(year, month);
            return View(model);
        }

        /// <summary>

        /// Ejecuta DGT9Report de forma asincrona.

        /// </summary>

        /// <param name="year">Parametro year.</param>

        /// <param name="month">Parametro month.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt9")]
        public async Task<IActionResult> DGT9Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;

            var model = await process.GetAllDataDGT9Report(year, month);
            return View(model);
        }

        /// <summary>

        /// Ejecuta DGT11Report de forma asincrona.

        /// </summary>

        /// <param name="year">Parametro year.</param>

        /// <param name="month">Parametro month.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt11")]
        public async Task<IActionResult> DGT11Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;

            var model = await process.GetAllDataDGT11Report(year, month);
            return View(model);
        }

        /// <summary>

        /// Ejecuta DGT12Report de forma asincrona.

        /// </summary>

        /// <param name="year">Parametro year.</param>

        /// <param name="month">Parametro month.</param>

        /// <param name="hidefilter">Parametro hidefilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt12")]
        public async Task<IActionResult> DGT12Report([FromQuery] int year, [FromQuery] int month, [FromQuery] bool hidefilter)
        {
            GetdataUser();
            await GetLayoutDefauld();
            process = new ProcessReports(dataUser[0]);
            ViewBag.hidefilter = hidefilter;
            if (year == 0 && month == 0)
            {
                DateTime dateTime = new DateTime();
                year = dateTime.Year;
                month = dateTime.Month;
            }
            var model = await process.GetAllDataDGT12Report(year, month);
            return View(model);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollId">Parametro payrollId.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollId}")]
        public async Task<JsonResult> GetId(string payrollId)
        {
            GetdataUser();
            var process = new ProcessPayrollProcess(dataUser[0]);

            var _model = await process.GetListPayrollProcess(payrollId);

            return (Json(_model));
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="processid">Parametro processid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("payrollprocessid/{processid}")]
        public async Task<JsonResult> GetEmployee(string processid)
        {
            GetdataUser();
            var process = new ProcessPayrollProcess(dataUser[0]);

            var _model = await process.ProcessDetail(processid);

            return (Json(_model.Obj));
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="processid">Parametro processid.</param>
        
        /// <param name="propertyValue">Parametro propertyValue.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("payrollprocessid/{processid}/{propertyValue}")]
        public async Task<JsonResult> GetEmployeeDepartment(string processid,string propertyValue)
        {
            GetdataUser();
            var process = new ProcessPayrollProcess(dataUser[0]);

            var _model = await process.ProcessDetail(processid,"st-DepartmentId", propertyValue);

            return (Json(_model.Obj));
        }

        /// <summary>

        /// Ejecuta TxtPayroll de forma asincrona.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="payrollid">Parametro payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("txtpayroll")]
        public async Task<IActionResult> TxtPayroll([FromQuery] string payrollprocessid, [FromQuery] string payrollid)
        {
            GetdataUser();
            ProcessReportTxt process = new ProcessReportTxt(dataUser[0]);
            MemoryStream responseUI = new MemoryStream();
            
            responseUI = await process.TXT_Payroll(payrollprocessid, payrollid);

            return File(responseUI, "text/plain", $"txtpayroll{DateTime.Now.ToString("ddMMyyyy")}.txt");
        }
    }
}
