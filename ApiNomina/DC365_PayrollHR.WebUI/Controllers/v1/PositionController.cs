using DC365_PayrollHR.Core.Application.CommandsAndQueries.Positions;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.Positions;
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
    [Route("api/positions")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    public class PositionController : ControllerBase
    {
        private readonly IQueryHandler<Position> _QueryHandler;
        private readonly IPositionCommandHandler _CommandHandler;

        public PositionController(IQueryHandler<Position> queryHandler, IPositionCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter, searchFilter,  new bool[] { true, false }));
        }

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, new bool[] { false, false }));
        }

        [HttpPost("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> Post([FromBody] PositionRequest model)
        {
            return Ok(await _CommandHandler.Create(model));
        }


        [HttpDelete("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Delete = true)]
        public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpDelete("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, Delete = true)]
        public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }


        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] PositionRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, bool status)
        {
            return Ok(await _CommandHandler.UpdateStatus(id, status));
        }

        #region Vacants

        [HttpGet("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, View = true)]
        public async Task<ActionResult> GetVacants([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _QueryHandler.GetAll(paginationFilter,searchFilter, new bool[] { true, true }));
        }

        [HttpGet("vacants/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, View = true)]
        public async Task<ActionResult> GetVacantsById(string id)
        {
            return Ok(await _QueryHandler.GetId(id));
        }

        [HttpPut("vacants/updatetovacants/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> UpdateToVacant(string id, bool isVacants)
        {
            return Ok(await _CommandHandler.UpdateVacants(id, isVacants));
        }

        [HttpDelete("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Delete = true)]
        public async Task<ActionResult> DeleteVacants([FromBody] List<string> ids)
        {
            return Ok(await _CommandHandler.Delete(ids));
        }

        [HttpPost("vacants")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> PostVacants([FromBody] PositionRequest model)
        {
            return Ok(await _CommandHandler.Create(model, true));
        }

        [HttpPut("vacants/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.PositionVacant, Edit = true)]
        public async Task<ActionResult> UpdateVacant([FromBody] PositionRequest model, string id)
        {
            return Ok(await _CommandHandler.Update(id, model));
        }

        #endregion

    }

}
