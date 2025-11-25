using DC365_PayrollHR.Core.Application.CommandsAndQueries.DashboardInfo;
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
    [Route("api/v2.0/dashboard")]
    [Authorize]
    [ApiController]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardInfoQueryHandler _infoQueryHandler;

        public DashboardController(IDashboardInfoQueryHandler infoQueryHandler)
        {
            _infoQueryHandler = infoQueryHandler;
        }

        [HttpGet("cardinformation")]
        public async Task<ActionResult> Get()
        {
            var objectresult = await _infoQueryHandler.GetCount();

            return StatusCode(objectresult.StatusHttp, objectresult);
        }        
        
        [HttpGet("graphicinformation")]
        public async Task<ActionResult> GetGraphics([FromQuery] int year, [FromQuery] string payrollid)
        {
            var objectresult = await _infoQueryHandler.GetGraphics(year, payrollid);

            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }
}
