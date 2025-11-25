using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseTypes;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CourseTypes;
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
    [Route("api/coursetypes")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class CourseTypeController : ControllerBase
    {
        private readonly IQueryHandler<CourseType> _QueryHandler;
        private readonly ICourseTypeCommandHandler _CommandHandler;

        public CourseTypeController(IQueryHandler<CourseType> queryHandler, ICourseTypeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.CourseType, View = true)]
        public async Task<ActionResult<PagedResponse<CourseType>>> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, true));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseType, View = true)]
        public async Task<ActionResult<PagedResponse<CourseType>>> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseType, Edit = true)]
        public async Task<ActionResult<Response<CourseType>>> Post([FromBody] CourseTypeRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.CourseType, Delete = true)]
        public async Task<ActionResult<Response<bool>>> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseType, Edit = true)]
        public async Task<ActionResult<Response<bool>>> Update([FromBody] CourseTypeRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }
    }
}
