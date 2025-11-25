using DC365_PayrollHR.Core.Application.CommandsAndQueries.Courses;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Course;
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
    [Route("api/courses")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CourseController : ControllerBase
    {
        private readonly IQueryHandler<CourseResponse> _QueryHandler;
        private readonly ICourseCommandHandler _CommandHandler;

        public CourseController(IQueryHandler<CourseResponse> queryHandler, ICourseCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.Course, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.Course, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.Course, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.Course, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.Course, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }
    }

}
