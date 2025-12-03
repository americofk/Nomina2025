/// <summary>
/// Controlador API para gestión de CompanyAssignedToUser.
/// Endpoint base: api/companiestouser
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de CompanyAssignedToUser.
    /// </summary>
    [Route("api/companiestouser")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.AdministradorLocal)]
    public class CompanyAssignedToUserController : ControllerBase
    {
        private readonly IQueryAllHandler<CompanyToUserResponse> _QueryHandler;
        private readonly ICompanyToUserCommandHandler _CommandHandler;

        public CompanyAssignedToUserController(IQueryAllHandler<CompanyToUserResponse> queryHandler, ICompanyToUserCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="alias">Parametro alias.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{alias}")]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string alias)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter, alias));
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="models">Parametro models.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] List<CompanyToUserRequest> models)
        {
            return Ok(await _CommandHandler.CreateAll(models));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <param name="alias">Parametro alias.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("{alias}")]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string alias)
        {
            return Ok(await _CommandHandler.DeleteByAlias(ids, alias));
        }
    }
}
