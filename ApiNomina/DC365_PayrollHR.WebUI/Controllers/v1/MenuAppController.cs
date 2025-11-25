using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenusApp;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class MenuAppController : ControllerBase
    {
        private readonly IMenuAppQueryHandler _MenuAppQueryHandler;

        public MenuAppController(IMenuAppQueryHandler menuAppQueryHandler)
        {
            _MenuAppQueryHandler = menuAppQueryHandler;
        }

        [HttpGet("menusapp")]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter)
        {
            return Ok(await _MenuAppQueryHandler.GetAll(paginationFilter));
        }

        [HttpGet("roles")]
        public async Task<ActionResult> GetRoles()
        {
            return Ok(await _MenuAppQueryHandler.GetRoles());
        }
    }
}
