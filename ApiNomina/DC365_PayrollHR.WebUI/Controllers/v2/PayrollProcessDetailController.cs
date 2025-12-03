/// <summary>
/// Controlador API para gestión de PayrollProcessDetail.
/// Endpoint base: api/v2/payrollsprocessdetails
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
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
    /// Controlador para gestion de PayrollProcessDetail.
    /// </summary>
    [Route("api/v2.0/payrollprocessdetails")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class PayrollProcessDetailController : ControllerBase
    {
        private readonly IQueryHandler<PayrollProcessDetail> _QueryHandler;

        public PayrollProcessDetailController(IQueryHandler<PayrollProcessDetail> queryHandler)
        {
            _QueryHandler = queryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{payrollprocessid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PayrollProcess, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string payrollprocessid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, payrollprocessid );
            return StatusCode(objectresult.StatusHttp, objectresult);
        } 
    }
}
