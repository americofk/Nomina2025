/// <summary>
/// Controlador API para gestión de registros de auditoría.
/// Endpoint base: api/v2/auditlogs
/// Solo permite operaciones de lectura (GET).
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.AuditLogs;
using DC365_PayrollHR.Core.Application.Common.Filter;
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
    /// Controlador para consulta de registros de auditoría ISO 27001.
    /// </summary>
    [Route("api/v2.0/auditlogs")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class AuditLogController : ControllerBase
    {
        private readonly IAuditLogQueryHandler _queryHandler;

        public AuditLogController(IAuditLogQueryHandler queryHandler)
        {
            _queryHandler = queryHandler;
        }

        /// <summary>
        /// Obtiene todos los registros de auditoría paginados.
        /// </summary>
        /// <param name="paginationFilter">Filtro de paginación.</param>
        /// <param name="searchFilter">Filtro de búsqueda.</param>
        /// <returns>Lista paginada de registros de auditoría.</returns>
        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.AuditLog, View = true)]
        public async Task<ActionResult> GetAll([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _queryHandler.GetAll(paginationFilter, searchFilter);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>
        /// Obtiene un registro de auditoría por su RecId.
        /// </summary>
        /// <param name="recId">Identificador único del registro.</param>
        /// <returns>Datos del registro de auditoría.</returns>
        [HttpGet("{recId}")]
        [AuthorizePrivilege(MenuId = MenuConst.AuditLog, View = true)]
        public async Task<ActionResult> GetById(long recId)
        {
            var objectresult = await _queryHandler.GetById(recId);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
