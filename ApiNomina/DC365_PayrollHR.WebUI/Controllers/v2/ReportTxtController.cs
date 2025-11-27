/// <summary>
/// Controlador API para gestión de ReportTxt.
/// Endpoint base: api/v2/reportstxt
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.ReportsTXT;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de ReportTxt.
    /// </summary>
    [Route("api/v2.0/reportstxt")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ReportTxtController : ControllerBase
    {
        private readonly IDGTTxtQueryHandler _QueryHandler;

        public ReportTxtController(IDGTTxtQueryHandler queryHandler)
        {
            _QueryHandler = queryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dgt3")]
        public async Task<IActionResult> GetDGT3([FromQuery] MonthYearParametersRequest model)
        {
            var objectresult = await _QueryHandler.CreateDGT3(model.Year, model.Month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt4")]
        public async Task<IActionResult> GetDGT4([FromQuery] MonthYearParametersRequest model)
        {
            var objectresult = await _QueryHandler.CreateDGT4(model.Year, model.Month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt5")]
        public async Task<IActionResult> GetDGT5([FromQuery] MonthYearParametersRequest model)
        {
            var objectresult = await _QueryHandler.CreateDGT5(model.Year, model.Month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("dgt2")]
        public async Task<IActionResult> GetDGT2([FromQuery] MonthYearParametersRequest model)
        {
            var objectresult = await _QueryHandler.CreateDGT2(model.Year, model.Month);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="model">Parametro model.</param>
        
        /// <param name="payrollid">Parametro payrollid.</param>
        
        /// <param name="typetss">Parametro typetss.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("tss")]
        public async Task<IActionResult> GetTSS([FromQuery] MonthYearParametersRequest model, [FromQuery] string payrollid, [FromQuery] string typetss)
        {
            var objectresult = await _QueryHandler.CreateTSS(model.Year, model.Month, payrollid, typetss);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>
        
        /// <param name="payrollid">Parametro payrollid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("txtpayroll")]
        public async Task<IActionResult> GetTxtPayroll([FromQuery] string payrollprocessid, [FromQuery] string payrollid)
        {
            var objectresult = await _QueryHandler.CreatePayroll(payrollprocessid, payrollid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
