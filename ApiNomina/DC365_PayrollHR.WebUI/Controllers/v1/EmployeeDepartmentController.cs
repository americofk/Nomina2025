using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDepartments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDeparments;
using DC365_PayrollHR.Core.Domain.Consts;
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
    [Route("api/employeedepartments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeeDepartmentController : ControllerBase
    {
        private readonly IQueryHandler<EmployeeDepartmentResponse> _QueryHandler;
        private readonly IEmployeeDepartmentCommandHandler _CommandHandler;

        public EmployeeDepartmentController(IQueryHandler<EmployeeDepartmentResponse> queryHandler, IEmployeeDepartmentCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, employeeid));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeDepartmentRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByParent(ids, employeeid));
        }


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeDepartmentRequest model, string employeeid)
        {
            return Ok(await _CommandHandler.Update(employeeid, model));
        }


        [HttpPut("updatestatus/{employeeid}/{departmentid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDepartment, Edit = true)]
        public async Task<ActionResult> UpdateStatus(string employeeid, bool status, string departmentid)
        {
            return Ok(await _CommandHandler.UpdateStatus(departmentid, status, employeeid));
        }
    }

}
