using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseLocations;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseLocations;
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
    [Route("api/courselocations")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CourseLocationController : ControllerBase
    {
        private readonly IQueryHandler<CourseLocation> _QueryHandler;
        private readonly ICourseLocationCommandHandler _CommandHandler;

        public CourseLocationController(IQueryHandler<CourseLocation> queryHandler, ICourseLocationCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseLocationRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseLocationRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }
    }

}
