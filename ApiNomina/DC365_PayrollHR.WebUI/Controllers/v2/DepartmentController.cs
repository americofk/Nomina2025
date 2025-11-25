using DC365_PayrollHR.Core.Application.CommandsAndQueries.Departments;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Departments;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/departaments")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
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
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, View = true)]
        public async Task<ActionResult> GetEnabledId(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] DepartmentRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] DepartmentRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, status);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DepartmentDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, status);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
