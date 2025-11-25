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


namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/menustouser")]
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

        [HttpGet("{alias}")]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string alias)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter, alias));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] List<MenuToUserRequest> models)
        {
            return Ok(await _CommandHandler.CreateAll(models));
        }

        [HttpPut("{alias}")]
        public async Task<ActionResult> Put(string  alias, [FromBody] MenuToUserRequest model)
        {
            return Ok(await _CommandHandler.Update(alias, model));
        }

        [HttpDelete("{alias}")]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string alias)
        {
            return Ok(await _CommandHandler.DeleteByAlias(ids, alias));
        }
    }
}
