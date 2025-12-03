/// <summary>
/// Controlador API para gestión de Reports.
/// Endpoint base: api/v2/reports
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de Reports.
    /// </summary>
    [Route("api/v2.0/reports")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ReportsController : ControllerBase
    {
        private readonly IReportQueryHandler _QueryHandler;

        public ReportsController(IReportQueryHandler queryHandler)
        {
            _QueryHandler = queryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="departmentid">Parametro departmentid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("payrollpayment")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollPaymentReport, View = true)]
        public async Task<ActionResult> Get([FromQuery] string payrollprocessid, [FromQuery] string employeeid, [FromQuery] string departmentid)
        {
            var objectresult = await _QueryHandler.PayrollPaymentReport(payrollprocessid, employeeid, departmentid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="departmentid">Parametro departmentid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("payrollresume")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcessReport, View = true)]
        public async Task<ActionResult> GetResume([FromQuery] string payrollprocessid, [FromQuery] string departmentid)
        {
            var objectresult = await _QueryHandler.ResumePaymentReport(payrollprocessid, departmentid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        
        /// <summary>
        
        
        /// Obtiene.
        
        
        /// </summary>
        
        
        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>
        
        
        /// <param name="departmentId">Parametro departmentId.</param>
        
        
        /// <returns>Resultado de la operacion.</returns>
        
        
        [HttpGet("payrollprocess")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcessReport, View = true)]
        public async Task<ActionResult> GetPayrollProcess([FromQuery] string payrollprocessid, [FromQuery] string departmentId)
        {
            var objectresult = await _QueryHandler.PayrollProcessReport(payrollprocessid, departmentId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        [HttpGet("employees")]
        //Cambiar la constante del menú para los roles
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="departmentId">Parametro departmentId.</param>
        /// <returns>Resultado de la operacion.</returns>
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcessReport, View = true)]
        public async Task<ActionResult> GetEmployees([FromQuery] string departmentId)
        {
            var objectresult = await _QueryHandler.EmployeeReport(departmentId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        [HttpGet("tss")]
        //Cambiar la constante del menú para los roles
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="year">Parametro year.</param>
        /// <param name="month">Parametro month.</param>
        /// <param name="payrollid">Parametro payrollid.</param>
        /// <param name="typetss">Parametro typetss.</param>
        /// <returns>Resultado de la operacion.</returns>
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcessReport, View = true)]
        public async Task<ActionResult> GetTss([FromQuery] int year, [FromQuery] int month, [FromQuery] string payrollid, [FromQuery] string typetss)
        {
            var objectresult = await _QueryHandler.TSSReport(year, month, payrollid, typetss);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt4")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT4Report, View = true)]
        public async Task<ActionResult> GetDGT4Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT4Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt2")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT2Report, View = true)]
        public async Task<ActionResult> GetDGT2Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT2Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt3")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT3Report, View = true)]
        public async Task<ActionResult> GetDGT3Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT3Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt5")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT5Report, View = true)]
        public async Task<ActionResult> GetDGT5Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT5Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt9")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT9Report, View = true)]
        public async Task<ActionResult> GetDGT9Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT9Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="month">Parametro month.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt12")]
        [AuthorizePrivilege(MenuId = MenuConst.DGT12Report, View = true)]
        public async Task<ActionResult> GetDGT12Report([FromQuery] int year, [FromQuery] int month)
        {
            var objectresult = await _QueryHandler.DGT12Report(year, month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //Envío de correo masivo
        /// <summary>
        /// Envia.
        /// </summary>
        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="departmentid">Parametro departmentid.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("payrollpayment/sendemail")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollPaymentReport, View = true)]
        public async Task<ActionResult> SendEmail([FromQuery] string payrollprocessid, [FromQuery] string employeeid, [FromQuery] string departmentid)
        {
            var objectresult = await _QueryHandler.PayrollPaymentReport(payrollprocessid, employeeid, departmentid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
