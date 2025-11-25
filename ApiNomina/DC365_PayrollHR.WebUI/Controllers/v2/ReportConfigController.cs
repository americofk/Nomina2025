using DC365_PayrollHR.Core.Application.CommandsAndQueries.Reports;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Reports;
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
    [Route("api/v2.0/reportconfig")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class ReportConfigController : ControllerBase
    {
        private readonly IQueryAllHandler<ReportConfig> _QueryHandler;
        private readonly ICreateCommandHandler<ReportConfigRequest> _CommandHandler;

        public ReportConfigController(IQueryAllHandler<ReportConfig> QueryHandler, ICreateCommandHandler<ReportConfigRequest> CommandHandler)
        {
            _QueryHandler = QueryHandler;
            _CommandHandler = CommandHandler;
        }

        [HttpGet]
        [AuthorizePrivilege(MenuId = MenuConst.ReportConfig, View = true)]
        public async Task<ActionResult<PagedResponse<ReportConfig>>> Get()
        {
            var objectresult = await _QueryHandler.GetAll(null, null);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        [HttpPost]
        [AuthorizePrivilege(MenuId = MenuConst.ReportConfig, Edit = true)]
        public async Task<ActionResult<Response<Payroll>>> Post([FromBody] ReportConfigRequest _model)
        {
            var objectresult = await _CommandHandler.Create(_model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
