using DC365_PayrollHR.Core.Application.CommandsAndQueries.MenusApp;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
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
