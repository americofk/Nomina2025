using DC365_PayrollHR.Core.Application.CommandsAndQueries.GeneralConfigs;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.GeneralConfigs;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    [Route("api/v2.0/generalconfigs")]
    [Authorize]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class GeneralConfigController : ControllerBase
    {
        private readonly IQueryByIdHandler<GeneralConfigResponse> _QueryHandler;
        private readonly IGeneralConfigCommandHandler _commandHandler;

        public GeneralConfigController(IQueryByIdHandler<GeneralConfigResponse> queryHandler, IGeneralConfigCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _commandHandler = commandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.GeneralConfig, View = true)]
        public async Task<ActionResult> Get()
        {
            var objectresult = await _QueryHandler.GetId("");
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GeneralConfigRequest _model)
        {
            var objectresult = await _commandHandler.Create(_model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
