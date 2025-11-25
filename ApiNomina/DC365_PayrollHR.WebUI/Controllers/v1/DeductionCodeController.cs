using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.DeductionCodes;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Attributes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DC365_PayrollHR.WebUI.Controllers
{
    [Route("api/deductioncodes")]
    [ApiController]
    public class DeductionCodeController : ControllerBase
    {
        private readonly IQueryHandler<DeductionCode> _queryHandler;
        private readonly IDeductionCodeCommandHandler _commandHandler;

        public DeductionCodeController(IQueryHandler<DeductionCode> queryHandler,
           IDeductionCodeCommandHandler commandHandler)
        {
            _queryHandler = queryHandler;
            _commandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _queryHandler.GetAll(paginationFilter, searchFilter));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _queryHandler.GetId(id));
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Edit = true)]
        public async Task<ActionResult<Response<object>>> Post([FromBody] DeductionCodeRequest _model)
        {
            return await _commandHandler.Create(_model);
        }

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _commandHandler.Delete(ids));
        }

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.DeductionCodeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] DeductionCodeRequest model, string id)
        {
            return Ok(await _commandHandler.Update(id, model));
        }
    }
}
