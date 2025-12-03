/// <summary>
/// Controlador API para gestión de Dashboard.
/// Endpoint base: api/v2/dashboard
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de Dashboard.
    /// </summary>
    [Route("api/v2.0/dashboard")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardInfoQueryHandler _infoQueryHandler;

        public DashboardController(IDashboardInfoQueryHandler infoQueryHandler)
        {
            _infoQueryHandler = infoQueryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("cardinformation")]
        public async Task<ActionResult> Get()
        {
            var objectresult = await _infoQueryHandler.GetCount();

            return StatusCode(objectresult.StatusHttp, objectresult);
        }        
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <param name="year">Parametro year.</param>
        
        /// <param name="payrollid">Parametro payrollid.</param>
        
        /// <returns>Resultado de la operacion.</returns>
        
        [HttpGet("graphicinformation")]
        public async Task<ActionResult> GetGraphics([FromQuery] int year, [FromQuery] string payrollid)
        {
            var objectresult = await _infoQueryHandler.GetGraphics(year, payrollid);

            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
