using DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Employees;
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
    [Route("api/employees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class EmployeeController : ControllerBase
    {
        private readonly IQueryHandler<Employee> _QueryHandler;
        private readonly IEmployeeCommandHandler _CommandHandler;

        public EmployeeController(IQueryHandler<Employee> queryHandler, IEmployeeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, false));
        }

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetIdEnabled(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] EmployeeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status, false));
        }

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status, bool isforDgt)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status, isforDgt));
        }

        [HttpPost("uploadimage/{id}")]
        public async Task<ActionResult> PostImage([FromForm] EmployeeImageRequest request, string id)
        {
            return Ok(await _CommandHandler.UploadImage(request, id));
        }


        [HttpGet("downloadimage/{id}")]
        public async Task<ActionResult> GetImage(string id)
        {
            return Ok(await _CommandHandler.DownloadImage(id));
        }
    }

}
