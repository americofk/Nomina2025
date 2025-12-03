/// <summary>
/// Controlador API para gestión de Province.
/// Endpoint base: api/v2/provinces
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Provinces;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de Province.
    /// </summary>
    [Route("api/v2.0/provinces")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ProvinceController : ControllerBase
    {
        private readonly IQueryAllHandler<ProvinceResponse> _QueryHandler;

        public ProvinceController(IQueryAllHandler<ProvinceResponse> queryHandler)
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
