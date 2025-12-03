/// <summary>
/// Controlador API para gestión de MenuApp.
/// Endpoint base: api/menusapp
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenusApp;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers
{
    /// <summary>
    /// Controlador para gestion de MenuApp.
    /// </summary>
    [Route("api")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.Usuario)]
    public class MenuAppController : ControllerBase
    {
        private readonly IMenuAppQueryHandler _MenuAppQueryHandler;

        public MenuAppController(IMenuAppQueryHandler menuAppQueryHandler)
        {
            _MenuAppQueryHandler = menuAppQueryHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("menusapp")]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter)
        {
            return Ok(await _MenuAppQueryHandler.GetAll(paginationFilter));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("roles")]
        public async Task<ActionResult> GetRoles()
        {
            return Ok(await _MenuAppQueryHandler.GetRoles());
        }
    }
}
