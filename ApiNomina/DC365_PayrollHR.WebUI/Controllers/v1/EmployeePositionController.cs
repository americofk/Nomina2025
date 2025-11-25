using DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeePositions;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
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
    [Route("api/employeepositions")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeePositionController : ControllerBase
    {
        private readonly IQueryHandler<EmployeePositionResponse> _QueryHandler;
        private readonly IEmployeePositionCommandHandler _CommandHandler;

        public EmployeePositionController(IQueryHandler<EmployeePositionResponse> queryHandler, IEmployeePositionCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter , [FromQuery] SearchFilter searchFilter, string employeeid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter, employeeid));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeePositionRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string employeeid)
        {
            return Ok(await _CommandHandler.DeleteByParent(ids, employeeid));
        }


        [HttpPut("{employeeid}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeePositionRequestUpdate model, string employeeid)
        {
            return Ok(await _CommandHandler.Update(employeeid, model));
        }


        //[HttpPut("updatestatus/{employeeid}/{positionid}")]
        //[AuthorizePrivilege(MenuId = MenuConst.EmployeePosition, Edit = true)]
        //public async Task<ActionResult> UpdateStatus(string employeeid, bool status, string positionid)
        //{
        //    return Ok(await _CommandHandler.UpdateStatus(positionid, status, employeeid));
        //}
    }
}
