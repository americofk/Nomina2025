/// <summary>
/// Controlador API para gestión de EmailReports.
/// Endpoint base: api/v2/emailreports
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de EmailReports.
    /// </summary>
    [Route("api/v2.0/emailreports")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmailReportsController : ControllerBase
    {
        private readonly IReportCommandHandler _CommandHandler;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ICurrentUserInformation _currentUserInformation;

        public EmailReportsController(IReportCommandHandler commandHandler, IWebHostEnvironment hostingEnvironment, ICurrentUserInformation currentUserInformation)
        {
            _CommandHandler = commandHandler;
            _hostingEnvironment = hostingEnvironment;
            _currentUserInformation = currentUserInformation;
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="departmentid">Parametro departmentid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("payrollpayment")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollPaymentReport, View = true)]
        public async Task<ActionResult> Post([FromQuery] string payrollprocessid, [FromQuery] string employeeid, [FromQuery] string departmentid)
        {
            var response = _CommandHandler.SendEmail(payrollprocessid, employeeid, departmentid, new string[] { _currentUserInformation.Company, _currentUserInformation.Alias, _currentUserInformation.Email }, _hostingEnvironment.ContentRootPath);

            //return StatusCode(response.StatusHttp, response);

            if (response.IsCompleted)
            {
                var objectresult = await response;
                return StatusCode(objectresult.StatusHttp, objectresult);
            }
            else
            {
                return StatusCode(202, new Response<string>() { Message = $"Se ha iniciado el proceso", StatusHttp = 202 });
            }
        }        
    }
}
