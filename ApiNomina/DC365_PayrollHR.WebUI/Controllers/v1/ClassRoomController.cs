using DC365_PayrollHR.Core.Application.CommandsAndQueries.ClassRooms;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.ClassRooms;
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
    [Route("api/classrooms")]
    //[Route("api/{v:apiVersion}/classrooms")] example for versioning
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class ClassRoomController : ControllerBase
    {
        private readonly IQueryHandler<ClassRoom> _QueryHandler;
        private readonly IClassRoomCommandHandler _CommandHandler;

        public ClassRoomController(IQueryHandler<ClassRoom> queryHandler, IClassRoomCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.ClassRoom, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter, true));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ClassRoom, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.ClassRoom, Edit = true)]
        public async Task<ActionResult> Post([FromBody] ClassRoomRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.ClassRoom, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.ClassRoom, Edit = true)]
        public async Task<ActionResult> Update([FromBody] ClassRoomRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }
    }

}
