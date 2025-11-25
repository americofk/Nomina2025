using DC365_PayrollHR.Core.Application.CommandsAndQueries.PositionRequirements;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.PositionRequeriments;
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
    [Route("api/v2.0/positionrequirements")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
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
            var objectresult = await _QueryHandler.GetAll(paginationFilter, searchFilter, positionid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PositionRequirementRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);

        }


        [HttpDelete("{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids, string positionid)
        {
            var objectresult = await _CommandHandler.DeleteByPositionId(ids, positionid);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        [HttpPut("{positionid}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionRequirement, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PositionRequirementRequest model, string positionid)
        {
            var objectresult = await _CommandHandler.Update(positionid, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
