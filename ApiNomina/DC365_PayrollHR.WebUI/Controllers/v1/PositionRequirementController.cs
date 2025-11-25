using DC365_PayrollHR.Core.Application.CommandsAndQueries.PositionRequirements;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.PositionRequeriments;
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
    [Route("api/positionrequirements")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class PositionRequirementController : ControllerBase
    {
        private readonly IQueryHandler<PositionRequirement> _QueryHandler;
        private readonly IPositionRequirementCommandHandler _CommandHandler;

        public PositionRequirementController(IQueryHandler<PositionRequirement> queryHandler, IPositionRequirementCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter, string positionid)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, positionid));
        }

        [HttpGet("{positionid}/{name}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, View = true)]
        public async Task<ActionResult> GetById(string positionid, string name)
        {
            return Ok(await _QueryHandler.GetId(new string[] { positionid, name}));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PositionRequirementRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string positionid)
        {
            return Ok(await _CommandHandler.DeleteByPositionId(ids, positionid));
        }


        [HttpPut("{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PositionRequirementRequest model, string positionid)
        {
            return Ok(await _CommandHandler.Update(positionid, model));
        }
    }

}
