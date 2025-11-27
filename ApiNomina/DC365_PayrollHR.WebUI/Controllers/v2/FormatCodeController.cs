/// <summary>
/// Controlador API para gestión de FormatCode.
/// Endpoint base: api/v2/formatcodes
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de FormatCode.
    /// </summary>
    [Route("api/v2.0/regionalcodes")]
    [Authorize]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class FormatCodeController : ControllerBase
    {
        private readonly IQueryHandler<FormatCode> _QueryHandler;

        public FormatCodeController(IQueryHandler<FormatCode> queryHandler)
        {
            _QueryHandler = queryHandler;
        }


        /// <summary>


        /// Obtiene.


        /// </summary>


        /// <param name="paginationFilter">Parametro paginationFilter.</param>


        /// <param name="searchFilter">Parametro searchFilter.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }
    }
}
