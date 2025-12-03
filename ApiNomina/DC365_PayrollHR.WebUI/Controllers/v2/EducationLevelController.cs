/// <summary>
/// Controlador API para gestión de EducationLevel.
/// Endpoint base: api/v2/educationlevels
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{

    /// <summary>

    /// Controlador para gestion de EducationLevel.

    /// </summary>

    [Route("api/v2.0/educationlevels")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EducationLevelController : ControllerBase
    {
        private readonly IQueryAllWithoutSearchHandler<EducationLevel> _queryHandler;

        public EducationLevelController(IQueryAllWithoutSearchHandler<EducationLevel> queryHandler)
        {
            _queryHandler = queryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<ActionResult<Response<string>>> Get([FromQuery] PaginationFilter filter)
        {
            var objectresult = await _queryHandler.GetAll(filter);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
