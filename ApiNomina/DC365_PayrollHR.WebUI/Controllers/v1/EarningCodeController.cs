using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.StoreServices.EarningCodes;
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
    [Route("api/earningcodes")]
    [ApiController]
    public class EarningCodeController : ControllerBase
    {
        private readonly IQueryHandler<EarningCode> _queryHandler;
        private IEarningCodeCommandHandler _commandHandler;

        public EarningCodeController(IQueryHandler<EarningCode> queryHandler, IEarningCodeCommandHandler commandHandler)
        {
            _queryHandler = queryHandler;
            _commandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> Get([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            return Ok(await _queryHandler.GetAll(paginationFilter, searchFilter));
        }

        [HttpGet("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, View = true)]
        public async Task<ActionResult> GetById(string id)
        {
            return Ok(await _queryHandler.GetId(id));
        }

        // POST api/<EarningCodeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EarningCodeRequest _model)
        {
            return Ok(await _commandHandler.Create(_model));
        }

        [HttpPut("{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EarningCodeRequest model, string id)
        {
            return Ok(await _commandHandler.Update(id, model));
        }

        [HttpDelete]
        [AuthorizePrivilege(MenuId = MenuConst.EarningCodeEnabled, Delete = true)]
        public async Task<ActionResult> Delete([FromBody] List<string> ids)
        {
            return Ok(await _commandHandler.Delete(ids));
        }
    }
}
