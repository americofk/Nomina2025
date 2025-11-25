using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeHistories;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeHistories;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/employeehistories")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeHistoryController : ControllerBase
    {
        private readonly IQueryAllHandler<EmployeeHistoryResponse> _QueryHandler;
        private readonly IEmployeeHistoryCommandHandler _CommandHandler;

        public EmployeeHistoryController(IQueryAllHandler<EmployeeHistoryResponse> queryHandler, IEmployeeHistoryCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<EmployeeHistoryDeleteRequest> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByParent(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeHistoryUpdateRequest model, string employeeid)
        {
            var objectresult = await _CommandHandler.Update(employeeid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost("markisfordgt")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeHistory, Edit = true)]
        public async Task<ActionResult> MarkIsForDGT([FromBody] EmployeeHistoryIsForDGTRequest model)
        {
            var objectresult = await _CommandHandler.MarkIsForDGT(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
