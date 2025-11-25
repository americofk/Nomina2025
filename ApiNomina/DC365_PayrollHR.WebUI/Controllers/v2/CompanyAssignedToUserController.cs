using DC365_PayrollHR.Core.Application.CommandsAndQueries.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CompanyAssignedToUsers;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/companiestouser")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.LocalAdmin)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class CompanyAssignedToUserController : ControllerBase
    {
        private readonly IQueryAllHandler<CompanyToUserResponse> _QueryHandler;
        private readonly ICompanyToUserCommandHandler _CommandHandler;

        public CompanyAssignedToUserController(IQueryAllHandler<CompanyToUserResponse> queryHandler, ICompanyToUserCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{alias}")]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string alias)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, alias);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] List<CompanyToUserRequest> models)
        {
            var objectresult = await _CommandHandler.CreateAll(models);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete("{alias}")]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string alias)
        {
            var objectresult = await _CommandHandler.DeleteByAlias(ids, alias);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
