using DC365_PayrollHR.Core.Application.CommandsAndQueries.Jobs;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Jobs;
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
    [Route("api/jobs")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class JobController : ControllerBase
    {
        private readonly IQueryHandler<Job> _QueryHandler;
        private readonly IJobCommandHandler _CommandHandler;

        public JobController(IQueryHandler<Job> queryHandler, IJobCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(new string[] { "true", id }));
        }

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.JobDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, false));
        }

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] JobRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.JobDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] JobRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.JobEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }
        
        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.JobDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }
    }

}
