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

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/employeebankaccounts")]
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
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        [HttpGet("{employeeid}/{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, View = true)]
        public async Task<ActionResult> GetById(string employeeid, int internalid)
        {
            return Ok(await _QueryHandler.GetId(new string[] { employeeid, internalid.ToString() }));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeBankAccountRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByEmployee(ids, employeeid));
        }


        [HttpPut("{internalid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeBankAccount, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeBankAccountRequest model, string internalid)
        {
            return Ok(await _CommandHandler.Update(internalid, model));
        }
    }

}
