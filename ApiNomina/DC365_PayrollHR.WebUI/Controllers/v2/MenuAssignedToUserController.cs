/// <summary>
/// Controlador API para gestión de MenuAssignedToUser.
/// Endpoint base: api/v2/menusassignedtousers
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de MenuAssignedToUser.
    /// </summary>
    [Route("api/v2.0/menustouser")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.LocalAdmin)]
    public class MenuAssignedToUserController : ControllerBase
    {
        private readonly IQueryAllHandler<MenuToUserResponse> _QueryHandler;
        private readonly IMenuToUserCommandHandler _CommandHandler;

        public MenuAssignedToUserController(IQueryAllHandler<MenuToUserResponse> queryHandler, IMenuToUserCommandHandler commandHandler)
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
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, alias);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="models">Parametro models.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] List<MenuToUserRequest> models)
        {
            var objectresult = await _CommandHandler.CreateAll(models);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="alias">Parametro alias.</param>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("{alias}")]
        public async Task<ActionResult> Put(string  alias, [FromBody] MenuToUserRequest model)
        {
            var objectresult = await _CommandHandler.Update(alias, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
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
            var objectresult = await _CommandHandler.DeleteByAlias(ids, alias);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}