using DC365_PayrollHR.Core.Application.CommandsAndQueries.Departments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Departments;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/departaments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class DepartmentController : ControllerBase
    {
        private readonly IQueryHandler<Department> _QueryHandler;
        private readonly IDepartmentCommandHandler _CommandHandler;

        public DepartmentController(IQueryHandler<Department> queryHandler, IDepartmentCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, View = true)]
        public async Task<ActionResult> GetEnabledId(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        //[HttpGet("disabled/{id}")]
        //[AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, View = true)]
        //public async Task<ActionResult> GetDisabledId(string id)
        //{
        //    return Ok(await _QueryHandler.GetId(id));
        //}

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, false));
        }

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] DepartmentRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] DepartmentRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }
    }
}
