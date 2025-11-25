using DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseLocations;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.CourseLocations;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/courselocations")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
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
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, true);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Edit = true)]
        public async Task<ActionResult> Post([FromBody] CourseLocationRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.CourseLocation, Edit = true)]
        public async Task<ActionResult> Update([FromBody] CourseLocationRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
