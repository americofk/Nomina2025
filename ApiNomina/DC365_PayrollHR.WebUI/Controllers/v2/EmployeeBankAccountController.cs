using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeBankAccounts;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeBankAccounts;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/employeebankaccounts")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeeBankAccountController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeBankAccount> _QueryHandler;
        private readonly IEmployeeBankAccountCommandHandler _CommandHandler;

        public EmployeeBankAccountController(IQueryHandler<EmployeeBankAccount> queryHandler, IEmployeeBankAccountCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, View = true)]
        public async Task<ActionResult> GetById(string employeeid, int internalid)
        {
            var objectresult = await _QueryHandler.GetId(new string[] { employeeid, internalid.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeBankAccountRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            var objectresult = await _CommandHandler.DeleteByEmployee(ids, employeeid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeBankAccountRequest model, string internalid)
        {
            var objectresult = await _CommandHandler.Update(internalid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
