using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseEmployees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseEmployees;
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
    [Route("api/courseemployees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CourseEmployeeController : ControllerBase
    {
        private readonly IQueryHandler<CourseEmployee> _QueryHandler;
        private readonly ICourseEmployeeCommandHandler _CommandHandler;

        public CourseEmployeeController(IQueryHandler<CourseEmployee> queryHandler, ICourseEmployeeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, string courseid, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, courseid));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseEmployeeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string courseid)
        {
            return Ok(await _CommandHandler.DeleteByCourseId(ids, courseid));
        }


        [HttpPut("{courseid}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseEmployee, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseEmployeeRequest model, string courseid)
        {
            return Ok(await _CommandHandler.Update(courseid, model));
        }
    }

}
